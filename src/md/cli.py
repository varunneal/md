import argparse
import hashlib
import os
import re
import signal
import subprocess
import sys
import time
import tomllib
from html import escape
from http.server import HTTPServer, BaseHTTPRequestHandler
from pathlib import Path
from urllib.parse import quote, unquote

import mistune

PKG_DIR = Path(__file__).parent
USER_DIR = Path.home() / ".config" / "md"
DEFAULT_CSS = PKG_DIR / "style.css"

DEFAULTS = {
    "port": 52342,
    "browser": "Google Chrome",
    "theme": "dark",
}


def load_config() -> dict:
    cfg = dict(DEFAULTS)
    # Package defaults, then user overrides
    for config_file in [PKG_DIR / "config.toml", USER_DIR / "config.toml"]:
        if config_file.exists():
            with open(config_file, "rb") as f:
                cfg.update(tomllib.load(f))
    return cfg


CFG = load_config()
PORT = CFG["port"]
PIDFILE = Path(f"/tmp/md-viewer-{PORT}.pid")

_md = mistune.create_markdown(
    plugins=["strikethrough", "table", "footnotes", "task_lists"],
)

_MATH_BLOCK = re.compile(r'\$\$(.+?)\$\$', re.DOTALL)
_MATH_INLINE = re.compile(r'(?<!\$)\$(?!\$)(.+?)(?<!\$)\$(?!\$)')


def _protect_math(text: str) -> tuple[str, dict[str, str]]:
    store: dict[str, str] = {}

    def _replace(m: re.Match, display: bool) -> str:
        raw = m.group(0)
        key = f"MATH_{hashlib.md5(raw.encode()).hexdigest()}"
        store[key] = raw
        return f"\n\n{key}\n\n" if display else key

    text = _MATH_BLOCK.sub(lambda m: _replace(m, display=True), text)
    text = _MATH_INLINE.sub(lambda m: _replace(m, display=False), text)
    return text, store


def _restore_math(html: str, store: dict[str, str]) -> str:
    for key, raw in store.items():
        html = html.replace(key, raw)
    return html


def _load_css() -> str:
    base = DEFAULT_CSS.read_text(encoding="utf-8")
    user_css = USER_DIR / "style.css"
    if user_css.exists():
        base += "\n" + user_css.read_text(encoding="utf-8")
    return base


HTML_TEMPLATE = """\
<!DOCTYPE html>
<html data-theme="__THEME__">
<head>
<meta charset="utf-8">
<title>__TITLE__</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"
    onload="renderMathInElement(document.getElementById('rendered'), {
        delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false},
            {left: '\\\\(', right: '\\\\)', display: false},
            {left: '\\\\[', right: '\\\\]', display: true}
        ]
    });"></script>
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
<style>
__CSS__
</style>
</head>
<body>
<div class="toolbar">
    <button id="raw-btn" onclick="toggleRaw()">raw</button>
    <button id="theme-btn" onclick="toggleTheme()">__THEME_ALT__</button>
</div>
<div id="rendered">__BODY__</div>
<div id="raw-view">__RAW__</div>
<script>
function toggleRaw() {
    var rendered = document.getElementById('rendered');
    var raw = document.getElementById('raw-view');
    var btn = document.getElementById('raw-btn');
    if (raw.style.display === 'none' || raw.style.display === '') {
        raw.style.display = 'block';
        rendered.style.display = 'none';
        btn.textContent = 'rendered';
    } else {
        raw.style.display = 'none';
        rendered.style.display = 'block';
        btn.textContent = 'raw';
    }
}
function toggleTheme() {
    var html = document.documentElement;
    var btn = document.getElementById('theme-btn');
    if (html.dataset.theme === 'dark') {
        html.dataset.theme = 'light';
        btn.textContent = 'dark';
        localStorage.setItem('md-theme', 'light');
    } else {
        html.dataset.theme = 'dark';
        btn.textContent = 'light';
        localStorage.setItem('md-theme', 'dark');
    }
}
(function() {
    var saved = localStorage.getItem('md-theme');
    if (saved) {
        document.documentElement.dataset.theme = saved;
        document.getElementById('theme-btn').textContent = saved === 'dark' ? 'light' : 'dark';
    }
})();
</script>
</body>
</html>
"""


def render_markdown(filepath: Path) -> str:
    text = filepath.read_text(encoding="utf-8")
    protected, store = _protect_math(text)
    body = _restore_math(_md(protected), store)
    theme = CFG["theme"]
    theme_alt = "light" if theme == "dark" else "dark"
    return (
        HTML_TEMPLATE
        .replace("__TITLE__", escape(filepath.name))
        .replace("__CSS__", _load_css())
        .replace("__THEME__", theme)
        .replace("__THEME_ALT__", theme_alt)
        .replace("__BODY__", body)
        .replace("__RAW__", escape(text))
    )


def find_server_pid() -> int | None:
    if not PIDFILE.exists():
        return None
    try:
        pid = int(PIDFILE.read_text().strip())
        os.kill(pid, 0)
        return pid
    except (ValueError, ProcessLookupError, PermissionError):
        PIDFILE.unlink(missing_ok=True)
        return None


class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        filepath = Path(unquote(self.path))
        if not filepath.is_absolute() or not filepath.exists():
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"File not found")
            return
        try:
            html = render_markdown(filepath)
        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(f"Error: {e}".encode())
            return
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(html.encode())

    def log_message(self, format, *args):
        pass


def start_server():
    pid = os.fork()
    if pid > 0:
        return

    os.setsid()
    sys.stdin.close()
    devnull = open(os.devnull, "w")
    sys.stdout = devnull
    sys.stderr = devnull

    PIDFILE.write_text(str(os.getpid()))
    signal.signal(signal.SIGTERM, lambda *_: (PIDFILE.unlink(missing_ok=True), sys.exit(0)))

    HTTPServer(("127.0.0.1", PORT), RequestHandler).serve_forever()


def main():
    parser = argparse.ArgumentParser(description="Render markdown in Chrome")
    parser.add_argument("file", nargs="?", type=Path, help="Markdown file to render")
    parser.add_argument("--stop", action="store_true", help="Stop the background server")
    parser.add_argument("--status", action="store_true", help="Check if server is running")
    args = parser.parse_args()

    if args.status:
        pid = find_server_pid()
        if pid:
            print(f"Server running (pid {pid}) on http://127.0.0.1:{PORT}")
        else:
            print("No server running.")
        return

    if args.stop:
        pid = find_server_pid()
        if pid:
            os.kill(pid, signal.SIGTERM)
            print("Server stopped.")
        else:
            print("No server running.")
        return

    if not args.file:
        parser.error("the following arguments are required: file")

    filepath = args.file.resolve()
    if not filepath.exists():
        print(f"File not found: {filepath}", file=sys.stderr)
        sys.exit(1)

    if find_server_pid() is None:
        start_server()
        time.sleep(0.2)

    browser = CFG["browser"]
    subprocess.Popen(
        ["open", "-a", browser, f"http://127.0.0.1:{PORT}{quote(str(filepath), safe='/')}"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

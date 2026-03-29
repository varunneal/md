import argparse
import hashlib
import os
import re
import signal
import subprocess
import sys
import time
from html import escape
from http.server import HTTPServer, BaseHTTPRequestHandler
from pathlib import Path
from urllib.parse import quote, unquote

import mistune

PORT = 52342
PIDFILE = Path("/tmp/md-viewer.pid")

_md = mistune.create_markdown(
    plugins=["strikethrough", "table", "footnotes", "task_lists"],
)

# Protect math from mistune: extract $$/$ blocks, replace with placeholders,
# render markdown, then restore them.
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

HTML_TEMPLATE = """\
<!DOCTYPE html>
<html data-theme="dark">
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"
    onload="renderMathInElement(document.getElementById('rendered'), {{
        delimiters: [
            {{left: '$$', right: '$$', display: true}},
            {{left: '$', right: '$', display: false}},
            {{left: '\\\\(', right: '\\\\)', display: false}},
            {{left: '\\\\[', right: '\\\\]', display: true}}
        ]
    }});"></script>
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
<style>
[data-theme="dark"] {{
    --bg: #161412;
    --bg-light: #302b26;
    --border: #302b26;
    --gray: #5a5047;
    --text: #a99e91;
    --heading: #dcd3c5;
    --link: #93ad7a;
    --link-hover: #556b2f;
    --highlight: rgba(147, 173, 122, 0.15);
    --code-normal: #d4d4d4;
    --code-keyword: #cc7832;
    --code-string: #8dc891;
    --code-operator: #a9b7c6;
    --code-punctuation: #a9b7c6;
    --code-class: #a9b7c6;
    --code-attribute: #9876aa;
    --code-constant: #9876aa;
    --code-builtin: #a9b7c6;
    --code-comment: #87a987;
}}
[data-theme="light"] {{
    --bg: #fcfaf3;
    --bg-light: #e6dfd0;
    --border: #e6dfd0;
    --gray: #b3ab9d;
    --text: #6a5a4a;
    --heading: #5b493a;
    --link: #556b2f;
    --link-hover: #93ad7a;
    --highlight: rgba(147, 173, 122, 0.15);
    --code-normal: #5b493a;
    --code-keyword: #a0522d;
    --code-string: #3a7a3a;
    --code-operator: #6a5a4a;
    --code-punctuation: #6a5a4a;
    --code-class: #6a5a4a;
    --code-attribute: #7b5ea0;
    --code-constant: #7b5ea0;
    --code-builtin: #6a5a4a;
    --code-comment: #87a987;
}}
body {{
    max-width: 760px;
    margin: 40px auto;
    padding: 0 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: var(--text);
    background: var(--bg);
}}
h1, h2, h3, h4, h5, h6 {{ margin-top: 1.4em; margin-bottom: 0.5em; font-weight: 600; color: var(--heading); }}
h1 {{ font-size: 2em; border-bottom: 1px solid var(--border); padding-bottom: 0.3em; }}
h2 {{ font-size: 1.5em; border-bottom: 1px solid var(--border); padding-bottom: 0.3em; }}
pre {{
    background: var(--bg-light);
    padding: 16px;
    border-radius: 6px;
    overflow-x: auto;
    border: 1px solid var(--gray);
}}
code {{
    background: var(--bg-light);
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 0.9em;
    color: var(--code-normal);
}}
pre code {{
    background: none;
    padding: 0;
}}
blockquote {{
    border-left: 4px solid var(--gray);
    margin-left: 0;
    padding-left: 16px;
    color: var(--gray);
}}
table {{
    border-collapse: collapse;
    width: 100%;
}}
th, td {{
    border: 1px solid var(--border);
    padding: 8px 12px;
    text-align: left;
}}
th {{ background: var(--bg-light); color: var(--heading); }}
img {{ max-width: 100%; }}
a {{ color: var(--link); text-decoration: none; }}
a:hover {{ color: var(--link-hover); }}
hr {{ border: none; border-top: 1px solid var(--border); }}
strong {{ color: var(--heading); }}
mark {{ background: var(--highlight); color: #ff0000; }}
::selection {{ background: var(--highlight); }}
li input[type="checkbox"] {{ margin-right: 6px; accent-color: var(--link); }}
.katex {{ color: var(--heading); }}

code[class*="language-"],
pre[class*="language-"] {{
    color: var(--code-normal);
    text-shadow: none;
    font-family: "SF Mono", "Fira Code", "Fira Mono", Menlo, Consolas, monospace;
    font-size: 0.9em;
    line-height: 1.5;
}}
pre[class*="language-"] {{
    background: var(--bg-light);
}}
.token.comment, .token.prolog, .token.doctype, .token.cdata {{
    color: var(--code-comment);
    font-style: italic;
}}
.token.keyword, .token.tag, .token.boolean, .token.number, .token.constant.numeric {{
    color: var(--code-keyword);
}}
.token.string, .token.char, .token.attr-value, .token.template-string {{
    color: var(--code-string);
}}
.token.operator, .token.entity {{ color: var(--code-operator); }}
.token.punctuation {{ color: var(--code-punctuation); }}
.token.function {{ color: var(--code-class); }}
.token.attr-name, .token.decorator, .token.annotation {{ color: var(--code-attribute); }}
.token.constant, .token.symbol {{ color: var(--code-constant); }}
.token.builtin, .token.class-name {{ color: var(--code-builtin); }}
.token.important, .token.bold {{ font-weight: bold; }}
.token.italic {{ font-style: italic; }}

.toolbar {{
    position: fixed;
    top: 16px;
    right: 20px;
    display: flex;
    gap: 8px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    font-size: 13px;
}}
.toolbar button {{
    background: var(--bg-light);
    color: var(--text);
    border: 1px solid var(--gray);
    border-radius: 4px;
    padding: 4px 10px;
    cursor: pointer;
    font-size: 13px;
    font-family: inherit;
}}
.toolbar button:hover {{
    color: var(--heading);
    border-color: var(--heading);
}}
#raw-view {{
    display: none;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: "SF Mono", "Fira Code", "Fira Mono", Menlo, Consolas, monospace;
    font-size: 14px;
    color: var(--text);
    line-height: 1.5;
}}
</style>
</head>
<body>
<div class="toolbar">
    <button id="raw-btn" onclick="toggleRaw()">raw</button>
    <button id="theme-btn" onclick="toggleTheme()">light</button>
</div>
<div id="rendered">{body}</div>
<div id="raw-view">{raw}</div>
<script>
function toggleRaw() {{
    var rendered = document.getElementById('rendered');
    var raw = document.getElementById('raw-view');
    var btn = document.getElementById('raw-btn');
    if (raw.style.display === 'none' || raw.style.display === '') {{
        raw.style.display = 'block';
        rendered.style.display = 'none';
        btn.textContent = 'rendered';
    }} else {{
        raw.style.display = 'none';
        rendered.style.display = 'block';
        btn.textContent = 'raw';
    }}
}}
function toggleTheme() {{
    var html = document.documentElement;
    var btn = document.getElementById('theme-btn');
    if (html.dataset.theme === 'dark') {{
        html.dataset.theme = 'light';
        btn.textContent = 'dark';
        localStorage.setItem('md-theme', 'light');
    }} else {{
        html.dataset.theme = 'dark';
        btn.textContent = 'light';
        localStorage.setItem('md-theme', 'dark');
    }}
}}
(function() {{
    var saved = localStorage.getItem('md-theme');
    if (saved) {{
        document.documentElement.dataset.theme = saved;
        document.getElementById('theme-btn').textContent = saved === 'dark' ? 'light' : 'dark';
    }}
}})();
</script>
</body>
</html>
"""


def render_markdown(filepath: Path) -> str:
    text = filepath.read_text(encoding="utf-8")
    protected, store = _protect_math(text)
    body = _restore_math(_md(protected), store)
    return HTML_TEMPLATE.format(title=filepath.name, body=body, raw=escape(text))


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

    subprocess.Popen(
        ["open", "-a", "Google Chrome", f"http://127.0.0.1:{PORT}{quote(str(filepath), safe='/')}"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

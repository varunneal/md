import argparse
import hashlib
import os
import signal
import subprocess
import sys
import threading
from functools import partial
from http.server import HTTPServer, BaseHTTPRequestHandler
from pathlib import Path

import mistune

PORT = 52342

HTML_TEMPLATE = """\
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"
    onload="renderMathInElement(document.body, {{
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
:root {{
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

/* Task list checkboxes */
li input[type="checkbox"] {{ margin-right: 6px; accent-color: var(--link); }}

/* KaTeX overrides for dark mode */
.katex {{ color: var(--heading); }}

/* Prism.js custom dark theme */
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
.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {{
    color: var(--code-comment);
    font-style: italic;
}}
.token.keyword,
.token.tag,
.token.boolean,
.token.number,
.token.constant.numeric {{
    color: var(--code-keyword);
}}
.token.string,
.token.char,
.token.attr-value,
.token.template-string {{
    color: var(--code-string);
}}
.token.operator,
.token.entity {{
    color: var(--code-operator);
}}
.token.punctuation {{
    color: var(--code-punctuation);
}}
.token.function {{
    color: var(--code-class);
}}
.token.attr-name,
.token.decorator,
.token.annotation {{
    color: var(--code-attribute);
}}
.token.constant,
.token.symbol {{
    color: var(--code-constant);
}}
.token.builtin,
.token.class-name {{
    color: var(--code-builtin);
}}
.token.important,
.token.bold {{ font-weight: bold; }}
.token.italic {{ font-style: italic; }}
</style>
</head>
<body>
{body}
</body>
</html>
"""


def render_markdown(filepath: Path) -> str:
    text = filepath.read_text(encoding="utf-8")
    md = mistune.create_markdown(
        plugins=["strikethrough", "table", "footnotes", "task_lists"],
    )
    body = md(text)
    title = filepath.name
    return HTML_TEMPLATE.format(title=title, body=body)


class Handler(BaseHTTPRequestHandler):
    """Serves rendered markdown. The file path is set on the class."""

    filepath: Path = None  # type: ignore

    def do_GET(self):
        html = render_markdown(self.filepath)
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(html.encode())

    def log_message(self, format, *args):
        pass  # silence logs


def find_server_pid() -> int | None:
    """Check if our server is already running by looking for the pidfile."""
    pidfile = Path("/tmp/md-viewer.pid")
    if not pidfile.exists():
        return None
    try:
        pid = int(pidfile.read_text().strip())
        os.kill(pid, 0)  # check if alive
        return pid
    except (ValueError, ProcessLookupError, PermissionError):
        pidfile.unlink(missing_ok=True)
        return None


def write_pidfile():
    Path("/tmp/md-viewer.pid").write_text(str(os.getpid()))


def remove_pidfile():
    Path("/tmp/md-viewer.pid").unlink(missing_ok=True)


def file_url(filepath: Path) -> str:
    from urllib.parse import quote
    return f"http://127.0.0.1:{PORT}/{quote(str(filepath), safe='/')}"


class ReusingHandler(BaseHTTPRequestHandler):
    """Serves any markdown file by absolute path in the URL."""

    def do_GET(self):
        try:
            from urllib.parse import unquote
            filepath = Path(unquote(self.path.lstrip("/")))
            if not filepath.is_absolute() or not filepath.exists():
                self.send_response(404)
                self.end_headers()
                self.wfile.write(b"File not found")
                return
            html = render_markdown(filepath)
        except Exception as e:
            html = f"<pre>Error: {e}</pre>"
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(html.encode())

    def log_message(self, format, *args):
        pass


def start_server():
    """Start the background server."""
    # Fork to background
    pid = os.fork()
    if pid > 0:
        # Parent - wait briefly for server to start
        return

    # Child - become session leader and run server
    os.setsid()

    # Close inherited fds
    sys.stdin.close()
    devnull = open(os.devnull, "w")
    sys.stdout = devnull
    sys.stderr = devnull

    write_pidfile()
    signal.signal(signal.SIGTERM, lambda *_: (remove_pidfile(), sys.exit(0)))

    server = HTTPServer(("127.0.0.1", PORT), ReusingHandler)
    server.serve_forever()


def open_in_chrome(url: str):
    subprocess.Popen(
        ["open", "-a", "Google Chrome", url],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


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
        import time
        time.sleep(0.2)

    open_in_chrome(file_url(filepath))

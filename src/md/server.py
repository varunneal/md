from __future__ import annotations

import asyncio
import hmac
import json
from contextlib import asynccontextmanager
from pathlib import Path
from string import Template
from typing import Any, AsyncIterator

import uvicorn
from starlette.applications import Starlette
from starlette.requests import Request
from starlette.responses import FileResponse, HTMLResponse, JSONResponse, PlainTextResponse
from starlette.routing import Route, WebSocketRoute
from starlette.websockets import WebSocket, WebSocketDisconnect

from .documents import Document, DocumentManager, canonical_path
from .rendering import PKG_DIR, escaped_title, load_css


PROTOCOL_VERSION = 1
STATIC_DIR = PKG_DIR / "static"


PAGE_TEMPLATE = Template("""<!doctype html>
<html data-theme="$theme">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>$title</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
<style>$css</style>
<link rel="stylesheet" href="/static/client.css">
</head>
<body>
<div class="toolbar" role="toolbar" aria-label="Viewer controls">
  <span id="sync-status" class="sync-status" aria-live="polite">connecting</span>
  <button id="raw-btn" type="button">raw</button>
  <button id="edit-btn" type="button">edit</button>
  <button id="done-btn" type="button" hidden>done</button>
  <button id="cancel-btn" type="button" hidden>cancel</button>
  <button id="recovery-btn" type="button">recovery <span id="recovery-count"></span></button>
  <button id="theme-btn" type="button">$theme_alt</button>
</div>
<div id="notice" class="notice" role="status" hidden></div>
<main id="rendered">$body</main>
<pre id="raw-view"></pre>
<div id="editor-wrap"></div>
<aside id="recovery-drawer" class="recovery-drawer" aria-label="Draft recovery" hidden>
  <header><h2>Recovered drafts</h2><button id="recovery-close" type="button">close</button></header>
  <div id="recovery-list"></div>
  <div id="recovery-compare"></div>
</aside>
<script id="md-bootstrap" type="application/json">$bootstrap</script>
<script type="module" src="/static/client.js"></script>
</body>
</html>
""")


def _json_for_script(value: Any) -> str:
    return (
        json.dumps(value, ensure_ascii=False, separators=(",", ":"))
        .replace("<", "\\u003c")
        .replace(">", "\\u003e")
        .replace("&", "\\u0026")
    )


def render_page(
    document: Document, *, token: str, theme: str, protocol_version: int
) -> str:
    bootstrap = {
        "path": str(document.path),
        "token": token,
        "protocol_version": protocol_version,
        "theme": theme,
        **document.snapshot(),
    }
    theme_alt = "light" if theme == "dark" else "dark"
    return PAGE_TEMPLATE.substitute(
        title=escaped_title(document.path),
        css=load_css(),
        theme=theme,
        theme_alt=theme_alt,
        body=document.rendered_html,
        bootstrap=_json_for_script(bootstrap),
    )


def create_app(
    *, token: str, port: int, theme: str = "dark", manager: DocumentManager | None = None
) -> Starlette:
    documents = manager or DocumentManager()

    def valid_token(candidate: str | None) -> bool:
        return bool(candidate) and hmac.compare_digest(candidate, token)

    @asynccontextmanager
    async def lifespan(_app: Starlette) -> AsyncIterator[None]:
        yield
        await documents.shutdown()

    async def health(_request: Request) -> JSONResponse:
        return JSONResponse({"status": "ok", "protocol_version": PROTOCOL_VERSION})

    async def view(request: Request) -> HTMLResponse | PlainTextResponse:
        if not valid_token(request.query_params.get("token")):
            return PlainTextResponse("Forbidden", status_code=403)
        raw_path = request.query_params.get("path")
        if not raw_path or not Path(raw_path).is_absolute():
            return PlainTextResponse("An absolute path is required", status_code=400)
        try:
            document = await documents.open(raw_path)
        except (FileNotFoundError, IsADirectoryError):
            return PlainTextResponse("File not found", status_code=404)
        except UnicodeDecodeError:
            return PlainTextResponse("File is not UTF-8", status_code=415)
        return HTMLResponse(
            render_page(
                document,
                token=token,
                theme=theme,
                protocol_version=PROTOCOL_VERSION,
            ),
            headers={"Cache-Control": "no-store"},
        )

    async def static_file(request: Request) -> FileResponse | PlainTextResponse:
        name = request.path_params["name"]
        if name not in {"client.js", "client.css"}:
            return PlainTextResponse("Not found", status_code=404)
        path = STATIC_DIR / name
        if not path.is_file():
            return PlainTextResponse("Static client is not built", status_code=500)
        return FileResponse(path)

    async def socket(websocket: WebSocket) -> None:
        if not valid_token(websocket.query_params.get("token")):
            await websocket.close(code=1008, reason="invalid token")
            return
        allowed_origins = {
            f"http://127.0.0.1:{port}",
            f"http://localhost:{port}",
        }
        if websocket.headers.get("origin") not in allowed_origins:
            await websocket.close(code=1008, reason="invalid origin")
            return
        raw_path = websocket.query_params.get("path")
        client_id = websocket.query_params.get("client_id")
        if not raw_path or not Path(raw_path).is_absolute() or not client_id:
            await websocket.close(code=1008, reason="invalid parameters")
            return

        path = canonical_path(raw_path)
        document = documents.get(path)
        if document is None:
            try:
                document = await documents.open(path)
            except (FileNotFoundError, IsADirectoryError, UnicodeDecodeError):
                await websocket.close(code=1008, reason="document unavailable")
                return

        await websocket.accept()
        queue = document.subscribe()

        async def send_messages() -> None:
            while True:
                message = await queue.get()
                if message.get("type") == "server_shutdown":
                    await websocket.close(code=1001, reason="server shutdown")
                    return
                await websocket.send_json(message)

        sender = asyncio.create_task(send_messages(), name=f"md-ws-send:{client_id}")
        try:
            await websocket.send_json(document.snapshot())
            while True:
                message = await websocket.receive_json()
                if message.get("type") != "save":
                    queue.put_nowait(
                        {"type": "error", "message": "unsupported message type"}
                    )
                    continue
                request_id = message.get("request_id")
                base_revision = message.get("base_revision")
                source = message.get("source")
                if not all(isinstance(value, str) for value in (request_id, base_revision, source)):
                    queue.put_nowait(
                        {"type": "error", "message": "invalid save payload"}
                    )
                    continue
                result = await documents.save(
                    document,
                    request_id=request_id,
                    base_revision=base_revision,
                    source=source,
                )
                queue.put_nowait(result)
        except (WebSocketDisconnect, RuntimeError, json.JSONDecodeError):
            pass
        finally:
            sender.cancel()
            await asyncio.gather(sender, return_exceptions=True)
            document.unsubscribe(queue)

    app = Starlette(
        routes=[
            Route("/health", health),
            Route("/view", view),
            Route("/static/{name}", static_file),
            WebSocketRoute("/ws", socket),
        ],
        lifespan=lifespan,
    )
    app.state.documents = documents
    app.state.server_token = token
    app.state.protocol_version = PROTOCOL_VERSION
    return app


def run_server(*, token: str, port: int, theme: str) -> None:
    app = create_app(token=token, port=port, theme=theme)
    config = uvicorn.Config(
        app,
        host="127.0.0.1",
        port=port,
        log_level="warning",
        access_log=False,
    )
    asyncio.run(uvicorn.Server(config).serve())

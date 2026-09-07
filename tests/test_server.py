from __future__ import annotations

from pathlib import Path
from html import unescape
import re
from urllib.parse import quote

import pytest
from starlette.testclient import TestClient
from starlette.websockets import WebSocketDisconnect

from md.server import PROTOCOL_VERSION, create_app


TOKEN = "test-token"
PORT = 53291


def index_links(html: str) -> dict[str, str]:
    return {
        unescape(label): unescape(url)
        for url, label in re.findall(r'<a href="([^"]+)">([^<]+)</a>', html)
    }


def test_directory_index_navigation_and_escaped_names(tmp_path: Path) -> None:
    folder = tmp_path / 'notes & <drafts>'
    folder.mkdir()
    child = folder / "subfolder"
    child.mkdir()
    name = 'a & <b> # résumé.MD'
    (folder / name).write_text("# Selected document", encoding="utf-8")
    (folder / "z.markdown").write_text("other", encoding="utf-8")
    (folder / "ignored.txt").write_text("ignore", encoding="utf-8")
    (folder / ".hidden.md").write_text("hidden", encoding="utf-8")
    (folder / ".git").mkdir()
    app = create_app(token=TOKEN, port=PORT)
    with TestClient(app) as client:
        assert client.get("/view", params={"path": str(folder)}).status_code == 403
        response = client.get("/view", params={"path": str(folder), "token": TOKEN})
        assert response.status_code == 200
        assert response.headers["cache-control"] == "no-store"
        assert "notes &amp; &lt;drafts&gt;" in response.text
        links = index_links(response.text)
        assert list(links) == ["../ (parent directory)", "subfolder/", name, "z.markdown"]
        assert not app.state.documents.documents
        assert not app.state.documents.watchers

        nested = client.get(links["subfolder/"])
        assert nested.status_code == 200
        assert "No Markdown files or subdirectories." in nested.text
        back = client.get(index_links(nested.text)["../ (parent directory)"])
        assert index_links(back.text) == links

        document = client.get(links[name])
        assert document.status_code == 200
        assert '<h1>Selected document</h1>' in document.text
        assert 'id="md-bootstrap"' in document.text


def test_directory_index_refresh_and_invalid_paths(tmp_path: Path) -> None:
    with TestClient(create_app(token=TOKEN, port=PORT)) as client:
        params = {"path": str(tmp_path), "token": TOKEN}
        assert "No Markdown files or subdirectories." in client.get("/view", params=params).text
        path = tmp_path / "new.md"
        path.write_text("new", encoding="utf-8")
        assert "new.md" in index_links(client.get("/view", params=params).text)
        path.unlink()
        assert "new.md" not in index_links(client.get("/view", params=params).text)
        assert client.get("/view", params={"path": "relative", "token": TOKEN}).status_code == 400
        assert client.get("/view", params={"path": str(path), "token": TOKEN}).status_code == 404


def ws_url(path: Path, token: str = TOKEN, client_id: str = "one") -> str:
    return f"/ws?path={quote(str(path), safe='')}&token={token}&client_id={client_id}"


def receive_until(socket, message_type: str) -> tuple[list[dict], dict]:
    seen = []
    while True:
        message = socket.receive_json()
        seen.append(message)
        if message["type"] == message_type:
            return seen, message


def test_view_requires_token_and_packages_static_assets(tmp_path: Path) -> None:
    path = tmp_path / "document.md"
    path.write_text("# hello", encoding="utf-8")
    with TestClient(create_app(token=TOKEN, port=PORT)) as client:
        assert client.get("/view", params={"path": str(path)}).status_code == 403
        response = client.get("/view", params={"path": str(path), "token": TOKEN})
        assert response.status_code == 200
        assert 'id="md-bootstrap"' in response.text
        assert "# hello" in response.text
        assert client.get("/static/client.js").status_code == 200
        assert client.get("/static/client.css").status_code == 200
        assert client.get("/health").json()["protocol_version"] == PROTOCOL_VERSION


def test_websocket_origin_is_restricted(tmp_path: Path) -> None:
    path = tmp_path / "document.md"
    path.write_text("hello", encoding="utf-8")
    with TestClient(create_app(token=TOKEN, port=PORT)) as client:
        with pytest.raises(WebSocketDisconnect):
            with client.websocket_connect(
                ws_url(path), headers={"origin": "https://attacker.example"}
            ):
                pass


def test_initial_snapshot_accepted_save_and_multi_tab_broadcast(tmp_path: Path) -> None:
    path = tmp_path / "document.md"
    path.write_text("base", encoding="utf-8")
    app = create_app(token=TOKEN, port=PORT)
    headers = {"origin": f"http://127.0.0.1:{PORT}"}
    with TestClient(app) as client:
        with client.websocket_connect(ws_url(path), headers=headers) as first:
            initial = first.receive_json()
            assert initial["type"] == "snapshot"
            assert initial["source"] == "base"
            with client.websocket_connect(ws_url(path, client_id="two"), headers=headers) as second:
                assert second.receive_json()["source"] == "base"
                first.send_json(
                    {
                        "type": "save",
                        "request_id": "request-1",
                        "base_revision": initial["revision"],
                        "source": "from browser",
                    }
                )
                first_seen, result = receive_until(first, "save_result")
                assert result["accepted"] is True
                assert any(item["type"] == "document_changed" for item in first_seen)
                second_change = second.receive_json()
                assert second_change["type"] == "document_changed"
                assert second_change["source"] == "from browser"
                assert path.read_text(encoding="utf-8") == "from browser"


def test_stale_websocket_save_returns_current_snapshot(tmp_path: Path) -> None:
    path = tmp_path / "document.md"
    path.write_text("base", encoding="utf-8")
    headers = {"origin": f"http://127.0.0.1:{PORT}"}
    with TestClient(create_app(token=TOKEN, port=PORT)) as client:
        with client.websocket_connect(ws_url(path), headers=headers) as socket:
            initial = socket.receive_json()
            path.write_text("newer disk", encoding="utf-8")
            socket.send_json(
                {
                    "type": "save",
                    "request_id": "stale",
                    "base_revision": initial["revision"],
                    "source": "old draft",
                }
            )
            _seen, result = receive_until(socket, "save_result")
            assert result["accepted"] is False
            assert result["reason"] == "stale_revision"
            assert result["snapshot"]["source"] == "newer disk"
            assert path.read_text(encoding="utf-8") == "newer disk"

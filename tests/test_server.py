from __future__ import annotations

from pathlib import Path
from urllib.parse import quote

import pytest
from starlette.testclient import TestClient
from starlette.websockets import WebSocketDisconnect

from md.server import PROTOCOL_VERSION, create_app


TOKEN = "test-token"
PORT = 53291


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

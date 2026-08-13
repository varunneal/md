from __future__ import annotations

import json
import os
import signal
import socket
import stat
from pathlib import Path

from md import cli


def unused_port() -> int:
    with socket.socket() as sock:
        sock.bind(("127.0.0.1", 0))
        return int(sock.getsockname()[1])


def configure_runtime(monkeypatch, tmp_path: Path) -> int:
    port = unused_port()
    monkeypatch.setattr(cli, "PORT", port)
    monkeypatch.setattr(cli, "STATE_FILE", tmp_path / "state.json")
    monkeypatch.setattr(cli, "LOCK_FILE", tmp_path / "startup.lock")
    monkeypatch.setattr(cli, "LEGACY_PIDFILE", tmp_path / "legacy.pid")
    return port


def test_startup_readiness_reuse_status_data_and_stop(monkeypatch, tmp_path: Path) -> None:
    port = configure_runtime(monkeypatch, tmp_path)
    try:
        first = cli.ensure_server()
        second = cli.ensure_server()
        assert first == second
        assert first["port"] == port
        assert first["protocol_version"] == cli.PROTOCOL_VERSION
        assert first["token"]
        assert stat.S_IMODE(cli.STATE_FILE.stat().st_mode) == 0o600
        assert json.loads(cli.STATE_FILE.read_text())["token"] == first["token"]
        assert cli.find_server_state() == first
    finally:
        assert cli.stop_server() is True
    assert not cli.STATE_FILE.exists()


def test_legacy_pid_server_is_replaced(monkeypatch, tmp_path: Path) -> None:
    configure_runtime(monkeypatch, tmp_path)
    legacy_pid = os.fork()
    if legacy_pid == 0:
        signal.pause()
        os._exit(0)

    cli.LEGACY_PIDFILE.write_text(str(legacy_pid), encoding="utf-8")
    try:
        state = cli.ensure_server()
        assert state["pid"] != legacy_pid
        assert not cli.LEGACY_PIDFILE.exists()
        assert cli._process_alive(legacy_pid) is False
    finally:
        cli.stop_server()
        if cli._process_alive(legacy_pid):
            os.kill(legacy_pid, signal.SIGKILL)

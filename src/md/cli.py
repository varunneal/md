from __future__ import annotations

import argparse
import fcntl
import json
import os
import secrets
import signal
import subprocess
import sys
import tempfile
import time
import tomllib
from contextlib import contextmanager
from pathlib import Path
from typing import Iterator, TypedDict
from urllib.parse import urlencode
from urllib.request import urlopen

from .server import PROTOCOL_VERSION, run_server


PKG_DIR = Path(__file__).parent
USER_DIR = Path.home() / ".config" / "md"
DEFAULTS = {
    "port": 52342,
    "browser": "Google Chrome",
    "theme": "dark",
}


class ServerState(TypedDict):
    pid: int
    port: int
    protocol_version: int
    token: str


def load_config() -> dict[str, object]:
    config: dict[str, object] = dict(DEFAULTS)
    for config_file in (PKG_DIR / "config.toml", USER_DIR / "config.toml"):
        if config_file.exists():
            with config_file.open("rb") as stream:
                config.update(tomllib.load(stream))
    return config


CFG = load_config()
PORT = int(CFG["port"])
STATE_FILE = Path(f"/tmp/md-viewer-{PORT}.json")
LOCK_FILE = Path(f"/tmp/md-viewer-{PORT}.lock")
LEGACY_PIDFILE = Path(f"/tmp/md-viewer-{PORT}.pid")
# Kept as an import-compatible name for clients of the original tiny module.
PIDFILE = LEGACY_PIDFILE
_ACTIVE_LOCK_DESCRIPTOR: int | None = None


def _process_alive(pid: int) -> bool:
    try:
        waited_pid, _status = os.waitpid(pid, os.WNOHANG)
        if waited_pid == pid:
            return False
    except ChildProcessError:
        pass
    try:
        os.kill(pid, 0)
        return True
    except (ProcessLookupError, PermissionError):
        return False


def _read_state() -> ServerState | None:
    if not STATE_FILE.exists():
        return None
    try:
        raw = json.loads(STATE_FILE.read_text(encoding="utf-8"))
        state: ServerState = {
            "pid": int(raw["pid"]),
            "port": int(raw["port"]),
            "protocol_version": int(raw["protocol_version"]),
            "token": str(raw["token"]),
        }
        if state["port"] != PORT or not state["token"]:
            raise ValueError("invalid viewer state")
        return state
    except (OSError, ValueError, KeyError, TypeError, json.JSONDecodeError):
        STATE_FILE.unlink(missing_ok=True)
        return None


def _write_state(state: ServerState) -> None:
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    fd, temporary_name = tempfile.mkstemp(
        prefix=f".{STATE_FILE.name}.", dir=STATE_FILE.parent
    )
    temporary = Path(temporary_name)
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as stream:
            os.fchmod(stream.fileno(), 0o600)
            json.dump(state, stream, separators=(",", ":"))
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temporary, STATE_FILE)
        os.chmod(STATE_FILE, 0o600)
    finally:
        temporary.unlink(missing_ok=True)


def _remove_state_if_owner(pid: int) -> None:
    state = _read_state()
    if state is not None and state["pid"] == pid:
        STATE_FILE.unlink(missing_ok=True)


@contextmanager
def _startup_lock() -> Iterator[None]:
    global _ACTIVE_LOCK_DESCRIPTOR
    descriptor = os.open(LOCK_FILE, os.O_CREAT | os.O_RDWR, 0o600)
    _ACTIVE_LOCK_DESCRIPTOR = descriptor
    try:
        os.fchmod(descriptor, 0o600)
        fcntl.flock(descriptor, fcntl.LOCK_EX)
        yield
    finally:
        fcntl.flock(descriptor, fcntl.LOCK_UN)
        os.close(descriptor)
        _ACTIVE_LOCK_DESCRIPTOR = None


def _health(state: ServerState, timeout: float = 0.25) -> bool:
    if not _process_alive(state["pid"]):
        return False
    try:
        with urlopen(
            f"http://127.0.0.1:{state['port']}/health", timeout=timeout
        ) as response:
            payload = json.loads(response.read())
        return (
            response.status == 200
            and payload.get("status") == "ok"
            and payload.get("protocol_version") == PROTOCOL_VERSION
            and state["protocol_version"] == PROTOCOL_VERSION
        )
    except (OSError, ValueError, json.JSONDecodeError):
        return False


def find_server_state() -> ServerState | None:
    state = _read_state()
    if state is not None and _health(state):
        return state
    return None


def find_server_pid() -> int | None:
    state = find_server_state()
    if state is not None:
        return state["pid"]
    if LEGACY_PIDFILE.exists():
        try:
            pid = int(LEGACY_PIDFILE.read_text(encoding="utf-8").strip())
            return pid if _process_alive(pid) else None
        except (OSError, ValueError):
            pass
    return None


def _terminate(pid: int, timeout: float = 3.0) -> None:
    try:
        os.kill(pid, signal.SIGTERM)
    except ProcessLookupError:
        return
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        if not _process_alive(pid):
            return
        time.sleep(0.05)


def _replace_legacy_server() -> None:
    if not LEGACY_PIDFILE.exists():
        return
    try:
        pid = int(LEGACY_PIDFILE.read_text(encoding="utf-8").strip())
    except (OSError, ValueError):
        pid = 0
    if pid > 0 and _process_alive(pid):
        _terminate(pid)
    LEGACY_PIDFILE.unlink(missing_ok=True)


def _daemon_child(state: ServerState) -> None:
    global _ACTIVE_LOCK_DESCRIPTOR
    if _ACTIVE_LOCK_DESCRIPTOR is not None:
        os.close(_ACTIVE_LOCK_DESCRIPTOR)
        _ACTIVE_LOCK_DESCRIPTOR = None
    os.setsid()
    devnull_read = os.open(os.devnull, os.O_RDONLY)
    devnull_write = os.open(os.devnull, os.O_WRONLY)
    os.dup2(devnull_read, 0)
    os.dup2(devnull_write, 1)
    os.dup2(devnull_write, 2)
    os.close(devnull_read)
    os.close(devnull_write)
    try:
        run_server(
            token=state["token"],
            port=state["port"],
            theme=str(CFG["theme"]),
        )
    finally:
        _remove_state_if_owner(os.getpid())


def _spawn_server() -> ServerState:
    token = secrets.token_urlsafe(32)
    pid = os.fork()
    if pid == 0:
        state: ServerState = {
            "pid": os.getpid(),
            "port": PORT,
            "protocol_version": PROTOCOL_VERSION,
            "token": token,
        }
        _daemon_child(state)
        os._exit(0)

    state = {
        "pid": pid,
        "port": PORT,
        "protocol_version": PROTOCOL_VERSION,
        "token": token,
    }
    _write_state(state)
    return state


def ensure_server(timeout: float = 8.0) -> ServerState:
    with _startup_lock():
        state = _read_state()
        if state is not None and _health(state):
            _replace_legacy_server()
            return state
        if state is not None:
            if _process_alive(state["pid"]):
                _terminate(state["pid"])
            STATE_FILE.unlink(missing_ok=True)

        _replace_legacy_server()
        state = _spawn_server()
        deadline = time.monotonic() + timeout
        while time.monotonic() < deadline:
            if _health(state, timeout=0.15):
                return state
            if not _process_alive(state["pid"]):
                break
            time.sleep(0.05)

        if _process_alive(state["pid"]):
            _terminate(state["pid"])
        _remove_state_if_owner(state["pid"])
        raise RuntimeError(f"viewer server did not become ready on port {PORT}")


def stop_server() -> bool:
    with _startup_lock():
        state = _read_state()
        if state is not None:
            if _process_alive(state["pid"]):
                _terminate(state["pid"])
            _remove_state_if_owner(state["pid"])
            return True
        if LEGACY_PIDFILE.exists():
            _replace_legacy_server()
            return True
        return False


def _open_browser(filepath: Path, state: ServerState) -> None:
    query = urlencode({"path": str(filepath), "token": state["token"]})
    url = f"http://127.0.0.1:{state['port']}/view?{query}"
    subprocess.Popen(
        ["open", "-a", str(CFG["browser"]), url],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="Render Markdown in a browser")
    parser.add_argument("file", nargs="?", type=Path, help="Markdown file to render")
    parser.add_argument("--stop", action="store_true", help="Stop the background server")
    parser.add_argument("--status", action="store_true", help="Check if server is running")
    args = parser.parse_args()

    if args.status:
        state = find_server_state()
        if state:
            print(
                f"Server running (pid {state['pid']}) on "
                f"http://127.0.0.1:{state['port']}"
            )
        else:
            print("No server running.")
        return

    if args.stop:
        print("Server stopped." if stop_server() else "No server running.")
        return

    if not args.file:
        parser.error("the following arguments are required: file")

    filepath = args.file.expanduser().resolve()
    if not filepath.is_file():
        print(f"File not found: {filepath}", file=sys.stderr)
        raise SystemExit(1)
    try:
        filepath.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        print(f"File is not UTF-8: {filepath}", file=sys.stderr)
        raise SystemExit(1)

    try:
        state = ensure_server()
    except RuntimeError as error:
        print(str(error), file=sys.stderr)
        raise SystemExit(1) from error
    _open_browser(filepath, state)


if __name__ == "__main__":
    main()

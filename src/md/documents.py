from __future__ import annotations

import asyncio
import os
import stat
import tempfile
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from watchfiles import awatch

from .rendering import render_source, source_revision


Message = dict[str, Any]


def canonical_path(path: Path | str) -> Path:
    return Path(path).expanduser().resolve(strict=False)


def read_source(path: Path) -> str:
    if not path.is_file():
        raise FileNotFoundError(path)
    return path.read_text(encoding="utf-8")


def atomic_write(path: Path, source: str, expected_revision: str) -> None:
    """Atomically replace path, failing if its source changed while staging."""
    before = os.stat(path, follow_symlinks=True)
    if not stat.S_ISREG(before.st_mode):
        raise OSError(f"Not a regular file: {path}")

    current = read_source(path)
    if source_revision(current) != expected_revision:
        raise RevisionConflict(current)

    fd, temporary_name = tempfile.mkstemp(
        prefix=f".{path.name}.md-viewer-", dir=path.parent
    )
    temporary = Path(temporary_name)
    try:
        data = source.encode("utf-8")
        with os.fdopen(fd, "wb") as stream:
            os.fchmod(stream.fileno(), stat.S_IMODE(before.st_mode))
            stream.write(data)
            stream.flush()
            os.fsync(stream.fileno())

        # This is intentionally immediately adjacent to os.replace. External
        # editors do not participate in our lock, so this is the narrowest
        # cooperative process can make the remaining race window.
        current = read_source(path)
        if source_revision(current) != expected_revision:
            raise RevisionConflict(current)
        os.replace(temporary, path)
    finally:
        temporary.unlink(missing_ok=True)


class RevisionConflict(Exception):
    def __init__(self, current_source: str) -> None:
        super().__init__("the file changed while the save was being prepared")
        self.current_source = current_source


@dataclass
class Document:
    path: Path
    source: str
    revision: str
    rendered_html: str
    exists: bool = True
    subscribers: set[asyncio.Queue[Message]] = field(default_factory=set)
    write_lock: asyncio.Lock = field(default_factory=asyncio.Lock)

    @classmethod
    def load(cls, path: Path) -> "Document":
        source = read_source(path)
        return cls(
            path=path,
            source=source,
            revision=source_revision(source),
            rendered_html=render_source(source),
        )

    def snapshot(self, message_type: str = "snapshot") -> Message:
        return {
            "type": message_type,
            "revision": self.revision,
            "source": self.source,
            "rendered_html": self.rendered_html,
            "exists": self.exists,
        }

    def subscribe(self) -> asyncio.Queue[Message]:
        queue: asyncio.Queue[Message] = asyncio.Queue()
        self.subscribers.add(queue)
        return queue

    def unsubscribe(self, queue: asyncio.Queue[Message]) -> None:
        self.subscribers.discard(queue)

    def publish(self, message: Message) -> None:
        for subscriber in tuple(self.subscribers):
            subscriber.put_nowait(message)

    def _set_source(self, source: str, *, exists: bool = True) -> None:
        self.source = source
        self.revision = source_revision(source)
        self.rendered_html = render_source(source)
        self.exists = exists

    async def reconcile_disk(self) -> list[Message]:
        """Reread the canonical path and return changes worth publishing."""
        async with self.write_lock:
            try:
                source = read_source(self.path)
            except FileNotFoundError:
                if not self.exists:
                    return []
                self.exists = False
                return [{"type": "file_state", "state": "missing"}]

            recovered = not self.exists
            disk_revision = source_revision(source)
            if not recovered and disk_revision == self.revision:
                return []

            self._set_source(source)
            changed = self.snapshot("document_changed")
            if recovered:
                recovered_message = self.snapshot()
                recovered_message.update(type="file_state", state="recovered")
                return [
                    recovered_message,
                    changed,
                ]
            return [changed]

    async def save(
        self, *, request_id: str, base_revision: str, source: str
    ) -> tuple[Message, list[Message]]:
        broadcasts: list[Message] = []
        async with self.write_lock:
            if not self.exists:
                return self._rejected(request_id, "file_missing"), broadcasts

            try:
                disk_source = read_source(self.path)
            except FileNotFoundError:
                self.exists = False
                broadcasts.append({"type": "file_state", "state": "missing"})
                return self._rejected(request_id, "file_missing"), broadcasts
            except OSError as error:
                rejected = self._rejected(request_id, "write_failed")
                rejected["message"] = str(error)
                return rejected, broadcasts

            disk_revision = source_revision(disk_source)
            if disk_revision != self.revision:
                self._set_source(disk_source)
                broadcasts.append(self.snapshot("document_changed"))

            if base_revision != self.revision or disk_revision != base_revision:
                return self._rejected(request_id, "stale_revision"), broadcasts

            try:
                atomic_write(self.path, source, expected_revision=base_revision)
            except RevisionConflict as conflict:
                self._set_source(conflict.current_source)
                broadcasts.append(self.snapshot("document_changed"))
                return self._rejected(request_id, "stale_revision"), broadcasts
            except FileNotFoundError:
                self.exists = False
                broadcasts.append({"type": "file_state", "state": "missing"})
                return self._rejected(request_id, "file_missing"), broadcasts
            except OSError as error:
                rejected = self._rejected(request_id, "write_failed")
                rejected["message"] = str(error)
                return rejected, broadcasts

            self._set_source(source)
            canonical = self.snapshot("document_changed")
            broadcasts.append(canonical)
            return (
                {
                    "type": "save_result",
                    "request_id": request_id,
                    "accepted": True,
                    "revision": self.revision,
                    "source": self.source,
                    "rendered_html": self.rendered_html,
                },
                broadcasts,
            )

    def _rejected(self, request_id: str, reason: str) -> Message:
        return {
            "type": "save_result",
            "request_id": request_id,
            "accepted": False,
            "reason": reason,
            "snapshot": self.snapshot(),
        }


@dataclass
class DirectoryWatcher:
    directory: Path
    paths: set[Path] = field(default_factory=set)
    stop_event: asyncio.Event = field(default_factory=asyncio.Event)
    task: asyncio.Task[None] | None = None
    reconcile_task: asyncio.Task[None] | None = None

    @property
    def reference_count(self) -> int:
        return len(self.paths)


class DocumentManager:
    def __init__(self, *, force_polling: bool | None = None) -> None:
        self.documents: dict[Path, Document] = {}
        self.watchers: dict[Path, DirectoryWatcher] = {}
        self.force_polling = force_polling
        self._manager_lock = asyncio.Lock()
        self._closing = False

    async def open(self, path: Path | str) -> Document:
        path = canonical_path(path)
        started_watcher = False
        async with self._manager_lock:
            existing = self.documents.get(path)
            if existing is not None:
                return existing
            document = Document.load(path)
            self.documents[path] = document
            watcher = self.watchers.get(path.parent)
            if watcher is None:
                watcher = DirectoryWatcher(path.parent)
                self.watchers[path.parent] = watcher
                watcher.task = asyncio.create_task(
                    self._watch_directory(watcher),
                    name=f"md-watch:{path.parent}",
                )
                watcher.reconcile_task = asyncio.create_task(
                    self._reconcile_periodically(watcher),
                    name=f"md-reconcile:{path.parent}",
                )
                started_watcher = True
            watcher.paths.add(path)
        if started_watcher:
            # Let awatch construct its native RustNotify subscription before
            # returning the first snapshot; otherwise an immediate save in the
            # same event-loop tick could precede watcher initialization.
            await asyncio.sleep(0.35 if self.force_polling else 0.05)
        return document

    def get(self, path: Path | str) -> Document | None:
        return self.documents.get(canonical_path(path))

    async def _watch_directory(self, watcher: DirectoryWatcher) -> None:
        try:
            async for changes in awatch(
                watcher.directory,
                recursive=False,
                debounce=75,
                step=25,
                force_polling=self.force_polling,
                poll_delay_ms=100,
                stop_event=watcher.stop_event,
            ):
                changed_paths = {
                    canonical_path(filename) for _change, filename in changes
                }
                for path in tuple(watcher.paths.intersection(changed_paths)):
                    document = self.documents.get(path)
                    if document is None:
                        continue
                    for message in await document.reconcile_disk():
                        document.publish(message)
        except asyncio.CancelledError:
            raise
        except Exception:
            # A directory can itself disappear. Existing WebSockets remain
            # usable and saves fail safely; shutdown still completes cleanly.
            for path in tuple(watcher.paths):
                document = self.documents.get(path)
                if document and document.exists:
                    document.exists = False
                    document.publish({"type": "file_state", "state": "missing"})

    async def _reconcile_periodically(self, watcher: DirectoryWatcher) -> None:
        """Hash-check open files as a safety net for coalesced native events."""
        try:
            while not watcher.stop_event.is_set():
                await asyncio.sleep(0.2)
                for path in tuple(watcher.paths):
                    document = self.documents.get(path)
                    if document is None:
                        continue
                    for message in await document.reconcile_disk():
                        document.publish(message)
        except asyncio.CancelledError:
            raise

    async def save(
        self,
        document: Document,
        *,
        request_id: str,
        base_revision: str,
        source: str,
    ) -> Message:
        result, broadcasts = await document.save(
            request_id=request_id,
            base_revision=base_revision,
            source=source,
        )
        for message in broadcasts:
            document.publish(message)
        return result

    async def shutdown(self) -> None:
        if self._closing:
            return
        self._closing = True
        tasks: list[asyncio.Task[None]] = []
        for watcher in self.watchers.values():
            watcher.stop_event.set()
            if watcher.task:
                watcher.task.cancel()
                tasks.append(watcher.task)
            if watcher.reconcile_task:
                watcher.reconcile_task.cancel()
                tasks.append(watcher.reconcile_task)
        if tasks:
            await asyncio.gather(*tasks, return_exceptions=True)
        for document in self.documents.values():
            document.publish({"type": "server_shutdown"})
        self.watchers.clear()
        self.documents.clear()

from __future__ import annotations

import asyncio
import os
import stat
from pathlib import Path

import pytest

from md.documents import Document, DocumentManager, atomic_write
from md.rendering import source_revision


def test_atomic_write_preserves_permissions(tmp_path: Path) -> None:
    path = tmp_path / "document.md"
    path.write_text("old", encoding="utf-8")
    path.chmod(0o640)
    atomic_write(path, "new", source_revision("old"))
    assert path.read_text(encoding="utf-8") == "new"
    assert stat.S_IMODE(path.stat().st_mode) == 0o640
    assert not list(tmp_path.glob(".document.md.md-viewer-*"))


@pytest.mark.asyncio
async def test_stale_save_is_rejected_with_disk_snapshot(tmp_path: Path) -> None:
    path = tmp_path / "document.md"
    path.write_text("base", encoding="utf-8")
    document = Document.load(path)
    base_revision = document.revision
    path.write_text("external", encoding="utf-8")

    result, broadcasts = await document.save(
        request_id="save-1", base_revision=base_revision, source="browser"
    )

    assert result["accepted"] is False
    assert result["reason"] == "stale_revision"
    assert result["snapshot"]["source"] == "external"
    assert broadcasts[-1]["type"] == "document_changed"
    assert path.read_text(encoding="utf-8") == "external"


@pytest.mark.asyncio
async def test_save_lock_serializes_two_browser_writers(tmp_path: Path) -> None:
    path = tmp_path / "document.md"
    path.write_text("base", encoding="utf-8")
    document = Document.load(path)
    base_revision = document.revision

    first, second = await asyncio.gather(
        document.save(request_id="one", base_revision=base_revision, source="one"),
        document.save(request_id="two", base_revision=base_revision, source="two"),
    )
    results = [first[0], second[0]]
    assert sum(result["accepted"] is True for result in results) == 1
    assert sum(result["accepted"] is False for result in results) == 1
    assert path.read_text(encoding="utf-8") in {"one", "two"}


@pytest.mark.asyncio
async def test_missing_and_recovered_transitions(tmp_path: Path) -> None:
    path = tmp_path / "document.md"
    path.write_text("before", encoding="utf-8")
    document = Document.load(path)

    path.unlink()
    assert await document.reconcile_disk() == [{"type": "file_state", "state": "missing"}]
    assert await document.reconcile_disk() == []
    assert document.exists is False

    path.write_text("after", encoding="utf-8")
    messages = await document.reconcile_disk()
    assert [message["type"] for message in messages] == ["file_state", "document_changed"]
    assert messages[0]["state"] == "recovered"
    assert messages[0]["source"] == "after"
    assert document.exists is True


async def next_message(queue: asyncio.Queue[dict], timeout: float = 2.0) -> dict:
    return await asyncio.wait_for(queue.get(), timeout)


@pytest.mark.asyncio
async def test_real_watchfiles_events_and_browser_deduplication(tmp_path: Path) -> None:
    path = tmp_path / "document.md"
    path.write_text("aaaa", encoding="utf-8")
    # The managed test sandbox does not forward macOS FSEvents, so exercise
    # watchfiles' polling backend here. Production leaves force_polling unset
    # and therefore uses native notifications.
    manager = DocumentManager(force_polling=True)
    document = await manager.open(path)
    queue = document.subscribe()
    try:
        await asyncio.sleep(0.5)  # polling-backend baseline scan
        # In-place, same-size edit.
        path.write_text("bbbb", encoding="utf-8")
        changed = await next_message(queue)
        assert changed["type"] == "document_changed"
        assert changed["source"] == "bbbb"

        # Rapid edits settle on the canonical final contents.
        await asyncio.sleep(0.5)  # allow the polling test backend to resume
        path.write_text("rapid-1", encoding="utf-8")
        path.write_text("rapid-2", encoding="utf-8")
        changed = await next_message(queue)
        assert changed["source"] == "rapid-2"

        # Atomic editor replacement.
        await asyncio.sleep(0.5)
        replacement = tmp_path / ".replacement"
        replacement.write_text("atomic", encoding="utf-8")
        os.replace(replacement, path)
        changed = await next_message(queue)
        assert changed["source"] == "atomic"

        # Deletion and recreation keep the original subscription.
        await asyncio.sleep(0.5)
        path.unlink()
        assert (await next_message(queue)) == {"type": "file_state", "state": "missing"}
        await asyncio.sleep(0.5)
        path.write_text("recovered", encoding="utf-8")
        recovered = await next_message(queue)
        changed = await next_message(queue)
        assert recovered["state"] == "recovered"
        assert changed["source"] == "recovered"

        # A browser save broadcasts once. Its watchfiles echo has the same hash.
        result = await manager.save(
            document,
            request_id="browser",
            base_revision=document.revision,
            source="browser-save",
        )
        assert result["accepted"] is True
        assert (await next_message(queue))["source"] == "browser-save"
        await asyncio.sleep(0.3)
        assert queue.empty()
    finally:
        document.unsubscribe(queue)
        await manager.shutdown()

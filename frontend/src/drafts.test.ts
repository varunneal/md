import {describe, expect, it} from "vitest";

import {RECOVERY_MAX_AGE_MS, RecoveryEntry, retainedRecoveryEntries} from "./drafts";

function entry(index: number, timestamp: number): RecoveryEntry {
  return {
    id: String(index),
    path: "/tmp/file.md",
    baseRevision: "base",
    baseSource: "base",
    source: `draft ${index}`,
    diskSource: "disk",
    timestamp,
  };
}

describe("recovery retention", () => {
  it("keeps the newest 20 entries and removes entries older than 30 days", () => {
    const now = 2_000_000_000_000;
    const entries = Array.from({length: 25}, (_, index) => entry(index, now - index * 1000));
    entries.push(entry(99, now - RECOVERY_MAX_AGE_MS - 1));
    const retained = retainedRecoveryEntries(entries, now);
    expect(retained).toHaveLength(20);
    expect(retained.map((item) => item.id)).toEqual(Array.from({length: 20}, (_, index) => String(index)));
  });
});

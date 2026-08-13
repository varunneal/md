export interface ActiveDraft {
  key: string;
  path: string;
  baseRevision: string;
  baseSource: string;
  source: string;
  updatedAt: number;
}

export interface RecoveryEntry {
  id: string;
  path: string;
  baseRevision: string;
  baseSource: string;
  source: string;
  diskSource: string;
  timestamp: number;
}

const DATABASE = "md-viewer-drafts";
const ACTIVE_STORE = "active";
const RECOVERY_STORE = "recovery";
export const MAX_RECOVERIES = 20;
export const RECOVERY_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

let databasePromise: Promise<IDBDatabase> | null = null;

function requestResult<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function transactionDone(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

function openDatabase(): Promise<IDBDatabase> {
  if (databasePromise) return databasePromise;
  databasePromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE, 1);
    request.onupgradeneeded = () => {
      const database = request.result;
      database.createObjectStore(ACTIVE_STORE, {keyPath: "key"});
      const recovery = database.createObjectStore(RECOVERY_STORE, {keyPath: "id"});
      recovery.createIndex("path", "path", {unique: false});
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return databasePromise;
}

export function activeDraftKey(path: string): string {
  return `active:${path}`;
}

export async function getActiveDraft(path: string): Promise<ActiveDraft | undefined> {
  const database = await openDatabase();
  const transaction = database.transaction(ACTIVE_STORE, "readonly");
  return requestResult(transaction.objectStore(ACTIVE_STORE).get(activeDraftKey(path)));
}

export async function putActiveDraft(draft: ActiveDraft): Promise<void> {
  const database = await openDatabase();
  const transaction = database.transaction(ACTIVE_STORE, "readwrite");
  transaction.objectStore(ACTIVE_STORE).put(draft);
  await transactionDone(transaction);
}

export async function deleteActiveDraft(path: string): Promise<void> {
  const database = await openDatabase();
  const transaction = database.transaction(ACTIVE_STORE, "readwrite");
  transaction.objectStore(ACTIVE_STORE).delete(activeDraftKey(path));
  await transactionDone(transaction);
}

export function retainedRecoveryEntries(
  entries: RecoveryEntry[],
  now: number = Date.now(),
): RecoveryEntry[] {
  return entries
    .filter((entry) => now - entry.timestamp <= RECOVERY_MAX_AGE_MS)
    .sort((left, right) => right.timestamp - left.timestamp)
    .slice(0, MAX_RECOVERIES);
}

export async function listRecoveryEntries(path: string): Promise<RecoveryEntry[]> {
  const database = await openDatabase();
  const transaction = database.transaction(RECOVERY_STORE, "readonly");
  const entries = await requestResult(
    transaction.objectStore(RECOVERY_STORE).index("path").getAll(path),
  );
  return retainedRecoveryEntries(entries);
}

export async function pruneRecoveryEntries(path: string): Promise<void> {
  const database = await openDatabase();
  const readTransaction = database.transaction(RECOVERY_STORE, "readonly");
  const entries: RecoveryEntry[] = await requestResult(
    readTransaction.objectStore(RECOVERY_STORE).index("path").getAll(path),
  );
  const keep = new Set(retainedRecoveryEntries(entries).map((entry) => entry.id));
  const remove = entries.filter((entry) => !keep.has(entry.id));
  if (!remove.length) return;
  const writeTransaction = database.transaction(RECOVERY_STORE, "readwrite");
  const store = writeTransaction.objectStore(RECOVERY_STORE);
  for (const entry of remove) store.delete(entry.id);
  await transactionDone(writeTransaction);
}

export async function addRecoveryEntry(entry: RecoveryEntry): Promise<void> {
  const database = await openDatabase();
  const transaction = database.transaction(RECOVERY_STORE, "readwrite");
  transaction.objectStore(RECOVERY_STORE).put(entry);
  await transactionDone(transaction);
  await pruneRecoveryEntries(entry.path);
}

export async function deleteRecoveryEntry(id: string): Promise<void> {
  const database = await openDatabase();
  const transaction = database.transaction(RECOVERY_STORE, "readwrite");
  transaction.objectStore(RECOVERY_STORE).delete(id);
  await transactionDone(transaction);
}

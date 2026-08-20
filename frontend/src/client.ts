import {defaultKeymap, history, historyKeymap} from "@codemirror/commands";
import {markdown} from "@codemirror/lang-markdown";
import {unifiedMergeView} from "@codemirror/merge";
import {EditorState, Extension, Transaction} from "@codemirror/state";
import {EditorView, keymap, lineNumbers} from "@codemirror/view";

import {
  ActiveDraft,
  RecoveryEntry,
  activeDraftKey,
  addRecoveryEntry,
  deleteActiveDraft,
  deleteRecoveryEntry,
  getActiveDraft,
  listRecoveryEntries,
  putActiveDraft,
  pruneRecoveryEntries,
} from "./drafts";
import "./client.css";

declare global {
  interface Window {
    renderMathInElement?: (element: Element, options: unknown) => void;
    Prism?: {highlightAllUnder: (element: Element) => void};
  }
}

interface CanonicalSnapshot {
  revision: string;
  source: string;
  rendered_html: string;
  exists?: boolean;
}

interface Bootstrap extends CanonicalSnapshot {
  path: string;
  token: string;
  protocol_version: number;
  theme: "dark" | "light";
}

interface PendingSave {
  source: string;
  resolve: (accepted: boolean) => void;
}

type ViewMode = "rendered" | "raw" | "edit";

function required<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Missing viewer element: ${selector}`);
  return element;
}

const bootstrap = JSON.parse(required<HTMLScriptElement>("#md-bootstrap").textContent || "{}") as Bootstrap;
const rendered = required<HTMLElement>("#rendered");
const rawView = required<HTMLElement>("#raw-view");
const editorWrap = required<HTMLElement>("#editor-wrap");
const rawButton = required<HTMLButtonElement>("#raw-btn");
const editButton = required<HTMLButtonElement>("#edit-btn");
const doneButton = required<HTMLButtonElement>("#done-btn");
const cancelButton = required<HTMLButtonElement>("#cancel-btn");
const themeButton = required<HTMLButtonElement>("#theme-btn");
const statusElement = required<HTMLElement>("#sync-status");
const noticeElement = required<HTMLElement>("#notice");
const recoveryButton = required<HTMLButtonElement>("#recovery-btn");
const recoveryCount = required<HTMLElement>("#recovery-count");
const recoveryDrawer = required<HTMLElement>("#recovery-drawer");
const recoveryClose = required<HTMLButtonElement>("#recovery-close");
const recoveryList = required<HTMLElement>("#recovery-list");
const recoveryCompare = required<HTMLElement>("#recovery-compare");

let canonicalRevision = bootstrap.revision;
let canonicalSource = bootstrap.source;
let canonicalHtml = bootstrap.rendered_html;
let fileExists = bootstrap.exists !== false;
let viewMode: ViewMode = "rendered";
let editor: EditorView | null = null;
let compareEditor: EditorView | null = null;
let dirty = false;
let replacingEditor = false;
let socket: WebSocket | null = null;
let reconnectAttempt = 0;
let reconnectTimer: number | null = null;
let persistTimer: number | null = null;
let noticeTimer: number | null = null;
let savePromise: Promise<boolean> | null = null;
let inFlightSource: string | null = null;
let messageChain: Promise<void> = Promise.resolve();
const pendingSaves = new Map<string, PendingSave>();
const clientId = crypto.randomUUID();

function setStatus(state: "editing" | "saving" | "saved" | "reconnecting" | "file-missing"): void {
  const label = state === "file-missing" ? "file missing" : state;
  statusElement.textContent = label;
  statusElement.dataset.state = state;
}

function setIdleStatus(): void {
  if (!fileExists) setStatus("file-missing");
  else if (!socket || socket.readyState !== WebSocket.OPEN) setStatus("reconnecting");
  else setStatus(dirty ? "editing" : "saved");
}

function showNotice(message: string): void {
  noticeElement.textContent = message;
  noticeElement.hidden = false;
  if (noticeTimer !== null) window.clearTimeout(noticeTimer);
  noticeTimer = window.setTimeout(() => {
    noticeElement.hidden = true;
  }, 5000);
}

function setViewMode(mode: ViewMode): void {
  viewMode = mode;
  rendered.style.display = mode === "rendered" ? "block" : "none";
  rawView.style.display = mode === "raw" ? "block" : "none";
  editorWrap.style.display = mode === "edit" ? "block" : "none";
  rawButton.hidden = mode === "edit";
  editButton.hidden = mode === "edit";
  doneButton.hidden = mode !== "edit";
  cancelButton.hidden = mode !== "edit";
  rawButton.textContent = mode === "raw" ? "rendered" : "raw";
  if (mode === "edit") setIdleStatus();
}

interface ScrollAnchor {
  index: number;
  text: string;
  top: number;
}

const blockSelector = "h1,h2,h3,h4,h5,h6,p,li,pre,td,blockquote";
const mathDelimiters = [
  {left: "$$", right: "$$", display: true},
  {left: "$", right: "$", display: false},
  {left: "\\(", right: "\\)", display: false},
  {left: "\\begin{equation}", right: "\\end{equation}", display: true},
  {left: "\\begin{equation*}", right: "\\end{equation*}", display: true},
  {left: "\\begin{align}", right: "\\end{align}", display: true},
  {left: "\\begin{align*}", right: "\\end{align*}", display: true},
  {left: "\\begin{alignat}", right: "\\end{alignat}", display: true},
  {left: "\\begin{alignat*}", right: "\\end{alignat*}", display: true},
  {left: "\\begin{gather}", right: "\\end{gather}", display: true},
  {left: "\\begin{gather*}", right: "\\end{gather*}", display: true},
  {left: "\\begin{CD}", right: "\\end{CD}", display: true},
  {left: "\\[", right: "\\]", display: true},
];

function preprocessMath(math: string): string {
  return math.replace(/\\label\s*\{[^{}]*\}/g, "");
}

function captureScrollAnchor(): ScrollAnchor | null {
  if (viewMode !== "rendered") return null;
  const blocks = [...rendered.querySelectorAll<HTMLElement>(blockSelector)];
  const index = blocks.findIndex((block) => block.getBoundingClientRect().bottom > 0);
  if (index < 0) return null;
  const block = blocks[index];
  return {index, text: (block.textContent || "").trim().slice(0, 80), top: block.getBoundingClientRect().top};
}

function restoreScrollAnchor(anchor: ScrollAnchor | null): void {
  if (!anchor) return;
  requestAnimationFrame(() => {
    const blocks = [...rendered.querySelectorAll<HTMLElement>(blockSelector)];
    const matching = blocks.find((block) => (block.textContent || "").trim().startsWith(anchor.text));
    const target = matching || blocks[anchor.index];
    if (target) window.scrollBy(0, target.getBoundingClientRect().top - anchor.top);
  });
}

function enhanceRendered(): void {
  try {
    window.renderMathInElement?.(rendered, {
      delimiters: mathDelimiters,
      preProcess: preprocessMath,
    });
    window.Prism?.highlightAllUnder(rendered);
  } catch (error) {
    console.warn("Markdown enhancement failed", error);
  }
}

function replaceEditorSource(source: string): void {
  if (!editor || editor.state.doc.toString() === source) return;
  replacingEditor = true;
  editor.dispatch({
    changes: {from: 0, to: editor.state.doc.length, insert: source},
    annotations: Transaction.addToHistory.of(false),
  });
  replacingEditor = false;
}

function applyCanonical(snapshot: CanonicalSnapshot, updateEditor: boolean): void {
  const anchor = captureScrollAnchor();
  canonicalRevision = snapshot.revision;
  canonicalSource = snapshot.source;
  canonicalHtml = snapshot.rendered_html;
  if (snapshot.exists !== undefined) fileExists = snapshot.exists;
  rendered.innerHTML = canonicalHtml;
  rawView.textContent = canonicalSource;
  enhanceRendered();
  restoreScrollAnchor(anchor);
  if (updateEditor) replaceEditorSource(canonicalSource);
}

function currentEditorSource(): string {
  return editor?.state.doc.toString() ?? canonicalSource;
}

function editorExtensions(): Extension {
  return [
    lineNumbers(),
    history(),
    markdown(),
    EditorView.lineWrapping,
    keymap.of([
      {
        key: "Mod-s",
        preventDefault: true,
        run: () => {
          void saveNow();
          return true;
        },
      },
      ...defaultKeymap,
      ...historyKeymap,
    ]),
    EditorView.updateListener.of((update) => {
      if (!update.docChanged || replacingEditor) return;
      dirty = update.state.doc.toString() !== canonicalSource;
      setIdleStatus();
      if (dirty) scheduleDraftPersistence();
      else void deleteActiveDraft(bootstrap.path);
    }),
  ];
}

function ensureEditor(source: string = canonicalSource): EditorView {
  if (editor) return editor;
  editor = new EditorView({
    state: EditorState.create({doc: source, extensions: editorExtensions()}),
    parent: editorWrap,
  });
  editor.dom.addEventListener("focusout", () => {
    window.setTimeout(() => {
      if (editor && !editor.hasFocus && dirty) void saveNow();
    }, 0);
  });
  return editor;
}

function enterEdit(source?: string): void {
  const view = ensureEditor(source ?? canonicalSource);
  if (source !== undefined) replaceEditorSource(source);
  setViewMode("edit");
  view.focus();
}

function scheduleDraftPersistence(): void {
  if (persistTimer !== null) window.clearTimeout(persistTimer);
  persistTimer = window.setTimeout(() => void persistDraft(), 250);
}

async function persistDraft(): Promise<void> {
  if (!dirty) return;
  const draft: ActiveDraft = {
    key: activeDraftKey(bootstrap.path),
    path: bootstrap.path,
    baseRevision: canonicalRevision,
    baseSource: canonicalSource,
    source: currentEditorSource(),
    updatedAt: Date.now(),
  };
  await putActiveDraft(draft);
}

async function archiveCurrentDraft(diskSource: string): Promise<void> {
  if (!dirty) return;
  await addRecoveryEntry({
    id: crypto.randomUUID(),
    path: bootstrap.path,
    baseRevision: canonicalRevision,
    baseSource: canonicalSource,
    source: currentEditorSource(),
    diskSource,
    timestamp: Date.now(),
  });
  await deleteActiveDraft(bootstrap.path);
  await updateRecoveryCount();
}

async function reconcileCanonical(snapshot: CanonicalSnapshot): Promise<void> {
  if (!snapshot.revision || typeof snapshot.source !== "string") return;
  if (dirty && snapshot.revision === canonicalRevision) {
    applyCanonical(snapshot, false);
    return;
  }
  if (dirty && inFlightSource !== null && snapshot.source === inFlightSource) {
    applyCanonical(snapshot, false);
    dirty = currentEditorSource() !== snapshot.source;
    if (dirty) await persistDraft();
    else await deleteActiveDraft(bootstrap.path);
    setIdleStatus();
    return;
  }
  if (dirty) {
    await archiveCurrentDraft(snapshot.source);
    applyCanonical(snapshot, true);
    dirty = false;
    showNotice("External changes applied; draft preserved");
  } else {
    applyCanonical(snapshot, true);
  }
  setIdleStatus();
}

function socketUrl(): string {
  const url = new URL("/ws", window.location.href);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.search = new URLSearchParams({
    path: bootstrap.path,
    token: bootstrap.token,
    client_id: clientId,
  }).toString();
  return url.toString();
}

function connect(): void {
  if (reconnectTimer !== null) {
    window.clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
  socket = new WebSocket(socketUrl());
  socket.addEventListener("open", () => {
    reconnectAttempt = 0;
    setIdleStatus();
  });
  socket.addEventListener("message", (event) => {
    messageChain = messageChain
      .then(() => handleMessage(JSON.parse(String(event.data)) as Record<string, unknown>))
      .catch((error) => console.error("Synchronization message failed", error));
  });
  socket.addEventListener("close", () => {
    socket = null;
    if (dirty) void persistDraft();
    for (const pending of pendingSaves.values()) pending.resolve(false);
    pendingSaves.clear();
    inFlightSource = null;
    setStatus(fileExists ? "reconnecting" : "file-missing");
    const delay = Math.min(5000, 250 * 2 ** reconnectAttempt);
    reconnectAttempt = Math.min(reconnectAttempt + 1, 6);
    reconnectTimer = window.setTimeout(connect, delay);
  });
  socket.addEventListener("error", () => socket?.close());
}

async function handleMessage(message: Record<string, unknown>): Promise<void> {
  const type = message.type;
  if (type === "snapshot" || type === "document_changed") {
    await reconcileCanonical(message as unknown as CanonicalSnapshot);
    return;
  }
  if (type === "file_state") {
    if (message.state === "missing") {
      fileExists = false;
      setStatus("file-missing");
    } else if (message.state === "recovered") {
      fileExists = true;
      if (typeof message.revision === "string") {
        await reconcileCanonical(message as unknown as CanonicalSnapshot);
      }
      showNotice("File recovered at its original path");
    }
    return;
  }
  if (type === "save_result") {
    const requestId = String(message.request_id || "");
    const pending = pendingSaves.get(requestId);
    if (!pending) return;
    if (message.accepted === true) {
      await reconcileCanonical(message as unknown as CanonicalSnapshot);
      pending.resolve(true);
    } else {
      const snapshot = message.snapshot as CanonicalSnapshot | undefined;
      if (snapshot) await reconcileCanonical(snapshot);
      if (message.reason === "file_missing") {
        fileExists = false;
        setStatus("file-missing");
      }
      pending.resolve(false);
    }
    pendingSaves.delete(requestId);
    inFlightSource = null;
  }
}

async function saveNow(): Promise<boolean> {
  if (!dirty) return true;
  if (savePromise) return savePromise;
  if (!fileExists || !socket || socket.readyState !== WebSocket.OPEN) {
    await persistDraft();
    setStatus(fileExists ? "reconnecting" : "file-missing");
    return false;
  }

  const source = currentEditorSource();
  const requestId = crypto.randomUUID();
  inFlightSource = source;
  setStatus("saving");
  savePromise = new Promise<boolean>((resolve) => {
    pendingSaves.set(requestId, {source, resolve});
    socket?.send(JSON.stringify({
      type: "save",
      request_id: requestId,
      base_revision: canonicalRevision,
      source,
    }));
  }).finally(() => {
    savePromise = null;
  });
  const accepted = await savePromise;
  setIdleStatus();
  return accepted;
}

async function updateRecoveryCount(): Promise<void> {
  await pruneRecoveryEntries(bootstrap.path);
  const entries = await listRecoveryEntries(bootstrap.path);
  recoveryCount.textContent = entries.length ? String(entries.length) : "";
}

function copyText(text: string): Promise<void> {
  if (navigator.clipboard) return navigator.clipboard.writeText(text);
  const area = document.createElement("textarea");
  area.value = text;
  document.body.append(area);
  area.select();
  document.execCommand("copy");
  area.remove();
  return Promise.resolve();
}

function downloadDraft(entry: RecoveryEntry): void {
  const blob = new Blob([entry.source], {type: "text/markdown;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${bootstrap.path.split("/").pop() || "draft"}.recovered.md`;
  link.click();
  URL.revokeObjectURL(url);
}

function actionButton(label: string, action: () => void | Promise<void>): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.addEventListener("click", () => void action());
  return button;
}

async function selectRecovery(entry: RecoveryEntry): Promise<void> {
  compareEditor?.destroy();
  recoveryCompare.replaceChildren();
  const actions = document.createElement("div");
  actions.className = "recovery-actions";
  actions.append(
    actionButton("Copy Draft", async () => {
      await copyText(entry.source);
      showNotice("Draft copied");
    }),
    actionButton("Download Draft", () => downloadDraft(entry)),
    actionButton("Restore to Editor", async () => {
      if (!window.confirm("Restore this draft against the current disk revision? It will not be written until you save.")) return;
      recoveryDrawer.hidden = true;
      enterEdit(entry.source);
      dirty = entry.source !== canonicalSource;
      setStatus(dirty ? "editing" : "saved");
      if (dirty) await persistDraft();
    }),
    actionButton("Delete Draft", async () => {
      await deleteRecoveryEntry(entry.id);
      compareEditor?.destroy();
      compareEditor = null;
      recoveryCompare.replaceChildren();
      await renderRecoveryDrawer();
      await updateRecoveryCount();
    }),
  );
  recoveryCompare.append(actions);
  const mergeHost = document.createElement("div");
  recoveryCompare.append(mergeHost);
  compareEditor = new EditorView({
    state: EditorState.create({
      doc: entry.source,
      extensions: [
        markdown(),
        EditorView.lineWrapping,
        EditorState.readOnly.of(true),
        EditorView.editable.of(false),
        unifiedMergeView({original: canonicalSource, mergeControls: false}),
      ],
    }),
    parent: mergeHost,
  });
}

async function renderRecoveryDrawer(): Promise<void> {
  const entries = await listRecoveryEntries(bootstrap.path);
  recoveryList.replaceChildren();
  if (!entries.length) {
    const empty = document.createElement("p");
    empty.className = "recovery-empty";
    empty.textContent = "No recovered drafts for this file.";
    recoveryList.append(empty);
    return;
  }
  for (const entry of entries) {
    const row = document.createElement("div");
    row.className = "recovery-entry";
    const description = document.createElement("span");
    description.textContent = new Date(entry.timestamp).toLocaleString();
    const compare = actionButton("Compare", () => selectRecovery(entry));
    row.append(description, compare);
    recoveryList.append(row);
  }
}

async function restoreCrashDraft(): Promise<void> {
  const active = await getActiveDraft(bootstrap.path);
  if (!active || active.source === canonicalSource) {
    if (active) await deleteActiveDraft(bootstrap.path);
    return;
  }
  if (active.baseRevision === canonicalRevision) {
    enterEdit(active.source);
    dirty = true;
    setStatus("editing");
    showNotice("Unsaved draft restored");
    return;
  }
  await addRecoveryEntry({
    id: crypto.randomUUID(),
    path: bootstrap.path,
    baseRevision: active.baseRevision,
    baseSource: active.baseSource,
    source: active.source,
    diskSource: canonicalSource,
    timestamp: active.updatedAt,
  });
  await deleteActiveDraft(bootstrap.path);
  showNotice("External changes applied; draft preserved");
}

rawButton.addEventListener("click", () => setViewMode(viewMode === "raw" ? "rendered" : "raw"));
editButton.addEventListener("click", () => enterEdit());
doneButton.addEventListener("click", async () => {
  if (!(await saveNow())) return;
  if (dirty && !(await saveNow())) return;
  setViewMode("rendered");
});
cancelButton.addEventListener("click", async () => {
  if (dirty && !window.confirm("Discard the active draft? Archived recovery drafts are unaffected.")) return;
  replaceEditorSource(canonicalSource);
  dirty = false;
  await deleteActiveDraft(bootstrap.path);
  setViewMode("rendered");
});
themeButton.addEventListener("click", () => {
  const html = document.documentElement;
  const theme = html.dataset.theme === "dark" ? "light" : "dark";
  html.dataset.theme = theme;
  themeButton.textContent = theme === "dark" ? "light" : "dark";
  localStorage.setItem("md-theme", theme);
});
recoveryButton.addEventListener("click", async () => {
  recoveryDrawer.hidden = false;
  await renderRecoveryDrawer();
});
recoveryClose.addEventListener("click", () => {
  recoveryDrawer.hidden = true;
  compareEditor?.destroy();
  compareEditor = null;
  recoveryCompare.replaceChildren();
});
rendered.addEventListener("dblclick", () => enterEdit());
document.addEventListener("keydown", (event) => {
  if (event.metaKey || event.ctrlKey || event.altKey || editor?.hasFocus) return;
  if (event.key === "e" && viewMode !== "edit") {
    event.preventDefault();
    enterEdit();
  }
});

const savedTheme = localStorage.getItem("md-theme");
if (savedTheme === "dark" || savedTheme === "light") {
  document.documentElement.dataset.theme = savedTheme;
  themeButton.textContent = savedTheme === "dark" ? "light" : "dark";
}
rawView.textContent = canonicalSource;
window.addEventListener("load", enhanceRendered);
window.addEventListener("offline", () => {
  if (dirty) void persistDraft();
  setStatus(fileExists ? "reconnecting" : "file-missing");
  socket?.close();
});

void (async () => {
  await pruneRecoveryEntries(bootstrap.path);
  await restoreCrashDraft();
  await updateRecoveryCount();
  connect();
})();

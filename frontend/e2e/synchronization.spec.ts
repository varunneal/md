import {expect, Page, test} from "@playwright/test";
import {mkdtemp, readFile, rm, unlink, writeFile} from "node:fs/promises";
import {tmpdir} from "node:os";
import {join} from "node:path";

const TOKEN = "playwright-token";
let folder: string;

test.beforeEach(async () => {
  folder = await mkdtemp(join(tmpdir(), "md-viewer-e2e-"));
});

test.afterEach(async () => {
  await rm(folder, {recursive: true, force: true});
});

async function openDocument(page: Page, source: string): Promise<string> {
  const path = join(folder, "document.md");
  await writeFile(path, source, "utf8");
  const query = new URLSearchParams({path, token: TOKEN});
  await page.goto(`/view?${query}`);
  await expect(page.locator("#sync-status")).toHaveText("saved");
  return path;
}

async function enterSource(page: Page, source: string): Promise<void> {
  await page.locator("#edit-btn").click();
  const editor = page.locator(".cm-content").first();
  await editor.click();
  await page.keyboard.press("Meta+A");
  await page.keyboard.insertText(source);
  await expect(page.locator("#sync-status")).toHaveText("editing");
}

test("external saves update rendered, raw, and clean editor views without navigation", async ({page}) => {
  const path = await openDocument(page, "# Before\n\nold");
  await writeFile(path, "# After\n\nnew", "utf8");
  await expect(page.locator("#rendered")).toContainText("After", {timeout: 1000});
  expect(await page.evaluate(() => performance.getEntriesByType("navigation").length)).toBe(1);

  await page.locator("#raw-btn").click();
  await expect(page.locator("#raw-view")).toContainText("# After");
  await page.locator("#raw-btn").click();
  await page.locator("#edit-btn").click();
  await expect(page.locator(".cm-content").first()).toContainText("# After");

  await writeFile(path, "# Clean editor update\n\nlatest", "utf8");
  await expect(page.locator(".cm-content").first()).toContainText("Clean editor update", {timeout: 1000});
});

test("live rendering reruns KaTeX and Prism and preserves theme and view", async ({page}) => {
  const path = await openDocument(page, "# Initial");
  await page.locator("#theme-btn").click();
  await page.locator("#raw-btn").click();
  await writeFile(path, "Math: $x^2$\n\n```js\nconst value = 1;\n```", "utf8");
  await expect(page.locator("#raw-view")).toContainText("const value", {timeout: 1000});
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.locator("#raw-btn").click();
  await expect(page.locator("#rendered .katex")).toBeVisible({timeout: 5000});
  await expect(page.locator("#rendered code .token").first()).toBeVisible({timeout: 5000});
});

test("reading position survives a rendered live update", async ({page}) => {
  const paragraphs = Array.from({length: 80}, (_, index) => `## Section ${index}\n\nParagraph ${index}.`).join("\n\n");
  const path = await openDocument(page, paragraphs);
  const anchor = page.getByRole("heading", {name: "Section 40"});
  await anchor.scrollIntoViewIfNeeded();
  const before = await anchor.evaluate((element) => element.getBoundingClientRect().top);
  await writeFile(path, `${paragraphs}\n\nupdated tail`, "utf8");
  await expect(page.locator("#rendered")).toContainText("updated tail", {timeout: 1000});
  const after = await page.getByRole("heading", {name: "Section 40"}).evaluate((element) => element.getBoundingClientRect().top);
  expect(Math.abs(after - before)).toBeLessThan(5);
});

test("blur and Cmd-S save edits to disk", async ({page}) => {
  const path = await openDocument(page, "before");
  await enterSource(page, "saved on blur");
  await page.locator("#sync-status").click();
  await expect.poll(() => readFile(path, "utf8"), {timeout: 1000}).toBe("saved on blur");

  const editor = page.locator(".cm-content").first();
  await editor.click();
  await page.keyboard.press("Meta+A");
  await page.keyboard.insertText("saved by command");
  await page.keyboard.press("Meta+s");
  await expect.poll(() => readFile(path, "utf8"), {timeout: 1000}).toBe("saved by command");
  await expect(page.locator("#editor-wrap")).toBeVisible();
});

test("a dirty draft is archived and reset when disk changes", async ({page}) => {
  const path = await openDocument(page, "base");
  await enterSource(page, "unsaved browser draft");
  await writeFile(path, "external disk", "utf8");
  await expect(page.locator("#notice")).toContainText("draft preserved", {timeout: 1000});
  await expect(page.locator(".cm-content").first()).toContainText("external disk");
  await expect(page.locator("#recovery-count")).toHaveText("1");
});

test("recovery compare, copy, download, restore, and delete work", async ({page}) => {
  const path = await openDocument(page, "base");
  await enterSource(page, "valuable draft");
  await writeFile(path, "new disk", "utf8");
  await expect(page.locator("#recovery-count")).toHaveText("1", {timeout: 1000});
  await page.locator("#recovery-btn").click();
  await page.getByRole("button", {name: "Compare"}).click();
  await expect(page.locator("#recovery-compare .cm-content")).toContainText("valuable draft");
  await page.getByRole("button", {name: "Copy Draft"}).click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe("valuable draft");
  const download = page.waitForEvent("download");
  await page.getByRole("button", {name: "Download Draft"}).click();
  expect((await download).suggestedFilename()).toContain("recovered.md");
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", {name: "Restore to Editor"}).click();
  await expect(page.locator(".cm-content").first()).toContainText("valuable draft");
  expect(await readFile(path, "utf8")).toBe("new disk");

  await page.locator("#recovery-btn").click();
  await page.getByRole("button", {name: "Compare"}).click();
  await page.getByRole("button", {name: "Delete Draft"}).click();
  await expect(page.locator("#recovery-count")).toHaveText("");
});

test("two dirty tabs cannot silently overwrite each other", async ({context, page}) => {
  const path = await openDocument(page, "base");
  const query = new URLSearchParams({path, token: TOKEN});
  const second = await context.newPage();
  await second.goto(`/view?${query}`);
  await expect(second.locator("#sync-status")).toHaveText("saved");
  await enterSource(page, "first tab");
  await enterSource(second, "second tab draft");
  await page.locator(".cm-content").first().click();
  await page.keyboard.press("Meta+s");
  await expect.poll(() => readFile(path, "utf8"), {timeout: 1000}).toBe("first tab");
  await expect(second.locator("#notice")).toContainText("draft preserved", {timeout: 1000});
  await expect(second.locator("#recovery-count")).toHaveText("1");
});

test("missing files recover at the same path", async ({page}) => {
  const path = await openDocument(page, "present");
  await unlink(path);
  await expect(page.locator("#sync-status")).toHaveText("file missing", {timeout: 1000});
  await writeFile(path, "recreated", "utf8");
  await expect(page.locator("#rendered")).toContainText("recreated", {timeout: 1000});
  await expect(page.locator("#sync-status")).toHaveText("saved");
});

test("disconnect preserves a draft and reconnect applies newer disk", async ({context, page}) => {
  const path = await openDocument(page, "base");
  await enterSource(page, "offline draft");
  await context.setOffline(true);
  await expect(page.locator("#sync-status")).toHaveText("reconnecting");
  await writeFile(path, "new disk while offline", "utf8");
  await context.setOffline(false);
  await expect(page.locator("#notice")).toContainText("draft preserved", {timeout: 5000});
  await expect(page.locator(".cm-content").first()).toContainText("new disk while offline");
  await expect(page.locator("#recovery-count")).toHaveText("1");
});

import {defineConfig} from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 20_000,
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:54329",
    channel: "chrome",
    permissions: ["clipboard-read", "clipboard-write"],
  },
  webServer: {
    command: "../.venv/bin/python -c \"from md.server import run_server; run_server(token='playwright-token', port=54329, theme='dark')\"",
    cwd: ".",
    url: "http://127.0.0.1:54329/health",
    reuseExistingServer: false,
    timeout: 10_000,
  },
});

import { defineConfig } from "@playwright/test";

const BUILD_COMMAND =
  "npx quartz build -d content -o public/content && cp index.html public/ && cp robots.txt public/ && cp public/content/404.html public/404.html";
const SERVE_COMMAND = "npx serve public -l 8080 --no-request-logging";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["github"], ["html"]] : "html",
  use: {
    baseURL: "http://localhost:8080",
    trace: "on-first-retry",
    // Escape hatch for environments with a pre-installed Chromium (unset in CI)
    ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH && {
      launchOptions: {
        executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
      },
    }),
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
  webServer: {
    // In CI the site is built once by the `build` job and unpacked into public/ before
    // Playwright runs, so the server only has to serve it. Locally, build the full site
    // (Quartz + root pages) first — that mirrors production.
    command: process.env.CI
      ? SERVE_COMMAND
      : `${BUILD_COMMAND} && ${SERVE_COMMAND}`,
    url: "http://localhost:8080",
    reuseExistingServer: !process.env.CI,
    // A cold Quartz build of the whole vault takes several minutes on a slow machine
    timeout: process.env.CI ? 60_000 : 600_000,
  },
});

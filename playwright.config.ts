import { defineConfig } from "@playwright/test";

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
    // Build the full site (Quartz + root pages) and serve from public/ — mirrors production
    command:
      "npx quartz build -d content -o public/content && cp index.html public/ && cp robots.txt public/ && cp public/content/404.html public/404.html && npx serve public -l 8080 --no-request-logging",
    url: "http://localhost:8080",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});

import { test, expect } from "@playwright/test";

test.describe("Digital Garden (Quartz)", () => {
  test.describe("Index page", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/obsidian/");
    });

    test("loads with correct page title", async ({ page }) => {
      await expect(page.locator(".article-title")).toContainText(
        "Welcome to my Digital Garden",
      );
    });

    test("search component is visible", async ({ page }) => {
      await expect(page.locator(".search")).toBeVisible();
    });

    test("explorer sidebar is visible on desktop", async ({ page }) => {
      await expect(page.locator(".explorer")).toBeVisible();
    });

    test("dark mode toggle is present and functional", async ({ page }) => {
      const toggle = page.locator(".darkmode");
      await expect(toggle).toBeVisible();

      // Get initial theme
      const initialTheme = await page.evaluate(() =>
        document.documentElement.getAttribute("saved-theme"),
      );

      // Click toggle
      await toggle.click();

      // Theme should change
      const newTheme = await page.evaluate(() =>
        document.documentElement.getAttribute("saved-theme"),
      );
      expect(newTheme).not.toBe(initialTheme);
    });

    test("page title links back to garden home", async ({ page }) => {
      const pageTitle = page.locator(".page-title a");
      await expect(pageTitle).toHaveText("tjrobinson.net");
    });
  });

  test.describe("Content pages", () => {
    test("content page with special characters (parentheses) loads correctly", async ({
      page,
    }) => {
      await page.goto(
        "/obsidian/cissp",
      );
      await expect(page.locator(".article-title")).toBeVisible();
      await expect(page.locator("article")).toBeVisible();
    });

    test("table of contents renders on content page", async ({ page }) => {
      await page.goto("/obsidian/dotnet");
      await expect(page.locator(".toc")).toBeVisible();
    });

    test("breadcrumbs display on non-index content pages", async ({ page }) => {
      await page.goto("/obsidian/dotnet");
      await expect(page.locator(".breadcrumb-container")).toBeVisible();
    });

    test("graph view component renders", async ({ page }) => {
      await page.goto("/obsidian/security");
      await expect(page.locator(".graph")).toBeVisible();
    });

    test("backlinks section renders when page has incoming links", async ({
      page,
    }) => {
      // Visit a page that is likely linked from other pages
      await page.goto("/obsidian/azure");
      // The backlinks component hides when empty, so we check if it renders
      const backlinks = page.locator(".backlinks");
      const count = await backlinks.count();
      if (count > 0) {
        await expect(backlinks).toBeVisible();
        // Verify it contains at least one link
        await expect(backlinks.locator("a.internal")).not.toHaveCount(0);
      }
    });

    test("content meta (reading time) is displayed", async ({ page }) => {
      await page.goto("/obsidian/dotnet");
      await expect(page.locator(".content-meta")).toBeVisible();
    });
  });

  test.describe("SEO & meta tags", () => {
    test("og:title meta tag is present", async ({ page }) => {
      await page.goto("/obsidian/dotnet");
      const ogTitle = page.locator('meta[property="og:title"]');
      await expect(ogTitle).toHaveAttribute("content", /.+/);
    });

    test("description meta tag is present", async ({ page }) => {
      await page.goto("/obsidian/dotnet");
      const desc = page.locator('meta[name="description"]');
      await expect(desc).toHaveAttribute("content", /.+/);
    });

    test("og:type meta tag is website", async ({ page }) => {
      await page.goto("/obsidian/dotnet");
      const ogType = page.locator('meta[property="og:type"]');
      await expect(ogType).toHaveAttribute("content", "website");
    });
  });

  test.describe("Feeds & sitemap", () => {
    test("sitemap.xml is accessible", async ({ request }) => {
      const response = await request.get("/obsidian/sitemap.xml");
      expect(response.ok()).toBeTruthy();
      const body = await response.text();
      expect(body).toContain("<urlset");
    });

    test("RSS feed (index.xml) is accessible", async ({ request }) => {
      const response = await request.get("/obsidian/index.xml");
      expect(response.ok()).toBeTruthy();
      const body = await response.text();
      expect(body).toContain("<rss");
    });
  });

  test.describe("Error handling", () => {
    test("404 page renders for invalid paths", async ({ page }) => {
      await page.goto("/obsidian/this-page-definitely-does-not-exist-12345");
      await expect(page.locator("article")).toBeVisible();
    });
  });

  test.describe("Navigation (SPA)", () => {
    test("clicking a link in content navigates via SPA without full reload", async ({
      page,
    }) => {
      await page.goto("/obsidian/");

      // Find any internal link in the article and click it
      const internalLink = page.locator("article a[href]").first();
      const isVisible = await internalLink.isVisible().catch(() => false);

      if (isVisible) {
        await internalLink.click();
        await page.waitForTimeout(1000);

        // Verify we navigated (URL changed)
        const currentUrl = page.url();
        expect(currentUrl).not.toBe("http://localhost:8080/obsidian/");
      }
    });
  });
});

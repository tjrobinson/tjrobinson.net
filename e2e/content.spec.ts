import { test, expect } from "@playwright/test";

test.describe("Content (Quartz)", () => {
  test.describe("Index page", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/content/");
    });

    test("loads with correct page title", async ({ page }) => {
      await expect(page.locator(".article-title")).toContainText(
        "Welcome to my Content",
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

    test("page title links back to content home", async ({ page }) => {
      const pageTitle = page.locator(".page-title a");
      await expect(pageTitle).toHaveText("tjrobinson.net");
    });
  });

  test.describe("Content pages", () => {
    test("content page with special characters (parentheses) loads correctly", async ({
      page,
    }) => {
      await page.goto("/content/cissp");
      await expect(page.locator(".article-title")).toBeVisible();
      await expect(page.locator("article").first()).toBeVisible();
    });

    test("table of contents renders on content page", async ({ page }) => {
      await page.goto("/content/dotnet");
      await expect(page.locator(".toc")).toBeVisible();
    });

    test("breadcrumbs display on non-index content pages", async ({ page }) => {
      await page.goto("/content/dotnet");
      await expect(page.locator(".breadcrumb-container")).toBeVisible();
    });

    test("graph view component renders on a page with links", async ({
      page,
    }) => {
      await page.goto("/content/security");
      await expect(page.locator(".graph")).toBeVisible();
    });

    test("graph view is hidden on a page with no links", async ({ page }) => {
      // Local customisation in quartz/components/Graph.tsx: the graph is not
      // rendered at all when a page has no incoming or outgoing links.
      await page.goto("/content/jquery-and-swfobject");
      await expect(page.locator("article").first()).toBeVisible();
      await expect(page.locator(".graph")).toHaveCount(0);
    });

    test("backlinks section renders when page has incoming links", async ({
      page,
    }) => {
      // azure-devops is linked from several other notes
      await page.goto("/content/azure-devops");
      const backlinks = page.locator(".backlinks");
      await expect(backlinks).toBeVisible();
      await expect(backlinks.locator("a.internal")).not.toHaveCount(0);
    });

    test("content meta (reading time) is displayed", async ({ page }) => {
      await page.goto("/content/dotnet");
      await expect(page.locator(".content-meta")).toBeVisible();
    });
  });

  test.describe("SEO & meta tags", () => {
    test("og:title meta tag is present", async ({ page }) => {
      await page.goto("/content/dotnet");
      const ogTitle = page.locator('meta[property="og:title"]');
      await expect(ogTitle).toHaveAttribute("content", /.+/);
    });

    test("description meta tag is present", async ({ page }) => {
      await page.goto("/content/dotnet");
      const desc = page.locator('meta[name="description"]');
      await expect(desc).toHaveAttribute("content", /.+/);
    });

    test("og:type meta tag is website", async ({ page }) => {
      await page.goto("/content/dotnet");
      const ogType = page.locator('meta[property="og:type"]');
      await expect(ogType).toHaveAttribute("content", "website");
    });
  });

  test.describe("Feeds & sitemap", () => {
    test("sitemap.xml is accessible", async ({ request }) => {
      const response = await request.get("/content/sitemap.xml");
      expect(response.ok()).toBeTruthy();
      const body = await response.text();
      expect(body).toContain("<urlset");
    });

    test("RSS feed (index.xml) is accessible", async ({ request }) => {
      const response = await request.get("/content/index.xml");
      expect(response.ok()).toBeTruthy();
      const body = await response.text();
      expect(body).toContain("<rss");
    });
  });

  test.describe("Redirects (permalinks)", () => {
    test("original slug redirects to the permalink slug", async ({ page }) => {
      // The CISSP note sets `permalink: cissp` in its frontmatter; the local
      // customisation in quartz/plugins/transformers/frontmatter.ts makes the
      // permalink canonical and emits a redirect page at the original slug.
      await page.goto(
        "/content/cissp-(isc2-certified-information-systems-security-professional)-resources",
      );
      await page.waitForURL(/\/content\/cissp$/);
      await expect(page.locator(".article-title")).toBeVisible();
    });

    test("redirect page declares the permalink as canonical", async ({
      request,
    }) => {
      const response = await request.get(
        "/content/cissp-(isc2-certified-information-systems-security-professional)-resources",
      );
      expect(response.ok()).toBeTruthy();
      const html = await response.text();
      expect(html).toContain('rel="canonical"');
      expect(html).toContain("cissp");
    });
  });

  test.describe("Error handling", () => {
    test("invalid paths return HTTP 404 with the 404 page", async ({
      page,
    }) => {
      const response = await page.goto(
        "/content/this-page-definitely-does-not-exist-12345",
      );
      expect(response?.status()).toBe(404);
      await expect(page.locator("article").first()).toBeVisible();
    });
  });

  test.describe("Navigation (SPA)", () => {
    test("clicking a link in content navigates via SPA", async ({ page }) => {
      // dotnet has several internal links in its article body
      await page.goto("/content/dotnet");

      const internalLink = page.locator("article a.internal").first();
      await expect(internalLink).toBeVisible();
      const href = await internalLink.getAttribute("href");
      expect(href).toBeTruthy();

      await internalLink.click();
      await page.waitForURL((url) => !url.pathname.endsWith("/dotnet"));
      await expect(page.locator(".article-title")).toBeVisible();
    });
  });

  test.describe("Runtime health", () => {
    test("pages load without uncaught errors or CSP violations", async ({
      page,
    }) => {
      const problems: string[] = [];
      page.on("pageerror", (error) => {
        problems.push(`pageerror: ${error.message}`);
      });
      page.on("console", (message) => {
        if (message.text().includes("Content Security Policy")) {
          problems.push(`csp: ${message.text()}`);
        }
      });

      for (const path of ["/content/", "/content/dotnet"]) {
        await page.goto(path);
        await page.waitForLoadState("load");
      }

      expect(problems, problems.join("\n")).toEqual([]);
    });
  });
});

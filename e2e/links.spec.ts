import { test, expect, APIRequestContext } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PROD_BASE = "https://www.tjrobinson.net";
const LOCAL_BASE = "http://localhost:8080";

// Site output as built by the Playwright webServer command
const PUBLIC_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
);

// Dangling Obsidian wikilinks: notes that are linked from the vault but do not
// exist (yet). Quartz still renders them as internal links, so they 404 on the
// live site. Either create the notes or unlink them, then remove them here.
const KNOWN_DANGLING_LINKS = new Set([
  "/content/api-security", // [[API Security]] in APIs.md
  "/content/comptia-security+", // [[CompTIA Security+]] in Security.md
]);

// Hosts like GitHub Pages treat "+" literally, but the local `serve` used by
// this test decodes it as a space — encode it so both agree on the target.
function encodePath(p: string): string {
  return p.replace(/\+/g, "%2B");
}

// The URL a built HTML file is served at, which is also the base its relative
// links were emitted for: blog/index.html -> /blog/, dotnet.html -> /dotnet
function urlPathForFile(relativeFilePath: string): string {
  const urlPath = "/" + relativeFilePath.split(path.sep).join("/");
  if (urlPath.endsWith("/index.html")) {
    return urlPath.slice(0, -"index.html".length);
  }
  return urlPath.replace(/\.html$/, "");
}

function builtHtmlFiles(): string[] {
  return fs
    .readdirSync(PUBLIC_DIR, { recursive: true, encoding: "utf-8" })
    .filter((f) => f.endsWith(".html"));
}

async function getSitemapPaths(request: APIRequestContext): Promise<string[]> {
  const response = await request.get("/content/sitemap.xml");
  expect(response.ok()).toBeTruthy();
  const xml = await response.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  expect(locs.length).toBeGreaterThan(0);
  return locs.map((loc) => new URL(loc).pathname);
}

test.describe("Site integrity", () => {
  test("sitemap URLs point at the production base URL", async ({ request }) => {
    const response = await request.get("/content/sitemap.xml");
    const xml = await response.text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs.length).toBeGreaterThan(0);
    for (const loc of locs) {
      expect(loc, `sitemap entry ${loc}`).toContain(PROD_BASE);
    }
  });

  test("sitemap URLs are all lowercase", async ({ request }) => {
    // Slugs are lowercased (local customisation in quartz/util/path.ts), and
    // GitHub Pages is case-sensitive — a mixed-case sitemap entry would 404.
    const paths = await getSitemapPaths(request);
    for (const p of paths) {
      const decoded = decodeURIComponent(p);
      expect(decoded, `sitemap entry ${p}`).toBe(decoded.toLowerCase());
    }
  });

  test("every sitemap URL resolves with HTTP 200", async ({ request }) => {
    test.setTimeout(120_000);
    const paths = await getSitemapPaths(request);
    const broken: string[] = [];
    for (const p of paths) {
      const response = await request.get(encodePath(p));
      if (response.status() !== 200) {
        broken.push(`${p} -> ${response.status()}`);
      }
    }
    expect(broken, `broken sitemap URLs:\n${broken.join("\n")}`).toEqual([]);
  });

  test("every internal link on every built page resolves", async ({
    request,
  }) => {
    test.setTimeout(240_000);
    const files = builtHtmlFiles();
    expect(files.length).toBeGreaterThan(0);

    // Collect internal link targets from every built page, then check each once.
    const targets = new Map<string, string>(); // target path -> first page it appears on
    for (const file of files) {
      const pagePath = urlPathForFile(file);
      const html = fs.readFileSync(path.join(PUBLIC_DIR, file), "utf-8");
      const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
      for (const href of hrefs) {
        // Skip anything with a scheme (https:, mailto:, etc.) or protocol-relative
        if (/^([a-z][a-z0-9+.-]*:|\/\/)/i.test(href)) continue;
        const resolved = new URL(href, `${LOCAL_BASE}${pagePath}`);
        if (resolved.pathname === pagePath || resolved.pathname === "")
          continue;
        if (KNOWN_DANGLING_LINKS.has(resolved.pathname)) continue;
        if (!targets.has(resolved.pathname)) {
          targets.set(resolved.pathname, pagePath);
        }
      }
    }
    expect(targets.size).toBeGreaterThan(0);

    const broken: string[] = [];
    for (const [target, from] of targets) {
      const response = await request.get(encodePath(target));
      if (response.status() !== 200) {
        broken.push(`${target} (linked from ${from}) -> ${response.status()}`);
      }
    }
    expect(broken, `broken internal links:\n${broken.join("\n")}`).toEqual([]);
  });
});

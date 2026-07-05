#!/usr/bin/env tsx
// Fetches bookmarks.json from the private tjrobinson/raindrop-automation repo via the
// GitHub contents API and writes it to data/bookmarks.json (gitignored) for the site
// build to consume. Auth: BOOKMARKS_GITHUB_TOKEN env var (CI), falling back to the
// local `gh` CLI token. Exits non-zero on any failure so builds fail loudly.

import { execFileSync } from "child_process";
import { mkdirSync, writeFileSync } from "fs";
import path from "path";

const REPO = "tjrobinson/raindrop-automation";
const API_URL = `https://api.github.com/repos/${REPO}/contents/bookmarks.json?ref=main`;
const OUTPUT_PATH = path.join(process.cwd(), "data", "bookmarks.json");

function resolveToken(): string {
  const envToken = process.env.BOOKMARKS_GITHUB_TOKEN?.trim();
  if (envToken) return envToken;
  try {
    const ghToken = execFileSync("gh", ["auth", "token"], {
      encoding: "utf-8",
      // Fixed, root-owned directories only, so `gh` can't be shadowed via a
      // writable PATH entry (SonarCloud S4036).
      env: {
        ...process.env,
        PATH: "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin",
      },
    }).trim();
    if (ghToken) return ghToken;
  } catch {
    // fall through to the error below
  }
  console.error(
    "fetch-bookmarks: no GitHub token available. Set BOOKMARKS_GITHUB_TOKEN or run `gh auth login`.",
  );
  process.exit(1);
}

async function main() {
  const token = resolveToken();
  const response = await fetch(API_URL, {
    headers: {
      // The raw media type is required: the contents API only serves files
      // between 1 and 100 MB as raw content, and bookmarks.json is multi-MB.
      Accept: "application/vnd.github.raw+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(
      `fetch-bookmarks: GitHub API returned ${response.status} for ${REPO}.`,
    );
    if (response.status === 404) {
      console.error(
        "fetch-bookmarks: a 404 usually means the token lacks access — check the PAT has read-only Contents permission on tjrobinson/raindrop-automation.",
      );
    }
    // JSON.stringify escapes control characters so the response can't forge log lines
    console.error(JSON.stringify(body.slice(0, 500)));
    process.exit(1);
  }

  const raw = await response.text();
  let data: { date?: string; collections?: { bookmarks?: unknown[] }[] };
  try {
    data = JSON.parse(raw);
  } catch {
    console.error("fetch-bookmarks: response was not valid JSON.");
    process.exit(1);
  }
  if (!Array.isArray(data.collections)) {
    console.error(
      "fetch-bookmarks: unexpected JSON shape — missing collections array.",
    );
    process.exit(1);
  }

  mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, raw);
  const count = data.collections.reduce(
    (n, c) => n + (c.bookmarks?.length ?? 0),
    0,
  );
  // Re-parse the snapshot date so the logged value can't carry control characters
  const snapshotMs = Date.parse(data.date ?? "");
  const snapshot = Number.isNaN(snapshotMs)
    ? "unknown"
    : new Date(snapshotMs).toISOString();
  console.log(
    `fetch-bookmarks: wrote ${count} bookmarks (snapshot ${snapshot}) to ${path.relative(process.cwd(), OUTPUT_PATH)}`,
  );
}

main().catch((err) => {
  console.error(`fetch-bookmarks: ${err instanceof Error ? err.message : err}`);
  process.exit(1);
});

#!/usr/bin/env tsx
// Scans content/ for formatting issues that are cheap to detect mechanically:
// reversed markdown links, empty headers, and empty/stub pages.
// Intentionally warns rather than throws — see npm script `lint:content`.

import { readdirSync, readFileSync, statSync } from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");
const STUB_WORD_THRESHOLD = 5;

type Issue = { file: string; message: string };

function walk(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return entry.name.endsWith(".md") ? [fullPath] : [];
  });
}

function stripFrontmatter(content: string): string {
  if (!content.startsWith("---")) return content;
  const end = content.indexOf("\n---", 3);
  return end === -1 ? content : content.slice(end + 4);
}

// Replace fenced code block contents with a placeholder so headers/links inside them (e.g. shell
// comments) aren't mistaken for real markdown, while still counting as "content" for the
// surrounding section and keeping line numbers stable for the other checks.
function neutralizeFencedCodeBlocks(body: string): string {
  const lines = body.split("\n");
  let inFence = false;
  return lines
    .map((line) => {
      if (/^```/.test(line.trim())) {
        inFence = !inFence;
        return "x";
      }
      return inFence ? "x" : line;
    })
    .join("\n");
}

function checkReversedLinks(relPath: string, body: string, issues: Issue[]) {
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  for (const match of body.matchAll(linkPattern)) {
    const [, text, target] = match;
    const textIsUrl = /^https?:\/\//.test(text.trim());
    const targetIsUrl = /^https?:\/\//.test(target.trim());
    if (textIsUrl && !targetIsUrl) {
      issues.push({
        file: relPath,
        message: `reversed link — URL is the link text, "${target}" is the target: [${text}](${target})`,
      });
    }
  }
}

function checkEmptyHeaders(relPath: string, body: string, issues: Issue[]) {
  const lines = body.split("\n");
  const headers: { idx: number; level: number }[] = [];
  lines.forEach((line, i) => {
    const match = line.match(/^(#{1,6})\s/);
    if (match) headers.push({ idx: i, level: match[1].length });
  });
  headers.forEach(({ idx, level }, i) => {
    const next = i + 1 < headers.length ? headers[i + 1] : undefined;
    const gapEnd = next ? next.idx : lines.length;
    const gapHasContent = lines
      .slice(idx + 1, gapEnd)
      .some((l) => l.trim().length > 0);
    // A header immediately followed by a deeper header starts a subsection — that counts as content.
    const startsSubsection = next !== undefined && next.level > level;
    if (!gapHasContent && !startsSubsection) {
      issues.push({
        file: relPath,
        message: `empty header "${lines[idx].trim()}" has no content before the next header/EOF`,
      });
    }
  });
}

function checkStubPage(relPath: string, body: string, issues: Issue[]) {
  if (relPath.startsWith("blog" + path.sep)) return;
  const hasLink = /\[([^\]]*)\]\([^)]+\)|\[\[[^\]]+\]\]/.test(body);
  if (hasLink) return;
  const withoutHeaders = body.replace(/^#{1,6}\s.*$/gm, "");
  const wordCount = withoutHeaders.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount < STUB_WORD_THRESHOLD) {
    issues.push({
      file: relPath,
      message: `page has little to no content (${wordCount} word${wordCount === 1 ? "" : "s"} outside headers)`,
    });
  }
}

function main() {
  const files = walk(CONTENT_DIR);
  const issues: Issue[] = [];

  for (const file of files) {
    const relPath = path.relative(CONTENT_DIR, file);
    const raw = readFileSync(file, "utf-8");
    if (statSync(file).size === 0) {
      issues.push({ file: relPath, message: "file is completely empty" });
      continue;
    }
    const body = stripFrontmatter(raw);
    checkReversedLinks(relPath, body, issues);
    checkEmptyHeaders(relPath, neutralizeFencedCodeBlocks(body), issues);
    checkStubPage(relPath, body, issues);
  }

  if (issues.length === 0) {
    console.log(`lint-content: checked ${files.length} files, no issues found`);
    return;
  }

  console.log(
    `lint-content: ${issues.length} issue(s) found across ${files.length} files\n`,
  );
  for (const { file, message } of issues) {
    // GitHub Actions warning annotation — surfaces in the PR/run UI without failing the job
    console.log(`::warning file=content/${file}::${message}`);
  }
}

main();

import { readFileSync } from "fs"
import path from "path"

export interface Bookmark {
  _id: number
  link: string
  title: string
  excerpt: string
  tags: string[]
  created: string
  domain: string
}

export interface BookmarksFile {
  date?: string
  collections: { bookmarks: Bookmark[] }[]
}

export type TagIndex = Map<string, Bookmark[]>

const byCreatedDesc = (a: Bookmark, b: Bookmark) => b.created.localeCompare(a.created)

export function buildTagIndex(raw: BookmarksFile): TagIndex {
  const seen = new Set<number>()
  const index: TagIndex = new Map()
  for (const bookmark of raw.collections.flatMap((c) => c.bookmarks)) {
    if (seen.has(bookmark._id)) continue
    seen.add(bookmark._id)
    for (const tag of bookmark.tags ?? []) {
      const key = tag.toLowerCase().trim()
      const bucket = index.get(key)
      if (bucket) {
        bucket.push(bookmark)
      } else {
        index.set(key, [bookmark])
      }
    }
  }
  for (const bucket of index.values()) {
    bucket.sort(byCreatedDesc)
  }
  return index
}

export function getRelatedBookmarks(index: TagIndex, pageTags: string[]): Bookmark[] {
  const seen = new Set<number>()
  const matches: Bookmark[] = []
  for (const tag of pageTags) {
    for (const bookmark of index.get(tag.toLowerCase().trim()) ?? []) {
      if (seen.has(bookmark._id)) continue
      seen.add(bookmark._id)
      matches.push(bookmark)
    }
  }
  return matches.sort(byCreatedDesc)
}

let cachedIndex: TagIndex | undefined
export function loadTagIndex(): TagIndex {
  if (cachedIndex) return cachedIndex
  const dataPath = path.join(process.cwd(), "data", "bookmarks.json")
  let raw: BookmarksFile
  try {
    raw = JSON.parse(readFileSync(dataPath, "utf-8"))
  } catch (err) {
    throw new Error(
      `data/bookmarks.json is missing or unreadable. Run \`npm run fetch:bookmarks\` before building (in CI, ensure the BOOKMARKS_GITHUB_TOKEN secret is set). Original error: ${err instanceof Error ? err.message : err}`,
    )
  }
  if (!Array.isArray(raw.collections)) {
    throw new Error("data/bookmarks.json has an unexpected shape — missing collections array.")
  }
  cachedIndex = buildTagIndex(raw)
  return cachedIndex
}

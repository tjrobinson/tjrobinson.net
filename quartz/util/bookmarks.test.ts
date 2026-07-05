import test, { describe } from "node:test"
import assert from "node:assert"
import { buildTagIndex, getRelatedBookmarks, Bookmark, BookmarksFile } from "./bookmarks"

function makeBookmark(overrides: Partial<Bookmark>): Bookmark {
  return {
    _id: 1,
    link: "https://example.com",
    title: "Example",
    excerpt: "",
    tags: [],
    created: "2026-01-01T00:00:00.000Z",
    domain: "example.com",
    ...overrides,
  }
}

const azureOld = makeBookmark({
  _id: 1,
  title: "Azure old",
  tags: ["azure"],
  created: "2025-01-01T00:00:00.000Z",
})
const azureNew = makeBookmark({
  _id: 2,
  title: "Azure new",
  tags: ["Azure"],
  created: "2026-06-01T00:00:00.000Z",
})
const both = makeBookmark({
  _id: 3,
  title: "Azure and security",
  tags: ["azure", "security"],
  created: "2026-03-01T00:00:00.000Z",
})
const softwareDev = makeBookmark({
  _id: 4,
  title: "Software development",
  tags: ["software development"],
  created: "2026-02-01T00:00:00.000Z",
})

const fixture: BookmarksFile = {
  collections: [
    { bookmarks: [azureOld, azureNew] },
    // azureOld appears again in a second collection to exercise dedupe
    { bookmarks: [azureOld, both, softwareDev] },
  ],
}

describe("buildTagIndex", () => {
  test("flattens collections and dedupes bookmarks by _id", () => {
    const index = buildTagIndex(fixture)
    const azure = index.get("azure")!
    assert.strictEqual(azure.length, 3)
    assert.strictEqual(azure.filter((b) => b._id === azureOld._id).length, 1)
  })

  test("indexes tags case-insensitively, including tags with spaces", () => {
    const index = buildTagIndex(fixture)
    assert(index.get("azure")!.some((b) => b._id === azureNew._id))
    assert.strictEqual(index.get("software development")!.length, 1)
  })

  test("sorts each bucket by created descending", () => {
    const index = buildTagIndex(fixture)
    assert.deepStrictEqual(
      index.get("azure")!.map((b) => b.title),
      ["Azure new", "Azure and security", "Azure old"],
    )
  })
})

describe("getRelatedBookmarks", () => {
  const index = buildTagIndex(fixture)

  test("matches page tags case-insensitively", () => {
    assert.strictEqual(getRelatedBookmarks(index, ["AZURE"]).length, 3)
  })

  test("dedupes a bookmark matching multiple page tags and sorts newest first", () => {
    const results = getRelatedBookmarks(index, ["azure", "security"])
    assert.deepStrictEqual(
      results.map((b) => b.title),
      ["Azure new", "Azure and security", "Azure old"],
    )
  })

  test("returns empty for unknown tags or no tags", () => {
    assert.deepStrictEqual(getRelatedBookmarks(index, ["nonexistent"]), [])
    assert.deepStrictEqual(getRelatedBookmarks(index, []), [])
  })
})

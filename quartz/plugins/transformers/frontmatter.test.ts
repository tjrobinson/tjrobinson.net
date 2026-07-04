import test, { describe } from "node:test"
import assert from "node:assert"
import { VFile } from "vfile"
import { FrontMatter } from "./frontmatter"
import { FullSlug } from "../../util/path"
import { BuildCtx } from "../../util/ctx"

function runFrontMatter(markdown: string, filePath: string, slug: FullSlug) {
  const allSlugs: FullSlug[] = [slug]
  const ctx = {
    cfg: { configuration: { locale: "en-US" } },
    allSlugs,
  } as unknown as BuildCtx

  const plugins = FrontMatter().markdownPlugins!(ctx)
  // Second entry is the frontmatter transform itself (first is remark-frontmatter)
  const makeTransform = plugins[1] as () => (tree: undefined, file: VFile) => void
  const transform = makeTransform()

  const file = new VFile({ value: Buffer.from(markdown), path: filePath })
  file.data.slug = slug
  transform(undefined, file)
  return { file, allSlugs }
}

describe("FrontMatter", () => {
  describe("permalink handling (custom fork behavior)", () => {
    test("permalink overrides the canonical slug", () => {
      const { file } = runFrontMatter(
        "---\npermalink: cissp\n---\n\n# CISSP\n",
        "content/CISSP (ISC2) Resources.md",
        "cissp-(isc2)-resources" as FullSlug,
      )
      assert.strictEqual(file.data.slug, "cissp")
    })

    test("original auto-generated slug is demoted to an alias", () => {
      const { file } = runFrontMatter(
        "---\npermalink: cissp\n---\n\nBody\n",
        "content/CISSP (ISC2) Resources.md",
        "cissp-(isc2)-resources" as FullSlug,
      )
      assert.deepStrictEqual(file.data.aliases, ["cissp-(isc2)-resources"])
    })

    test("permalink is registered in allSlugs", () => {
      const { allSlugs } = runFrontMatter(
        "---\npermalink: cissp\n---\n\nBody\n",
        "content/CISSP (ISC2) Resources.md",
        "cissp-(isc2)-resources" as FullSlug,
      )
      assert(allSlugs.includes("cissp" as FullSlug))
    })

    test("frontmatter aliases are kept alongside the demoted original slug", () => {
      const { file, allSlugs } = runFrontMatter(
        "---\npermalink: short\naliases:\n  - other name\n---\n\nBody\n",
        "content/Long Note Title.md",
        "long-note-title" as FullSlug,
      )
      assert.strictEqual(file.data.slug, "short")
      assert.deepStrictEqual(file.data.aliases, ["other-name", "long-note-title"])
      assert(allSlugs.includes("other-name" as FullSlug))
      assert(allSlugs.includes("short" as FullSlug))
    })

    test("without a permalink the slug is unchanged and no aliases are added", () => {
      const { file } = runFrontMatter(
        "---\ntitle: Plain\n---\n\nBody\n",
        "content/Plain.md",
        "plain" as FullSlug,
      )
      assert.strictEqual(file.data.slug, "plain")
      assert.strictEqual(file.data.aliases, undefined)
    })

    test("empty permalink is ignored", () => {
      const { file } = runFrontMatter(
        '---\npermalink: ""\n---\n\nBody\n',
        "content/Plain.md",
        "plain" as FullSlug,
      )
      assert.strictEqual(file.data.slug, "plain")
      assert.strictEqual(file.data.aliases, undefined)
    })

    test("allSlugs contains no duplicates after processing", () => {
      const { allSlugs } = runFrontMatter(
        "---\npermalink: plain\n---\n\nBody\n",
        "content/Plain.md",
        "plain" as FullSlug,
      )
      assert.deepStrictEqual(allSlugs, [...new Set(allSlugs)])
    })
  })

  describe("title handling", () => {
    test("explicit frontmatter title wins", () => {
      const { file } = runFrontMatter(
        "---\ntitle: Custom Title\n---\n\nBody\n",
        "content/Note.md",
        "note" as FullSlug,
      )
      assert.strictEqual(file.data.frontmatter?.title, "Custom Title")
    })

    test("title falls back to the file stem", () => {
      const { file } = runFrontMatter("Body only\n", "content/My Note.md", "my-note" as FullSlug)
      assert.strictEqual(file.data.frontmatter?.title, "My Note")
    })
  })
})

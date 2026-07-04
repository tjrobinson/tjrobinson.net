import test, { describe } from "node:test"
import assert from "node:assert"
import { remark } from "remark"
import { Root } from "mdast"
import { StripH1 } from "./striph1"
import { BuildCtx } from "../../util/ctx"

function stripH1(markdown: string): string {
  const tree = remark().parse(markdown) as Root
  const [makePlugin] = StripH1().markdownPlugins!({} as BuildCtx)
  const transform = (makePlugin as () => (tree: Root) => void)()
  transform(tree)
  return remark().stringify(tree).trim()
}

describe("StripH1", () => {
  test("removes a leading h1", () => {
    assert.strictEqual(stripH1("# Title\n\nBody text"), "Body text")
  })

  test("keeps h2 and deeper headings", () => {
    assert.strictEqual(
      stripH1("# Title\n\n## Section\n\n### Subsection"),
      "## Section\n\n### Subsection",
    )
  })

  test("removes only the first of multiple h1s", () => {
    assert.strictEqual(stripH1("# First\n\n# Second\n\nBody"), "# Second\n\nBody")
  })

  test("leaves a document without an h1 unchanged", () => {
    assert.strictEqual(stripH1("## Section\n\nBody text"), "## Section\n\nBody text")
  })

  test("leaves an empty document unchanged", () => {
    assert.strictEqual(stripH1(""), "")
  })

  test("removes an h1 that is not the first node", () => {
    assert.strictEqual(stripH1("Intro paragraph\n\n# Title\n\nBody"), "Intro paragraph\n\nBody")
  })

  test("does not touch content following the h1", () => {
    const input = "# Git\n\nSome notes about git.\n\n* a list item\n* another"
    assert.strictEqual(stripH1(input), "Some notes about git.\n\n* a list item\n* another")
  })
})

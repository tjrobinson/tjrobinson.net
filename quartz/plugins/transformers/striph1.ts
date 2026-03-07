import { QuartzTransformerPlugin } from "../types"
import { Root, Heading } from "mdast"
import { visit, SKIP } from "unist-util-visit"

export const StripH1: QuartzTransformerPlugin = () => {
  return {
    name: "StripH1",
    markdownPlugins() {
      return [
        () => {
          return (tree: Root) => {
            let foundH1 = false
            visit(tree, "heading", (node: Heading, index, parent) => {
              if (node.depth === 1 && !foundH1) {
                if (parent && index !== undefined) {
                  parent.children.splice(index, 1)
                  foundH1 = true
                  return [SKIP, index]
                }
              }
            })
          }
        },
      ]
    },
  }
}


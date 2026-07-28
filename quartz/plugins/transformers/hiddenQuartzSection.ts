import { QuartzTransformerPlugin } from "../types"
import { Element, Root } from "hast"

export const HiddenQuartzSection: QuartzTransformerPlugin = () => {
  return {
    name: "HiddenQuartzSection",
    htmlPlugins() {
      return [
        () => {
          return (tree: Root) => {
            const children = tree.children

            const start = children.findIndex((node): node is Element => {
              if (node.type !== "element" || node.tagName !== "h1") {
                return false
              }

              const text = node.children
                .filter((c): c is any => c.type === "text")
                .map((c) => c.value)
                .join("")
                .trim()

              return text.includes("Quartz:Hidden")
            })

            if (start === -1) {
              return
            }

            let end = children.length

            for (let i = start + 1; i < children.length; i++) {
              const node = children[i]

              if (node.type === "element" && node.tagName === "h1") {
                end = i
                break
              }
            }

            for (let i = start; i < end; i++) {
              const node = children[i]

              if (node.type !== "element") continue

              node.properties ??= {}

              const classes = Array.isArray(node.properties.className)
                ? node.properties.className
                : node.properties.className
                  ? [node.properties.className]
                  : []

              if (!classes.includes("quartz-hidden")) {
                classes.push("quartz-hidden")
              }

              node.properties.className = classes
            }
          }
        },
      ]
    },
  }
}

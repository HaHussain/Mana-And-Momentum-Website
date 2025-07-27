import { QuartzTransformerPlugin } from "../../types";
import { visit } from "unist-util-visit";
import { Node } from "unist";
import { VFile } from "vfile";
import { WikiLink } from "@logseq/remark-wiki-link";

const wikilinkIconer: QuartzTransformerPlugin = () => {
  return {
    name: "wikilink-iconer",
    markdownPlugins() {
      return [
        () => (tree: Node, file: VFile) => {
          const icon = file.data?.frontmatter?.icon;
          if (!icon) return;

          visit(tree, "wikiLink", (node: WikiLink & Node) => {
            if (!node.data) node.data = {};

            const label = node.data.alias || node.data.page || "";

            node.data.hName = "span";
            node.data.hChildren = [
              { type: "element", tagName: "i", properties: { className: [icon] }, children: [] },
              { type: "text", value: ` ${label}` },
            ];
          });
        },
      ];
    },
    externalResources() {
      return {
        css: [
          { src: "https://cdn.jsdelivr.net/npm/lucide-static@latest/dist/lucide.css" },
          { src: "https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css" },
          { src: "https://cdn.jsdelivr.net/npm/rpg-awesome/css/rpg-awesome.min.css" },
        ],
      };
    },
  };
};

export default wikilinkIconer;

import { QuartzTransformerPlugin } from "../../types"
import { visit } from "unist-util-visit"
import { Element, Root } from "hast"
import path from "path"
import { QuartzPluginData } from "../../plugins/vfile"

function fixFolderIndexFiles(base: string, relative: string): string {
  let mdEnd = false;
  if (base.endsWith(".md")) {
    base = base.replace(".md","")
    mdEnd = true;
  }
  const [relPath, hashPart = ""] = relative.split("#");
  const hash = hashPart ? `#${hashPart}` : "";

  let baseFolder = base.replace(/\/?index(\.[^/]*)?$/, "");
  if (!baseFolder.endsWith("/")) baseFolder += "/";

  const joined = path.posix.join("/root", baseFolder, relPath);
  const normalized = path.posix.normalize(joined);

  const segments = normalized.split("/").filter(Boolean);
  const deduped: string[] = [];
  for (const seg of segments) {
    if (deduped.length === 0 || deduped[deduped.length - 1] !== seg) {
      deduped.push(seg);
    }
  }

  const finalAbs = "/" + deduped.join("/");
  const from = path.posix.join("/root", baseFolder);
  let rel = path.posix.relative(from, finalAbs);

  if (rel === "") rel = "./";
  else if (!rel.startsWith("./") && !rel.startsWith("../")) rel = "./" + rel;
  rel = mdEnd ? rel + ".md" : rel;
  return rel + hash;
}

export const WikilinkFolderFix: QuartzTransformerPlugin = () => {
  return {
    name: "Wikilink-Folder-Fix",
    htmlPlugins() {
      return [
        () => (tree: Root, file) => {
          visit(tree, "element", (node: Element) => {
            if (
              node.tagName === "a" &&
              node.properties?.className?.includes("internal") &&
              typeof node.properties?.["href"] === "string" &&
              !node.properties["href"].startsWith("#")
            ) {

              console.log("[1]",file.data.filePath);
              console.log("[2]",node.properties["href"]);
              
              const newHref = fixFolderIndexFiles(file.data.filePath, node.properties["href"]);
              console.log("[OUT]", newHref);
              node.properties["href"] = newHref;
            }
          })
        }
      ]
    }
  }
}

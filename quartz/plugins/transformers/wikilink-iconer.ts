import { QuartzTransformerPlugin } from "../../types"
import { visit } from "unist-util-visit"
import { Element, Root } from "hast"
import path from "path"
import { QuartzPluginData } from "../../plugins/vfile"

interface FileSlugMap {
  [slug: string]: string | undefined
}

// Icon conversion functions
const prefixMap: Record<string, string> = {
  Ra: "ra",
  Li: "lucide",
  Ri: "ri",
};

function camelToKebab(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

function convertIconKey(key: string): string {
  const prefix = key.slice(0, 2);
  const baseClass = prefixMap[prefix] || "";
  const rest = key.slice(2);
  const kebabRest = camelToKebab(rest);
  return baseClass ? `${baseClass} ${baseClass}-${kebabRest}` : kebabRest;
}

function getLucideIconUrl(iconClass: string): string | null {
  const match = iconClass.match(/lucide-([a-z-]+)/)
  if (!match) return null
  const iconName = match[1]
  return `https://cdn.jsdelivr.net/npm/lucide-static@0.263.0/icons/${iconName}.svg`
}

export const wikilinkIconer: QuartzTransformerPlugin = () => {
  let slugIconMap: FileSlugMap = {}
  
  return {
    name: "wikilink-iconer",
    
    markdownPlugins() {
      return [
        () => (tree, file) => {
          try {
            console.log(`[iconer:markdown] Processing file: ${file.data.filePath}`)
            
            if (!file.data.frontmatter) {
              console.warn(`[iconer:markdown] No frontmatter for ${file.data.filePath}`)
              return
            }
            
            const filePath = file.data.filePath!
            const slug = file.data.slug!
            const iconName = file.data.frontmatter.icon as string | undefined
            
            if (!iconName) {
              console.log(`[iconer:markdown] No icon for ${filePath}`)
              return
            }
            
            // Convert icon name to CSS classes
            const iconClass = convertIconKey(iconName)
            console.log(`[iconer:markdown] Converted '${iconName}' → '${iconClass}'`)
            
            // Create multiple access keys
            const keys = [
              slug.toLowerCase(),
              filePath.replace(/\.md$/, "").toLowerCase(),
              path.basename(filePath, ".md").toLowerCase(),
              slug.toLowerCase().replace(/[^a-z0-9]/g, ""),
              filePath.replace(/\.md$/, "").toLowerCase().replace(/[^a-z0-9]/g, "")
            ]
            
            console.log(`[iconer:markdown] Adding keys: ${keys.join(", ")}`)
            
            keys.forEach(key => {
              if (key && !slugIconMap[key]) {
                slugIconMap[key] = iconClass
                console.log(`[iconer:markdown] Mapped '${key}' → '${iconClass}'`)
              }
            })
          } catch (e) {
            console.error(`[iconer:markdown] Error:`, e)
          }
        }
      ]
    },
    
    htmlPlugins() {
      return [
        () => (tree: Root, file) => {
          try {
            console.log(`[iconer:html] Building HTML for: ${file.data.filePath}`)
            console.log(`[iconer:html] SlugIconMap entries: ${Object.keys(slugIconMap).length}`)
            
            visit(tree, "element", (node: Element) => {
              try {
                if (
                  node.tagName === "a" &&
                  node.properties?.className?.includes("internal") &&
                  typeof node.properties?.["href"] === "string"
                ) {
                  const href = node.properties.href as string
                  console.log(`[iconer:html] Processing link: ${href}`)
                  
                  // Skip anchor links
                  if (href.startsWith("#")) {
                    console.log(`[iconer:html] Skipping anchor link: ${href}`)
                    return
                  }
                  
                  // Normalize relative paths
                  let cleanHref = href
                    .replace(/^\.\.\//g, "")
                    .replace(/\.html$/, "")
                    .toLowerCase()
                  
                  // Handle multiple relative levels
                  while (cleanHref.startsWith("../")) {
                    cleanHref = cleanHref.substring(3)
                  }
                  
                  // Create lookup keys
                  const lookupKeys = [
                    cleanHref,
                    path.basename(cleanHref),
                    cleanHref.replace(/[^a-z0-9]/g, ""),
                    path.basename(cleanHref).replace(/[^a-z0-9]/g, ""),
                    cleanHref.replace(/^-+/, ""),
                    path.basename(cleanHref).replace(/^-+/, "")
                  ]
                  
                  console.log(`[iconer:html] Lookup keys: ${lookupKeys.join(", ")}`)
                  
                  // Find first matching icon
                  let iconClass: string | undefined
                  let matchedKey: string | undefined
                  
                  for (const key of lookupKeys) {
                    iconClass = slugIconMap[key]
                    if (iconClass) {
                      matchedKey = key
                      break
                    }
                  }
                  
                  if (!iconClass) {
                    console.warn(`[iconer:html] No icon found for ${href}`)
                    return
                  }
                  
                  console.log(`[iconer:html] Found icon classes: '${iconClass}' via key '${matchedKey}'`)
                  
                  // Create icon element
const classes = iconClass.split(" ")
const lucideUrl = classes.includes('lucide') ? getLucideIconUrl(iconClass) : null

let iconNode: Element
if (lucideUrl) {
  // Create span with background image
  iconNode = {
    type: "element",
    tagName: "span",
    properties: { 
      className: ["lucide-icon", "icon", ...classes],
      style: `
        display: inline-block;
        width: 1em;
        height: 1em;
        background-color: currentColor;
        mask-image: url("${lucideUrl}");
        mask-size: contain;
        mask-repeat: no-repeat;
        mask-position: center;
        vertical-align: middle;
      `
    },
    children: [],
  }
} else {
  // Standard icon element for other libraries
  iconNode = {
    type: "element",
    tagName: "i",
    properties: { 
      className: classes
    },
    children: [],
  }
}
                  
                  // Create text node for spacing
                  const spaceNode = { type: "text", value: " " } as const
                  
                  // Create a copy of existing children
                  const existingChildren = [...node.children]
                  
                  // Insert icon at the beginning
                  node.children = [iconNode, spaceNode, ...existingChildren]
                  
                  // Debug: verify insertion
                  console.log(`[iconer:html] Updated children count: ${node.children.length}`)
                  console.log(`[iconer:html] First child type: ${node.children[0].type}`)
                  // Temporary debug: log the entire link node
					console.log(`[iconer:html] Modified link node:`, JSON.stringify({
					  tagName: node.tagName,
					  properties: node.properties,
					  children: node.children.slice(0, 2) // Only show first two children
					}, null, 2))
                }
              } catch (e) {
                console.error(`[iconer:html] Element error:`, e)
              }
            })
          } catch (e) {
            console.error(`[iconer:html] Tree error:`, e)
          }
        }
      ]
    },
    
    afterAllPlugins() {
      slugIconMap = {}
    }
  }
}

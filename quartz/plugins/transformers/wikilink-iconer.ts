import { QuartzTransformerPlugin } from "../types";
import { visit } from "unist-util-visit";
import { Element } from "hast";
import { normalizeIcon, renderIcon } from "../../util/icon";
import { getSvg, transformSvgToDom } from "../../util/svgLoader";
import { convertDomToHast } from "../../components/IconElement";

export const wikilinkIconer: QuartzTransformerPlugin = () => {
  let slugIconMap = new Map<string, string>();
  let iconElementMap = new Map<string, Element>();
  
  return {
    name: "wikilink-iconer",
    markdownPlugins() {
      return [
        () => (_, file) => {
          const icon = file.data.frontmatter?.icon;
          if (!icon) return;
          
          const slug = file.data.slug!;
          slugIconMap.set(slug, icon);
          slugIconMap.set(slug.toLowerCase(), icon);
          slugIconMap.set(slug.replace(/\s+/g, '-'), icon);
          slugIconMap.set(slug.replace(/\s+/g, '-').toLowerCase(), icon);
        }
      ];
    },
    htmlPlugins() {
      return [
        () => (tree) => {
          visit(tree, "element", (node: Element) => {
            if (
              node.tagName === "a" &&
              node.properties?.className?.includes("internal") &&
              typeof node.properties?.href === "string"
            ) {
              const href = node.properties.href;
              if (href.startsWith("#")) return;
              
              // Extract clean slug from href
              const cleanHref = href
                .replace(/\.\.\//g, "")
                .replace(/\.html$/, "")
                .replace(/#.*$/, "");
              
              // Find matching icon
              const icon = slugIconMap.get(cleanHref) || 
                           slugIconMap.get(cleanHref.toLowerCase()) ||
                           slugIconMap.get(cleanHref.replace(/\s+/g, '-'));
              
              if (!icon) return;
              const spaceNode = { type: "text", value: " " };

              const cachedElement = iconElementMap.get(icon);
              if (cachedElement) {
                node.children = [cachedElement, spaceNode, ...node.children];
              } else {
                const NormalisedIcon = normalizeIcon(icon);
                
                const iconElement: Element = NormalisedIcon.type === 'gi' ? 
                convertDomToHast(transformSvgToDom(getSvg(NormalisedIcon.name))) :
                {
                  type: "element",
                  tagName: "i",
                  properties: {
                    className: renderIcon(icon).match(/class="([^"]+)"/)?.[1]?.split(" ") || []
                  },
                  children: []
                };
                iconElementMap.set(icon, iconElement);

                node.children = [iconElement, spaceNode, ...node.children];
              }
            }
          });
        }
      ];
    }
  }
}

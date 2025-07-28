import { QuartzPluginData } from "../plugins/vfile"

// Global icon map cache
let iconMap: Record<string, string> = {}

export function initIconMap(files: QuartzPluginData[]) {
  iconMap = {}
  files.forEach(file => {
    if (file.frontmatter?.icon) {
      const slug = file.slug!
      iconMap[slug] = file.frontmatter.icon
      // Add alternative keys
      iconMap[file.filePath!.replace(/\.md$/, "")] = file.frontmatter.icon
      iconMap[file.filePath!.split("/").pop()!.replace(/\.md$/, "")] = file.frontmatter.icon
    }
  })
}

export function getIconForSlug(slug: string): string | undefined {
  return iconMap[slug] || 
         iconMap[slug.toLowerCase()] || 
         iconMap[slug.replace(/\s+/g, "-")] ||
         iconMap[slug.replace(/\s+/g, "-").toLowerCase()]
}

import { QuartzPluginData } from "../plugins/vfile"

const iconMap: Map<string, string> = new Map()

export function initIconMap(files: QuartzPluginData[]) {
    files.forEach(file => {
        if (file.data.frontmatter?.icon) {
            const icon = file.data.frontmatter.icon
            const keys = [
                file.data.slug!,
                file.data.filePath!.replace(/\.md$/, ""),
                file.data.filePath!.split("/").pop()!.replace(/\.md$/, ""),
                file.data.slug!.toLowerCase(),
                file.data.slug!.replace(/\s+/g, "-"),
                file.data.slug!.replace(/\s+/g, "-").toLowerCase()
            ]
            
            keys.forEach(key => {
                if (key && !iconMap.has(key)) {
                    iconMap.set(key, icon)
                }
            })
        }
    })
    console.log("Item Map:", iconMap)
}

export function getIconForSlug(slug: string): string | undefined {
    return iconMap.get(slug) || 
           iconMap.get(slug.toLowerCase()) || 
           iconMap.get(slug.replace(/\s+/g, "-")) ||
           iconMap.get(slug.replace(/\s+/g, "-").toLowerCase())
}

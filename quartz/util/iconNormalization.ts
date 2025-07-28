const prefixMap: Record<string, string> = {
  Ra: "ra",
  Li: "lucide",
  Ri: "ri",
};

export function normalizeIcon(icon: string): { prefix: string; name: string } {
  // Check if already in colon format (e.g., "ri:article-line")
  if (icon.includes(':')) {
    const [prefix, name] = icon.split(':')
    return { prefix, name }
  }

  // Handle legacy format (e.g., "RaTargeted")
  const prefixKey = icon.slice(0, 2)
  const prefix = prefixMap[prefixKey] || prefixKey.toLowerCase()
  const name = camelToKebab(icon.slice(2))

  return { prefix, name }
}

function camelToKebab(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

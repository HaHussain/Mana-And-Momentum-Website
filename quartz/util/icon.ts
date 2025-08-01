type IconType = 'lucide' | 'ri' | 'ra' | 'custom';

interface NormalizedIcon {
  type: IconType;
  name: string;
  className: string;
}

const ICON_PREFIX_MAP: Record<string, IconType> = {
  'ri': 'ri',
  'ra': 'ra',
  'li': 'lucide',
  'lucide': 'lucide'
};

export function normalizeIcon(iconString: string): NormalizedIcon {
  // Handle colon format (ri:article-line)
  if (iconString.includes(':')) {
    const [prefix, name] = iconString.split(':');
    const type = ICON_PREFIX_MAP[prefix] || 'custom';
    
    return {
      type,
      name,
      className: type === 'lucide' 
        ? `lucide icon-${name}` 
        : `${prefix} ${prefix}-${name}`
    };
  }
  
  // Handle legacy format (RiArticleLine)
  const prefixKey = iconString.slice(0, 2).toLowerCase();
  const type = ICON_PREFIX_MAP[prefixKey] || 'custom';
  const name = camelToKebab(iconString.slice(2));
  
  return {
    type,
    name,
    className: type === 'lucide' 
      ? `lucide icon-${name}` 
      : `${prefixKey} ${prefixKey}-${name}`
  };
}

export function renderIcon(iconString: string): string {
  const { className } = normalizeIcon(iconString);
  return `<i class="${className}"></i>`;
}

function camelToKebab(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

const iconMap = new Map<string, string>();

export function initIconMap(files: QuartzPluginData[]) {
  files.forEach(file => {
    const icon = file.data.frontmatter?.icon;
    if (!icon) return;

    const slug = file.data.slug!;
    const filePath = file.data.filePath!;
    
    const keys = [
      slug,
      filePath.replace(/\.md$/, ''),
      filePath.split('/').pop()!.replace(/\.md$/, ''),
      slug.toLowerCase(),
      slug.replace(/\s+/g, '-'),
      slug.replace(/\s+/g, '-').toLowerCase()
    ];
    
    keys.forEach(key => {
      if (key && !iconMap.has(key)) {
        iconMap.set(key, icon);
      }
    });
  });
}

export function getIconForSlug(slug: string): string | undefined {
  return (
    iconMap.get(slug) ||
    iconMap.get(slug.toLowerCase()) ||
    iconMap.get(slug.replace(/\s+/g, '-')) ||
    iconMap.get(slug.replace(/\s+/g, '-').toLowerCase())
  );
}

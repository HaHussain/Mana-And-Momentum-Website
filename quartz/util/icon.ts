type IconType = 'lucide' | 'ri' | 'ra' | 'gi';

interface NormalizedIcon {
  type: IconType;
  name: string;
  className: string;
}

const ICON_PREFIX_MAP: Record<string, IconType> = {
  'ri': 'ri',
  'ra': 'ra',
  'li': 'lucide',
  'gi' : 'gi',
};

let iconCache = new Map<string, NormalizedIcon>();
let iconRender = new Map<string, string>();

export function addToRenderCache(key: string, value: string) {
  iconRender.set(key, value);
}

export function normalizeIcon(iconString: string): NormalizedIcon {
  const cachedIcon = iconCache.get(iconString)
  if (cachedIcon) {
    return cachedIcon
  }
  const prefixKey = iconString.slice(0, 2).toLowerCase();
  const type = ICON_PREFIX_MAP[prefixKey] || 'custom';
  const name = camelToKebab(iconString.slice(2));
  let value;

  switch (type) {
    case 'lucide': value = `lucide icon-${name}`; break;
    default: value = `${prefixKey} ${prefixKey}-${name}`
  }

  const normalisedIcon : NormalizedIcon = {
    type,
    name,
    className: value
  }
  iconCache.set(iconString, normalisedIcon);
  return normalisedIcon;
}

export function renderIcon(iconString: string): string {
  const cachedIconRender = iconRender.get(iconString)
  if (cachedIconRender) {
    return cachedIconRender;
  }
  const icon : NormalizedIcon = normalizeIcon(iconString);
  console.log();
  if (icon.type === "gi") {
    return iconRender.get(icon.name) ?? `<svg class="${icon.className}"><use href="/static/icons/game-icons-svgsheet.svg#icon-${icon.name}"></use></svg>`;
  }
  const iconRendered = `<i class="${icon.className}"></i>`
  iconRender.set(iconString, iconRendered);
  return iconRendered;
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
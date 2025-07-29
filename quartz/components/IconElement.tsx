import { normalizeIcon } from "../util/iconNormalization"

export function IconElement({ icon, className }: { icon: string; className?: string }) {
  if (!icon) return null
  
  const { prefix, name } = normalizeIcon(icon)
  const prefix2 = prefix === 'lucide' ? 'icon' : prefix
  
  return <i class={`${prefix} ${prefix2}-${name} ${className || ''}`}></i>
}
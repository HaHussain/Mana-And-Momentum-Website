import { JSX } from "preact"
import { normalizeIcon } from "../util/iconNormalization"

export function IconElement({ icon, className }: { icon: string; className?: string }) {
  if (!icon) return null
  
  const { prefix, name } = normalizeIcon(icon)
  
  if (prefix === 'lucide') {
    return (
      <svg 
        width="1em" 
        height="1em" 
        class={`lucide-icon ${className || ''}`}
        style="vertical-align: middle;"
      >
        <use href={`/lucide.svg#${name}`}></use>
      </svg>
    )
  }
  
  return <i class={`${prefix} ${prefix}-${name} ${className || ''}`}></i>
}

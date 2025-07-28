import { JSX } from "preact"

export function IconElement({ icon, className }: { icon: string; className?: string }) {
  const [prefix, iconName] = icon.split(':')
  
  if (prefix === 'lucide') {
    return <LucideIcon name={iconName} className={className} />
  }
  
  return (
    <i class={`${prefix} ${prefix}-${iconName} ${className || ''}`}></i>
  )
}

function LucideIcon({ name, className }: { name: string; className?: string }) {
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

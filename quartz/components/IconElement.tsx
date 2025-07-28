import { JSX } from "preact"

export function IconElement({ icon }: { icon: string }) {
  const prefix = icon.slice(0, 2)
  const iconName = icon.slice(2)
  
  return (
    <span class="icon-wrapper">
      {prefix === "Li" ? (
        <LucideIcon name={iconName} />
      ) : (
        <i class={`${prefix.toLowerCase()} ${prefix.toLowerCase()}-${iconName}`}></i>
      )}
    </span>
  )
}

function LucideIcon({ name }: { name: string }) {
  const url = `https://cdn.jsdelivr.net/npm/lucide-static@0.263.0/icons/${name}.svg`
  
  return (
    <span
      class="lucide-icon"
      style={`
        display: inline-block;
        width: 1em;
        height: 1em;
        background-color: currentColor;
        mask-image: url("${url}");
        mask-size: contain;
        mask-repeat: no-repeat;
        mask-position: center;
        vertical-align: middle;
      `}
    ></span>
  )
}

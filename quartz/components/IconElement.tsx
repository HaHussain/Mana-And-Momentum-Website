import { normalizeIcon } from '../util/icon';

export function IconElement({ icon, className = '' }: { 
  icon: string; 
  className?: string;
}) {
  const { type, name } = normalizeIcon(icon);
  
  if (type === 'lucide') {
    return <i class={`lucide icon-${name} ${className}`}></i>;
  }
  
  return <i class={`${type} ${type}-${name} ${className}`}></i>;
}

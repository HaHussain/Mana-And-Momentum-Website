import { JSXInternal } from 'preact/src/jsx';
import { normalizeIcon } from '../util/icon';
import { getSvg, transformSvgToDom } from '../util/svgLoader';
import { h } from "preact";
import { Element as HastElement } from "hast";

export function IconElement({ icon, className = '' }: { 
  icon: string; 
  className?: string;
}) : JSXInternal.Element {
  const { type, name } = normalizeIcon(icon);
  
  if (type === 'lucide') {
    return <i class={`lucide icon-${name} ${className}`}></i>;
  } else if (type === 'gi') { 
    const svgData = getSvg(name)
    if (!svgData) {
      console.log()
      return <i class={'missing icon'}></i> ;
    }
    const svg = transformSvgToDom(svgData);
    if (!svg) {
      return <i class={'missing icon'}></i> ;
    }
    
    return convertElementToJSX(svg);
  }
  
  return <i class={`${type} ${type}-${name} ${className}`}></i>;
}


export function convertElementToJSX(element: Element | null | undefined): h.JSX.Element {
  if (!element) {
    return <i class={'missing icon'}></i>;
  }
  const props: Record<string, any> = {};
  const isSvgRoot = element.tagName.toLowerCase() === 'svg';

  // Process attributes
  for (let i = 0; i < element.attributes.length; i++) {
    const attr = element.attributes[i];
    const name = attr.name === 'class' ? 'className' : attr.name;
    
    // Remove width/height from root SVG
    if (isSvgRoot && (name === 'width' || name === 'height')) continue;
    
    // Force currentColor for better theming
    if (name === 'fill' && attr.value !== 'currentColor') {
      props.fill = 'currentColor';
    } else {
      props[name] = attr.value;
    }
    props.width = '1em';
  }

  // Add CSS classes for responsive sizing
  if (isSvgRoot) {
    props.className = `title-icon svg-icon ${props.className || ''}`.trim();
  }

  // Process children
  const children: (h.JSX.Element | string)[] = [];
  for (const childNode of element.childNodes) {
    if (childNode.nodeType === childNode.ELEMENT_NODE) {
      children.push(convertElementToJSX(childNode as Element));
    } else if (childNode.nodeType === childNode.TEXT_NODE) {
      if (childNode.textContent?.trim()) {
        children.push(childNode.textContent);
      }
    }
  }

  return h(element.tagName.toLowerCase(), props, ...children);
}

export function convertDomToHast(node: any): HastElement {
  if (!node) {
    return {
      type: 'element',
      tagName: 'span',
      properties: {},
      children: [{ type: 'text', value: 'missing icon' }],
    };
  }

  // Handle element nodes
  const tagName = node.tagName.toLowerCase();
  const properties: Record<string, string> = {};

  // Get attributes
  if (node.attributes) {
    for (let i = 0; i < node.attributes.length; i++) {
      const attr = node.attributes[i];
      properties[attr.name] = attr.value;
    }
  }

  // Process children
  const children: any[] = [];
  if (node.childNodes) {
    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i];
      children.push(convertDomToHast(child));
    }
  }

  const hastElement: HastElement = {
    type: 'element',
    tagName,
    properties,
    children,
  };

  if (tagName === 'svg') {
    hastElement.properties.width = '1em';
    hastElement.properties.fill = 'currentColor'
    if (!hastElement.properties.class) {
      hastElement.properties.class = 'gi svg-icon'
    } else {
      hastElement.properties.class += 'gi svg-icon'
    }
    
  }
  
  return hastElement;
}
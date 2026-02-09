import { computePosition, flip, inline, shift } from "@floating-ui/dom"
import { normalizeRelativeURLs } from "../../util/path"
import { fetchCanonical } from "./util"

const p = new DOMParser()
let activeAnchor: HTMLAnchorElement | null = null
let tapTimer: number | null = null
let isMobile = false

// Detect mobile device
function detectMobile() {
  // Check for touch capability and screen size
  return ('ontouchstart' in window || 
          navigator.maxTouchPoints > 0 ||
          window.matchMedia("(pointer: coarse)").matches) &&
         window.innerWidth <= 1000 // Common mobile breakpoint
}

function slugify(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

function extractSectionHtml(doc: Document, hash: string | null): HTMLElement[] | null {
  if (!hash) return null
  const raw = hash.replace(/^#/, "")
  const decoded = decodeURIComponent(raw)
  const slug = slugify(decoded)

  let target: Element | null =
    doc.getElementById(`popover-internal-${slug}`) ||
    doc.getElementById(decoded) ||
    doc.getElementById(slug)

  if (!target) return null

  const results: HTMLElement[] = []
  const tag = target.tagName.toLowerCase()
  if (/^h[1-6]$/.test(tag)) {
    const level = parseInt(tag[1], 10)
    results.push(target.cloneNode(true) as HTMLElement)
    let sib = (target as HTMLElement).nextElementSibling
    while (sib) {
      if (/^h[1-6]$/.test(sib.tagName.toLowerCase())) {
        const sibLevel = parseInt(sib.tagName[1], 10)
        if (sibLevel <= level) break
      }
      results.push(sib.cloneNode(true) as HTMLElement)
      sib = sib.nextElementSibling
    }
    return results
  } else {
    results.push(target.cloneNode(true) as HTMLElement)
    return results
  }
}

async function mouseEnterHandler(
  this: HTMLAnchorElement,
  { clientX, clientY }: { clientX: number; clientY: number },
) {
  const link = (activeAnchor = this)
  if (link.dataset.noPopover === "true") return

  async function setPosition(popoverElement: HTMLElement) {
    const { x, y } = await computePosition(link, popoverElement, {
      strategy: "fixed",
      middleware: [inline({ x: clientX, y: clientY }), shift(), flip()],
    })
    
    // Check for mobile and set x to 0, otherwise use the computed x value
    const xPosition = isMobile ? 0 : x.toFixed()
    const yPosition = y.toFixed()
    
    Object.assign(popoverElement.style, {
      transform: `translate(${xPosition}px, ${yPosition}px)`,
    })
  }

  function showPopover(popoverElement: HTMLElement) {
    clearActivePopover()
    popoverElement.classList.add("active-popover")
    setPosition(popoverElement as HTMLElement)
  }

  const targetUrl = new URL(link.href)
  const hash = decodeURIComponent(targetUrl.hash)
  targetUrl.hash = ""
  targetUrl.search = ""
  const popoverId = `popover-${link.pathname}${hash}`
  const prevPopoverElement = document.getElementById(popoverId)

  if (prevPopoverElement) {
    showPopover(prevPopoverElement as HTMLElement)
    return
  }

  const response = await fetchCanonical(targetUrl).catch((err) => console.error(err))
  if (!response) return

  const [contentType] = response.headers.get("Content-Type")!.split(";")
  const [contentTypeCategory, typeInfo] = contentType.split("/")

  const popoverElement = document.createElement("div")
  popoverElement.id = popoverId
  popoverElement.classList.add("popover")
  const popoverInner = document.createElement("div")
  popoverInner.classList.add("popover-inner")
  popoverInner.dataset.contentType = contentType ?? undefined
  popoverElement.appendChild(popoverInner)

  switch (contentTypeCategory) {
    case "image":
      const img = document.createElement("img")
      img.src = targetUrl.toString()
      img.alt = targetUrl.pathname
      popoverInner.appendChild(img)
      break
    case "application":
      if (typeInfo === "pdf") {
        const pdf = document.createElement("iframe")
        pdf.src = targetUrl.toString()
        popoverInner.appendChild(pdf)
      }
      break
    default:
      const contents = await response.text()
      const html = p.parseFromString(contents, "text/html")
      normalizeRelativeURLs(html, targetUrl)

      html.querySelectorAll("[id]").forEach((el) => {
        el.id = `popover-internal-${el.id}`
      })

      let added = false
      if (hash !== "") {
        const section = extractSectionHtml(html, hash)
        if (section) {
          section.forEach((elt) => popoverInner.appendChild(elt))
          added = true
        }
      }

      if (!added) {
        const elts = [...html.getElementsByClassName("popover-hint")]
        if (elts.length === 0) return
        elts.forEach((elt) => popoverInner.appendChild(elt))
      }
  }

  if (!!document.getElementById(popoverId)) return
  document.body.appendChild(popoverElement)
  if (activeAnchor !== this) return
  showPopover(popoverElement)
}

// Mobile touch handlers
function touchStartHandler(this: HTMLAnchorElement, e: TouchEvent) {
  const link = this
  if (link.dataset.noPopover === "true") return
  
  // Prevent default to stop scrolling during long press
  // e.preventDefault()
  
  // Start timer for long press detection (500ms threshold)
  tapTimer = window.setTimeout(() => {
    // Long tap - navigate to link
    tapTimer = null
    window.location.href = link.href
  }, 150)
}

function touchEndHandler(this: HTMLAnchorElement, e: TouchEvent) {
  const link = this
  if (link.dataset.noPopover === "true") return
  
  if (tapTimer) {
    // Short tap - show popover and prevent navigation
    clearTimeout(tapTimer)
    tapTimer = null
    
    e.preventDefault()
    
    // Get touch position for popover placement
    const touch = e.changedTouches[0]
    mouseEnterHandler.call(link, { clientX: touch.clientX, clientY: touch.clientY })
  }
}

function touchCancelHandler() {
  if (tapTimer) {
    clearTimeout(tapTimer)
    tapTimer = null
  }
}

function clearActivePopover() {
  activeAnchor = null
  const allPopoverElements = document.querySelectorAll(".popover")
  allPopoverElements.forEach((popoverElement) => popoverElement.classList.remove("active-popover"))
}

document.addEventListener("nav", () => {
  const links = [...document.querySelectorAll("a.internal")] as HTMLAnchorElement[]
  
  // Detect mobile on navigation
  isMobile = detectMobile()
  
  for (const link of links) {
    if (isMobile) {
      // Mobile: use touch events
      link.addEventListener("touchstart", touchStartHandler)
      link.addEventListener("touchend", touchEndHandler)
      link.addEventListener("touchcancel", touchCancelHandler)
      
      // Prevent context menu on long press
      //link.addEventListener("contextmenu", (e) => e.preventDefault())
      
      window.addCleanup(() => {
        link.removeEventListener("touchstart", touchStartHandler)
        link.removeEventListener("touchend", touchEndHandler)
        link.removeEventListener("touchcancel", touchCancelHandler)
      })
    } else {
      // Desktop: keep original mouse events
      link.addEventListener("mouseenter", mouseEnterHandler)
      link.addEventListener("mouseleave", clearActivePopover)
      
      window.addCleanup(() => {
        link.removeEventListener("mouseenter", mouseEnterHandler)
        link.removeEventListener("mouseleave", clearActivePopover)
      })
    }
  }
  
  // Also add global touch handler to clear popovers when tapping elsewhere
  if (isMobile) {
    const clearOnOutsideTouch = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.popover') && !target.closest('a.internal')) {
        clearActivePopover()
      }
    }
    
    document.addEventListener('touchstart', clearOnOutsideTouch)
    window.addCleanup(() => {
      document.removeEventListener('touchstart', clearOnOutsideTouch)
    })
  }
})

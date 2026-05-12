import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"

// Check if a cell is a merge marker – now also handles &lt; (HTML entity)
const isMarker = (node: any): "<" | "^" | false => {
  if (
    node.type === "element" &&
    (node.tagName === "td" || node.tagName === "th") &&
    node.children.length === 1 &&
    node.children[0].type === "text"
  ) {
    const val = node.children[0].value.trim()
    if (val === "<" || val === "&lt;") return "<"
    if (val === "^") return "^"
  }
  return false
}

// Main rehype plugin
function rehypeAdvancedSheets() {
  return (tree: any) => {
    visit(tree, "element", (table: any) => {
      if (table.tagName !== "table") return

      const thead = table.children.find(
        (c: any) => c.type === "element" && c.tagName === "thead"
      )
      const tbody = table.children.find(
        (c: any) => c.type === "element" && c.tagName === "tbody"
      )

      // Gather all rows, preserving thead/tbody structure
      const rows: { parent: any; tr: any }[] = []
      const collectRows = (parent: any) => {
        if (!parent) return
        for (const child of parent.children) {
          if (child.type === "element" && child.tagName === "tr") {
            rows.push({ parent, tr: child })
          }
        }
      }
      collectRows(thead)
      collectRows(tbody)
      // fallback for direct <tr> children (shouldn’t happen normally)
      for (const child of table.children) {
        if (child.type === "element" && child.tagName === "tr") {
          rows.push({ parent: table, tr: child })
        }
      }

      // ---------- Process the table row by row ----------
      // rowspans keeps track of cells that started in an earlier row and still
      // occupy columns in the current row: { element, colStart, colSpan, rowsLeft }
      const activeRowspans: {
        element: any
        colStart: number
        colSpan: number
        rowsLeft: number
      }[] = []

      // For each row, we’ll build an array mapping column index to the cell
      // that *starts* in this row (used to answer “what is the cell above?”)
      type RowCellInfo = {
        element: any
        colStart: number
        colSpan: number
        isMarker: false | "<" | "^"
      }
      const prevRowCells: RowCellInfo[] = [] // cells from the previous row (before processing current)

      for (let rowIdx = 0; rowIdx < rows.length; rowIdx++) {
        const { tr } = rows[rowIdx]

        // Build list of cells in this <tr>
        const cellElements: any[] = []
        for (const child of tr.children) {
          if (
            child.type === "element" &&
            (child.tagName === "td" || child.tagName === "th")
          ) {
            cellElements.push(child)
          }
        }

        // We’ll simulate column advancement, consuming cellElements
        const currentRowCells: RowCellInfo[] = []   // cells that start in this row
        const toRemove: Set<any> = new Set()        // marker elements to delete
        let cellIdx = 0   // index into cellElements

        let col = 0
        // Helper: get the active rowspan cell covering column col, or null
        const getActiveRowspan = (c: number) =>
          activeRowspans.find(
            (rs) => rs.colStart <= c && c < rs.colStart + rs.colSpan
          ) ?? null

        // First pass: identify markers while building the column layout
        while (cellIdx < cellElements.length) {
          // Skip columns covered by active rowspans from earlier rows
          const active = getActiveRowspan(col)
          if (active) {
            // This column is already filled by a vertical span; we just skip it
            col += active.colSpan
            continue
          }

          const cellEl = cellElements[cellIdx]
          const marker = isMarker(cellEl)
          const colSpan = parseInt(cellEl.properties?.colspan ?? 1, 10) || 1

          if (marker) {
            // Instead of placing a real cell, record and mark for removal
            currentRowCells.push({
              element: cellEl,
              colStart: col,
              colSpan: colSpan,
              isMarker: marker,
            })
            toRemove.add(cellEl)
          } else {
            currentRowCells.push({
              element: cellEl,
              colStart: col,
              colSpan: colSpan,
              isMarker: false,
            })
          }

          col += colSpan
          cellIdx++
        }

        // Second pass: resolve merges using the column layout
        // We handle left‑merges first, then up‑merges.
        // Keep track of the last normal cell we saw (for left‑merge)
        let lastNormal: RowCellInfo | null = null

        for (const info of currentRowCells) {
          if (info.isMarker === "<") {
            // Merge with the cell immediately to the left
            if (lastNormal) {
              const oldColspan = parseInt(lastNormal.element.properties?.colspan ?? 1, 10) || 1
              lastNormal.element.properties = {
                ...lastNormal.element.properties,
                colspan: oldColspan + 1,
              }
              // Adjust our info: the merged normal cell now spans one more column
              lastNormal.colSpan += 1
            }
            // The marker itself stays in toRemove (will be removed from the DOM later)
          } else if (info.isMarker === "^") {
            // Find the cell directly above this column
            // Check active rowspans first (they represent cells from earlier rows)
            const activeAbove = getActiveRowspan(info.colStart)
            if (activeAbove) {
              // The above cell is the one that started the rowspan
              const aboveEl = activeAbove.element
              const oldRowspan = parseInt(aboveEl.properties?.rowspan ?? 1, 10) || 1
              aboveEl.properties = {
                ...aboveEl.properties,
                rowspan: oldRowspan + 1,
              }
              // Update the active rowspan entry to cover one more row
              activeAbove.rowsLeft += 1

              // Now remove any other cells in this row that fall under the same spanned columns
              const startCol = activeAbove.colStart
              const endCol = startCol + activeAbove.colSpan - 1
              for (const other of currentRowCells) {
                if (
                  other !== info &&
                  other.colStart >= startCol &&
                  other.colStart <= endCol
                ) {
                  toRemove.add(other.element)
                }
              }
            } else {
              // No active rowspan – look in the previous row’s cells
              const aboveCell = prevRowCells.find(
                (pc) =>
                  pc.colStart <= info.colStart &&
                  info.colStart < pc.colStart + pc.colSpan
              )
              if (aboveCell && !aboveCell.isMarker) {
                const oldRowspan = parseInt(aboveCell.element.properties?.rowspan ?? 1, 10) || 1
                aboveCell.element.properties = {
                  ...aboveCell.element.properties,
                  rowspan: oldRowspan + 1,
                }
                // Create a new active rowspan entry representing this cell
                activeRowspans.push({
                  element: aboveCell.element,
                  colStart: aboveCell.colStart,
                  colSpan: aboveCell.colSpan,
                  rowsLeft: 2, // it now spans the current row as well
                })
                // Remove any other cells in this row under the same spanned columns
                const startCol = aboveCell.colStart
                const endCol = startCol + aboveCell.colSpan - 1
                for (const other of currentRowCells) {
                  if (
                    other !== info &&
                    other.colStart >= startCol &&
                    other.colStart <= endCol
                  ) {
                    toRemove.add(other.element)
                  }
                }
              }
            }
          } else {
            // Normal cell – update lastNormal for possible left‑merge later
            lastNormal = info
          }
        }

        // Remove all marker and redundant cells from the DOM
        for (let i = tr.children.length - 1; i >= 0; i--) {
          const child = tr.children[i]
          if (toRemove.has(child)) {
            tr.children.splice(i, 1)
          }
        }

        // Update activeRowspans: decrement rowsLeft, remove expired ones
        for (let i = activeRowspans.length - 1; i >= 0; i--) {
          activeRowspans[i].rowsLeft--
          if (activeRowspans[i].rowsLeft <= 0) {
            activeRowspans.splice(i, 1)
          }
        }

        // The current row becomes the “previous row” for the next iteration.
        // We only care about cells that were not removed and are not markers.
        prevRowCells.length = 0
        for (const info of currentRowCells) {
          if (!toRemove.has(info.element) && !info.isMarker) {
            prevRowCells.push(info)
          }
        }
      }
    })
  }
}

export const AdvancedSheets: QuartzTransformerPlugin = () => {
  return {
    name: "AdvancedSheets",
    htmlPlugins() {
      return [rehypeAdvancedSheets]
    }
  }
}
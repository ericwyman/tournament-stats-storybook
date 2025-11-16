import React, { useState, useCallback, useRef, useEffect } from 'react'
import { SpreadsheetCell } from './spreadsheet-cell.jsx'
import { SpreadsheetRow } from './spreadsheet-row.jsx'
import { ResizableColumnHeader } from './resizable-column-header.jsx'

/**
 * Full-featured spreadsheet component with frozen first column, resizable columns,
 * cell editing, and keyboard navigation
 * @param {Object} props
 * @param {Array<Array<string|number>>} props.data - 2D array of cell values
 * @param {string[]} props.headers - Column header labels
 * @param {boolean} [props.editable=false] - Whether cells can be edited (programmatic control)
 * @param {number[]} [props.originalIndices] - Optional array of original row indices (for showing original row numbers when filtered)
 * @param {Set<number>} [props.selectedRows] - Set of selected row indices (original indices)
 * @param {Function} [props.onRowSelect] - Callback when a row is selected (originalRowIndex, ctrlKey)
 */
export function Spreadsheet({
  data: initialData,
  headers,
  editable = false,
  originalIndices = null,
  selectedRows = new Set(),
  onRowSelect = null
}) {
  const [data, setData] = useState(initialData)
  const [selectedCell, setSelectedCell] = useState(null)
  const [editingCell, setEditingCell] = useState(null)

  // Sync internal data state with prop changes (for filtering, etc.)
  useEffect(() => {
    setData(initialData)
    // Reset selection when data changes (prevents invalid selection after filtering)
    setSelectedCell(null)
    setEditingCell(null)
  }, [initialData])

  // Smart column widths based on header content
  const getInitialColumnWidth = (header) => {
    // Shorter widths for numeric stats, wider for names
    if (header.toLowerCase().includes('name')) return 180
    if (header.includes('%')) return 80
    if (['AB', 'HR', 'RBI', 'R', 'SB'].includes(header)) return 70
    if (['AVG', 'OBP', 'SLG', 'OPS', 'wOBA'].includes(header)) return 90
    if (header === 'wRAA') return 90
    return 100 // Default
  }

  const [columnWidths, setColumnWidths] = useState(
    headers.map(header => getInitialColumnWidth(header))
  )
  const scrollableRef = useRef(null)

  // Track refs for all cells to enable focus management
  // Key format: "row-col" (e.g., "0-1" for row 0, column 1)
  const cellRefs = useRef({})

  // Focus the selected cell when selection changes (HIGH-3: Focus Management)
  // This ensures keyboard events always go to the visually selected cell
  useEffect(() => {
    if (selectedCell && !editingCell) {
      const key = `${selectedCell.row}-${selectedCell.col}`
      const cellRef = cellRefs.current[key]
      if (cellRef) {
        cellRef.focus()
      }
    }
  }, [selectedCell, editingCell])

  const handleColumnResize = useCallback((index, newWidth) => {
    setColumnWidths((prevWidths) => {
      const newWidths = [...prevWidths]
      newWidths[index] = newWidth
      return newWidths
    })
  }, [])

  const handleCellClick = useCallback((row, col) => {
    setSelectedCell({ row, col })
    setEditingCell(null)
  }, [])

  const handleCellDoubleClick = useCallback((row, col) => {
    setSelectedCell({ row, col })
    // Only allow editing if editable prop is true
    if (editable) {
      setEditingCell({ row, col })
    }
  }, [editable])

  const handleCellChange = useCallback((row, col, value) => {
    setData((prevData) => {
      const newData = [...prevData]
      newData[row] = [...newData[row]]
      newData[row][col] = value
      return newData
    })
    setEditingCell(null)
  }, [])

  const handleKeyDown = useCallback((e, row, col) => {
    // Check if we're currently editing this specific cell
    const isEditing = editingCell?.row === row && editingCell?.col === col

    // ========================================
    // SECTION 1: Keys that work during editing
    // ========================================
    if (e.key === 'Enter') {
      e.preventDefault()
      setEditingCell(null)
      // Move down to next row
      if (row < data.length - 1) {
        setSelectedCell({ row: row + 1, col })
      }
      return
    }

    if (e.key === 'Escape') {
      e.preventDefault()
      setEditingCell(null)
      return
    }

    if (e.key === 'Tab') {
      e.preventDefault()
      setEditingCell(null)

      if (e.shiftKey) {
        // Shift+Tab: Move LEFT or wrap to previous row
        if (col > 0) {
          setSelectedCell({ row, col: col - 1 })
        } else if (row > 0) {
          setSelectedCell({ row: row - 1, col: headers.length - 1 })
        }
      } else {
        // Tab: Move RIGHT or wrap to next row
        if (col < headers.length - 1) {
          setSelectedCell({ row, col: col + 1 })
        } else if (row < data.length - 1) {
          setSelectedCell({ row: row + 1, col: 0 })
        }
      }
      return
    }

    // ========================================
    // SECTION 2: Keys that DON'T work during editing
    // (If editing, let user type normally)
    // ========================================
    if (isEditing) {
      return // Let the input handle the key
    }

    // ========================================
    // SECTION 3: Arrow key navigation (NOT during edit)
    // ========================================
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (row > 0) {
        setSelectedCell({ row: row - 1, col })
      }
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (row < data.length - 1) {
        setSelectedCell({ row: row + 1, col })
      }
      return
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      if (col > 0) {
        setSelectedCell({ row, col: col - 1 })
      }
      return
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault()
      if (col < headers.length - 1) {
        setSelectedCell({ row, col: col + 1 })
      }
      return
    }

    // ========================================
    // SECTION 4: F2 to enter edit mode (Excel convention)
    // Only works if editable is enabled
    // ========================================
    if (e.key === 'F2' && editable) {
      e.preventDefault()
      setEditingCell({ row, col })
      return
    }

    // ========================================
    // SECTION 5: Alphanumeric keys start editing
    // Only works if editable is enabled
    // ========================================
    // Check if it's a single printable character (letter, number, symbol)
    // Exclude modifier keys (Ctrl, Alt, etc.) and function keys
    if (
      editable &&
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.altKey &&
      !e.metaKey
    ) {
      // Start editing with this character
      // The character will naturally appear in the input
      setEditingCell({ row, col })
      // Don't preventDefault - let the key event reach the input
    }
  }, [data.length, headers.length, editingCell, editable])

  // Calculate total width for proper scrolling
  const totalWidth = columnWidths.reduce((sum, width) => sum + width, 60) // 60px for row numbers

  // Calculate percentage-based widths for table-layout: fixed
  // This allows columns to scale proportionally when table is wider than minWidth
  const getColumnWidthPercent = (index) => {
    if (index === -1) return (60 / totalWidth * 100).toFixed(2) + '%' // Row number column
    return (columnWidths[index] / totalWidth * 100).toFixed(2) + '%'
  }

  return (
    <div className="h-full w-full overflow-auto bg-background relative">
      {/* Subtle shadow on right edge when scrollable - indicates more content */}
      <div className="absolute top-0 right-0 bottom-0 w-8 pointer-events-none bg-gradient-to-l from-background/80 to-transparent z-30 opacity-50"></div>

      <table className="border-collapse w-full table-fixed" style={{ minWidth: `${totalWidth}px` }}>
        <thead>
          <tr>
            {/* Row number header - sticky */}
            <th
              className="sticky left-0 z-20 bg-muted border border-border"
              style={{ width: getColumnWidthPercent(-1), minWidth: '60px' }}
            >
              <div className="flex items-center justify-center h-10 font-medium text-muted-foreground">
                {/* Empty corner cell */}
              </div>
            </th>

            {/* Column headers */}
            {headers.map((header, index) => (
              <th
                key={`header-${index}`}
                className={index === 0 ? "sticky left-[60px] z-10 border-r-2" : ""}
                style={{
                  width: getColumnWidthPercent(index),
                  minWidth: `${columnWidths[index]}px`
                }}
              >
                <ResizableColumnHeader
                  value={header}
                  width={columnWidths[index]}
                  onResize={(newWidth) => handleColumnResize(index, newWidth)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const originalIndex = originalIndices ? originalIndices[rowIndex] : rowIndex
            const isRowSelected = selectedRows.has(originalIndex)

            return (
              <SpreadsheetRow
                key={`row-${rowIndex}`}
                row={row}
                rowIndex={rowIndex}
                displayRowNumber={originalIndex + 1}
                originalRowIndex={originalIndex}
                isRowSelected={isRowSelected}
                headers={headers}
                selectedCell={selectedCell}
                editingCell={editingCell}
                columnWidths={columnWidths}
                getColumnWidthPercent={getColumnWidthPercent}
                onCellClick={handleCellClick}
                onCellDoubleClick={handleCellDoubleClick}
                onCellChange={handleCellChange}
                onCellKeyDown={handleKeyDown}
                onRowSelect={onRowSelect}
                cellRefs={cellRefs}
                editable={editable}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
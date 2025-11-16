import React, { memo, useCallback } from 'react'
import { SpreadsheetCell } from './spreadsheet-cell.jsx'

/**
 * Individual row component for the spreadsheet
 * Memoized to prevent re-rendering rows when only other rows change
 *
 * @param {Object} props
 * @param {Array<string|number>} props.row - Array of cell values for this row
 * @param {number} props.rowIndex - Index of this row in the data array
 * @param {number} props.displayRowNumber - Row number to display (may differ from rowIndex when filtered)
 * @param {number} props.originalRowIndex - Original index of this row in the full dataset
 * @param {boolean} props.isRowSelected - Whether this row is currently selected
 * @param {string[]} props.headers - Column headers (for width reference)
 * @param {Object|null} props.selectedCell - Currently selected cell {row, col}
 * @param {Object|null} props.editingCell - Currently editing cell {row, col}
 * @param {number[]} props.columnWidths - Array of column widths in pixels
 * @param {Function} props.getColumnWidthPercent - Function to calculate percentage width
 * @param {Function} props.onCellClick - Callback when cell is clicked (row, col)
 * @param {Function} props.onCellDoubleClick - Callback when cell is double-clicked (row, col)
 * @param {Function} props.onCellChange - Callback when cell value changes (row, col, value)
 * @param {Function} props.onCellKeyDown - Callback for keyboard events (e, row, col)
 * @param {Function} props.onRowSelect - Callback when row number is clicked (originalRowIndex, ctrlKey)
 * @param {boolean} [props.editable=true] - Whether cells are editable
 */
const SpreadsheetRowComponent = function SpreadsheetRow({
  row,
  rowIndex,
  displayRowNumber,
  originalRowIndex,
  isRowSelected,
  headers,
  selectedCell,
  editingCell,
  columnWidths,
  getColumnWidthPercent,
  onCellClick,
  onCellDoubleClick,
  onCellChange,
  onCellKeyDown,
  onRowSelect,
  cellRefs,
  editable = true,
}) {
  // Stable callbacks for this specific row
  // These wrap the parent callbacks with the rowIndex pre-filled
  const handleCellClick = useCallback(
    (colIndex) => {
      onCellClick(rowIndex, colIndex)
    },
    [rowIndex, onCellClick]
  )

  const handleCellDoubleClick = useCallback(
    (colIndex) => {
      onCellDoubleClick(rowIndex, colIndex)
    },
    [rowIndex, onCellDoubleClick]
  )

  const handleCellChange = useCallback(
    (colIndex, value) => {
      onCellChange(rowIndex, colIndex, value)
    },
    [rowIndex, onCellChange]
  )

  const handleCellKeyDown = useCallback(
    (e, colIndex) => {
      onCellKeyDown(e, rowIndex, colIndex)
    },
    [rowIndex, onCellKeyDown]
  )

  // Handle row number click for row selection
  const handleRowNumberClick = useCallback((e) => {
    if (onRowSelect) {
      onRowSelect(originalRowIndex, e.ctrlKey || e.metaKey)
    }
  }, [originalRowIndex, onRowSelect])

  return (
    <tr>
      {/* Row number cell - sticky on left, clickable for selection */}
      <td
        className={`sticky left-0 z-10 border cursor-pointer hover:bg-accent transition-colors ${
          isRowSelected
            ? 'bg-blue-100 border-blue-400 border-l-4 border-l-blue-500'
            : 'bg-muted border-border'
        }`}
        style={{ width: getColumnWidthPercent(-1), minWidth: '60px' }}
        onClick={handleRowNumberClick}
      >
        <SpreadsheetCell value={displayRowNumber} isRowHeader />
      </td>

      {/* Data cells */}
      {row.map((cell, colIndex) => (
        <td
          key={`cell-${rowIndex}-${colIndex}`}
          className={`${colIndex === 0 ? "sticky left-[60px] z-10 border-r-2" : ""} ${
            isRowSelected ? 'border-blue-400 border-t-2 border-b-2 bg-blue-100' : ''
          } ${colIndex === row.length - 1 && isRowSelected ? 'border-r-2 border-r-blue-400' : ''}`}
          style={{
            width: getColumnWidthPercent(colIndex),
            minWidth: `${columnWidths[colIndex]}px`
          }}
        >
          <SpreadsheetCell
            ref={(el) => {
              const key = `${rowIndex}-${colIndex}`
              if (el) {
                cellRefs.current[key] = el
              } else {
                delete cellRefs.current[key]
              }
            }}
            value={cell}
            isSelected={
              selectedCell?.row === rowIndex && selectedCell?.col === colIndex
            }
            isEditing={
              editingCell?.row === rowIndex && editingCell?.col === colIndex
            }
            editable={editable}
            onClick={() => handleCellClick(colIndex)}
            onDoubleClick={() => handleCellDoubleClick(colIndex)}
            onChange={(value) => handleCellChange(colIndex, value)}
            onKeyDown={(e) => handleCellKeyDown(e, colIndex)}
          />
        </td>
      ))}
    </tr>
  )
}

/**
 * Memoized version of SpreadsheetRow
 * Only re-renders when this row's data or selection state changes
 */
export const SpreadsheetRow = memo(SpreadsheetRowComponent, (prevProps, nextProps) => {
  // Return true if props are equal (skip re-render)
  // Return false if props changed (do re-render)

  // Check if this row's data changed
  if (prevProps.row !== nextProps.row) {
    return false // Row data changed, must re-render
  }

  // Check if selection state affects this row
  const prevSelected = prevProps.selectedCell
  const nextSelected = nextProps.selectedCell
  const prevEditing = prevProps.editingCell
  const nextEditing = nextProps.editingCell

  // Did selection enter or leave this row?
  const wasSelected = prevSelected?.row === prevProps.rowIndex
  const isSelected = nextSelected?.row === nextProps.rowIndex
  if (wasSelected !== isSelected) {
    return false // Selection changed for this row
  }

  // Did editing state change for this row?
  const wasEditing = prevEditing?.row === prevProps.rowIndex
  const isEditing = nextEditing?.row === nextProps.rowIndex
  if (wasEditing !== isEditing) {
    return false // Editing state changed for this row
  }

  // If selection is in this row, check if it moved to a different cell
  if (isSelected && prevSelected?.col !== nextSelected?.col) {
    return false // Selection moved to different cell in this row
  }

  // If editing is in this row, check if it moved to a different cell
  if (isEditing && prevEditing?.col !== nextEditing?.col) {
    return false // Editing moved to different cell in this row
  }

  // Check if column widths changed (affects layout)
  if (prevProps.columnWidths !== nextProps.columnWidths) {
    return false // Column widths changed, must re-render
  }

  // Check if editable state changed
  if (prevProps.editable !== nextProps.editable) {
    return false // Editable state changed, must re-render
  }

  // Check if displayRowNumber changed (happens when original indices provided)
  if (prevProps.displayRowNumber !== nextProps.displayRowNumber) {
    return false // Display number changed, must re-render
  }

  // Check if row selection state changed
  if (prevProps.isRowSelected !== nextProps.isRowSelected) {
    return false // Selection state changed, must re-render
  }

  // Everything else is stable, skip re-render
  return true
})
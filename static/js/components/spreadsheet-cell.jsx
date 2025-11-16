import React, { useState, useRef, useEffect, memo, forwardRef } from 'react'

/**
 * Individual cell component for the spreadsheet
 * Memoized to prevent unnecessary re-renders during column resize or other parent state changes
 * @param {Object} props
 * @param {string|number} props.value - Cell value to display
 * @param {boolean} [props.isHeader] - Whether this is a column header
 * @param {boolean} [props.isRowHeader] - Whether this is a row header
 * @param {boolean} [props.isSelected] - Whether this cell is currently selected
 * @param {boolean} [props.isEditing] - Whether this cell is in edit mode
 * @param {boolean} [props.editable=true] - Whether this cell can be edited
 * @param {Function} [props.onClick] - Click handler
 * @param {Function} [props.onDoubleClick] - Double-click handler
 * @param {Function} [props.onChange] - Change handler for editing
 * @param {Function} [props.onKeyDown] - Keyboard event handler
 * @param {React.Ref} ref - Forwarded ref for focus management
 */
const SpreadsheetCellComponent = forwardRef(function SpreadsheetCell(
  {
    value,
    isHeader = false,
    isRowHeader = false,
    isSelected = false,
    isEditing = false,
    editable = true,
    onClick,
    onDoubleClick,
    onChange,
    onKeyDown,
  },
  ref
) {
  const [inputValue, setInputValue] = useState(String(value))
  const inputRef = useRef(null)

  useEffect(() => {
    setInputValue(String(value))
  }, [value])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleBlur = () => {
    if (onChange) {
      onChange(inputValue)
    }
  }

  const cellClasses = [
    'px-3 h-full w-full flex items-center min-h-[32px]',
    isHeader || isRowHeader
      ? 'bg-muted text-muted-foreground font-medium'
      : 'bg-card',
    isSelected && !isEditing
      ? 'ring-2 ring-inset ring-primary bg-primary/10'
      : '',
    !isHeader && !isRowHeader
      ? 'hover:bg-accent/50 cursor-cell transition-colors'
      : 'cursor-default',
  ].filter(Boolean).join(' ')

  if (isEditing && !isHeader && !isRowHeader) {
    return (
      <>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={onKeyDown}
          className="w-full h-full px-3 bg-card text-foreground border-0 outline-none ring-2 ring-primary min-h-[32px]"
        />
      </>
    )
  }

  return (
    <div
      ref={ref}
      className={cellClasses}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onKeyDown={onKeyDown}
      tabIndex={isSelected && !isEditing ? 0 : -1}
    >
      {value}
    </div>
  )
})

/**
 * Memoized version of SpreadsheetCell with custom comparison
 * Only re-renders when specific props that affect display change
 */
export const SpreadsheetCell = memo(SpreadsheetCellComponent, (prevProps, nextProps) => {
  // Return true if props are equal (skip re-render)
  // Return false if props changed (do re-render)
  return (
    prevProps.value === nextProps.value &&
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.isEditing === nextProps.isEditing &&
    prevProps.isHeader === nextProps.isHeader &&
    prevProps.isRowHeader === nextProps.isRowHeader &&
    prevProps.editable === nextProps.editable
    // Note: We intentionally skip comparing callbacks (onClick, onChange, etc.)
    // because they should be stable via useCallback in parent component
  )
})
import React, { useState, useRef, useCallback, useEffect } from 'react'

/**
 * Resizable column header with drag handle
 * @param {Object} props
 * @param {string} props.value - Header text
 * @param {number} props.width - Current column width in pixels
 * @param {Function} props.onResize - Callback when column is resized
 */
export function ResizableColumnHeader({ value, width, onResize }) {
  const [isResizing, setIsResizing] = useState(false)
  const startXRef = useRef(0)
  const startWidthRef = useRef(0)
  const cleanupRef = useRef(null)

  // Cleanup any active resize listeners on unmount
  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
      }
    }
  }, [])

  const handleMouseDown = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    startXRef.current = e.clientX
    startWidthRef.current = width

    const handleMouseMove = (e) => {
      const delta = e.clientX - startXRef.current
      const newWidth = Math.max(60, startWidthRef.current + delta)
      onResize(newWidth)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      cleanup()
    }

    const cleanup = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      cleanupRef.current = null
    }

    cleanupRef.current = cleanup
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [width, onResize])

  return (
    <div 
      className="h-10 w-full px-3 py-0 relative bg-muted text-muted-foreground select-none font-medium flex items-center"
    >
      <div className="overflow-hidden text-ellipsis whitespace-nowrap">
        {value}
      </div>
      
      {/* Resize handle */}
      <div
        className={`absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary/50 transition-colors ${
          isResizing ? 'bg-primary' : ''
        }`}
        onMouseDown={handleMouseDown}
      >
        {/* Wider hit area for easier grabbing */}
        <div className="absolute top-0 right-[-2px] w-[5px] h-full" />
      </div>
    </div>
  )
}
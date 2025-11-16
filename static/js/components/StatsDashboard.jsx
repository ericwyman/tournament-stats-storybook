import React from 'react'
import ReactDOM from 'react-dom/client'
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { Separator } from '@/components/ui/separator'
import { Spreadsheet } from './spreadsheet.jsx'
import { SpreadsheetQuickFilter } from './spreadsheet-quick-filter.jsx'
import '../../css/src/styles.css'

/**
 * Stats dashboard using spreadsheet component
 * Demonstrates integration with sidebar and data display
 */
const StatsContent = ({ data }) => {
  const { headers, rows } = data

  // DEBUG: Log initial data structure
  React.useEffect(() => {
    console.log('📊 Initial Data:', {
      headers,
      totalRows: rows.length,
      firstRow: rows[0],
      sampleRow: rows[Math.floor(rows.length / 2)]
    })
  }, [])

  // Filter state
  const [nameFilter, setNameFilter] = React.useState('')
  const [statColumn, setStatColumn] = React.useState('')
  const [statOperator, setStatOperator] = React.useState('>')
  const [statValue, setStatValue] = React.useState('')

  // Row selection state
  const [selectedRows, setSelectedRows] = React.useState(new Set())
  const [showOnlySelected, setShowOnlySelected] = React.useState(false)

  // DEBUG: Log filter state changes
  React.useEffect(() => {
    console.log('🔍 Filter State Changed:', {
      nameFilter,
      statColumn,
      statOperator,
      statValue
    })
  }, [nameFilter, statColumn, statOperator, statValue])

  // Get numeric columns for threshold filtering (all except first column which is player name)
  const numericColumns = headers.slice(1)

  // Apply filters to data
  const { filteredRows, originalIndices } = React.useMemo(() => {
    console.log('🔄 Running filter logic...')
    console.log('  Total rows:', rows.length)
    let result = rows.map((row, index) => ({ row, originalIndex: index }))

    // Filter by selected rows if toggle is on
    if (showOnlySelected && selectedRows.size > 0) {
      result = result.filter(({ originalIndex }) => selectedRows.has(originalIndex))
      console.log('  After selected rows filter:', result.length, 'rows')
    }

    // Filter by player name (case-insensitive partial match)
    if (nameFilter.trim()) {
      const searchLower = nameFilter.toLowerCase()
      result = result.filter(({ row }) =>
        String(row[0]).toLowerCase().includes(searchLower)
      )
      console.log('  After name filter:', result.length, 'rows')
    }

    // Filter by stat threshold
    if (statColumn && statValue.trim()) {
      const colIndex = headers.indexOf(statColumn)
      console.log('  Stat filter - column:', statColumn, 'index:', colIndex, 'operator:', statOperator, 'value:', statValue)
      if (colIndex !== -1) {
        const threshold = parseFloat(statValue)

        // Only apply filter if threshold is a valid number
        if (!isNaN(threshold)) {
          const beforeCount = result.length
          result = result.filter(({ row }) => {
            const cellValue = parseFloat(row[colIndex])

            // Skip rows where the value isn't a valid number
            if (isNaN(cellValue)) return false

            // Apply the selected operator
            switch (statOperator) {
              case '>':
                return cellValue > threshold
              case '>=':
                return cellValue >= threshold
              case '<':
                return cellValue < threshold
              case '<=':
                return cellValue <= threshold
              case '=':
                return Math.abs(cellValue - threshold) < 0.001 // Float comparison with epsilon
              default:
                return true
            }
          })
          console.log('  After stat filter:', result.length, 'rows (was', beforeCount, ')')
        } else {
          console.log('  ⚠️ Invalid threshold value:', statValue)
        }
      }
    }

    console.log('✅ Final filtered rows:', result.length)
    return {
      filteredRows: result.map(({ row }) => row),
      originalIndices: result.map(({ originalIndex }) => originalIndex)
    }
  }, [rows, headers, nameFilter, statColumn, statOperator, statValue, showOnlySelected, selectedRows])

  // Count active filters
  const activeFilterCount = [
    nameFilter.trim() !== '',
    statColumn && statValue.trim() !== '',
    showOnlySelected && selectedRows.size > 0
  ].filter(Boolean).length

  // Handle row selection
  const handleRowSelect = React.useCallback((originalRowIndex, ctrlKey) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev)
      if (ctrlKey) {
        // Ctrl+Click: toggle row in selection
        if (newSet.has(originalRowIndex)) {
          newSet.delete(originalRowIndex)
        } else {
          newSet.add(originalRowIndex)
        }
      } else {
        // Regular click: select only this row
        newSet.clear()
        newSet.add(originalRowIndex)
      }
      return newSet
    })
  }, [])

  // Clear selection
  const handleClearSelection = React.useCallback(() => {
    setSelectedRows(new Set())
    setShowOnlySelected(false)
  }, [])

  // Clear all filters
  const handleClearFilters = () => {
    setNameFilter('')
    setStatColumn('')
    setStatOperator('>')
    setStatValue('')
    setSelectedRows(new Set())
    setShowOnlySelected(false)
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* Quick filter toolbar */}
      <SpreadsheetQuickFilter
        nameFilter={nameFilter}
        onNameFilterChange={setNameFilter}
        statColumn={statColumn}
        onStatColumnChange={setStatColumn}
        statOperator={statOperator}
        onStatOperatorChange={setStatOperator}
        statValue={statValue}
        onStatValueChange={setStatValue}
        onClearFilters={handleClearFilters}
        activeFilterCount={activeFilterCount}
        numericColumns={numericColumns}
        selectedRowCount={selectedRows.size}
        showOnlySelected={showOnlySelected}
        onShowOnlySelectedChange={setShowOnlySelected}
        onClearSelection={handleClearSelection}
      />

      {/* Spreadsheet content area - flex-1 takes remaining space after toolbar */}
      <div className="flex-1 min-h-0 w-full">
        <Spreadsheet
          data={filteredRows}
          headers={headers}
          originalIndices={originalIndices}
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
        />
      </div>
    </div>
  )
}

const StatsDashboard = ({ data }) => {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/stats'

  return (
    <SidebarProvider className="h-screen">
      <AppSidebar currentPath={currentPath} />
      <SidebarInset className="flex flex-col h-full">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Player Statistics</h1>
          </div>
        </header>
        <div className="flex-1 min-h-0 w-full">
          <StatsContent data={data} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

// Mount React component
if (typeof window !== 'undefined') {
  const statsData = window.STATS_DATA
  const rootElement = document.getElementById('react-root')

  if (rootElement && statsData) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(<StatsDashboard data={statsData} />)
  }
}

export default StatsDashboard
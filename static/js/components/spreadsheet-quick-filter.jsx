import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

// Color mapping for stat categories
const STAT_COLORS = {
  // Counting stats - blue
  'AB': 'bg-blue-100 border-blue-300 text-blue-900',
  'HR': 'bg-blue-100 border-blue-300 text-blue-900',
  'RBI': 'bg-blue-100 border-blue-300 text-blue-900',
  'R': 'bg-blue-100 border-blue-300 text-blue-900',
  'SB': 'bg-blue-100 border-blue-300 text-blue-900',
  // Advanced stats - purple
  'wOBA': 'bg-purple-100 border-purple-300 text-purple-900',
  'wRAA': 'bg-purple-100 border-purple-300 text-purple-900',
  // Average stats - green
  'AVG': 'bg-green-100 border-green-300 text-green-900',
  'OBP': 'bg-green-100 border-green-300 text-green-900',
  'SLG': 'bg-green-100 border-green-300 text-green-900',
  'OPS': 'bg-green-100 border-green-300 text-green-900',
  // Percentage stats - amber
  'K%': 'bg-amber-100 border-amber-300 text-amber-900',
  'BB%': 'bg-amber-100 border-amber-300 text-amber-900',
}

/**
 * Quick filter toolbar for spreadsheet
 * Provides name search and stat threshold filtering
 *
 * @param {Object} props
 * @param {string} props.nameFilter - Current name filter value
 * @param {Function} props.onNameFilterChange - Callback when name filter changes
 * @param {string} props.statColumn - Selected stat column for threshold filter
 * @param {Function} props.onStatColumnChange - Callback when stat column changes
 * @param {string} props.statOperator - Selected operator (>, <, >=, <=, =)
 * @param {Function} props.onStatOperatorChange - Callback when operator changes
 * @param {string} props.statValue - Threshold value for comparison
 * @param {Function} props.onStatValueChange - Callback when value changes
 * @param {Function} props.onClearFilters - Callback to clear all filters
 * @param {number} props.activeFilterCount - Number of active filters
 * @param {string[]} props.numericColumns - Array of column names available for filtering
 * @param {number} props.selectedRowCount - Number of rows selected
 * @param {boolean} props.showOnlySelected - Whether to show only selected rows
 * @param {Function} props.onShowOnlySelectedChange - Callback to toggle show only selected
 * @param {Function} props.onClearSelection - Callback to clear row selection
 */
export function SpreadsheetQuickFilter({
  nameFilter,
  onNameFilterChange,
  statColumn,
  onStatColumnChange,
  statOperator,
  onStatOperatorChange,
  statValue,
  onStatValueChange,
  onClearFilters,
  activeFilterCount,
  numericColumns,
  selectedRowCount,
  showOnlySelected,
  onShowOnlySelectedChange,
  onClearSelection,
}) {
  // Get color class for selected stat
  const statColorClass = statColumn ? STAT_COLORS[statColumn] || 'bg-gray-100 border-gray-300 text-gray-900' : ''

  return (
    <div className="border-b border-border bg-card p-4">
      <div className="flex items-center gap-6 justify-between">
        {/* Left side: Stat threshold filter with inline label */}
        <div className="flex items-center gap-3">
          <Label htmlFor="stat-column" className="text-sm font-medium whitespace-nowrap">
            Filter by Stat
          </Label>

          {/* Column selector */}
          <Select value={statColumn} onValueChange={onStatColumnChange}>
            <SelectTrigger
              id="stat-column"
              className={`h-10 w-[130px] text-base focus:ring-1 focus:ring-offset-0 ${statColorClass}`}
            >
              <SelectValue placeholder="Select stat..." />
            </SelectTrigger>
            <SelectContent>
              {numericColumns.map((col) => (
                <SelectItem key={col} value={col}>
                  {col}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Operator selector - no label */}
          <Select value={statOperator} onValueChange={onStatOperatorChange}>
            <SelectTrigger
              id="stat-operator"
              className="h-10 w-[90px] text-base focus:ring-1 focus:ring-offset-0"
            >
              <SelectValue placeholder="Op" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=">">{'>'}</SelectItem>
              <SelectItem value=">=">{'>='}</SelectItem>
              <SelectItem value="<">{'<'}</SelectItem>
              <SelectItem value="<=">{'<='}</SelectItem>
              <SelectItem value="=">=</SelectItem>
            </SelectContent>
          </Select>

          {/* Value input - no label */}
          <Input
            id="stat-value"
            type="text"
            placeholder="Value"
            value={statValue}
            onChange={(e) => onStatValueChange(e.target.value)}
            className="h-10 w-[110px] text-base focus-visible:ring-1 focus-visible:ring-offset-0"
          />

          {/* Clear filters button */}
          {activeFilterCount > 0 && (
            <Button
              variant="outline"
              size="default"
              onClick={onClearFilters}
              className="h-10"
            >
              <X className="h-4 w-4 mr-2" />
              Clear
              {activeFilterCount > 1 && (
                <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          )}
        </div>

        {/* Center: Row selection controls */}
        {selectedRowCount > 0 && (
          <div className="flex items-center gap-3">
            <Button
              variant={showOnlySelected ? "default" : "outline"}
              size="default"
              onClick={() => onShowOnlySelectedChange(!showOnlySelected)}
              className="h-10"
            >
              {showOnlySelected ? "Showing" : "Show"} Selected
              <Badge
                variant={showOnlySelected ? "outline" : "secondary"}
                className="ml-2 h-5 px-1.5 text-xs"
              >
                {selectedRowCount}
              </Badge>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              className="h-8"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          </div>
        )}

        {/* Right side: Player name search with inline label */}
        <div className="flex items-center gap-3">
          <Label htmlFor="player-search" className="text-sm font-medium whitespace-nowrap">
            Filter by Player Name
          </Label>
          <Input
            id="player-search"
            type="text"
            placeholder="Search player name..."
            value={nameFilter}
            onChange={(e) => onNameFilterChange(e.target.value)}
            className="h-10 w-[300px] text-base focus-visible:ring-1 focus-visible:ring-offset-0"
          />
        </div>
      </div>
    </div>
  )
}
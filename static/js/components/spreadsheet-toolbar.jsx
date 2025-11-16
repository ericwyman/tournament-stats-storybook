import React from 'react'
import { Button } from '@/components/ui/button'
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Download,
  Upload,
  Plus,
  Trash2,
  Save
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'

/**
 * Toolbar for spreadsheet actions (formatting, import/export, etc.)
 */
export function SpreadsheetToolbar() {
  return (
    <div className="border-b border-border bg-card p-2 flex items-center gap-2 flex-wrap">
      {/* File operations */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm">
          <Upload className="h-4 w-4 mr-1" />
          Import
        </Button>
        <Button variant="ghost" size="sm">
          <Download className="h-4 w-4 mr-1" />
          Export
        </Button>
        <Button variant="ghost" size="sm">
          <Save className="h-4 w-4 mr-1" />
          Save
        </Button>
      </div>
      
      <Separator orientation="vertical" className="h-6" />
      
      {/* Row/Column operations */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Row
        </Button>
        <Button variant="ghost" size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Column
        </Button>
        <Button variant="ghost" size="sm">
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </div>
      
      <Separator orientation="vertical" className="h-6" />
      
      {/* Text formatting */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Underline className="h-4 w-4" />
        </Button>
      </div>
      
      <Separator orientation="vertical" className="h-6" />
      
      {/* Alignment */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon">
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

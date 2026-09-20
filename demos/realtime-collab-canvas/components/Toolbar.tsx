'use client'

import { useCollabStore } from '@/lib/store'

const tools = [
  { id: 'select', label: 'Select', icon: '👆' },
  { id: 'rectangle', label: 'Rectangle', icon: '▭' },
  { id: 'circle', label: 'Circle', icon: '◯' },
  { id: 'line', label: 'Line', icon: '⁄' },
] as const

const colors = [
  '#3b82f6',
  '#ef4444',
  '#10b981',
  '#f59e0b',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
  '#64748b',
]

export function Toolbar() {
  const { selectedTool, selectedColor, setSelectedTool, setSelectedColor, shapes, reset } =
    useCollabStore()

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4">
      <div className="flex gap-2">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setSelectedTool(tool.id)}
            className={`px-4 py-2 rounded-lg border-2 transition-all ${
              selectedTool === tool.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            title={tool.label}
          >
            <span className="text-xl">{tool.icon}</span>
          </button>
        ))}
      </div>

      <div className="h-8 w-px bg-gray-300" />

      <div className="flex gap-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              selectedColor === color ? 'border-gray-900 scale-110' : 'border-gray-300'
            }`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>

      <div className="h-8 w-px bg-gray-300" />

      <div className="text-sm text-gray-600">Shapes: {shapes.length}</div>

      <div className="flex-1" />

      <button
        onClick={() => {
          if (confirm('Clear all shapes?')) {
            reset()
          }
        }}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Clear All
      </button>
    </div>
  )
}

'use client'

import { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import type { WorkflowNode } from '@/lib/types'

const nodeColors = {
  llm: 'bg-blue-100 border-blue-400',
  tool: 'bg-green-100 border-green-400',
  condition: 'bg-yellow-100 border-yellow-400',
  webhook: 'bg-purple-100 border-purple-400',
}

const nodeIcons = {
  llm: '🤖',
  tool: '🔧',
  condition: '❓',
  webhook: '🔗',
}

export const NodeComponent = memo(({ data }: NodeProps<WorkflowNode>) => {
  return (
    <div
      className={`px-4 py-2 rounded-lg border-2 shadow-md min-w-[140px] ${
        nodeColors[data.type]
      }`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="flex items-center gap-2">
        <span className="text-xl">{nodeIcons[data.type]}</span>
        <div className="flex-1">
          <div className="font-semibold text-sm">{data.label}</div>
          <div className="text-xs text-gray-600 capitalize">{data.type}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  )
})

NodeComponent.displayName = 'NodeComponent'

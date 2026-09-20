'use client'

import { useWorkflowStore } from '@/lib/store'
import type { NodeType, WorkflowNode } from '@/lib/types'

const nodeTemplates: Array<{ type: NodeType; label: string; icon: string }> = [
  { type: 'llm', label: 'LLM Node', icon: '🤖' },
  { type: 'tool', label: 'Tool Node', icon: '🔧' },
  { type: 'condition', label: 'Condition', icon: '❓' },
  { type: 'webhook', label: 'Webhook', icon: '🔗' },
]

export function Sidebar() {
  const { addNode, nodes } = useWorkflowStore()

  const handleAddNode = (type: NodeType) => {
    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${nodes.length + 1}`,
      config:
        type === 'llm'
          ? { model: 'gpt-4', temperature: 0.7, maxTokens: 1000, systemPrompt: '' }
          : type === 'tool'
          ? { toolName: 'example-tool', parameters: {} }
          : type === 'condition'
          ? { expression: 'input.length > 10', trueLabel: 'True', falseLabel: 'False' }
          : { url: 'https://example.com/webhook', method: 'POST' as const, headers: {} },
      position: { x: 100 + nodes.length * 20, y: 100 + nodes.length * 20 },
    }
    addNode(newNode)
  }

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Workflow Nodes</h2>
      <div className="space-y-2">
        {nodeTemplates.map((template) => (
          <button
            key={template.type}
            onClick={() => handleAddNode(template.type)}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-left flex items-center gap-3"
          >
            <span className="text-2xl">{template.icon}</span>
            <span className="font-medium">{template.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-300">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Statistics</h3>
        <div className="text-sm text-gray-700">
          <div>Total Nodes: {nodes.length}</div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useWorkflowStore } from '@/lib/store'
import type { LLMConfig, ToolConfig, ConditionConfig, WebhookConfig } from '@/lib/types'

export function PropertiesPanel() {
  const { selectedNodeId, nodes, updateNode, deleteNode } = useWorkflowStore()

  const selectedNode = nodes.find((n) => n.id === selectedNodeId)

  if (!selectedNode) {
    return (
      <div className="w-80 bg-gray-50 border-l border-gray-200 p-4">
        <div className="text-gray-500 text-center mt-8">
          Select a node to edit properties
        </div>
      </div>
    )
  }

  const handleLabelChange = (label: string) => {
    updateNode(selectedNode.id, { label })
  }

  const handleConfigChange = (config: LLMConfig | ToolConfig | ConditionConfig | WebhookConfig) => {
    updateNode(selectedNode.id, { config })
  }

  const handleDelete = () => {
    deleteNode(selectedNode.id)
  }

  return (
    <div className="w-80 bg-gray-50 border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Properties</h2>
        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Label</label>
          <input
            type="text"
            value={selectedNode.label}
            onChange={(e) => handleLabelChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <div className="px-3 py-2 bg-gray-200 rounded text-gray-700 capitalize">
            {selectedNode.type}
          </div>
        </div>

        {selectedNode.type === 'llm' && (
          <LLMConfigEditor
            config={selectedNode.config as LLMConfig}
            onChange={handleConfigChange}
          />
        )}
        {selectedNode.type === 'tool' && (
          <ToolConfigEditor
            config={selectedNode.config as ToolConfig}
            onChange={handleConfigChange}
          />
        )}
        {selectedNode.type === 'condition' && (
          <ConditionConfigEditor
            config={selectedNode.config as ConditionConfig}
            onChange={handleConfigChange}
          />
        )}
        {selectedNode.type === 'webhook' && (
          <WebhookConfigEditor
            config={selectedNode.config as WebhookConfig}
            onChange={handleConfigChange}
          />
        )}
      </div>
    </div>
  )
}

function LLMConfigEditor({
  config,
  onChange,
}: {
  config: LLMConfig
  onChange: (config: LLMConfig) => void
}) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-1">Model</label>
        <input
          type="text"
          value={config.model}
          onChange={(e) => onChange({ ...config, model: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Temperature</label>
        <input
          type="number"
          min="0"
          max="2"
          step="0.1"
          value={config.temperature}
          onChange={(e) => onChange({ ...config, temperature: parseFloat(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Max Tokens</label>
        <input
          type="number"
          value={config.maxTokens}
          onChange={(e) => onChange({ ...config, maxTokens: parseInt(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">System Prompt</label>
        <textarea
          value={config.systemPrompt}
          onChange={(e) => onChange({ ...config, systemPrompt: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>
    </>
  )
}

function ToolConfigEditor({
  config,
  onChange,
}: {
  config: ToolConfig
  onChange: (config: ToolConfig) => void
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Tool Name</label>
      <input
        type="text"
        value={config.toolName}
        onChange={(e) => onChange({ ...config, toolName: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

function ConditionConfigEditor({
  config,
  onChange,
}: {
  config: ConditionConfig
  onChange: (config: ConditionConfig) => void
}) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-1">Expression</label>
        <input
          type="text"
          value={config.expression}
          onChange={(e) => onChange({ ...config, expression: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">True Label</label>
        <input
          type="text"
          value={config.trueLabel}
          onChange={(e) => onChange({ ...config, trueLabel: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">False Label</label>
        <input
          type="text"
          value={config.falseLabel}
          onChange={(e) => onChange({ ...config, falseLabel: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </>
  )
}

function WebhookConfigEditor({
  config,
  onChange,
}: {
  config: WebhookConfig
  onChange: (config: WebhookConfig) => void
}) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-1">URL</label>
        <input
          type="url"
          value={config.url}
          onChange={(e) => onChange({ ...config, url: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Method</label>
        <select
          value={config.method}
          onChange={(e) => onChange({ ...config, method: e.target.value as 'GET' | 'POST' | 'PUT' })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
        </select>
      </div>
    </>
  )
}

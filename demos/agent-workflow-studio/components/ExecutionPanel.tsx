'use client'

import { useState } from 'react'
import { useWorkflowStore } from '@/lib/store'
import { WorkflowExecutor } from '@/lib/executor'
import type { ExecutionTrace } from '@/lib/types'

export function ExecutionPanel() {
  const { nodes, edges, execution, setExecution } = useWorkflowStore()
  const [isRunning, setIsRunning] = useState(false)
  const [traces, setTraces] = useState<ExecutionTrace[]>([])

  const handleRun = async () => {
    if (nodes.length === 0) {
      alert('Add some nodes first!')
      return
    }

    setIsRunning(true)
    setTraces([])

    const newExecution = {
      id: `exec-${Date.now()}`,
      startTime: Date.now(),
      status: 'running' as const,
      traces: [],
    }
    setExecution(newExecution)

    const executor = new WorkflowExecutor(nodes, edges, (updatedTraces) => {
      setTraces(updatedTraces)
    })

    try {
      await executor.execute(nodes[0].id)
      setExecution({
        ...newExecution,
        endTime: Date.now(),
        status: 'completed',
      })
    } catch (error) {
      setExecution({
        ...newExecution,
        endTime: Date.now(),
        status: 'failed',
      })
    } finally {
      setIsRunning(false)
    }
  }

  const handleClear = () => {
    setTraces([])
    setExecution(null)
  }

  return (
    <div className="h-80 bg-white border-t border-gray-200 flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
        <h3 className="font-bold">Execution Traces</h3>
        <div className="flex gap-2">
          <button
            onClick={handleRun}
            disabled={isRunning || nodes.length === 0}
            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isRunning ? 'Running...' : 'Run Workflow'}
          </button>
          <button
            onClick={handleClear}
            disabled={traces.length === 0}
            className="px-4 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {traces.length === 0 ? (
          <div className="text-gray-500 text-center mt-8">
            Click &quot;Run Workflow&quot; to see execution traces
          </div>
        ) : (
          traces.map((trace, idx) => (
            <div
              key={idx}
              className={`p-3 rounded border ${
                trace.status === 'running'
                  ? 'border-blue-300 bg-blue-50'
                  : trace.status === 'success'
                  ? 'border-green-300 bg-green-50'
                  : 'border-red-300 bg-red-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm">{trace.nodeLabel}</span>
                <span className="text-xs text-gray-600">
                  {trace.duration ? `${trace.duration}ms` : '...'}
                </span>
              </div>
              {trace.input && (
                <div className="text-xs text-gray-600 mb-1">
                  <span className="font-medium">Input:</span> {trace.input}
                </div>
              )}
              {trace.output && (
                <div className="text-xs text-gray-700">
                  <span className="font-medium">Output:</span> {trace.output}
                </div>
              )}
              {trace.error && (
                <div className="text-xs text-red-700">
                  <span className="font-medium">Error:</span> {trace.error}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

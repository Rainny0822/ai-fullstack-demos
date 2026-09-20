'use client'

import { Sidebar } from '@/components/Sidebar'
import { WorkflowCanvas } from '@/components/WorkflowCanvas'
import { PropertiesPanel } from '@/components/PropertiesPanel'
import { ExecutionPanel } from '@/components/ExecutionPanel'

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 shadow-lg">
        <h1 className="text-2xl font-bold">Agent Workflow Studio</h1>
        <p className="text-sm text-blue-100">Visual AI agent workflow builder</p>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <div className="flex-1">
            <WorkflowCanvas />
          </div>
          <ExecutionPanel />
        </main>
        <PropertiesPanel />
      </div>
    </div>
  )
}

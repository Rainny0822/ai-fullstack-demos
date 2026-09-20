import { create } from 'zustand'
import type { WorkflowNode, WorkflowEdge, WorkflowExecution } from './types'

interface WorkflowStore {
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  selectedNodeId: string | null
  execution: WorkflowExecution | null
  
  addNode: (node: WorkflowNode) => void
  updateNode: (id: string, updates: Partial<WorkflowNode>) => void
  deleteNode: (id: string) => void
  
  addEdge: (edge: WorkflowEdge) => void
  deleteEdge: (id: string) => void
  
  setSelectedNode: (id: string | null) => void
  
  setExecution: (execution: WorkflowExecution | null) => void
  updateExecution: (updates: Partial<WorkflowExecution>) => void
  
  reset: () => void
}

export const useWorkflowStore = create<WorkflowStore>((set) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  execution: null,
  
  addNode: (node) =>
    set((state) => ({ nodes: [...state.nodes, node] })),
  
  updateNode: (id, updates) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === id ? { ...n, ...updates } : n
      ),
    })),
  
  deleteNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
      edges: state.edges.filter((e) => e.source !== id && e.target !== id),
      selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
    })),
  
  addEdge: (edge) =>
    set((state) => ({ edges: [...state.edges, edge] })),
  
  deleteEdge: (id) =>
    set((state) => ({
      edges: state.edges.filter((e) => e.id !== id),
    })),
  
  setSelectedNode: (id) =>
    set({ selectedNodeId: id }),
  
  setExecution: (execution) =>
    set({ execution }),
  
  updateExecution: (updates) =>
    set((state) => ({
      execution: state.execution
        ? { ...state.execution, ...updates }
        : null,
    })),
  
  reset: () =>
    set({
      nodes: [],
      edges: [],
      selectedNodeId: null,
      execution: null,
    }),
}))

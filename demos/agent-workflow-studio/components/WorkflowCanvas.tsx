'use client'

import { useCallback, useMemo } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  MiniMap,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { useWorkflowStore } from '@/lib/store'
import type { WorkflowNode as WNode, WorkflowEdge as WEdge } from '@/lib/types'
import { NodeComponent } from './NodeComponent'

const nodeTypes = {
  custom: NodeComponent,
}

export function WorkflowCanvas() {
  const { nodes: storeNodes, edges: storeEdges, addEdge: addStoreEdge, setSelectedNode } = useWorkflowStore()

  const reactFlowNodes: Node[] = useMemo(
    () =>
      storeNodes.map((n) => ({
        id: n.id,
        type: 'custom',
        position: n.position,
        data: n,
      })),
    [storeNodes]
  )

  const reactFlowEdges: Edge[] = useMemo(
    () =>
      storeEdges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label,
        animated: true,
      })),
    [storeEdges]
  )

  const [nodes, , onNodesChange] = useNodesState(reactFlowNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(reactFlowEdges)

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge: WEdge = {
        id: `e${params.source}-${params.target}`,
        source: params.source!,
        target: params.target!,
      }
      addStoreEdge(newEdge)
      setEdges((eds) => addEdge(params, eds))
    },
    [addStoreEdge, setEdges]
  )

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      setSelectedNode(node.id)
    },
    [setSelectedNode]
  )

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}

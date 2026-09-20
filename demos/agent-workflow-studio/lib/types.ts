import { z } from 'zod'

export const NodeTypeSchema = z.enum(['llm', 'tool', 'condition', 'webhook'])
export type NodeType = z.infer<typeof NodeTypeSchema>

export const LLMConfigSchema = z.object({
  model: z.string().default('gpt-4'),
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().int().positive().default(1000),
  systemPrompt: z.string().default(''),
})

export const ToolConfigSchema = z.object({
  toolName: z.string().min(1),
  parameters: z.record(z.unknown()).default({}),
})

export const ConditionConfigSchema = z.object({
  expression: z.string().min(1),
  trueLabel: z.string().default('True'),
  falseLabel: z.string().default('False'),
})

export const WebhookConfigSchema = z.object({
  url: z.string().url(),
  method: z.enum(['GET', 'POST', 'PUT']).default('POST'),
  headers: z.record(z.string()).default({}),
})

export const WorkflowNodeSchema = z.object({
  id: z.string(),
  type: NodeTypeSchema,
  label: z.string(),
  config: z.union([
    LLMConfigSchema,
    ToolConfigSchema,
    ConditionConfigSchema,
    WebhookConfigSchema,
  ]),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
})

export const WorkflowEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  label: z.string().optional(),
})

export type WorkflowNode = z.infer<typeof WorkflowNodeSchema>
export type WorkflowEdge = z.infer<typeof WorkflowEdgeSchema>
export type LLMConfig = z.infer<typeof LLMConfigSchema>
export type ToolConfig = z.infer<typeof ToolConfigSchema>
export type ConditionConfig = z.infer<typeof ConditionConfigSchema>
export type WebhookConfig = z.infer<typeof WebhookConfigSchema>

export interface ExecutionTrace {
  nodeId: string
  nodeLabel: string
  timestamp: number
  status: 'running' | 'success' | 'error'
  input?: string
  output?: string
  error?: string
  duration?: number
}

export interface WorkflowExecution {
  id: string
  startTime: number
  endTime?: number
  status: 'running' | 'completed' | 'failed'
  traces: ExecutionTrace[]
}

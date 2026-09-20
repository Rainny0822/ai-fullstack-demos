import type {
  WorkflowNode,
  WorkflowEdge,
  ExecutionTrace,
  LLMConfig,
  ToolConfig,
  ConditionConfig,
  WebhookConfig,
} from './types'

export class WorkflowExecutor {
  private nodes: Map<string, WorkflowNode>
  private edges: WorkflowEdge[]
  private traces: ExecutionTrace[] = []
  private onTraceUpdate: (traces: ExecutionTrace[]) => void

  constructor(
    nodes: WorkflowNode[],
    edges: WorkflowEdge[],
    onTraceUpdate: (traces: ExecutionTrace[]) => void
  ) {
    this.nodes = new Map(nodes.map((n) => [n.id, n]))
    this.edges = edges
    this.onTraceUpdate = onTraceUpdate
  }

  async execute(startNodeId: string): Promise<void> {
    this.traces = []
    await this.executeNode(startNodeId, '')
  }

  private async executeNode(nodeId: string, input: string): Promise<void> {
    const node = this.nodes.get(nodeId)
    if (!node) return

    const trace: ExecutionTrace = {
      nodeId: node.id,
      nodeLabel: node.label,
      timestamp: Date.now(),
      status: 'running',
      input,
    }
    this.traces.push(trace)
    this.onTraceUpdate([...this.traces])

    await this.delay(500)

    try {
      let output = ''
      const startTime = Date.now()

      switch (node.type) {
        case 'llm':
          output = await this.executeLLM(node.config as LLMConfig, input)
          break
        case 'tool':
          output = await this.executeTool(node.config as ToolConfig, input)
          break
        case 'condition':
          output = await this.executeCondition(node.config as ConditionConfig, input)
          break
        case 'webhook':
          output = await this.executeWebhook(node.config as WebhookConfig, input)
          break
      }

      const duration = Date.now() - startTime
      trace.status = 'success'
      trace.output = output
      trace.duration = duration
      this.onTraceUpdate([...this.traces])

      await this.delay(300)

      const nextEdges = this.edges.filter((e) => e.source === nodeId)
      for (const edge of nextEdges) {
        if (node.type === 'condition' && edge.label) {
          if (
            (output === 'true' && edge.label.toLowerCase() === 'true') ||
            (output === 'false' && edge.label.toLowerCase() === 'false')
          ) {
            await this.executeNode(edge.target, output)
          }
        } else {
          await this.executeNode(edge.target, output)
        }
      }
    } catch (error) {
      trace.status = 'error'
      trace.error = error instanceof Error ? error.message : 'Unknown error'
      this.onTraceUpdate([...this.traces])
    }
  }

  private async executeLLM(config: LLMConfig, input: string): Promise<string> {
    await this.delay(800)
    const mockResponses = [
      `Analyzed input: "${input}". Generated response using ${config.model} with temperature ${config.temperature}.`,
      'Based on the context, here is my recommendation...',
      'Processing complete. The optimal approach would be...',
    ]
    return mockResponses[Math.floor(Math.random() * mockResponses.length)]
  }

  private async executeTool(config: ToolConfig, input: string): Promise<string> {
    await this.delay(600)
    return `Executed tool "${config.toolName}" with input: ${input}. Result: success.`
  }

  private async executeCondition(
    config: ConditionConfig,
    input: string
  ): Promise<string> {
    await this.delay(300)
    const result = Math.random() > 0.5
    return result ? 'true' : 'false'
  }

  private async executeWebhook(
    config: WebhookConfig,
    input: string
  ): Promise<string> {
    await this.delay(700)
    return `Webhook ${config.method} request sent to ${config.url}. Status: 200 OK`
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

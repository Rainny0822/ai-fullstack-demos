# Agent Workflow Studio

A visual AI agent workflow builder with drag-and-drop node composition, real-time execution traces, and type-safe configuration validation.

## Features

- **Visual Workflow Builder**: Drag and drop LLM, Tool, Condition, and Webhook nodes
- **Real-time Execution**: Run workflows with streaming execution traces
- **Type-Safe**: Zod schema validation for all node configurations
- **State Management**: Zustand for performant global state
- **Modern UI**: Clean Tailwind CSS design with React Flow for graph visualization

## Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **State**: Zustand for workflow state
- **Validation**: Zod schemas for node configs
- **UI**: Tailwind CSS + React Flow
- **Styling**: Tailwind utility classes

### Project Structure
```
agent-workflow-studio/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main workflow editor
│   └── globals.css      # Global styles
├── components/
│   ├── WorkflowCanvas.tsx      # React Flow canvas
│   ├── NodeComponent.tsx       # Custom node renderer
│   ├── Sidebar.tsx             # Node palette
│   ├── PropertiesPanel.tsx     # Node config editor
│   └── ExecutionPanel.tsx      # Trace viewer
├── lib/
│   ├── types.ts         # Zod schemas & TypeScript types
│   ├── store.ts         # Zustand store
│   └── executor.ts      # Mock workflow executor
└── README.md
```

### Node Types

1. **LLM Node**: Configure model, temperature, max tokens, system prompt
2. **Tool Node**: Execute custom tools with parameters
3. **Condition Node**: Branch workflows based on boolean conditions
4. **Webhook Node**: HTTP requests to external services

### Execution Flow

1. User builds workflow by adding nodes and connecting edges
2. Click "Run Workflow" to start execution from the first node
3. Executor processes nodes sequentially with mock delays
4. Traces stream in real-time to the Execution Panel
5. Conditions create branches (true/false paths)

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
cd demos/agent-workflow-studio
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
npm start
```

## Usage

1. **Add Nodes**: Click node types in the left sidebar to add them to the canvas
2. **Connect Nodes**: Drag from the bottom handle of one node to the top handle of another
3. **Configure**: Click a node to edit its properties in the right panel
4. **Execute**: Click "Run Workflow" to see mock execution traces
5. **Iterate**: Modify the workflow and re-run as needed

## Configuration

All node configurations are validated with Zod schemas. See `lib/types.ts` for schema definitions.

### Example LLM Config
```typescript
{
  model: "gpt-4",
  temperature: 0.7,
  maxTokens: 1000,
  systemPrompt: "You are a helpful assistant"
}
```

### Example Condition Config
```typescript
{
  expression: "input.length > 10",
  trueLabel: "Long",
  falseLabel: "Short"
}
```

## Mock Execution

This demo uses mock execution with simulated delays and responses. In production, you would:
- Replace `WorkflowExecutor` with real LLM API calls
- Connect tools to actual services
- Implement real condition evaluation
- Send actual HTTP requests for webhooks

## License

MIT

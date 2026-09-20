# Realtime Collab Canvas

A collaborative whiteboard with real-time presence, live cursors, and optimistic updates. Built with Next.js, TypeScript, and in-memory collaboration (no Redis required).

## Features

- **Real-time Collaboration**: Multiple users drawing together
- **Live Cursors**: See where others are pointing in real-time
- **Presence List**: View active users with color-coded avatars
- **Drawing Tools**: Rectangle, circle, line, and selection tools
- **Optimistic Updates**: Instant feedback with mock WebSocket
- **Reconnection Status**: Visual indicators for connection state
- **Clean UI**: Modern Tailwind design with smooth interactions

## Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **State**: Zustand for global drawing state
- **UI**: Tailwind CSS
- **Collaboration**: Mock WebSocket (in-memory, no server required)

### Project Structure
```
realtime-collab-canvas/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main canvas view
│   └── globals.css      # Global styles + cursor CSS
├── components/
│   ├── Canvas.tsx       # Drawing canvas with shapes
│   ├── Toolbar.tsx      # Tool and color picker
│   ├── PresenceList.tsx # Active users sidebar
│   └── Cursors.tsx      # Live cursor overlays
├── lib/
│   ├── types.ts         # TypeScript interfaces
│   ├── store.ts         # Zustand store
│   └── mockSocket.ts    # In-memory WebSocket simulation
└── README.md
```

### Collaboration Model

**In-Memory Mock**: This demo simulates real-time collaboration without requiring a WebSocket server or Redis. The `MockSocket` class:
- Emits cursor positions and shape updates
- Simulates other users joining and moving cursors
- Provides reconnection logic with status indicators

**Production Migration**: To make this production-ready:
1. Replace `MockSocket` with a real WebSocket client (socket.io, Pusher, Ably)
2. Add backend API routes for persisting shapes
3. Implement conflict resolution (CRDT or operational transforms)
4. Add user authentication

### Drawing System

- **Shapes**: Rectangle, circle, line (text placeholder ready)
- **Optimistic Rendering**: Local shapes appear instantly
- **Preview**: Live shape preview while dragging
- **Color Picker**: 8 predefined colors with visual selection

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
cd demos/realtime-collab-canvas
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

1. **Select Tool**: Click a tool in the toolbar (Rectangle, Circle, Line)
2. **Choose Color**: Pick a color from the palette
3. **Draw**: Click and drag on the canvas to create shapes
4. **Watch Cursors**: See mock users' cursors moving around (simulated)
5. **View Presence**: Check the right sidebar for active users

## Mock Collaboration

The demo includes simulated users (Alice and Bob) who periodically move their cursors. This demonstrates:
- Real-time cursor tracking
- User presence management
- Connection status indicators
- Stale user cleanup (inactive for 10s)

## Performance

- Zustand for minimal re-renders
- Optimistic updates (no network wait)
- CSS transforms for cursor animation
- Efficient shape rendering with React keys

## License

MIT

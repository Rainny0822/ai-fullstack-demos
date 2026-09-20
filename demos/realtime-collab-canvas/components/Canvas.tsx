'use client'

import { useRef, useEffect, useState } from 'react'
import { useCollabStore } from '@/lib/store'
import type { Shape } from '@/lib/types'

export function Canvas() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null)
  const [previewShape, setPreviewShape] = useState<Shape | null>(null)

  const {
    shapes,
    selectedTool,
    selectedColor,
    localUserId,
    addShape,
    updateUser,
  } = useCollabStore()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return

      const rect = canvasRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      updateUser(localUserId, {
        cursor: { x, y },
        lastSeen: Date.now(),
      })

      if (isDrawing && startPos) {
        const width = x - startPos.x
        const height = y - startPos.y

        if (selectedTool === 'rectangle') {
          setPreviewShape({
            id: 'preview',
            type: 'rectangle',
            x: startPos.x,
            y: startPos.y,
            width: Math.abs(width),
            height: Math.abs(height),
            color: selectedColor,
            userId: localUserId,
            createdAt: Date.now(),
          })
        } else if (selectedTool === 'circle') {
          const radius = Math.sqrt(width * width + height * height)
          setPreviewShape({
            id: 'preview',
            type: 'circle',
            x: startPos.x,
            y: startPos.y,
            radius,
            color: selectedColor,
            userId: localUserId,
            createdAt: Date.now(),
          })
        } else if (selectedTool === 'line') {
          setPreviewShape({
            id: 'preview',
            type: 'line',
            x: startPos.x,
            y: startPos.y,
            endX: x,
            endY: y,
            color: selectedColor,
            userId: localUserId,
            createdAt: Date.now(),
          })
        }
      }
    }

    if (canvasRef.current) {
      canvasRef.current.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [localUserId, updateUser, isDrawing, startPos, selectedTool, selectedColor])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (selectedTool === 'select') return

    const rect = canvasRef.current!.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setIsDrawing(true)
    setStartPos({ x, y })
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDrawing || !startPos) return

    const rect = canvasRef.current!.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const width = x - startPos.x
    const height = y - startPos.y

    let newShape: Shape | null = null

    if (selectedTool === 'rectangle' && (Math.abs(width) > 5 || Math.abs(height) > 5)) {
      newShape = {
        id: `shape-${Date.now()}`,
        type: 'rectangle',
        x: startPos.x,
        y: startPos.y,
        width: Math.abs(width),
        height: Math.abs(height),
        color: selectedColor,
        userId: localUserId,
        createdAt: Date.now(),
      }
    } else if (selectedTool === 'circle') {
      const radius = Math.sqrt(width * width + height * height)
      if (radius > 5) {
        newShape = {
          id: `shape-${Date.now()}`,
          type: 'circle',
          x: startPos.x,
          y: startPos.y,
          radius,
          color: selectedColor,
          userId: localUserId,
          createdAt: Date.now(),
        }
      }
    } else if (selectedTool === 'line') {
      if (Math.abs(width) > 5 || Math.abs(height) > 5) {
        newShape = {
          id: `shape-${Date.now()}`,
          type: 'line',
          x: startPos.x,
          y: startPos.y,
          endX: x,
          endY: y,
          color: selectedColor,
          userId: localUserId,
          createdAt: Date.now(),
        }
      }
    }

    if (newShape) {
      addShape(newShape)
    }

    setIsDrawing(false)
    setStartPos(null)
    setPreviewShape(null)
  }

  const renderShape = (shape: Shape) => {
    if (shape.type === 'rectangle') {
      return (
        <div
          key={shape.id}
          className="absolute border-2"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.width,
            height: shape.height,
            borderColor: shape.color,
            backgroundColor: `${shape.color}20`,
          }}
        />
      )
    } else if (shape.type === 'circle') {
      return (
        <div
          key={shape.id}
          className="absolute border-2 rounded-full"
          style={{
            left: shape.x - (shape.radius || 0),
            top: shape.y - (shape.radius || 0),
            width: (shape.radius || 0) * 2,
            height: (shape.radius || 0) * 2,
            borderColor: shape.color,
            backgroundColor: `${shape.color}20`,
          }}
        />
      )
    } else if (shape.type === 'line') {
      const length = Math.sqrt(
        Math.pow((shape.endX || 0) - shape.x, 2) +
          Math.pow((shape.endY || 0) - shape.y, 2)
      )
      const angle =
        Math.atan2((shape.endY || 0) - shape.y, (shape.endX || 0) - shape.x) *
        (180 / Math.PI)

      return (
        <div
          key={shape.id}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
            width: length,
            height: 2,
            backgroundColor: shape.color,
            transformOrigin: '0 0',
            transform: `rotate(${angle}deg)`,
          }}
        />
      )
    }
    return null
  }

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-full bg-white"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ cursor: selectedTool === 'select' ? 'default' : 'crosshair' }}
    >
      {shapes.map((shape) => renderShape(shape))}
      {previewShape && renderShape(previewShape)}
    </div>
  )
}

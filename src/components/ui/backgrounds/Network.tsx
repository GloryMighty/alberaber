"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"

interface Node {
  id: number
  x: number
  y: number
}

interface Connection {
  id: string
  points: { x: number; y: number }[]
}

interface NetworkBackgroundProps {
  nodeCount?: number
  className?: string
  opacity?: number
  strokeColor?: string
  heightMultiplier?: number
}

const NetworkBackground: React.FC<NetworkBackgroundProps> = ({ 
  nodeCount = 49, 
  className = "absolute inset-0", 
  opacity = 1,
  strokeColor = "rgba(255, 255, 255, 0.2)",
  heightMultiplier = 1
}) => {
  const [nodes, setNodes] = useState<Node[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const updateDimensions = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight * heightMultiplier
    })
  }, [heightMultiplier])

  useEffect(() => {
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [updateDimensions])

  const generateGeometricConnections = useCallback((nodes: Node[]) => {
    const gridSize = Math.ceil(Math.sqrt(nodes.length))
    const connections: Connection[] = []

    const addConnection = (points: { x: number; y: number }[]) => {
      connections.push({ id: `connection-${connections.length}`, points })
    }

    // Triangles
    for (let i = 0; i < nodes.length - gridSize - 1; i++) {
      if ((i + 1) % gridSize !== 0) {
        addConnection([
          { x: nodes[i].x, y: nodes[i].y },
          { x: nodes[i + 1].x, y: nodes[i + 1].y },
          { x: nodes[i + gridSize].x, y: nodes[i + gridSize].y },
        ])
      }
    }

    // Squares
    for (let i = 0; i < nodes.length - gridSize - 1; i++) {
      if ((i + 1) % gridSize !== 0) {
        addConnection([
          { x: nodes[i].x, y: nodes[i].y },
          { x: nodes[i + 1].x, y: nodes[i + 1].y },
          { x: nodes[i + gridSize + 1].x, y: nodes[i + gridSize + 1].y },
          { x: nodes[i + gridSize].x, y: nodes[i + gridSize].y },
        ])
      }
    }

    // Rectangles
    for (let i = 0; i < nodes.length - gridSize * 2 - 2; i++) {
      if ((i + 2) % gridSize !== 0 && (i + 1) % gridSize !== 0) {
        addConnection([
          { x: nodes[i].x, y: nodes[i].y },
          { x: nodes[i + 2].x, y: nodes[i + 2].y },
          { x: nodes[i + gridSize * 2 + 2].x, y: nodes[i + gridSize * 2 + 2].y },
          { x: nodes[i + gridSize * 2].x, y: nodes[i + gridSize * 2].y },
        ])
      }
    }

    return connections
  }, [])

  useEffect(() => {
    const gridSize = Math.ceil(Math.sqrt(nodeCount))
    const cellWidth = dimensions.width / gridSize
    const cellHeight = dimensions.height / gridSize

    const newNodes = Array.from({ length: nodeCount }, (_, i) => {
      const row = Math.floor(i / gridSize)
      const col = i % gridSize
      return {
        id: i,
        x: (col + 0.5) * cellWidth,
        y: (row + 0.5) * cellHeight,
      }
    })
    setNodes(newNodes)

    const newConnections = generateGeometricConnections(newNodes)
    setConnections(newConnections)
  }, [dimensions, nodeCount, generateGeometricConnections])

  return (
    <div className={`${className} pointer-events-none`}>
      <svg className="w-full h-full">
        {connections.map((connection) => (
          <motion.path
            key={connection.id}
            d={`M ${connection.points.map((p) => `${p.x} ${p.y}`).join(" L ")}`}
            stroke={strokeColor}
            strokeWidth={1}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: [0, 1, 1, 0],
              pathOffset: [0, 0, 1, 1],
              transition: {
                duration: 8,
                times: [0, 0.4, 0.6, 1],
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
              },
            }}
            style={{ opacity }}
          />
        ))}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={2}
            fill="white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ opacity }}
          />
        ))}
      </svg>
    </div>
  )
}

export default NetworkBackground

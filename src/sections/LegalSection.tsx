import React, { useState, useEffect, useCallback } from 'react';
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

// Section-specific network background
const LegalSectionBackground: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([])
  const [connections, setConnections] = useState<Connection[]>([])

  const generateNodes = useCallback(() => {
    const nodeCount = 25
    const gridSize = 5
    const width = 100  // percentage-based
    const height = 100 // percentage-based

    const newNodes = Array.from({ length: nodeCount }, (_, i) => {
      const row = Math.floor(i / gridSize)
      const col = i % gridSize
      return {
        id: i,
        x: ((col + 0.5) * width) / gridSize,
        y: ((row + 0.5) * height) / gridSize,
      }
    })
    setNodes(newNodes)

    const connections: Connection[] = []
    const addConnection = (points: { x: number; y: number }[]) => {
      connections.push({ id: `connection-${connections.length}`, points })
    }

    // Create some simple connections
    for (let i = 0; i < newNodes.length - gridSize - 1; i++) {
      if ((i + 1) % gridSize !== 0) {
        addConnection([
          { x: newNodes[i].x, y: newNodes[i].y },
          { x: newNodes[i + 1].x, y: newNodes[i + 1].y },
          { x: newNodes[i + gridSize].x, y: newNodes[i + gridSize].y },
        ])
      }
    }

    setConnections(connections)
  }, [])

  useEffect(() => {
    generateNodes()
  }, [generateNodes])

  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none" 
      preserveAspectRatio="none" 
      viewBox="0 0 100 100"
    >
      {connections.map((connection) => (
        <motion.path
          key={connection.id}
          d={`M ${connection.points.map((p) => `${p.x} ${p.y}`).join(" L ")}`}
          stroke="rgba(100, 100, 100, 0.2)"
          strokeWidth={0.5}
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: [0, 1, 1, 0],
            transition: {
              duration: 5,
              times: [0, 0.5, 1],
              repeat: Number.POSITIVE_INFINITY,
            },
          }}
        />
      ))}
      {nodes.map((node) => (
        <motion.circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r={0.5}
          fill="rgba(150, 150, 150, 0.3)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      ))}
    </svg>
  )
}

// Section for legal information and policies
const LegalSection: React.FC = () => {
  const legalLinks = [
    { title: 'Terms of Service', href: '/terms' },
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Cookie Policy', href: '/cookies' }
  ];

  return (
    <section 
      id="legal-section" 
      className="relative min-h-[50vh] bg-gray-100 flex items-end justify-center py-12 overflow-hidden"
    >
      {/* Section-specific network background */}
      <div className="absolute inset-0 z-0 opacity-50">
        <LegalSectionBackground />
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Terms and Policies
          </h2>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            We are committed to transparency and user protection.
          </p>
          <div className="space-y-3">
            {legalLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="block text-social-primary hover:underline text-sm sm:text-base"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalSection;

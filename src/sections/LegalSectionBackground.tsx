import React, { useState, useEffect, useCallback } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
}

interface Connection {
  id: string;
  points: { x: number; y: number }[];
}

// Section-specific network background for Legal Section
const LegalSectionBackground: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  const generateNodes = useCallback(() => {
    const nodeCount = 25;
    const gridSize = 5;
    const width = 100;  // percentage-based
    const height = 100; // percentage-based

    const newNodes = Array.from({ length: nodeCount }, (_, i) => {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      return {
        id: i,
        x: ((col + 0.5) * width) / gridSize,
        y: ((row + 0.5) * height) / gridSize,
      };
    });
    setNodes(newNodes);

    const connections: Connection[] = [];
    const addConnection = (points: { x: number; y: number }[]) => {
      connections.push({ id: `connection-${connections.length}`, points });
    };

    // Create some simple connections
    for (let i = 0; i < newNodes.length - gridSize - 1; i++) {
      if ((i + 1) % gridSize !== 0) {
        addConnection([
          { x: newNodes[i].x, y: newNodes[i].y },
          { x: newNodes[i + 1].x, y: newNodes[i + 1].y },
          { x: newNodes[i + gridSize].x, y: newNodes[i + gridSize].y },
        ]);
      }
    }

    setConnections(connections);
  }, []);

  useEffect(() => {
    generateNodes();
  }, [generateNodes]);

  return (
    <svg 
      viewBox="0 0 100 100" 
      preserveAspectRatio="none" 
      className="absolute inset-0 w-full h-full opacity-10"
    >
      {/* Render nodes */}
      {nodes.map(node => (
        <circle 
          key={node.id}
          cx={node.x} 
          cy={node.y} 
          r="1" 
          fill="rgba(255,255,255,0.1)" 
        />
      ))}

      {/* Render connections */}
      {connections.map(connection => (
        <polyline
          key={connection.id}
          points={connection.points.map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="0.5"
        />
      ))}
    </svg>
  );
};

export default LegalSectionBackground;

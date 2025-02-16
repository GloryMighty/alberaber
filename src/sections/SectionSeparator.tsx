import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/*
  SectionSeparator
  ---------------
  Creates a sophisticated transition between sections
  using a network-like background with gradient overlay.
  Mimics the design language of our application sections.
*/

interface SectionSeparatorProps {
  className?: string;
  prevSectionBackground?: string;
  nextSectionBackground?: string;
}

const SectionSeparator: React.FC<SectionSeparatorProps> = ({ 
  className = '', 
  prevSectionBackground = 'bg-[#030303]',
  nextSectionBackground = 'bg-[#030303]'
}) => {
  // Generate random network-like nodes
  const nodes = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 1
    }));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className={`
        absolute 
        left-0 
        right-0 
        -bottom-1 
        z-10 
        overflow-hidden 
        h-[120px]
        ${className}
      `}
    >
      {/* Network Background */}
      <svg 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none" 
        className="absolute inset-0 w-full h-full opacity-10"
      >
        {nodes.map((node, index) => (
          <React.Fragment key={index}>
            {/* Nodes */}
            <circle 
              cx={node.x} 
              cy={node.y} 
              r={node.size} 
              fill="rgba(255,255,255,0.1)" 
            />
            
            {/* Random Connections */}
            {index > 0 && (
              <line
                x1={nodes[index-1].x}
                y1={nodes[index-1].y}
                x2={node.x}
                y2={node.y}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="0.5"
              />
            )}
          </React.Fragment>
        ))}
      </svg>

      {/* Wave Separator with Gradient */}
      <svg 
        viewBox="0 0 1440 120" 
        preserveAspectRatio="none" 
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="separatorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop 
              offset="0%" 
              stopColor="rgba(3,3,3,0.5)" 
              stopOpacity="1" 
            />
            <stop 
              offset="50%" 
              stopColor="rgba(3,3,3,0.8)" 
              stopOpacity="1" 
            />
            <stop 
              offset="100%" 
              stopColor="rgba(3,3,3,0.5)" 
              stopOpacity="1" 
            />
          </linearGradient>
        </defs>
        <path 
          d="M0,0 
             C480,60 960,30 1440,0 
             L1440,120 
             L0,120 Z" 
          fill="url(#separatorGradient)"
        />
      </svg>
    </motion.div>
  );
};

export default SectionSeparator;

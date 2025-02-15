import React from 'react';
import { motion } from 'framer-motion';

interface GlassSeparatorProps {
  className?: string;
  height?: number;
  variant?: 'dark' | 'metallic' | 'subtle';
}

const GlassSeparator: React.FC<GlassSeparatorProps> = ({ 
  className = '', 
  height = 2,
  variant = 'metallic'
}) => {
  // Variant styles for different metallic and dark looks
  const variantStyles = {
    dark: `
      bg-gray-900/50 
      backdrop-blur-md 
      border-gray-800/30 
      shadow-xl
    `,
    metallic: `
      bg-gray-800/60 
      backdrop-blur-lg 
      border-gray-700/40 
      shadow-2xl
      from-gray-800/70 
      to-gray-900/70
      bg-gradient-to-r
    `,
    subtle: `
      bg-gray-900/30 
      backdrop-blur-sm 
      border-gray-800/20 
      shadow-md
    `
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        width: '0%',
        scale: 0.9 
      }}
      animate={{ 
        opacity: 1, 
        width: '100%',
        scale: 1 
      }}
      transition={{ 
        duration: 1, 
        ease: 'easeInOut' 
      }}
      className={`
        ${className}
        ${variantStyles[variant]}
        w-full 
        border-t 
        border-b 
        rounded-xl 
        my-0
        bg-[#030303]
      `}
      style={{ height: `${height}px` }}
    />
  );
};

export default GlassSeparator;

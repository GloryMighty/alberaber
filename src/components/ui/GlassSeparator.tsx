import React from 'react';
import { motion } from 'framer-motion';

interface GlassSeparatorProps {
  className?: string;
  height?: number;
}

const GlassSeparator: React.FC<GlassSeparatorProps> = ({ 
  className = '', 
  height = 2 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, width: '0%' }}
      animate={{ opacity: 1, width: '100%' }}
      transition={{ 
        duration: 1, 
        ease: 'easeInOut' 
      }}
      className={`
        ${className}
        w-full 
        bg-white/20 
        backdrop-blur-lg 
        border-t border-b 
        border-white/10 
        shadow-lg 
        rounded-xl 
        my-8
      `}
      style={{ height: `${height}px` }}
    />
  );
};

export default GlassSeparator;

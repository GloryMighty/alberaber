import React from 'react';
import { motion } from 'framer-motion';

/*
  SectionSeparator
  ---------------
  Provides a subtle, smooth transition between sections.
  Uses a soft gradient and minimal animation to create 
  a gentle visual break without disrupting the page flow.
*/

interface SectionSeparatorProps {
  className?: string; // Optional custom CSS classes
  variant?: 'default' | 'soft' | 'minimal'; // Different separator styles
}

const SectionSeparator: React.FC<SectionSeparatorProps> = ({ 
  className = '', 
  variant = 'soft' 
}) => {
  // Variants for different separator styles
  const variantStyles = {
    default: 'bg-gradient-to-r from-transparent via-blue-500/20 to-transparent',
    soft: 'bg-gradient-to-r from-transparent via-white/10 to-transparent',
    minimal: 'bg-gradient-to-r from-transparent via-white/5 to-transparent'
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        scaleX: 0.9,
        y: 20 
      }}
      animate={{ 
        opacity: 1, 
        scaleX: 1,
        y: 0 
      }}
      transition={{ 
        duration: 0.8, 
        ease: 'easeInOut' 
      }}
      className={`
        w-full 
        h-[2px] 
        my-4 
        overflow-hidden 
        relative 
        z-50 
        ${variantStyles[variant]} 
        ${className}
      `}
    />
  );
};

export default SectionSeparator;

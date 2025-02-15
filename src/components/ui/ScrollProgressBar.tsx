import React from 'react';
import { motion } from 'framer-motion';

interface ScrollProgressBarProps {
  progress: number;
  color?: string;
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ 
  progress, 
  color = 'bg-primary' 
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <motion.div
        className={`h-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
};

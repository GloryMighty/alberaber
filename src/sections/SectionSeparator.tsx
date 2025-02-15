import React from 'react';
import { motion } from 'framer-motion';

/*
  SectionSeparator
  ---------------
  This component serves as a reusable visual separator between sections.
  It utilizes Framer Motion to add subtle animation effects such as fade-in and scale effects.
  The design reflects a modern and minimal style appropriate for networking apps.
  It can be easily customized via props if needed in the future.
*/

interface SectionSeparatorProps {
  className?: string; // Optional custom CSS classes
}

const SectionSeparator: React.FC<SectionSeparatorProps> = ({ className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.8 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`w-full h-2 mt-8 mb-4 overflow-hidden relative z-50 ${className || ''}`}
      style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(33,150,243,0.5) 50%, rgba(0,0,0,0) 100%)' }}
    />
  );
};

export default SectionSeparator;

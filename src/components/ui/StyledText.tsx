import React from 'react';

// High-tech styled text component with gradient and shadow
interface StyledTextProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const StyledText: React.FC<StyledTextProps> = ({ 
  children, 
  className = '', 
  onClick 
}) => {
  return (
    <span 
      onClick={onClick}
      className={`
        text-black 
        font-bold 
        bg-clip-text 
        text-transparent 
        bg-gradient-to-r 
        from-black 
        via-gray-800 
        to-black 
        drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]
        ${onClick ? 'cursor-pointer hover:opacity-80' : ''}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

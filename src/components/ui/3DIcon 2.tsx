import React from 'react';
import { Icon } from 'react-3d-icons';

// Define the props for our 3D Icon component
interface ThreeDIconProps {
  // The SVG file or predefined icon to use
  file: string;
  
  // Optional color for the icon
  color?: string;
  
  // Optional light color
  lightColor?: string;
  
  // Optional size and scale
  size?: number;
  scale?: number;
  
  // Optional link to open on click
  link?: string;
  
  // Optional additional styling
  className?: string;
  
  // Optional spin effect
  spin?: boolean | number;
}

// Reusable 3D Icon component with sensible defaults
const ThreeDIcon: React.FC<ThreeDIconProps> = ({
  file,
  color = '#000000',
  lightColor = '#ffffff',
  size = 100,
  scale = 5,
  link,
  className = '',
  spin = false
}) => {
  return (
    <div 
      className={`flex items-center justify-center ${className}`} 
      style={{ 
        height: `${size}px`, 
        width: `${size}px` 
      }}
    >
      <Icon 
        file={file}
        color={color}
        lightColor={lightColor}
        scale={scale}
        link={link}
        spin={spin}
        style={{ 
          height: '100%', 
          width: '100%' 
        }}
      />
    </div>
  );
};

export default ThreeDIcon;

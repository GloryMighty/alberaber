
import React from "react";

const NeonIsometricMaze: React.FC = () => {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full absolute inset-0 mix-blend-overlay opacity-20"
      preserveAspectRatio="none"
    >
      <pattern id="maze" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <path
          d="M 10,0 L 20,10 L 10,20 L 0,10 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </pattern>
      <rect x="0" y="0" width="100" height="100" fill="url(#maze)" />
    </svg>
  );
};

export default NeonIsometricMaze;

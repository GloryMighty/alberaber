import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Rotating cube component
function RotatingCube() {
  const meshRef = useRef<any>();

  // Rotate the cube on each frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="royalblue" />
    </mesh>
  );
}

// Main 3D Icon Component
export function ThreeDIcon() {
  return (
    <Canvas style={{ width: '100%', height: '200px' }}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* 3D Object */}
      <RotatingCube />
      
      {/* Camera Controls */}
      <OrbitControls />
    </Canvas>
  );
}

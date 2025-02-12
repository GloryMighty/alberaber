import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

// Base 3D Icon Component
interface Icon3DProps {
  type: 'communication' | 'events' | 'ai';
  size?: number;
  color?: string;
}

const CommunicationIcon: React.FC = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[0.5, 0.2, 100, 16]} />
      <meshStandardMaterial color="#3B82F6" metalness={0.5} roughness={0.3} />
    </mesh>
  );
};

const EventsIcon: React.FC = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <dodecahedronGeometry args={[0.7, 0]} />
      <meshStandardMaterial color="#10B981" metalness={0.6} roughness={0.4} />
    </mesh>
  );
};

const AIIcon: React.FC = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.6, 1]} />
      <meshStandardMaterial color="#8B5CF6" metalness={0.7} roughness={0.2} />
    </mesh>
  );
};

const Icon3D: React.FC<Icon3DProps> = ({ 
  type = 'communication', 
  size = 100, 
  color = 'transparent' 
}) => {
  const iconMap = {
    'communication': CommunicationIcon,
    'events': EventsIcon,
    'ai': AIIcon
  };

  const IconComponent = iconMap[type];

  return (
    <div style={{ width: size, height: size, background: color }}>
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <IconComponent />
      </Canvas>
    </div>
  );
};

export default Icon3D;

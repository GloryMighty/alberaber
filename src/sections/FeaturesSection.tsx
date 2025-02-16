import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, Zap, Star, LucideIcon } from 'lucide-react';
import WavesBackground from '@/components/ui/waves';
import LightningCircle from '@/components/ui/backgrounds/Bolts';
import { StyledText } from '@/components/ui/StyledText';
import { useNavigate } from 'react-router-dom';
import IconComponent from '@/components/ui/IconComponent';
import GlassSeparator from '@/components/ui/GlassSeparator';
import Section from './Section';
import SectionSeparator from './SectionSeparator';
import NetworkBackground from "@/components/ui/backgrounds/Network"

// Separate interface for feature icon props
interface FeatureIconProps {
  icon: LucideIcon;
  label: string;
  description: string;
}

// Utility function for creating background elements
const createBackgroundElements = () => [
  { component: LightningCircle, position: 'top-0 right-0' },
  { component: WavesBackground, position: 'bottom-0 left-0' }
];

// Separate component for feature icons grid
const FeatureIconsGrid: React.FC = () => {
  const featureIcons: FeatureIconProps[] = [
    { icon: Rocket, label: 'START', description: 'Accelerate your journey' },
    { icon: Target, label: 'FOCUS', description: 'Precision in every move' },
    { icon: Zap, label: 'SPEED', description: 'Lightning-fast execution' },
    { icon: Star, label: 'EXCELLENCE', description: 'Strive for the best' }
  ];

  const handleIconHover = (label: string) => {
    console.log(`Hovering over ${label}`);
  };

  return (
    <div className="col-span-12 relative w-full h-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full h-full">
        {featureIcons.map((feature, index) => {
          // Responsive positioning classes
          const gridPositionClasses = [
            'md:absolute md:top-0 md:left-0',     // Top-left
            'md:absolute md:top-0 md:right-0',    // Top-right
            'md:absolute md:bottom-0 md:left-0',  // Bottom-left
            'md:absolute md:bottom-0 md:right-0'  // Bottom-right
          ];

          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: index * 0.2, 
                duration: 0.6,
                type: "spring",
                stiffness: 100 
              }}
              className={`${gridPositionClasses[index]} flex justify-center items-center`}
            >
              <IconComponent 
                icon={feature.icon} 
                label={feature.label} 
                onHover={() => handleIconHover(feature.label)}
                onLeave={() => console.log(`Left ${feature.label}`)}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Separate component for Grow button
const GrowButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGrowClick = () => {
    navigate('/auth');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      className="absolute inset-0 flex items-center justify-center z-20"
    >
      <StyledText 
        onClick={handleGrowClick} 
        className="text-6xl font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
      >
        GROW
      </StyledText>
    </motion.div>
  );
};

// Main CallToActionSection component
const CallToActionSection: React.FC = () => {
  const backgroundElements = createBackgroundElements();

  return (
    <>
      <Section 
        id="features-section" 
        className="min-h-screen bg-[#030303] flex items-center justify-center py-8 overflow-hidden relative"
      >
        {/* Add NetworkBackground */}
        <NetworkBackground 
          nodeCount={49} 
          className="absolute inset-0 z-0" 
          opacity={0.1} 
          strokeColor="rgba(100, 100, 255, 0.1)"
        />

        {/* Background Elements */}
        {backgroundElements.map((Element, index) => (
          <motion.div 
            key={index} 
            className={`absolute ${Element.position} w-full h-full pointer-events-none opacity-40`}
          >
            <Element.component />
          </motion.div>
        ))}
        
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-12 gap-12 items-center">
            <FeatureIconsGrid />
            <GrowButton />
          </div>
        </div>
      </Section>
      <SectionSeparator />
      <GlassSeparator variant="metallic" />
    </>
  );
};

export default CallToActionSection;

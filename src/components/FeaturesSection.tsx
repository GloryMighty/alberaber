import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ConnectionAnimation from '@/components/ui/Connect';
import WavesBackground from '@/components/ui/waves';
import LightningCircle from '@/components/ui/backgrounds/Bolts';
import { StyledText } from '@/components/ui/StyledText';
import { useNavigate } from 'react-router-dom';

// Wave animation for Grow icon
const GrowIconWave: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;
    let time = 0;
    const resizeCanvas = () => {
      // Match the container's dimensions exactly
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    const drawHalftoneWave = () => {
      const gridSize = 15; // Slightly smaller grid for more detail
      const rows = Math.ceil(canvas.height / gridSize);
      const cols = Math.ceil(canvas.width / gridSize);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const centerX = x * gridSize;
          const centerY = y * gridSize;
          const distanceFromCenter = Math.sqrt(Math.pow(centerX - canvas.width / 2, 2) + Math.pow(centerY - canvas.height / 2, 2));
          const maxDistance = Math.sqrt(Math.pow(canvas.width / 2, 2) + Math.pow(canvas.height / 2, 2));
          const normalizedDistance = distanceFromCenter / maxDistance;
          const waveOffset = Math.sin(normalizedDistance * 10 - time) * 0.5 + 0.5;
          const size = gridSize * waveOffset * 0.8;
          ctx.beginPath();
          ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 123, 255, ${waveOffset * 0.2})`;
          ctx.fill();
        }
      }
    };
    const animate = () => {
      // Clear with a very light background to create trailing effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawHalftoneWave();
      time += 0.05;
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initial setup and resize listener
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50" />
    </div>;
};

// Call to Action Section with dynamic motion animations
const CallToActionSection: React.FC = () => {
  // Add background elements
  const backgroundElements = [{
    component: LightningCircle,
    position: 'top-0 right-0'
  }, {
    component: WavesBackground,
    position: 'bottom-0 left-0'
  }];

  // Animation variants for text and icons
  const textVariants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  const elementRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();
  const handleGrowClick = () => {
    navigate('/auth');
  };
  return <section id="features-section" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center overflow-hidden relative bg-[#ffe209]">
      {/* Background Elements */}
      {backgroundElements.map((Element, index) => <div key={index} className={`absolute ${Element.position} w-full h-full pointer-events-none opacity-40`}>
          <Element.component />
        </div>)}
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-12 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={textVariants} className="col-span-12 text-center">
          </motion.div>
          {/* Centered 'Grow' Button */}
          <motion.div initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }} className="absolute inset-0 flex items-center justify-center z-20">
            <StyledText onClick={handleGrowClick} className="text-6xl font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
              GROW
            </StyledText>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default CallToActionSection;
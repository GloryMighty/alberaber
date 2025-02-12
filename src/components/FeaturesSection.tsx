import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ConnectionAnimation from '@/components/ui/Connect';
import WavesBackground from '@/components/ui/waves';
import LightningCircle from '@/components/ui/backgrounds/Bolts';

// Wave animation for Grow icon
const GrowIconWave: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resizeCanvas = () => {
      // Match the container's dimensions exactly
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }

    const drawHalftoneWave = () => {
      const gridSize = 15 // Slightly smaller grid for more detail
      const rows = Math.ceil(canvas.height / gridSize)
      const cols = Math.ceil(canvas.width / gridSize)

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const centerX = x * gridSize
          const centerY = y * gridSize
          const distanceFromCenter = Math.sqrt(
            Math.pow(centerX - canvas.width / 2, 2) + 
            Math.pow(centerY - canvas.height / 2, 2)
          )
          const maxDistance = Math.sqrt(
            Math.pow(canvas.width / 2, 2) + 
            Math.pow(canvas.height / 2, 2)
          )
          const normalizedDistance = distanceFromCenter / maxDistance
          
          const waveOffset = Math.sin(normalizedDistance * 10 - time) * 0.5 + 0.5
          const size = gridSize * waveOffset * 0.8

          ctx.beginPath()
          ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 123, 255, ${waveOffset * 0.2})`
          ctx.fill()
        }
      }
    }

    const animate = () => {
      // Clear with a very light background to create trailing effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawHalftoneWave()

      time += 0.05
      animationFrameId = requestAnimationFrame(animate)
    }

    // Initial setup and resize listener
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 opacity-50" 
      />
    </div>
  )
}

// Call to Action Section with dynamic motion animations
const CallToActionSection: React.FC = () => {
  // Add background elements
  const backgroundElements = [
    { component: LightningCircle, position: 'top-0 right-0' },
    { component: WavesBackground, position: 'bottom-0 left-0' }
  ];

  // Animation variants for text and icons
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  

  const ctaIcons = [
    { text: "Connect" },
    { text: "Accelerate" }
  ];

  const [bolts, setBolts] = useState<{ id: number; path: string }[]>([]);
  const elementRefs = useRef<(HTMLDivElement | null)[]>([]);
  const boltIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const createBolt = (startEl: HTMLDivElement, endEl: HTMLDivElement) => {
    const startRect = startEl.getBoundingClientRect();
    const endRect = endEl.getBoundingClientRect();

    const startX = startRect.left + startRect.width / 2;
    const startY = startRect.top + startRect.height / 2;
    const endX = endRect.left + endRect.width / 2;
    const endY = endRect.top + endRect.height / 2;

    // Calculate midpoint for intersection
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    console.log('Lightning Bolt Intersection:', { midX, midY });

    // More dramatic curvature
    const curvedMidX = startX + (endX - startX) * 0.5 + (Math.random() - 0.5) * 200;
    const curvedMidY = startY + (endY - startY) * 0.5 + (Math.random() - 0.5) * 200;

    const id = Date.now();
    const path = `M${startX},${startY} Q${curvedMidX},${curvedMidY} ${endX},${endY}`;

    setBolts((prevBolts) => [...prevBolts, { id, path }]);

    setTimeout(() => {
      setBolts((prevBolts) => prevBolts.filter((bolt) => bolt.id !== id));
    }, 1000);

    return { midX, midY }; // Return intersection point
  };

  const interconnectElements = () => {
    if (elementRefs.current.length === 2) {
      // Create bolts in a cyclic manner
      createBolt(elementRefs.current[0]!, elementRefs.current[1]!);
    }
  };

  useEffect(() => {
    // Start continuous bolt cycling when elements are in view
    const startBoltCycle = () => {
      // Clear any existing interval
      if (boltIntervalRef.current) {
        clearInterval(boltIntervalRef.current);
      }

      // Start new interval
      boltIntervalRef.current = setInterval(() => {
        interconnectElements();
      }, 1500); // Cycle every 1.5 seconds
    };

    // Stop bolt cycling when component unmounts
    return () => {
      if (boltIntervalRef.current) {
        clearInterval(boltIntervalRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="features-section" 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center overflow-hidden relative"
    >
      {/* Background Elements */}
      {backgroundElements.map((Element, index) => (
        <div key={index} className={`absolute ${Element.position} w-full h-full pointer-events-none opacity-40`}>
          <Element.component />
        </div>
      ))}
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-12 gap-12 items-center">
          {/* Icons Column - Right side */}
          <div className="col-span-12 grid grid-cols-2 gap-8 justify-items-center">
            {ctaIcons.map((item, index) => (
              <motion.div
                key={item.text}
                ref={(el) => elementRefs.current[index] = el}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="flex items-center justify-center bg-white shadow-lg rounded-xl p-4 relative w-32 h-32"
              >
                {/* Render dynamic icon based on text */}
                {item.text === "Connect" && <ConnectionAnimation />}
                
                <h3 className="text-xl font-semibold text-social-primary absolute bottom-4">
                  {item.text}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Centered 'Grow' Button */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            left: `${window.innerWidth / 2}px`,
            top: `${window.innerHeight / 2}px`,
            transform: 'translate(-50%, -50%)'
          }}
          className="z-20"
        >
          <span className="text-6xl font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
            Grow
          </span>
        </motion.div>

        {/* Lightning Bolts */}
        <svg className="absolute inset-0 pointer-events-none z-10">
          {bolts.map((bolt) => (
            <path
              key={bolt.id}
              d={bolt.path}
              stroke="#7DF9FF"
              strokeWidth="2"
              fill="none"
              className="animate-bolt"
            />
          ))}
        </svg>
      </div>
    </section>
  );
};

export default CallToActionSection;

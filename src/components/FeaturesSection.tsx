import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ConnectionAnimation from '@/components/ui/Connect';
import WavesBackground from '@/components/ui/waves';

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
    { text: "Grow" },
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

    // More dramatic curvature
    const midX = startX + (endX - startX) * 0.5 + (Math.random() - 0.5) * 200;
    const midY = startY + (endY - startY) * 0.5 + (Math.random() - 0.5) * 200;

    const id = Date.now();
    const path = `M${startX},${startY} Q${midX},${midY} ${endX},${endY}`;

    setBolts((prevBolts) => [...prevBolts, { id, path }]);

    setTimeout(() => {
      setBolts((prevBolts) => prevBolts.filter((bolt) => bolt.id !== id));
    }, 1000);
  };

  const interconnectElements = () => {
    if (elementRefs.current.length === 3) {
      // Create bolts in a cyclic manner
      createBolt(elementRefs.current[0]!, elementRefs.current[1]!);
      setTimeout(() => {
        createBolt(elementRefs.current[1]!, elementRefs.current[2]!);
      }, 300);
      setTimeout(() => {
        createBolt(elementRefs.current[2]!, elementRefs.current[0]!);
      }, 600);
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
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center overflow-hidden"
    >
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Column */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-social-primary mb-4">
              Your Digital Networking Journey
            
              <span className="text-4xl font-bold text-social-primary mb-4" > STARTS </span>  
              <span className="block text-indigo-500"> HERE! </span>
            </h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.2, 
                duration: 0.8, 
                ease: [0.25, 0.4, 0.25, 1] 
              }}
              className="text-xl text-gray-700 mb-6"
            >
              Are you a successful business owner, an entrepreneur, 
              or just starting your journey?
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.4, 
                duration: 0.8, 
                ease: [0.25, 0.4, 0.25, 1] 
              }}
              className="text-lg text-gray-600 mb-8"
            >
              DigiCard empowers your networking potential with cutting-edge digital solutions.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-social-primary text-white px-8 py-3 rounded-full text-lg font-semibold flex items-center gap-2 hover:bg-social-primary/90 transition-colors"
            >
              Join Now <ArrowRight className="ml-2" />
            </motion.button>
          </motion.div>

          {/* Icons Column */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative h-[500px] w-full"
          >
            {bolts.map((bolt) => (
              <motion.svg 
                key={bolt.id}
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ 
                  opacity: [0, 1, 0.7, 1, 0], 
                  pathLength: [0, 1, 1, 0],
                  scale: [0.9, 1.1, 1, 0.9]
                }}
                transition={{ 
                  duration: 1, 
                  ease: "easeInOut",
                  times: [0, 0.3, 0.7, 1]
                }}
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '100%', 
                  pointerEvents: 'none' 
                }}
              >
                <defs>
                  <linearGradient id="boltGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(128, 0, 128, 0.8)" />
                    <stop offset="100%" stopColor="rgba(255, 0, 255, 1)" />
                  </linearGradient>
                  <filter id="boltGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <path 
                  d={bolt.path} 
                  fill="none" 
                  stroke="url(#boltGradient)" 
                  strokeWidth="5" 
                  strokeLinecap="round"
                  filter="url(#boltGlow)"
                />
              </motion.svg>
            ))}

            {ctaIcons.map((item, index) => (
              <motion.div
                key={index}
                ref={(el) => elementRefs.current[index] = el}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: index * 0.2, 
                  duration: 0.5, 
                  ease: "easeOut" 
                }}
                className={`absolute bg-white p-4 rounded-xl shadow-lg text-center transform transition-all hover:scale-105 relative overflow-hidden`}
                style={{
                  left: `${20 + index * 25}%`,
                  top: `${20 + index * 25}%`,
                  width: '200px',
                  zIndex: 10 - index
                }}
              >
                {/* Add wave animation for Grow icon */}
                {item.text === "Grow" && <GrowIconWave />}
                
                {/* Add connection animation for Connect icon */}
                {item.text === "Connect" && (
                  <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
                    <ConnectionAnimation />
                  </div>
                )}
                
                {/* Add lightning background for Accelerate icon */}
                {item.text === "Accelerate" && (
                  <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
                    <WavesBackground />
                  </div>
                )}
                
                <div className="mb-2 flex justify-center text-social-primary relative z-10">
                  {/* Removed icon rendering */}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 relative z-10">
                  {item.text}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;

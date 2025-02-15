import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  MessageCircle,    // Communication icon
  Calendar,         // Events icon
  Brain             // Smart interactions icon
} from 'lucide-react';
import NetworkBackground from '@/components/ui/backgrounds/Network';
import IconComponent from '@/components/ui/IconComponent';
import GlassSeparator from '@/components/ui/GlassSeparator';
import Section from './Section';
import SectionSeparator from './SectionSeparator';
import StatisticalVisuals from '@/components/ui/StatisticalVisuals';

// Helper component for animated text
const AnimatedText = React.memo(({ 
  text, 
  wordClassName = '', 
  letterClassName = '', 
  customAccentIndex 
}: { 
  text: string, 
  wordClassName?: string, 
  letterClassName?: string, 
  customAccentIndex?: number 
}) => {
  return (
    <>{text.split(' ').map((word, wordIndex) => (
      <span key={wordIndex} className={`inline-block mr-2 ${wordClassName}`}>
        {word.split('').map((letter, letterIndex) => (
          <motion.span
            key={`${wordIndex}-${letterIndex}`}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: wordIndex * 0.1 + letterIndex * 0.03,
              type: 'spring',
              stiffness: 150,
              damping: 25,
            }}
            className={`inline-block ${letterClassName} ${
              customAccentIndex !== undefined && wordIndex === customAccentIndex 
                ? 'text-social-accent' 
                : ''
            }`}
          >
            {letter}
          </motion.span>
        ))}
      </span>
    ))}</>
  );
});

// Section highlighting communication benefits with enhanced visuals
const AdvantagesSection: React.FC = () => {
  const ref = useRef(null)

  // Define advantages with icons and additional details
  const advantages = useMemo(() => [
    {
      icon: MessageCircle,
      title: 'Seamless Communication',
      description: 'Connect effortlessly with intuitive interfaces',
      color: 'text-blue-600'
    },
    {
      icon: Calendar,
      title: 'Events & Meetings',
      description: 'Access and create engaging and even luxury events with ease',
      color: 'text-green-600'
    },
    {
      icon: Brain,
      title: 'Smart Interactions',
      description: 'Intelligent features that enhance communication. Our AI suggestions will help to tailor your approach and come up with the best ideas',
      color: 'text-purple-600'
    }
  ], []);

  const fadeUpVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }), []);

  const handleIconHover = (title: string) => {
    console.log(`Hovering over ${title}`);
  };

  return (
    <Section 
      id="advantages" 
      title="Advantages" 
      className="relative min-h-screen bg-[#030303] flex items-center justify-center py-8 overflow-hidden"
    >
      <motion.div 
        className="absolute top-0 left-0 w-full h-full"
      >
        <NetworkBackground 
          nodeCount={100}  // Increased node count for more coverage
          heightMultiplier={2}  // Cover two screens
          opacity={0.5}  // Increased opacity for better visibility
          strokeColor="rgba(255, 255, 255, 0.3)"  // More prominent stroke color
        />
      </motion.div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.h2 
            variants={fadeUpVariants}
            custom={1}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 tracking-tighter fancy-title"
          >
            <AnimatedText 
              text="Empower Your Communication" 
              letterClassName="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80"
              customAccentIndex={2}
            />
          </motion.h2>
          <motion.p 
            variants={fadeUpVariants}
            custom={2}
            className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-8 sm:mb-12 neon-title"
          >
            <AnimatedText 
              text="Discover how our platform transforms the way you connect and collaborate" 
              letterClassName="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80"
            />
          </motion.p>
        </motion.div>

        {/* Radial Circular Layout */}
        <div className="relative w-full max-w-4xl mx-auto flex justify-center items-center">
          <div className="relative w-full max-w-2xl aspect-square">
            {advantages.map((advantage, index) => {
              const totalAdvantages = advantages.length;
              // Custom angle adjustments
              const angleAdjustments = [
                Math.PI / 12,   // Communication (right)
                -Math.PI / 12,  // Smart Interactions (left)
                -Math.PI / 6    // Events and Meetings (left)
              ];
              
              const baseAngle = (index * 2 * Math.PI) / totalAdvantages;
              const angle = baseAngle + angleAdjustments[index];
              
              return (
                <motion.div
                  key={advantage.title}
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    position: 'absolute',
                    top: `calc(50% + ${Math.sin(angle) * 35}%)`,
                    left: `calc(50% + ${Math.cos(angle) * 35}%)`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2
                  }}
                  className="absolute w-36 p-2 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex flex-col items-center">
                    <IconComponent 
                      icon={advantage.icon} 
                      label={advantage.title} 
                      onHover={() => handleIconHover(advantage.title)}
                      onLeave={() => console.log(`Left ${advantage.title}`)}
                      className="w-10 h-10 mb-1 text-white/80 hover:text-white transition-colors"
                    />
                    <p className="text-[10px] text-white/70 text-center">
                      {advantage.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Central Connecting Lines */}
            <svg 
              className="absolute inset-0 pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
            >
              {advantages.map((_, index) => {
                const totalAdvantages = advantages.length;
                // Use same angle adjustments as above
                const angleAdjustments = [
                  Math.PI / 12,   // Communication (right)
                  -Math.PI / 12,  // Smart Interactions (left)
                  -Math.PI / 6    // Events and Meetings (left)
                ];
                
                const baseAngle = (index * 2 * Math.PI) / totalAdvantages;
                const angle = baseAngle + angleAdjustments[index];
                
                const x = 50 + Math.cos(angle) * 35;
                const y = 50 + Math.sin(angle) * 35;
                
                return (
                  <line 
                    key={index}
                    x1="50" 
                    y1="50" 
                    x2={x} 
                    y2={y} 
                    stroke="rgba(255,255,255,0.1)" 
                    strokeWidth="0.5" 
                    strokeDasharray="2,2"
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* Add StatisticalVisuals after the main content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              delay: 0.8,
              duration: 0.6 
            } 
          }}
          className="mt-16 w-full max-w-4xl mx-auto"
        >
          <StatisticalVisuals />
        </motion.div>
      </div>
      <SectionSeparator />
      <GlassSeparator variant="metallic" />
    </Section>
  );
};

export default AdvantagesSection;

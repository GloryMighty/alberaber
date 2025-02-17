import React, { useMemo, useRef, useState } from 'react';
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
  customAccentIndex,
  variant = 'default' 
}: { 
  text: string, 
  wordClassName?: string, 
  letterClassName?: string, 
  customAccentIndex?: number,
  variant?: 'default' | 'crossPage' 
}) => {
  if (variant === 'crossPage') {
    return (
      <div className="relative w-full">
        {text.toUpperCase().split(' ').map((word, wordIndex) => (
          <span 
            key={wordIndex} 
            className={`inline-block mr-2 relative z-20 ${wordClassName} ${
              letterClassName
            } ${customAccentIndex !== undefined && wordIndex === customAccentIndex 
              ? 'text-social-accent' 
              : ''
            }`}
          >
            {word}
          </span>
        ))}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: ['100%', '-100%'] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            mixBlendMode: 'color-dodge'
          }}
        />
      </div>
    );
  }

  return (
    <>{text.toUpperCase().split(' ').map((word, wordIndex) => (
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
            {letter.toUpperCase()}
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
      title: 'SEAMLESS COMMUNICATION',
      description: 'CONNECT EFFORTLESSLY WITH INTUITIVE INTERFACES',
      color: 'text-blue-600'
    },
    {
      icon: Calendar,
      title: 'EVENTS & MEETINGS',
      description: 'ACCESS AND CREATE ENGAGING AND EVEN LUXURY EVENTS WITH EASE',
      color: 'text-green-600'
    },
    {
      icon: Brain,
      title: 'SMART INTERACTIONS',
      description: 'INTELLIGENT FEATURES THAT ENHANCE COMMUNICATION. OUR AI SUGGESTIONS WILL HELP TO TAILOR YOUR APPROACH AND COME UP WITH THE BEST IDEAS',
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

  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Sample public gallery photos (replace with actual paths)
  const galleryPhotos = [
    '/public/backgroundhero.jpg',
    '/public/backgroundhero.jpg',
    '/public/backgroundhero.jpg'
  ];

  // Photo gallery grid section
  const PhotoGalleryGrid = () => (
    <motion.div 
      className="grid grid-cols-3 gap-4 mt-12"
      initial="hidden"
      animate="visible"
    >
      {galleryPhotos.map((photo, index) => (
        <motion.div
          key={photo}
          variants={fadeUpVariants}
          custom={index}
          className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
          onClick={() => setSelectedPhoto(photo)}
        >
          <img 
            src={photo} 
            alt={`Public Gallery Photo ${index + 1}`} 
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        </motion.div>
      ))}
    </motion.div>
  );

  // Photo modal component
  const PhotoModal = () => {
    if (!selectedPhoto) return null;

    return (
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setSelectedPhoto(null)}
      >
        <motion.img 
          src={selectedPhoto}
          alt="Selected Photo"
          className="max-w-[90%] max-h-[90%] rounded-lg shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        />
      </motion.div>
    );
  };

  return (
    <Section 
      id="advantages" 
      title="ADVANTAGES" 
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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 tracking-tighter fancy-title relative text-white drop-shadow-md"
          >
            <br /> 
            <AnimatedText 
              text="EMPOWER YOUR COMMUNICATION" 
              letterClassName="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80"
              customAccentIndex={2}
              variant="crossPage"
            />
          </motion.h2>
          <motion.p 
            variants={fadeUpVariants}
            custom={2}
            className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-8 sm:mb-12 neon-title"
          >
            <AnimatedText 
              text="DISCOVER HOW OUR PLATFORM TRANSFORMS THE WAY YOU CONNECT AND COLLABORATE" 
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
                      label={advantage.title.toUpperCase()} 
                      onHover={() => handleIconHover(advantage.title.toUpperCase())}
                      onLeave={() => console.log(`Left ${advantage.title.toUpperCase()}`)}
                    />
                    <p className="text-[10px] text-white/70 text-center">
                      {advantage.description.toUpperCase()}
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

        {/* Add PhotoGalleryGrid after existing content */}
        <PhotoGalleryGrid />
      </div>

      {/* Photo Modal */}
      <PhotoModal />

      <SectionSeparator />
      <GlassSeparator variant="metallic" />
    </Section>
  );
};

export default AdvantagesSection;

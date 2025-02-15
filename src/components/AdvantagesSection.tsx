import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
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

// Section highlighting communication benefits with enhanced visuals
const AdvantagesSection: React.FC = () => {
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

  return (
    <Section 
      id="advantages" 
      className="relative min-h-screen bg-[#030303] dark:bg-social-primary/10 flex items-center justify-center py-16 overflow-hidden"
    >
      <motion.div 
        className="absolute top-0 left-0 w-full h-full"
      >
        <NetworkBackground />
      </motion.div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Section Title */}
        <motion.div 
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.h2 
            variants={fadeUpVariants}
            custom={1}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 tracking-tighter animated-gradient-title"
          >
            Empower Your Communication
          </motion.h2>
          <motion.p 
            variants={fadeUpVariants}
            custom={2}
            className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-8 sm:mb-12"
          >
            Discover how our platform transforms the way you connect and collaborate
          </motion.p>
        </motion.div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 transform -rotate-6">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              custom={index + 3}
              className="flex flex-col items-center text-center"
            >
              <IconComponent 
                icon={advantage.icon} 
                label={advantage.title} 
              />
              <div className="mt-4 max-w-xs">
                <h3 className={`text-2xl font-bold mb-2 block text-white animated-gradient-title text-center ${advantage.color}`}>
                  {advantage.title}
                </h3>
                <p className="text-base text-white/70">
                  {advantage.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <SectionSeparator /> 
      <GlassSeparator />
    </Section>
  );
};

export default AdvantagesSection;

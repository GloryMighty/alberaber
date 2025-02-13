import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt,
// Privacy icon
FaCommentDots,
// Communication icon
FaBrain // Smart interactions icon
} from 'react-icons/fa';
import BackgroundPaths from '@/components/ui/AnimatedLines'; // Import BackgroundPaths
import { cn } from "@/lib/utils";
import { StyledText } from '@/components/ui/StyledText';
import Icon3D from '@/components/ui/3DIcon';

// Helper component for animated text
const AnimatedText = React.memo(({
  text,
  wordClassName = '',
  letterClassName = '',
  customAccentIndex
}: {
  text: string;
  wordClassName?: string;
  letterClassName?: string;
  customAccentIndex?: number;
}) => {
  return <>{text.split(' ').map((word, wordIndex) => <span key={wordIndex} className={`inline-block mr-2 ${wordClassName}`}>
        {word.split('').map((letter, letterIndex) => <motion.span key={`${wordIndex}-${letterIndex}`} initial={{
        y: 100,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: wordIndex * 0.1 + letterIndex * 0.03,
        type: 'spring',
        stiffness: 150,
        damping: 25
      }} className={`inline-block ${letterClassName} ${customAccentIndex !== undefined && wordIndex === customAccentIndex ? 'text-social-accent' : ''}`}>
            {letter}
          </motion.span>)}
      </span>)}</>;
});

// Section highlighting communication benefits with enhanced visuals
const AdvantagesSection: React.FC = () => {
  // Define advantages with icons and additional details
  const advantages = useMemo(() => [{
    title: 'Seamless Communication',
    description: 'Connect effortlessly with intuitive interfaces',
    iconType: 'communication',
    color: 'text-blue-600'
  }, {
    title: 'Events & Meetings',
    description: 'Access and create engaging and even luxury events with ease',
    iconType: 'events',
    color: 'text-green-600'
  }, {
    title: 'Smart Interactions',
    description: 'Intelligent features that enhance communication. Our AI suggestions will help to tailor your approach and come up with the best ideas',
    iconType: 'ai',
    color: 'text-purple-600'
  }], []);
  const fadeUpVariants = useMemo(() => ({
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1]
      }
    })
  }), []);
  return <section id="advantages" className="relative min-h-screen bg-white dark:bg-social-primary/10 flex items-center justify-center py-16 overflow-hidden">
      <BackgroundPaths />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-0">
        <motion.div initial="hidden" animate="visible" className="text-center mb-12">
          <motion.h2 variants={fadeUpVariants} custom={1} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 tracking-tighter">
            <AnimatedText text="Empower Your Communication" letterClassName="text-transparent bg-clip-text 
                               bg-gradient-to-r from-neutral-900 to-neutral-700/80 
                               dark:from-white dark:to-white/80" customAccentIndex={2} />
          </motion.h2>
          <motion.p variants={fadeUpVariants} custom={2} className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-white/70 max-w-3xl mx-auto mb-8 sm:mb-12">
            <AnimatedText text="Discover how our platform transforms the way you connect and collaborate" letterClassName="text-transparent bg-clip-text 
                               bg-gradient-to-r from-neutral-900/80 to-neutral-700/60 
                               dark:from-white/80 dark:to-white/60" />
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mx-0 rounded-full py-[4px]">
          {advantages.map((advantage, index) => <motion.div key={advantage.title} initial="hidden" animate="visible" variants={fadeUpVariants} custom={index + 3} className={cn("bg-white border border-gray-200 rounded-2xl p-7 text-center", "transform transition-all duration-300 hover:scale-105 hover:shadow-lg", "relative overflow-hidden group")}>
              <div className={`text-3xl sm:text-4xl md:text-5xl mb-5 ${advantage.color} flex justify-center`}>
                {/* <Icon3D type={advantage.iconType} size={120} /> */}
              </div>
              <StyledText className="text-2xl font-bold mb-4 block">
                {advantage.title}
              </StyledText>
              <p className="text-base text-[#3052ff]">
                {advantage.description}
              </p>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default AdvantagesSection;
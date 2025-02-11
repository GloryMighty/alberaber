import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt,       // Privacy icon
  FaCommentDots,     // Communication icon
  FaBrain            // Smart interactions icon
} from 'react-icons/fa';
import BackgroundPaths from '@/components/ui/AnimatedLines'; // Import BackgroundPaths
import { cn } from "@/lib/utils"

// Section highlighting communication benefits with enhanced visuals
const AdvantagesSection: React.FC = () => {
  // Define advantages with icons and additional details
  const advantages = [
    {
      title: 'Seamless Communication',
      description: 'Connect effortlessly with intuitive interfaces',
      icon: FaCommentDots,
      color: 'text-blue-600'
    },
    {
      title: 'Events & Meetings',
      description: 'Access and create engaging and even luxury events with ease',
      icon: FaShieldAlt,
      color: 'text-green-600'
    },
    {
      title: 'Smart Interactions',
      description: 'Intelligent features that enhance communication. Our AI suggestions will help to tailor your approach and come up with the best ideas',
      icon: FaBrain,
      color: 'text-purple-600'
    }
  ];

  const fadeUpVariants = {
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
  };

  return (
    <section 
      id="advantages" 
      className="relative min-h-screen bg-white dark:bg-social-primary/10 flex items-center justify-center py-16 overflow-hidden"
    >
      <BackgroundPaths />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.span 
            variants={fadeUpVariants}
            custom={0}
            className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-b from-black/10 to-white/10 
                        dark:from-white/10 dark:to-black/10 backdrop-blur-lg 
                        text-sm font-medium text-neutral-700 dark:text-white/80 tracking-wide"
          >
            Our Key Advantages
          </motion.span>
          <motion.h2 
            variants={fadeUpVariants}
            custom={1}
            className="text-7xl font-bold mb-8 tracking-tighter"
          >
            {['Empower', 'Your', 'Communication'].map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
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
                    className={`inline-block text-transparent bg-clip-text 
                                bg-gradient-to-r from-neutral-900 to-neutral-700/80 
                                dark:from-white dark:to-white/80 
                                ${wordIndex === 2 ? 'text-social-accent' : ''}`}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h2>
          <motion.p 
            variants={fadeUpVariants}
            custom={2}
            className="text-xl text-neutral-600 dark:text-white/70 max-w-3xl mx-auto mb-12"
          >
            {['Discover', 'how', 'our', 'platform', 'transforms', 'the', 'way', 'you', 'connect', 'and', 'collaborate'].map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-2">
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
                    className="inline-block text-transparent bg-clip-text 
                               bg-gradient-to-r from-neutral-900/80 to-neutral-700/60 
                               dark:from-white/80 dark:to-white/60"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              custom={index + 3}
              className={cn(
                "bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 text-center",
                "transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              )}
            >
              <div className={`text-5xl mb-4 ${advantage.color} flex justify-center`}>
                <advantage.icon />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                {advantage.title}
              </h3>
              <p className="text-gray-600 dark:text-white/70">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;

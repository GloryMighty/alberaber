import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt,       // Privacy icon
  FaCommentDots,     // Communication icon
  FaBrain            // Smart interactions icon
} from 'react-icons/fa';
import FloatingPaths from '@/components/ui/AnimatedLines'; // Import FloatingPaths

// Section highlighting communication benefits with enhanced visuals
const AdvantagesSection: React.FC = () => {
  // Animation variants for smooth entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  // Define advantages with icons and additional details
  const advantages = [
    {
      title: 'Seamless Communication',
      description: 'Connect effortlessly with intuitive interfaces',
      icon: FaCommentDots,
      color: 'text-blue-500'
    },
    {
      title: 'Privacy First',
      description: 'All the chats handled via end-to-end encryption, which excludes the opportunity of interruption',
      icon: FaShieldAlt,
      color: 'text-green-500'
    },
    {
      title: 'Smart Interactions',
      description: 'Intelligent features that enhance communication. Our AI suggestions will help to tailor your approach and come up with the best ideas!',
      icon: FaBrain,
      color: 'text-purple-500'
    }
  ];

  return (
    <section 
      id="advantages" 
      className="relative min-h-screen bg-social-primary/10 flex items-center justify-center py-16 overflow-hidden"
    >
      {/* Add FloatingPaths as a background */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center 
                     text-social-primary mb-12"
        >
          Empowering Communication
        </motion.h1>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8"
        >
          {advantages.map((advantage, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-white/90 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
            >
              <div className="flex justify-center mb-6">
                <advantage.icon 
                  className={`text-6xl ${advantage.color} group-hover:scale-110 transition-transform`} 
                />
              </div>
              <h3 className="text-2xl font-semibold text-social-primary mb-4">
                {advantage.title}
              </h3>
              <p className="text-gray-600 text-base">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AdvantagesSection;

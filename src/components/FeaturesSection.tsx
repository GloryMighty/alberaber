import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Target, Zap } from 'lucide-react';

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

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 120,
        delay: 0.3
      }
    }
  };

  const ctaIcons = [
    { icon: Users, text: "Connect" },
    { icon: Target, text: "Grow" },
    { icon: Zap, text: "Accelerate" }
  ];

  return (
    <section 
      id="call-to-action" 
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
              Your Digital Networking Journey Starts Here
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              Are you a successful business owner, an entrepreneur, 
              or just starting your journey?
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Our platform will help you acquire your personal digital card 
              and connect with people who match your ambitions!
            </p>
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
            className="grid grid-cols-3 gap-6"
          >
            {ctaIcons.map((item, index) => (
              <motion.div
                key={index}
                variants={iconVariants}
                className="bg-white p-6 rounded-xl shadow-lg text-center transform transition-all hover:scale-105"
              >
                <div className="mb-4 flex justify-center text-social-primary">
                  <item.icon size={56} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
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

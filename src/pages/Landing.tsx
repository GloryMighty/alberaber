import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Landing page to showcase application advantages
const Landing: React.FC = () => {
  // Animation variants for smooth transitions
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
      opacity: 1 
    }
  };

  // Key advantages of the application
  const advantages = [
    {
      title: "Connect Effortlessly",
      description: "Build meaningful connections with like-minded individuals across various networks."
    },
    {
      title: "Smart Networking",
      description: "Discover and engage with professionals who share your interests and goals."
    },
    {
      title: "Seamless Communication",
      description: "Communicate and collaborate through integrated messaging and event features."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col justify-center items-center p-6">
      <motion.div 
        className="max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          variants={itemVariants}
        >
          Welcome to AlberAber
        </motion.h1>

        <motion.p 
          className="text-xl mb-12 text-gray-300"
          variants={itemVariants}
        >
          Your gateway to meaningful professional connections
        </motion.p>

        {/* Advantages Section */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
        >
          {advantages.map((advantage, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">
                {advantage.title}
              </h3>
              <p className="text-gray-300">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants}>
          <Link 
            to="/auth" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 inline-block"
          >
            Get Started
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Landing;

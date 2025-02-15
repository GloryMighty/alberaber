import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import HeroGeometric from '@/components/HeroSection';
import { useScrollNavigation, landingPageSections } from '@/hooks/useScrollNavigation';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';

const LandingWithGeometricBackground: React.FC = () => {
  // Use scroll navigation hook
  const { currentSection, sectionsProgress } = useScrollNavigation(landingPageSections);

  // Animation variants for smooth scroll-based animations
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* Add scroll progress bar */}
      <ScrollProgressBar 
        progress={sectionsProgress[currentSection] || 0} 
        color="bg-white/50"
      />

      <HeroGeometric 
        badge="DigiCard" 
        title1="Transform Your" 
        title2="Digital Potential"
      >
        <div className="relative z-10 container mx-auto px-4 md:px-6">
          {/* Navigation */}
          <nav className="flex justify-between items-center py-4 mb-16">
            <div className="text-2xl font-bold text-white">DigiCard</div>
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                  Sign Up
                </Button>
              </Link>
            </div>
          </nav>

          {/* Main Content */}
          <div className="max-w-3xl mx-auto text-center">
            <motion.section 
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              className="space-y-8"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 text-white">
                Transform Your Ideas into Reality
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/70 mb-8 max-w-xl mx-auto">
                DigiCard helps you collaborate, plan, and execute your projects with unprecedented clarity and efficiency.
              </p>
              <Link to="/auth">
                <Button size="lg" className="bg-white text-black hover:bg-white/90">
                  Get Started
                </Button>
              </Link>
            </motion.section>
          </div>

          {/* Features Showcase */}
          <motion.section 
            className="grid md:grid-cols-3 gap-8 mt-16"
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
          >
            {/* Feature Cards */}
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-md">
              <h3 className="text-2xl font-semibold mb-4 text-white">Collaborative Planning</h3>
              <p className="text-white/70">Real-time collaboration and intuitive project management.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-md">
              <h3 className="text-2xl font-semibold mb-4 text-white">Smart Workflows</h3>
              <p className="text-white/70">Automate and optimize your team's productivity.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-md">
              <h3 className="text-2xl font-semibold mb-4 text-white">Seamless Integration</h3>
              <p className="text-white/70">Connect with your favorite tools and platforms.</p>
            </div>
          </motion.section>
        </div>
      </HeroGeometric>
    </div>
  );
};

export default LandingWithGeometricBackground;

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Import any necessary UI components or icons
import { Button } from '@/components/ui/button';

const Landing: React.FC = () => {
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
    <div className="min-h-screen w-full bg-background text-foreground">
      {/* Toolbar/Navigation Component */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="text-2xl font-bold">AlberAber</div>
          <div className="flex items-center space-x-4">
            <Link to="/auth">
              <Button variant="outline">Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        className="container mx-auto px-4 pt-24 pb-16 flex flex-col items-center text-center"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <h1 className="text-5xl font-bold mb-6">
          Transform Your Ideas into Reality
        </h1>
        <p className="text-xl max-w-2xl mb-8">
          AlberAber helps you collaborate, plan, and execute your projects with unprecedented clarity and efficiency.
        </p>
        <Link to="/auth">
          <Button size="lg">Get Started</Button>
        </Link>
      </motion.section>

      {/* Features Showcase */}
      <motion.section 
        className="container mx-auto px-4 py-16 grid md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        {/* Feature Cards */}
        <div className="bg-card p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Collaborative Planning</h3>
          <p>Real-time collaboration and intuitive project management.</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Smart Workflows</h3>
          <p>Automate and optimize your team's productivity.</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Seamless Integration</h3>
          <p>Connect with your favorite tools and platforms.</p>
        </div>
      </motion.section>

      {/* User Journey Visualization */}
      <motion.section 
        className="container mx-auto px-4 py-16 text-center"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <h2 className="text-4xl font-bold mb-8">Your Path to Success</h2>
        {/* Add a visual representation of user journey */}
        <div className="flex justify-center items-center space-x-8">
          <div>Create Project</div>
          <div>→</div>
          <div>Invite Team</div>
          <div>→</div>
          <div>Execute Goals</div>
        </div>
      </motion.section>

      {/* Social Proof & CTA */}
      <motion.section 
        className="container mx-auto px-4 py-16 text-center bg-muted"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <h2 className="text-4xl font-bold mb-8">Trusted by Teams Worldwide</h2>
        <div className="flex justify-center space-x-8 mb-8">
          {/* Placeholder for company logos or testimonials */}
          <div>Logo 1</div>
          <div>Logo 2</div>
          <div>Logo 3</div>
        </div>
        <Link to="/auth">
          <Button size="lg" variant="default">
            Start Your Free Trial
          </Button>
        </Link>
      </motion.section>

      {/* Footer */}
      <footer className="bg-background py-8 text-center">
        <p>&copy; 2025 AlberAber. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;

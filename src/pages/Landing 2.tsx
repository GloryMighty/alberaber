import React from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import NeonMaze from "@/components/ui/NeonMaze"
import { Button } from "@/components/ui/button"
import { useScrollNavigation, landingPageSections } from '@/hooks/useScrollNavigation';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';

const Landing: React.FC = () => {
  const navigate = useNavigate()
  const { currentSection, sectionsProgress } = useScrollNavigation(landingPageSections);

  const handleCreateAccount = () => {
    navigate("/auth")
  }

  const handleLearnMore = () => {
    // Scroll to more information section or open modal
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center p-8">
      {/* Add scroll progress bar */}
      <ScrollProgressBar 
        progress={sectionsProgress[currentSection] || 0} 
        color="bg-primary/50"
      />

      {/* Hero Section with Interactive Header */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl"
      >
        <h1 className="text-5xl font-bold mb-4">
          Revolutionize Your Digital Connections
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Seamless communication, powerful networking
        </p>

        {/* Interactive NeonMaze Component */}
        <div className="flex justify-center mb-8">
          <NeonMaze 
            text="Get Started" 
            href="/signup" 
            width="w-64" 
            height="h-16" 
          />
        </div>

        {/* Call to Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button 
            variant="default" 
            size="lg" 
            onClick={handleCreateAccount}
          >
            Create Account
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleLearnMore}
          >
            Learn More
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default Landing

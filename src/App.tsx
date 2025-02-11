import React from 'react';
import { useScrollNavigation, landingPageSections } from './hooks/useScrollNavigation';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Network from "./pages/Network";
import Messages from "./pages/Messages";
import Events from "./pages/Events";

// Import section components
import HeroGeometric from './components/HeroSection';
import AdvantagesSection from './components/AdvantagesSection';
import FeaturesSection from './components/FeaturesSection';
import LegalSection from './components/LegalSection';

// Navigation buttons component
const NavigationButtons: React.FC<{
  goToNextSection: () => void;
  goToPreviousSection: () => void;
  currentSection: string;
  sections: typeof landingPageSections;
}> = ({ 
  goToNextSection, 
  goToPreviousSection, 
  currentSection, 
  sections 
}) => {
  const currentIndex = sections.findIndex(section => section.id === currentSection);
  
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex space-x-4">
      {currentIndex > 0 && (
        <button 
          onClick={goToPreviousSection}
          className="bg-social-primary text-white px-4 py-2 rounded-full shadow-md hover:bg-opacity-90 transition"
        >
          Previous
        </button>
      )}
      {currentIndex < sections.length - 1 && (
        <button 
          onClick={goToNextSection}
          className="bg-social-primary text-white px-4 py-2 rounded-full shadow-md hover:bg-opacity-90 transition"
        >
          Next
        </button>
      )}
    </div>
  );
};

// Progress indicator component
const ProgressIndicator: React.FC<{
  currentSection: string;
  sections: typeof landingPageSections;
  scrollToSection: (sectionId: string) => void;
  sectionsProgress: {[key: string]: number};
}> = ({ currentSection, sections, scrollToSection, sectionsProgress }) => {
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-2">
      {sections.map(section => (
        <div 
          key={section.id} 
          className="flex items-center group relative"
        >
          <div 
            className="absolute left-full ml-2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            {section.title}
          </div>
          <button
            onClick={() => scrollToSection(section.id)}
            className={`
              w-3 h-3 rounded-full transition-all duration-300 relative
              ${currentSection === section.id 
                ? 'bg-social-primary scale-125' 
                : 'bg-gray-300 hover:bg-social-primary/50'}
            `}
            aria-label={`Go to ${section.title}`}
          >
            {/* Progress overlay */}
            <div 
              className="absolute bottom-0 left-0 right-0 bg-social-primary/50 rounded-full"
              style={{ 
                height: `${sectionsProgress[section.id] || 0}%`,
                transition: 'height 0.3s ease-out'
              }}
            />
          </button>
        </div>
      ))}
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => {
  const { 
    currentSection, 
    scrollToSection, 
    goToNextSection, 
    goToPreviousSection,
    sectionsProgress
  } = useScrollNavigation(landingPageSections);

  // Map section IDs to their respective components
  const sectionComponents = {
    'hero': HeroGeometric,
    'advantages': AdvantagesSection,
    'features-section': FeaturesSection,
    'legal-section': LegalSection
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={
                <div className="scroll-smooth">
                  {/* Navigation Elements */}
                  <NavigationButtons 
                    goToNextSection={goToNextSection}
                    goToPreviousSection={goToPreviousSection}
                    currentSection={currentSection}
                    sections={landingPageSections}
                  />
                  <ProgressIndicator 
                    currentSection={currentSection}
                    sections={landingPageSections}
                    scrollToSection={scrollToSection}
                    sectionsProgress={sectionsProgress}
                  />

                  {/* Render Sections */}
                  {landingPageSections.map(section => {
                    const SectionComponent = sectionComponents[section.id as keyof typeof sectionComponents];
                    return <SectionComponent key={section.id} />;
                  })}
                </div>
              } />
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/network"
                element={
                  <ProtectedRoute>
                    <Network />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/messages"
                element={
                  <ProtectedRoute>
                    <Messages />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/events"
                element={
                  <ProtectedRoute>
                    <Events />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

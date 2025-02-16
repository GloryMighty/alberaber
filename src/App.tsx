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
import HeroGeometric from './sections/HeroSection';
import AdvantagesSection from './sections/AdvantagesSection';
import FeaturesSection from './sections/FeaturesSection';
import LegalSection from './sections/LegalSection';
import SectionSeparator from './sections/SectionSeparator';

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
      {currentIndex < sections.length - 1 && (
        <button 
          onClick={goToNextSection}
          className="
            group relative overflow-hidden
            bg-gradient-to-r from-social-primary to-blue-600
            text-white px-6 py-3 rounded-xl 
            shadow-xl shadow-social-primary/30
            transform transition-all duration-300
            hover:scale-105 hover:shadow-2xl
            focus:outline-none focus:ring-2 focus:ring-social-primary/50
            flex items-center justify-center
            animate-pulse-soft
          "
          aria-label="Next Section"
        >
          {/* Gradient overlay for hover effect */}
          <div className="
            absolute inset-0 
            bg-gradient-to-r from-social-primary/20 to-blue-600/20
            opacity-0 group-hover:opacity-100 
            transition-opacity duration-300
          "></div>
          
          {/* Button content */}
          <div className="flex items-center space-x-2 relative z-10">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 transform transition-all duration-300 group-hover:scale-110 group-hover:animate-bounce-soft" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path 
                d="M12 4.5v15m0 0l6.5-6.5M12 19.5l-6.5-6.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="origin-bottom"
              />
              <circle 
                cx="12" 
                cy="4" 
                r="1.5" 
                fill="currentColor"
                className="animate-pulse-soft"
              />
              <circle 
                cx="12" 
                cy="20" 
                r="1" 
                fill="currentColor"
                className="opacity-70"
              />
            </svg>
          </div>
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

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route 
                path="/" 
                element={
                  <div className="relative">
                    {/* Navigation Buttons */}
                    <NavigationButtons 
                      goToNextSection={goToNextSection}
                      goToPreviousSection={goToPreviousSection}
                      currentSection={currentSection}
                      sections={landingPageSections}
                    />

                    {/* Progress Indicator */}
                    <ProgressIndicator 
                      currentSection={currentSection}
                      sections={landingPageSections}
                      scrollToSection={scrollToSection}
                      sectionsProgress={sectionsProgress}
                    />

                    <div className="min-h-screen">
                      {landingPageSections.map((section, index) => {
                        const SectionComponent = {
                          'hero': HeroGeometric,
                          'advantages': AdvantagesSection,
                          'features-section': FeaturesSection,
                          'legal-section': LegalSection
                        }[section.id];

                        return (
                          <div key={section.id}>
                            {SectionComponent && <SectionComponent />}
                            {index < landingPageSections.length - 1 && (
                              <SectionSeparator 
                                prevSectionBackground={section.backgroundColor} 
                                nextSectionBackground={landingPageSections[index + 1].backgroundColor} 
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                } 
              />
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

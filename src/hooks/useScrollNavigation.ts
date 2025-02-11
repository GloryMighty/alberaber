import { useState, useEffect, useCallback } from 'react';

// Define the section interface
export interface LandingPageSection {
  id: string;
  title: string;
  backgroundColor?: string;
  primaryColor?: string;
  progress?: number; // Add progress tracking
}

// Custom hook for managing scroll navigation
export const useScrollNavigation = (sections: LandingPageSection[]) => {
  const [currentSection, setCurrentSection] = useState<string>(sections[0].id);
  const [sectionsProgress, setSectionsProgress] = useState<{[key: string]: number}>(
    sections.reduce((acc, section) => ({ ...acc, [section.id]: 0 }), {})
  );

  // Smooth scroll to a specific section
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      setCurrentSection(sectionId);
    }
  }, []);

  // Navigate to next section
  const goToNextSection = useCallback(() => {
    const currentIndex = sections.findIndex(section => section.id === currentSection);
    if (currentIndex < sections.length - 1) {
      scrollToSection(sections[currentIndex + 1].id);
    }
  }, [currentSection, sections, scrollToSection]);

  // Navigate to previous section
  const goToPreviousSection = useCallback(() => {
    const currentIndex = sections.findIndex(section => section.id === currentSection);
    if (currentIndex > 0) {
      scrollToSection(sections[currentIndex - 1].id);
    }
  }, [currentSection, sections, scrollToSection]);

  // Track scroll position and update current section and progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate progress for each section
      const newSectionsProgress = sections.reduce((acc, section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const elementTop = element.offsetTop;
          const elementHeight = element.offsetHeight;
          
          // Calculate section's visibility and progress
          const sectionStart = elementTop;
          const sectionEnd = elementTop + elementHeight;
          
          let progress = 0;
          if (scrollPosition + windowHeight > sectionStart && scrollPosition < sectionEnd) {
            // Calculate what percentage of the section is in view
            const visibleStart = Math.max(scrollPosition, sectionStart);
            const visibleEnd = Math.min(scrollPosition + windowHeight, sectionEnd);
            progress = ((visibleEnd - visibleStart) / elementHeight) * 100;
            
            // Ensure progress is between 0 and 100
            progress = Math.min(Math.max(progress, 0), 100);
          }
          
          return { ...acc, [section.id]: progress };
        }
        return acc;
      }, {});
      
      setSectionsProgress(newSectionsProgress);

      // Determine current section based on scroll position
      const currentSectionId = sections.reduce((prev, curr) => {
        const element = document.getElementById(curr.id);
        const prevElement = document.getElementById(prev);
        
        if (!element) return prev;
        
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        
        if (scrollPosition >= elementTop && scrollPosition < elementTop + elementHeight) {
          return curr.id;
        }
        
        return prev;
      }, sections[0].id);
      
      setCurrentSection(currentSectionId);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to set initial state
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  return { 
    currentSection, 
    scrollToSection, 
    goToNextSection, 
    goToPreviousSection,
    sectionsProgress
  };
};

// Define the landing page sections
export const landingPageSections: LandingPageSection[] = [
  {
    id: 'hero',
    title: 'Welcome Screen',
    backgroundColor: 'bg-[#030303]'
  },
  {
    id: 'advantages',
    title: 'Communication Benefits',
    backgroundColor: 'bg-social-primary/10',
    primaryColor: 'text-social-primary'
  },
  {
    id: 'features-section',
    title: 'Detailed Features',
    backgroundColor: 'bg-gray-50',
    primaryColor: 'text-social-primary'
  },
  {
    id: 'legal-section',
    title: 'Terms and Policies',
    backgroundColor: 'bg-gray-100'
  }
];

import React from 'react';

// Section component acts as a reusable container for page sections.
// It renders an optional title (header) and its children within a styled section container.

interface SectionProps {
  id?: string; // Optional id for scroll navigation
  title?: string; // Optional title to display as header
  children: React.ReactNode; // Content of the section
  className?: string; // Optional custom class names
}

const Section: React.FC<SectionProps> = ({ id, title, children, className }) => {
  return (
    <section 
      id={id} 
      className={`bg-[#030303] ${className}`}
    >
      {title && <h2>{title}</h2>}
      <div className="h-full">
        {children}
      </div>
    </section>
  );
};

export default Section;
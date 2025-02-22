import React from 'react';

// Section for legal information and policies
const LegalSection: React.FC = () => {
  const legalLinks = [
    { title: 'Terms of Service', href: '/terms' },
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Cookie Policy', href: '/cookies' }
  ];

  return (
    <section 
      id="legal-section" 
      className="relative min-h-[50vh] bg-gray-100 flex items-end justify-center py-12 overflow-hidden"
    >
      {/* Placeholder for future background effects */}
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Future effect placeholder */}
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Terms and Policies
          </h2>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            We are committed to transparency and user protection.
          </p>
          <div className="space-y-3">
            {legalLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="block text-social-primary hover:underline text-sm sm:text-base"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalSection;

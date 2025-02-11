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
      className="min-h-screen bg-gray-100 flex items-center justify-center"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">
          Terms and Policies
        </h2>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-600 mb-6">
            We are committed to transparency and user protection.
          </p>
          <div className="space-y-4">
            {legalLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="block text-social-primary hover:underline"
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

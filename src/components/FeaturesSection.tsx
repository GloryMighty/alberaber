import React from 'react';
import { Globe, Lock, Bot } from 'lucide-react';

// Section detailing platform features
const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connect across borders with multilingual support'
    },
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'Secure your conversations with advanced encryption'
    },
    {
      icon: Bot,
      title: 'Smart Suggestions',
      description: 'AI-powered communication assistance'
    }
  ];

  return (
    <section 
      id="features-section" 
      className="min-h-screen bg-gray-50 flex items-center justify-center"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-social-primary mb-8 text-center">
          Platform Features
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="text-4xl mb-4 flex justify-center text-social-primary">
                  <Icon size={48} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-social-primary mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

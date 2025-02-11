import React from 'react';

// Section highlighting communication benefits
const AdvantagesSection: React.FC = () => {
  const advantages = [
    {
      title: 'Seamless Communication',
      description: 'Connect effortlessly with intuitive interfaces'
    },
    {
      title: 'Privacy First',
      description: 'Your conversations, your control'
    },
    {
      title: 'Smart Interactions',
      description: 'Intelligent features that enhance communication'
    }
  ];

  return (
    <section 
      id="advantages" 
      className="min-h-screen bg-social-primary/10 flex items-center justify-center"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-social-primary mb-8 text-center">
          Communication Advantages
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <h3 className="text-xl font-semibold text-social-primary mb-4">
                {advantage.title}
              </h3>
              <p className="text-gray-600">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;

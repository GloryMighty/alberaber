import React from 'react';
import { motion } from 'framer-motion';
import { Network, TrendingUp, Globe } from 'lucide-react';

// Statistical visualization component with animated graphs
const StatisticalVisuals: React.FC = () => {
  const statisticData = [
    {
      icon: Network,
      title: 'Network Connections',
      value: '250K+',
      color: 'text-blue-500',
      percentage: 92, // High connectivity rate
      details: 'Rapid user growth in professional networks'
    },
    {
      icon: TrendingUp,
      title: 'Business Efficiency',
      value: '68%',
      color: 'text-green-500',
      percentage: 68, // Realistic productivity improvement
      details: 'Measured across multiple enterprise clients'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      value: '45+',
      color: 'text-purple-500',
      percentage: 76, // Representing extensive international presence
      details: 'Expanding into emerging markets'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      {statisticData.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              delay: index * 0.2,
              duration: 0.6 
            } 
          }}
          className={`
            bg-black/40 backdrop-blur-sm rounded-xl p-4 
            border border-white/10 shadow-lg
            flex flex-col items-center
            hover:scale-105 transition-transform duration-300
            relative
            group
          `}
        >
          <div className={`mb-2 ${stat.color}`}>
            <stat.icon className="w-10 h-10" />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">{stat.value}</h3>
          <p className="text-sm text-white/70 mb-2 text-center">{stat.title}</p>
          

          {/* Tooltip-like additional details */}
          <div className="
            absolute bottom-[-40px] left-0 right-0 
            bg-black/60 backdrop-blur-sm 
            text-xs text-white/70 
            text-center 
            p-2 
            rounded-b-xl 
            opacity-0 
            group-hover:opacity-100 
            transition-opacity 
            duration-300
          ">
            {stat.details}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatisticalVisuals;

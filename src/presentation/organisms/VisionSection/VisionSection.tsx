'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';

export const VisionSection: React.FC = () => {
  const visionGoals = [
    {
      icon: '🌟',
      title: 'Global Innovation',
      description: 'Become the world\'s most trusted platform for deep tech innovation',
      gradient: 'from-[#D4AF37] to-[#E5C558]',
    },
    {
      icon: '🚀',
      title: 'Transformation',
      description: 'Accelerate the journey from idea to market-ready innovation',
      gradient: 'from-[#27AE60] to-[#52C77E]',
    },
    {
      icon: '💎',
      title: 'Premium Experience',
      description: 'Maintain the highest standards of quality and curation',
      gradient: 'from-[#3498DB] to-[#5DADE2]',
    },
    {
      icon: '🌍',
      title: 'Impact',
      description: 'Drive meaningful change through breakthrough technologies',
      gradient: 'from-[#E74C3C] to-[#EC7063]',
    },
  ];

  return (
    <section className="py-[120px] bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-[300px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] bg-[#E5C558]/5 rounded-full blur-[120px] animate-pulse" 
             style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-5 py-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-[13px] font-semibold uppercase tracking-[1px] mb-6">
            Our Vision
          </div>
          
          <h2 className={cn(
            "text-[56px] font-extralight mb-8 text-[#1A1A1A]"
          )}>
            Shaping the
            <span className="font-normal bg-gradient-to-r from-[#D4AF37] to-[#E5C558] bg-clip-text text-transparent"> Future</span>
          </h2>
          
          <p className="text-[20px] text-[#666666] max-w-[700px] mx-auto">
            We envision a world where the most brilliant innovations seamlessly connect with the most visionary investors, 
            creating a global ecosystem that accelerates human progress.
          </p>
        </div>

        {/* Vision Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {visionGoals.map((goal, index) => (
            <div 
              key={index}
              className={cn(
                "group relative bg-white rounded-[30px] p-10 transition-all duration-500 cursor-pointer",
                "hover:-translate-y-4 hover:scale-105"
              )}
              style={{ boxShadow: 'var(--neo-shadow)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--neo-shadow-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--neo-shadow)';
              }}
            >
              {/* Icon with Gradient Background */}
              <div className={cn(
                "w-[90px] h-[90px] mx-auto mb-6 rounded-[25px] flex items-center justify-center",
                "bg-gradient-to-br", goal.gradient,
                "transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
              )}
              style={{ boxShadow: `0 15px 35px -10px rgba(0,0,0,0.15)` }}>
                <span className="text-[40px]">{goal.icon}</span>
              </div>
              
              <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-3 text-center">
                {goal.title}
              </h3>
              
              <p className="text-[15px] text-[#666666] leading-relaxed text-center">
                {goal.description}
              </p>

              {/* Decorative Gold Accent */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50px] h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <p className="text-[18px] text-[#666666] mb-8">
            Join us in building the future of innovation
          </p>
          <div className="flex items-center justify-center gap-12">
            <div className="text-center">
              <div className="text-[42px] font-extralight text-[#D4AF37] mb-2">2024</div>
              <div className="text-[14px] text-[#666666] uppercase tracking-[1px]">Founded</div>
            </div>
            <div className="w-[1px] h-[80px] bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent" />
            <div className="text-center">
              <div className="text-[42px] font-extralight text-[#D4AF37] mb-2">2026</div>
              <div className="text-[14px] text-[#666666] uppercase tracking-[1px]">Vision</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


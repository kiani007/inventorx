'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';
import { BenefitItem } from '@/presentation/molecules';

const platformFeatures = [
  {
    icon: '🔍',
    title: 'Expert Validation',
    description: 'Every innovation undergoes rigorous vetting by industry experts to ensure quality and feasibility',
    color: '#D4AF37',
    gradient: 'from-[#D4AF37] to-[#E5C558]',
  },
  {
    icon: '🎯',
    title: 'Smart Matching',
    description: 'AI-powered matching connects inventors with the most relevant investors for their field',
    color: '#27AE60',
    gradient: 'from-[#27AE60] to-[#52C77E]',
  },
  {
    icon: '⚡',
    title: 'Transparent Auctions',
    description: 'Fair, competitive bidding system where the best innovations find their ideal funding partners',
    color: '#3498DB',
    gradient: 'from-[#3498DB] to-[#5DADE2]',
  },
  {
    icon: '🤝',
    title: 'Elite Network',
    description: 'Curated community of verified investors, mentors, and industry leaders',
    color: '#E74C3C',
    gradient: 'from-[#E74C3C] to-[#EC7063]',
  },
];

export const PlatformConceptSection: React.FC = () => {
  return (
    <section className="py-[120px] bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-20 w-[350px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/3 left-20 w-[400px] h-[400px] bg-[#E5C558]/5 rounded-full blur-[120px] animate-pulse" 
             style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-5 py-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-[13px] font-semibold uppercase tracking-[1px] mb-6">
            Platform Concept
          </div>
          
          <h2 className={cn(
            "text-[56px] font-extralight mb-8 text-[#1A1A1A]"
          )}>
            How InventorX
            <span className="font-normal bg-gradient-to-r from-[#D4AF37] to-[#E5C558] bg-clip-text text-transparent"> Works</span>
          </h2>
          
          <p className="text-[20px] text-[#666666] max-w-[800px] mx-auto mb-12">
            InventorX is the premier platform connecting groundbreaking innovations with visionary investors. 
            Our unique approach combines expert validation, smart matching, and transparent auctions to create 
            meaningful partnerships that drive innovation forward.
          </p>

          {/* Key Benefits */}
          <div className="flex items-center justify-center gap-16 mb-16">
            <div className="text-center">
              <div className="text-[36px] font-extralight text-[#D4AF37] mb-2">100%</div>
              <div className="text-[14px] text-[#666666] uppercase tracking-[1px]">Validated</div>
            </div>
            <div className="w-[1px] h-[60px] bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent" />
            <div className="text-center">
              <div className="text-[36px] font-extralight text-[#D4AF37] mb-2">AI-Powered</div>
              <div className="text-[14px] text-[#666666] uppercase tracking-[1px]">Matching</div>
            </div>
            <div className="w-[1px] h-[60px] bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent" />
            <div className="text-center">
              <div className="text-[36px] font-extralight text-[#D4AF37] mb-2">Transparent</div>
              <div className="text-[14px] text-[#666666] uppercase tracking-[1px]">Auctions</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {platformFeatures.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "group bg-white rounded-[30px] p-10 text-center transition-all duration-500 cursor-pointer",
                "hover:-translate-y-4 hover:scale-105"
              )}
              style={{ boxShadow: 'var(--neo-shadow)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 30px 60px -20px ${feature.color}40, 0 10px 40px -10px rgba(0,0,0,0.1)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--neo-shadow)';
              }}
            >
              {/* Icon */}
              <div className={cn(
                "w-[100px] h-[100px] mx-auto mb-6 rounded-[25px] flex items-center justify-center",
                "bg-gradient-to-br", feature.gradient,
                "transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
              )}
              style={{ boxShadow: `0 15px 35px -10px ${feature.color}30` }}>
                <span className="text-[40px]">{feature.icon}</span>
              </div>
              
              <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-4">
                {feature.title}
              </h3>
              
              <p className="text-[15px] text-[#666666] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* The Concept Explained */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#FFF8F0] to-white rounded-[40px] p-12 relative overflow-hidden"
                 style={{ boxShadow: 'var(--neo-shadow-hover)' }}>
              
              {/* Center Circle */}
              <div className="w-[200px] h-[200px] mx-auto rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E5C558] flex items-center justify-center mb-10 shadow-[0_20px_50px_rgba(212,175,55,0.4)]">
                <span className="text-[80px]">💡</span>
              </div>

              {/* Connection Lines */}
              <div className="absolute top-[120px] left-[50%] -translate-x-1/2 flex justify-between w-full px-8">
                <div className="w-[80px] h-[2px] bg-gradient-to-r from-[#D4AF37]/30 to-transparent" />
                <div className="w-[80px] h-[2px] bg-gradient-to-l from-[#D4AF37]/30 to-transparent" />
              </div>

              {/* Stats */}
              <div className="flex justify-around pt-8 border-t border-[#F0F0F0]">
                <div className="text-center">
                  <div className="text-[28px] font-extralight text-[#1A1A1A] mb-1">Deep Tech</div>
                  <div className="text-[12px] text-[#666666]">Focus</div>
                </div>
                <div className="text-center">
                  <div className="text-[28px] font-extralight text-[#1A1A1A] mb-1">Elite</div>
                  <div className="text-[12px] text-[#666666]">Quality</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-8">
            <h3 className="text-[36px] font-extralight text-[#1A1A1A] mb-6">
              Why InventorX?
            </h3>
            
            <div className="space-y-6">
              <BenefitItem
                title="Curated Excellence"
                description="Not just another marketplace. We hand-select innovations with real potential, ensuring every project meets our high standards for feasibility and impact."
              />
              <BenefitItem
                title="Transparent & Fair"
                description="Our auction system creates competitive bidding, ensuring fair market value while giving inventors full visibility into the investment process."
              />
              <BenefitItem
                title="End-to-End Support"
                description="From validation to funding to scaling, we provide comprehensive support throughout your innovation journey."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


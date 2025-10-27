'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';
import { StatsCard, FeatureCard } from '@/presentation/molecules';

export const MissionSection: React.FC = () => {
  return (
    <section className="py-[120px] bg-[#FAFAFA] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 left-10 w-[350px] h-[350px] bg-[#E5C558]/5 rounded-full blur-[100px] animate-pulse" 
             style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block px-5 py-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-[13px] font-semibold uppercase tracking-[1px] mb-6">
              Our Mission
            </div>
            
            <h2 className={cn(
              "text-[56px] font-extralight leading-[1.1] mb-8 text-[#1A1A1A]",
              "opacity-0 animate-in fade-in slide-in-from-bottom-10 duration-1000"
            )}>
              Connecting Brilliant
              <span className="font-normal bg-gradient-to-r from-[#D4AF37] to-[#E5C558] bg-clip-text text-transparent"> Minds</span>
            </h2>
            
            <p className="text-[20px] text-[#666666] leading-relaxed mb-6">
              Our mission is to create a premium platform where groundbreaking innovations meet visionary investors. We bridge the gap between inventors and investors, fostering a community dedicated to bringing transformative ideas to life.
            </p>

            <p className="text-[16px] text-[#666666] leading-relaxed mb-8">
              We believe that every revolutionary idea deserves the right platform and the right partners. By providing expert validation, transparent auctions, and a curated network of elite investors, we ensure that innovation reaches its full potential.
            </p>

            <div className="flex items-center gap-4 pt-6">
              <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E5C558] flex items-center justify-center text-white text-2xl font-bold shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
                ✓
              </div>
              <span className="text-[18px] font-medium text-[#1A1A1A]">Validated by Experts</span>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="bg-white rounded-[40px] p-12 relative overflow-hidden transition-all duration-500 hover:-translate-y-4 hover:scale-[1.02]"
                 style={{ boxShadow: 'var(--neo-shadow-hover)' }}>
              
              {/* Neomorphic Card Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <FeatureCard icon="🔬" title="Innovation" description="Curated Selection" />
                <FeatureCard icon="🤝" title="Connection" description="Elite Network" />
                <FeatureCard icon="⚡" title="Acceleration" description="Fast Growth" />
                <FeatureCard icon="🏆" title="Excellence" description="Quality First" />
              </div>

              {/* Bottom Stats */}
              <div className="flex justify-around pt-6 border-t border-[#F0F0F0]">
                <StatsCard number="10K+" label="Projects" />
                <StatsCard number="5K+" label="Investors" />
                <StatsCard number="€200M+" label="Funded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


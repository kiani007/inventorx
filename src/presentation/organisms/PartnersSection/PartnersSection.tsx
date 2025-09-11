'use client';

import React from 'react';

const partners = [
  { id: 1, name: 'TechCorp Global', initials: 'TG', color: 'from-[#D4AF37] to-[#E5C558]' },
  { id: 2, name: 'Innovation Labs', initials: 'IL', color: 'from-[#B8941F] to-[#D4AF37]' },
  { id: 3, name: 'Future Ventures', initials: 'FV', color: 'from-[#E5C558] to-[#F4E4C1]' },
  { id: 4, name: 'Quantum Dynamics', initials: 'QD', color: 'from-[#D4AF37] to-[#B8941F]' },
  { id: 5, name: 'Alpha Industries', initials: 'AI', color: 'from-[#F4E4C1] to-[#D4AF37]' },
  { id: 6, name: 'Nexus Solutions', initials: 'NS', color: 'from-[#B8941F] to-[#E5C558]' },
  { id: 7, name: 'Venture Capital Co', initials: 'VC', color: 'from-[#D4AF37] to-[#F4E4C1]' },
  { id: 8, name: 'BioTech Partners', initials: 'BP', color: 'from-[#E5C558] to-[#D4AF37]' },
];

export const PartnersSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-white via-[#FAFAFA] to-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-10">
        <h3 className="text-center text-[28px] font-light text-[#666666] mb-12 tracking-wide uppercase">
          Trusted by Leading Organizations
        </h3>
        
        {/* Scrolling container */}
        <div className="relative">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling logos wrapper */}
          <div className="flex overflow-hidden">
            {/* Animated scrolling container */}
            <div 
              className="flex gap-16 animate-scroll"
              style={{
                animation: 'scroll 40s linear infinite',
              }}
            >
              {/* First set of logos */}
              {partners.map((partner) => (
                <div
                  key={`first-${partner.id}`}
                  className="flex-shrink-0 group cursor-pointer"
                >
                  <div className="flex items-center space-x-3 px-6 py-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                    {/* Logo */}
                    <div className={`w-12 h-12 bg-gradient-to-br ${partner.color} rounded-lg flex items-center justify-center shadow-inner`}>
                      <span className="text-white font-bold text-lg">{partner.initials}</span>
                    </div>
                    {/* Company name */}
                    <span className="text-[#666666] font-medium whitespace-nowrap">{partner.name}</span>
                  </div>
                </div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {partners.map((partner) => (
                <div
                  key={`second-${partner.id}`}
                  className="flex-shrink-0 group cursor-pointer"
                >
                  <div className="flex items-center space-x-3 px-6 py-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                    {/* Logo */}
                    <div className={`w-12 h-12 bg-gradient-to-br ${partner.color} rounded-lg flex items-center justify-center shadow-inner`}>
                      <span className="text-white font-bold text-lg">{partner.initials}</span>
                    </div>
                    {/* Company name */}
                    <span className="text-[#666666] font-medium whitespace-nowrap">{partner.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
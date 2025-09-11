'use client';

import React from 'react';

const organizations = [
  { id: 1, name: 'TechCorp Global', initials: 'TG' },
  { id: 2, name: 'Innovation Labs', initials: 'IL' },
  { id: 3, name: 'Future Ventures', initials: 'FV' },
  { id: 4, name: 'Quantum Dynamics', initials: 'QD' },
  { id: 5, name: 'Alpha Industries', initials: 'AI' },
  { id: 6, name: 'Nexus Solutions', initials: 'NS' },
];

export const TrustedBySection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#FAFAFA] to-[#F5F5F5] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-10">
        <h3 className="text-center text-[24px] font-light text-[#666666] mb-10 tracking-wide">
          Trusted by Leading Organizations
        </h3>
        
        {/* Scrolling container */}
        <div className="relative">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F5F5F5] to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling logos */}
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll-logos">
              {/* First set of logos */}
              {organizations.map((org) => (
                <div
                  key={`first-${org.id}`}
                  className="flex-shrink-0 mx-12 flex items-center justify-center"
                >
                  <div className="w-[140px] h-[60px] flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center space-x-2">
                      {/* Fake logo */}
                      <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#E5C558] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{org.initials}</span>
                      </div>
                      <span className="text-[#666666] text-sm font-medium">{org.name}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {organizations.map((org) => (
                <div
                  key={`second-${org.id}`}
                  className="flex-shrink-0 mx-12 flex items-center justify-center"
                >
                  <div className="w-[140px] h-[60px] flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center space-x-2">
                      {/* Fake logo */}
                      <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#E5C558] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{org.initials}</span>
                      </div>
                      <span className="text-[#666666] text-sm font-medium">{org.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll-logos {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-logos {
          animation: scroll-logos 30s linear infinite;
        }
        
        .animate-scroll-logos:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
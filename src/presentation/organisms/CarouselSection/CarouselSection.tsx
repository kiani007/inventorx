'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the 3D component to avoid SSR issues
const Microscope3D = dynamic(
  () => import('../Microscope3D/Microscope3D').then(mod => mod.Microscope3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] flex items-center justify-center">
        <div className="text-[#D4AF37] text-xl animate-pulse">Loading 3D Model...</div>
      </div>
    )
  }
);

export const CarouselSection: React.FC = () => {
  return (
    <section className="py-[100px] bg-[#FFF8F0] relative z-10">
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_320px] gap-[50px] items-center">
          
          {/* Inventor Card */}
          <div className="bg-[#FAFAFA] rounded-[30px] p-[15px]" style={{ boxShadow: 'var(--neo-shadow)' }}>
            <div className="bg-white rounded-[20px] p-[35px] relative overflow-hidden" style={{ boxShadow: 'var(--inner-shadow)' }}>
              <div className="before:content-[''] before:absolute before:inset-[-2px] before:bg-gradient-to-r before:from-[#D4AF37] before:via-[#F4E4C1] before:to-[#D4AF37] before:rounded-[20px] before:opacity-0 hover:before:opacity-30 before:transition-opacity before:duration-300 before:z-[-1]">
                {/* Profile Avatar */}
                <div className="w-[110px] h-[110px] rounded-full mx-auto mb-[25px] bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150')] bg-center bg-cover shadow-[0_10px_30px_rgba(0,0,0,0.15)] border-4 border-[#D4AF37] relative">
                  <div className="absolute bottom-[5px] right-[5px] bg-[#D4AF37] text-white w-[28px] h-[28px] rounded-full flex items-center justify-center text-[14px]">
                    ⭐
                  </div>
                </div>

                <h3 className="text-[22px] font-medium text-center mb-[5px]">Dr. Jean-Pierre Dubois</h3>
                <p className="text-[13px] text-[#D4AF37] text-center mb-[10px] uppercase tracking-[1px]">Master Inventor</p>
                <p className="text-[13px] text-[#666666] text-center mb-[30px]">🇫🇷 Paris, France</p>
                
                <div className="grid grid-cols-2 gap-[15px]">
                  <div className="bg-[#FAFAFA] p-[15px] rounded-[15px] text-center" style={{ boxShadow: 'var(--inner-shadow)' }}>
                    <div className="text-[24px] font-semibold text-[#D4AF37]">47</div>
                    <div className="text-[10px] text-[#666666] uppercase">Patents</div>
                  </div>
                  <div className="bg-[#FAFAFA] p-[15px] rounded-[15px] text-center" style={{ boxShadow: 'var(--inner-shadow)' }}>
                    <div className="text-[24px] font-semibold text-[#D4AF37]">4.9</div>
                    <div className="text-[10px] text-[#666666] uppercase">Rating</div>
                  </div>
                  <div className="bg-[#FAFAFA] p-[15px] rounded-[15px] text-center" style={{ boxShadow: 'var(--inner-shadow)' }}>
                    <div className="text-[24px] font-semibold text-[#D4AF37]">2.3K</div>
                    <div className="text-[10px] text-[#666666] uppercase">Followers</div>
                  </div>
                  <div className="bg-[#FAFAFA] p-[15px] rounded-[15px] text-center" style={{ boxShadow: 'var(--inner-shadow)' }}>
                    <div className="text-[24px] font-semibold text-[#D4AF37]">€8.5M</div>
                    <div className="text-[10px] text-[#666666] uppercase">Raised</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Project Showcase */}
          <div className="relative">
            <div className="w-full max-w-[500px] mx-auto relative">
              <div className="w-[450px] h-[450px] mx-auto relative rounded-[30px] overflow-hidden">
                {/* Background Platform */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-[#FFF8F0] rounded-[30px] border-2 border-[#D4AF37]" />
                
                {/* 3D Microscope Model */}
                <div className="absolute inset-0">
                  <Microscope3D className="w-full h-full" />
                </div>
                
                {/* Overlay Effects */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 via-transparent to-transparent rounded-[30px]" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#D4AF37]/5 rounded-[30px]" />
                </div>
              </div>
            </div>
            
            <h2 className="text-center mt-[50px] text-[28px] font-light text-[#1A1A1A]">AI-Powered Diagnostic Microscope</h2>
            <p className="text-center text-[#666666] my-[15px]">Revolutionary medical technology for instant pathology analysis</p>
            
            <div className="flex gap-5 justify-center mt-10">
              <button className="px-[45px] py-[14px] bg-[#27AE60] text-white border-none rounded-[30px] text-[13px] font-semibold uppercase tracking-[1px] cursor-pointer shadow-[0_10px_25px_rgba(39,174,96,0.3)] hover:shadow-[0_15px_35px_rgba(39,174,96,0.4)] hover:-translate-y-1 transition-all">
                LIVE AUCTION
              </button>
              <button className="px-[45px] py-[14px] bg-white/85 backdrop-blur-[10px] text-[#D4AF37] border-2 border-[#D4AF37] rounded-[30px] text-[13px] font-semibold uppercase tracking-[1px] cursor-pointer hover:bg-[#D4AF37] hover:text-white transition-all">
                💰 INVEST
              </button>
            </div>
          </div>

          {/* Investor Card */}
          <div className="bg-gradient-to-br from-[#FFF8F0] to-white rounded-[30px] p-5 relative overflow-hidden" style={{ boxShadow: 'var(--luxury-shadow)' }}>
            <div className="before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-full before:pointer-events-none"
                 style={{
                   background: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(212, 175, 55, 0.03) 10px, rgba(212, 175, 55, 0.03) 20px)'
                 }}>
              <div className="bg-white/85 backdrop-blur-[20px] rounded-[20px] p-[35px] relative border border-[#D4AF37]/20">
                <div className="w-[110px] h-[110px] rounded-full mx-auto mb-[25px] bg-[url('https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150')] bg-center bg-cover border-4 border-[#D4AF37] shadow-[0_10px_30px_rgba(0,0,0,0.15)]" />
                
                <h3 className="text-[22px] font-medium text-center mb-[5px]">Alexandre Laurent</h3>
                <p className="text-[13px] text-[#D4AF37] text-center mb-[10px] uppercase tracking-[1px]">Elite Investor</p>
                <p className="text-[13px] text-[#666666] text-center mb-[30px]">🇫🇷 Lyon, France</p>
                
                <p className="text-[12px] text-center text-[#666666] mb-5 uppercase tracking-[1px]">Portfolio Companies</p>
                <div className="grid grid-cols-3 gap-3">
                  {['TechV', 'BioLab', 'AI+', 'Innov8', 'NextGen', 'FutureX'].map((company) => (
                    <div key={company} className="aspect-square bg-gradient-to-br from-white to-[#FAFAFA] rounded-[15px] flex items-center justify-center text-[11px] font-semibold text-[#666666] cursor-pointer hover:scale-110 transition-all" style={{ boxShadow: 'var(--neo-shadow)' }}>
                      {company}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
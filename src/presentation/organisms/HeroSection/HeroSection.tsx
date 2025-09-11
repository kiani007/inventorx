'use client';

import React from 'react';
import Link from 'next/link';

export const HeroSection: React.FC = () => {
  return (
    <section className="container mx-auto rounted-[30px] mt-[50px] h-screen relative flex items-center justify-center overflow-hidden mb-4">
      {/* Video Background
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover opacity-[0.08] z-[1]"
        autoPlay 
        muted 
        loop
      >
        <source src="/hero/inventorx.mp4" type="video/mp4" />
      </video> */}

      {/* Pattern Overlay */}
      <div className="absolute shadow top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-[#D4AF37]/5 to-transparent z-[2] rounded-[30px] mb-2"
        style={{
          background: `
               linear-gradient(135deg, transparent 0%, rgba(212, 175, 55, 0.05) 50%, transparent 100%),
               radial-gradient(circle at center, transparent 0%, rgba(255, 255, 255, 0.9) 100%)
             `
        }}
      />

      {/* Content */}
      <div className=" text-center max-w-[1000px] px-10">
        <div className="">
          {/* Video Background */}
          <video 
            className="h-[400px] w-full object-cover z-[1] rounded-[30px] mb-2"
            autoPlay 
            muted 
            loop

          >
            <source src="/hero/inventorx.mp4" type="video/mp4" />
          </video>
        </div>
        <h1 className="text-[72px] font-extralight leading-[1.1] mb-[25px] tracking-[-1px]"
          style={{
            background: 'linear-gradient(135deg, #1A1A1A 0%, #D4AF37 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Where Innovation<br />Meets Investment
        </h1>

        <p className="text-[22px] text-[#666666] mb-[50px] tracking-[0.5px]">
          The first contact between those who create and those who invest
        </p>

        <div className="flex gap-[25px] justify-center">
          <Link
            href="#"
            className="px-[50px] py-[18px] bg-[#D4AF37] text-white rounded-[35px] text-[14px] font-semibold uppercase tracking-[1px] shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.4)] hover:-translate-y-[3px] transition-all no-underline inline-block"
          >
            PUBLISH INNOVATION
          </Link>

          <Link
            href="#"
            className="px-[50px] py-[18px] bg-white text-[#D4AF37] border-2 border-[#D4AF37] rounded-[35px] text-[14px] font-semibold uppercase tracking-[1px] hover:bg-[#D4AF37] hover:text-white hover:-translate-y-[3px] transition-all no-underline inline-block"
          >
            BECOME INVESTOR
          </Link>
        </div>
      </div>
    </section>
  );
};
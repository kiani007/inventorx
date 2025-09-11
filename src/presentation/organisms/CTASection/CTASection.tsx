'use client';

import React from 'react';
import Link from 'next/link';

export const CTASection: React.FC = () => {
  return (
    <section className="py-[120px] bg-gradient-to-br from-[#FFF8F0] to-white relative overflow-hidden">
      <div className="absolute -top-[100px] -right-[100px] w-[400px] h-[400px] opacity-5"
           style={{
             background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)'
           }} />
      
      <div className="max-w-[900px] mx-auto px-10 text-center relative z-[2]">
        <h2 className="text-[52px] font-extralight mb-[25px]"
            style={{
              background: 'linear-gradient(135deg, #1A1A1A 0%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
          Ready to Transform Your Innovation?
        </h2>
        
        <p className="text-[20px] text-[#666666] mb-[50px] leading-relaxed">
          Join thousands of inventors and investors who are shaping the future through InventorX. 
          Start your journey today and bring your revolutionary ideas to life.
        </p>
        
        <div className="flex gap-[25px] justify-center flex-col sm:flex-row">
          <Link 
            href="#"
            className="px-[50px] py-[18px] bg-[#D4AF37] text-white rounded-[35px] text-[15px] font-semibold uppercase tracking-[1px] shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.4)] hover:-translate-y-[3px] transition-all no-underline inline-block"
          >
            Start as Inventor
          </Link>
          
          <Link
            href="#"
            className="px-[50px] py-[18px] bg-white text-[#D4AF37] border-2 border-[#D4AF37] rounded-[35px] text-[15px] font-semibold uppercase tracking-[1px] hover:bg-[#D4AF37] hover:text-white hover:-translate-y-[3px] transition-all no-underline inline-block"
          >
            Join as Investor
          </Link>
        </div>
      </div>
    </section>
  );
};
'use client';

import React from 'react';

const testimonials = [
  {
    id: 1,
    text: "InventorX transformed my innovation into a €10M business. The platform's professional approach and quality investors made all the difference in bringing my medical device to market.",
    author: {
      name: 'Dr. Emma Watson',
      role: 'Inventor',
      company: 'MedTech Innovations',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50',
    },
  },
  {
    id: 2,
    text: "As an investor, I've found exceptional opportunities on InventorX. The platform's validation process ensures quality projects, and I've successfully invested in 12 innovations.",
    author: {
      name: 'Michael Chen',
      role: 'Venture Capitalist',
      company: 'Future Ventures',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50',
    },
  },
  {
    id: 3,
    text: "The auction system on InventorX created competitive bidding for my sustainable packaging solution. We exceeded our funding goal by 200% in just 48 hours!",
    author: {
      name: 'Sofia Martinez',
      role: 'Eco-Entrepreneur',
      company: 'GreenPack Solutions',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50',
    },
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-[100px] bg-[#FAFAFA]">
      <div className="max-w-[1400px] mx-auto px-10">
        <h2 className="text-center text-[48px] font-extralight mb-5">Success Stories</h2>
        <p className="text-center text-[18px] text-[#666666] mb-[60px]">What our innovators and investors say</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} 
                 className="bg-white rounded-[25px] p-10 relative transition-all duration-300 hover:-translate-y-[10px]"
                 style={{ boxShadow: 'var(--neo-shadow)' }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.boxShadow = 'var(--neo-shadow-hover)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.boxShadow = 'var(--neo-shadow)';
                 }}>
              <span className="absolute top-5 left-[30px] text-[48px] text-[#D4AF37] opacity-30">
                &quot;
              </span>
              <p className="text-[16px] leading-[1.8] text-[#666666] mb-[30px] italic relative z-[2]">
                {testimonial.text}
              </p>
              <div className="flex items-center gap-[15px]">
                <img 
                  src={testimonial.author.avatar} 
                  alt={testimonial.author.name}
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="flex-1">
                  <div className="text-[16px] font-semibold text-[#1A1A1A] mb-[3px]">
                    {testimonial.author.name}
                  </div>
                  <div className="text-[13px] text-[#D4AF37]">
                    {testimonial.author.role}
                  </div>
                  <div className="text-[12px] text-[#666666]">
                    {testimonial.author.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
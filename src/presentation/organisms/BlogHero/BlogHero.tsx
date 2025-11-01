import React from 'react';

export const BlogHero: React.FC = () => {
  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-[#FAFAFA] to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#E5C558]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-[1200px] relative z-10">
        <div className="text-center space-y-6">
          {/* Overline */}
          <div className="inline-block">
            <span className="px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm text-[14px] font-semibold uppercase tracking-wider text-[#D4AF37] shadow-[var(--neo-shadow)]">
              Innovation Insights
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-[56px] md:text-[72px] font-bold text-[#1A1A1A] leading-tight">
            Discover the Future of
            <span className="block bg-gradient-to-r from-[#D4AF37] to-[#E5C558] bg-clip-text text-transparent">
              Innovation
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-[20px] text-[#666666] max-w-[700px] mx-auto leading-relaxed">
            Explore cutting-edge insights, success stories, and expert guidance on technology, 
            investment, and entrepreneurship from industry leaders.
          </p>
        </div>
      </div>
    </section>
  );
};


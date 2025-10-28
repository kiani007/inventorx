import React from 'react';
import { cn } from '@/shared/utils/cn';
import { Text } from '@/presentation/atoms';

export interface MarketplaceHeroProps {
  className?: string;
}

const MarketplaceHero: React.FC<MarketplaceHeroProps> = ({ className }) => {
  return (
    <section className={cn('relative py-20 overflow-hidden', className)}>
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-10 right-10 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-10 left-10 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-semibold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
            </span>
            Innovation Marketplace
          </div>

          {/* Main Heading */}
          <Text
            variant="h1"
            as="h1"
            className="text-5xl lg:text-6xl font-bold font-display mb-6 bg-gradient-to-r from-[#1A1A1A] via-[#D4AF37] to-[#1A1A1A] bg-clip-text text-transparent"
          >
            Discover Revolutionary Innovations
          </Text>

          {/* Subheading */}
          <Text
            variant="body"
            className="text-lg lg:text-xl text-[#666666] mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Connect with brilliant inventors and invest in groundbreaking technologies
            that are shaping the future. From medical breakthroughs to sustainable energy solutions.
          </Text>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '500+', label: 'Active Projects' },
              { value: '$2.5B+', label: 'Invested' },
              { value: '1,200+', label: 'Inventors' },
              { value: '95%', label: 'Success Rate' },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-[20px] bg-gradient-to-br from-[#FFF8F0] to-white"
                style={{ boxShadow: 'var(--neo-shadow)' }}
              >
                <div className="text-3xl font-bold font-display text-[#D4AF37] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[#666666] font-semibold uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { MarketplaceHero };


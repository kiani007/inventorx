/* stylelint-disable */
'use client';

import React from 'react';
import { Investor } from '@/core/domain/entities/Investor';
import { Text, Badge, Button, Avatar } from '@/presentation/atoms';
import { VerifiedBadge, CountryFlag } from '@/presentation/atoms';
import { cn } from '@/shared/utils/cn';
import { formatFullPrice } from '@/presentation/atoms/PriceDisplay/PriceDisplay';

export interface InvestorCardProps {
  investor: Investor;
  className?: string;
}

export const InvestorCard: React.FC<InvestorCardProps> = ({ investor, className }) => {
  const { min, max, currency } = investor.investmentRange;

  return (
    <div
      className={cn(
        'group relative flex flex-col h-full rounded-[24px] bg-linear-to-br from-[#FFF8F0] to-white overflow-hidden',
        'transition-all duration-500 ease-out',
        'hover:-translate-y-3 hover:scale-[1.02]',
        className
      )}
      style={{ boxShadow: 'var(--neo-shadow)' }}
    >
      {/* Header with Avatar */}
      <div className="relative p-6 pb-4">
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar
              src={investor.avatar}
              alt={investor.name}
              fallback={investor.name}
              size="md"
              verified={investor.verified}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Text variant="h4" className="font-bold font-display group-hover:text-[#D4AF37] transition-colors">
                {investor.name}
              </Text>
              {investor.verified && <VerifiedBadge label="✓" />}
            </div>
            <div className="flex items-center gap-2 text-sm text-[#999999]">
              <CountryFlag country={investor.country} />
              <span>{investor.country}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Expertise Tags */}
      <div className="px-6 pb-4">
        <div className="flex flex-wrap gap-2">
          {investor.expertise.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="default" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-2 gap-3">
          <div
            className="rounded-xl p-3 bg-white/70 border border-gray-100/50"
            style={{ boxShadow: 'var(--inner-shadow)' }}
          >
            <div className="text-xs text-[#999999] mb-1">Investment Range</div>
            <div className="text-sm font-bold text-[#1A1A1A]">
              {formatFullPrice(min, currency)}
            </div>
            <div className="text-xs text-[#666666]">- {formatFullPrice(max, currency)}</div>
          </div>
          <div
            className="rounded-xl p-3 bg-white/70 border border-gray-100/50"
            style={{ boxShadow: 'var(--inner-shadow)' }}
          >
            <div className="text-xs text-[#999999] mb-1">Track Record</div>
            <div className="text-sm font-bold text-[#1A1A1A]">{investor.projectsCount} Projects</div>
            <div className="text-xs text-[#D4AF37] font-semibold">{investor.successRate}% Success</div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 pb-4 border-b border-gray-100">
        <div className="text-xs text-[#999999] mb-2">Focus Areas</div>
        <div className="flex flex-wrap gap-1.5">
          {investor.categories.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="text-xs px-2 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] font-medium"
            >
              {cat.replace('_', ' ')}
            </span>
          ))}
        </div>
      </div>

      {/* Footer - CTA */}
      <div className="mt-auto p-6 pt-4">
        <Button variant="secondary" className="w-full" disabled>
          Login to Contact
        </Button>
      </div>
    </div>
  );
};

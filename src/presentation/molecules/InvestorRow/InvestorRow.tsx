/* stylelint-disable */
'use client';

import React from 'react';
import { Investor } from '@/core/domain/entities/Investor';
import { Avatar, Badge, Text, Button } from '@/presentation/atoms';
import { cn } from '@/shared/utils/cn';
import { formatPrice } from '@/presentation/atoms/PriceDisplay/PriceDisplay';

export interface InvestorRowProps {
  investor: Investor;
  selected?: boolean;
  onSelect?: (id: string) => void;
  className?: string;
}

export const InvestorRow: React.FC<InvestorRowProps> = ({ investor, selected, onSelect, className }) => {
  const handleClick = () => {
    if (onSelect) onSelect(investor.id);
  };

  const { min, max, currency } = investor.investmentRange;

  return (
    <div
      role="button"
      onClick={handleClick}
      className={cn(
        'w-full group grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 px-4 py-3 rounded-xl cursor-pointer',
        'bg-white/80 border border-gray-100 hover:border-[#D4AF37]/50 transition-colors',
        selected ? 'ring-2 ring-[#D4AF37]' : '',
        className
      )}
      style={{ boxShadow: 'var(--inner-shadow)' }}
    >
      <Avatar src={investor.avatar} alt={investor.name} fallback={investor.name} size="sm" verified={investor.verified} />

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Text variant="h4" className="text-base font-semibold truncate">
            {investor.name}
          </Text>
          {investor.verified && (
            <Badge variant="validated" size="sm">
              Verified
            </Badge>
          )}
        </div>
        <div className="text-xs text-[#999999] truncate">{investor.country}</div>
      </div>

      <div className="hidden md:flex items-center gap-2">
        {investor.expertise.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="default" size="sm">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="hidden lg:flex flex-col items-end">
        <div className="text-xs text-[#999999]">Invests</div>
        <div className="text-sm font-semibold">{formatPrice(min, currency)} - {formatPrice(max, currency)}</div>
      </div>

      <div className="hidden md:flex items-center gap-3">
        <span className="text-xs text-[#666666]"><span className="font-semibold text-[#1A1A1A]">{investor.projectsCount}</span> projects</span>
        <span className="text-xs text-[#27AE60] font-semibold">{investor.successRate}%</span>
        <Button size="sm" variant="ghost" className="ml-2">View</Button>
      </div>
    </div>
  );
};

export default InvestorRow;



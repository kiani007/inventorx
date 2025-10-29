/* stylelint-disable */
'use client';

import React from 'react';
import { Investor } from '@/core/domain/entities/Investor';
import { Avatar, Badge, Button, Text } from '@/presentation/atoms';
import { cn } from '@/shared/utils/cn';
import { PriceDisplay } from '@/presentation/atoms/PriceDisplay/PriceDisplay';

export interface InvestorPreviewPaneProps {
  investor?: Investor;
  className?: string;
}

export const InvestorPreviewPane: React.FC<InvestorPreviewPaneProps> = ({ investor, className }) => {
  if (!investor) {
    return (
      <div className={cn('h-full rounded-2xl bg-linear-to-br from-[#FFF8F0] to-white p-8 flex items-center justify-center text-[#999999]', className)} style={{ boxShadow: 'var(--neo-shadow)' }}>
        <Text variant="body" color="secondary">Select an investor to see details</Text>
      </div>
    );
  }

  const { investmentRange } = investor;

  return (
    <div className={cn('h-full rounded-2xl bg-linear-to-br from-[#FFF8F0] to-white p-8', className)} style={{ boxShadow: 'var(--neo-shadow)' }}>
      <div className="flex items-start gap-4 mb-6">
        <Avatar src={investor.avatar} alt={investor.name} fallback={investor.name} size="lg" verified={investor.verified} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Text variant="h3" className="font-display font-bold">{investor.name}</Text>
            {investor.verified && <Badge variant="validated" size="sm">Verified</Badge>}
          </div>
          <div className="text-sm text-[#666666]">{investor.city ? `${investor.city}, ` : ''}{investor.country}</div>
        </div>
      </div>

      {investor.bio && (
        <Text variant="body" className="text-[#444] mb-6">{investor.bio}</Text>
      )}

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-xl bg-white/70 border border-gray-100/50 p-4" style={{ boxShadow: 'var(--inner-shadow)' }}>
          <PriceDisplay amount={investmentRange.min} currency={investmentRange.currency} label="Invests from" />
          <div className="text-xs text-[#666666]">to <span className="font-semibold text-[#1A1A1A]">{investmentRange.max.toLocaleString()}</span></div>
        </div>
        <div className="rounded-xl bg-white/70 border border-gray-100/50 p-4" style={{ boxShadow: 'var(--inner-shadow)' }}>
          <div className="text-xs text-[#999999] uppercase font-semibold mb-1">Track record</div>
          <div className="text-sm font-semibold">{investor.projectsCount} projects</div>
          <div className="text-xs text-[#27AE60] font-semibold">{investor.successRate}% success</div>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-xs text-[#999999] mb-2">Expertise</div>
        <div className="flex flex-wrap gap-2">
          {investor.expertise.map((t) => (
            <Badge key={t} variant="default" size="sm">{t}</Badge>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="text-xs text-[#999999] mb-2">Focus areas</div>
        <div className="flex flex-wrap gap-1.5">
          {investor.categories.map((c) => (
            <span key={c} className="text-xs px-2 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] font-medium">{c.replace('_', ' ')}</span>
          ))}
        </div>
      </div>

      <Button variant="secondary" className="w-full" disabled>Login to Contact</Button>
    </div>
  );
};

export default InvestorPreviewPane;



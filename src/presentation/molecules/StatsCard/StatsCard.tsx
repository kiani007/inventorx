'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';

interface StatsCardProps {
  number: string;
  label: string;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ number, label, className }) => {
  return (
    <div className={cn('text-center', className)}>
      <div className="text-[28px] font-extralight text-[#D4AF37] mb-1">{number}</div>
      <div className="text-[12px] text-[#666666] uppercase tracking-[0.5px]">{label}</div>
    </div>
  );
};


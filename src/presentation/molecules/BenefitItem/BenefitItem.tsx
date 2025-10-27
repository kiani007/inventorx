'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';

interface BenefitItemProps {
  title: string;
  description: string;
  className?: string;
}

export const BenefitItem: React.FC<BenefitItemProps> = ({ title, description, className }) => {
  return (
    <div className={cn('flex items-start gap-4', className)}>
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E5C558] flex items-center justify-center flex-shrink-0 shadow-[0_5px_15px_rgba(212,175,55,0.3)]">
        <span className="text-white text-xl">✓</span>
      </div>
      <div>
        <h4 className="text-[18px] font-semibold text-[#1A1A1A] mb-2">
          {title}
        </h4>
        <p className="text-[15px] text-[#666666] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};


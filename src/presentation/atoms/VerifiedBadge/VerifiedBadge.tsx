'/* stylelint-disable */'
'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';

export interface VerifiedBadgeProps {
  className?: string;
  label?: string;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ className, label = 'VERIFIED' }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold text-white bg-[#16a34a]',
        className
      )}
    >
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </span>
  );
};



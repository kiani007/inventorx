'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';

interface TagProps {
  label: string;
  variant?: 'default' | 'primary' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ label, variant = 'default', size = 'sm', className }) => {
  const variantStyles = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-[#3498DB]/10 text-[#3498DB]',
    gold: 'bg-[#D4AF37]/10 text-[#D4AF37]',
  };

  const sizeStyles = {
    sm: 'px-3 py-1 text-[11px]',
    md: 'px-[15px] py-[6px] text-[13px]',
    lg: 'px-5 py-2 text-[15px]',
  };

  return (
    <span 
      className={cn(
        'inline-block rounded-full font-semibold uppercase tracking-[0.5px]',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {label}
    </span>
  );
};


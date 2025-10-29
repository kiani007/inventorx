'/* stylelint-disable */'
'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';

export interface ButtonLoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ButtonLoader: React.FC<ButtonLoaderProps> = ({ className, size = 'md' }) => {
  const sizeClass = size === 'sm' ? 'w-3 h-3 border-2' : size === 'lg' ? 'w-5 h-5 border-2' : 'w-4 h-4 border-2';
  return <span className={cn('inline-block rounded-full animate-spin border-white/30 border-t-white align-middle', sizeClass, className)} />;
};



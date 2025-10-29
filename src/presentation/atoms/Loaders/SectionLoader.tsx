'/* stylelint-disable */'
'use client';

import React from 'react';
import { Text } from '@/presentation/atoms';
import { cn } from '@/shared/utils/cn';

export interface SectionLoaderProps {
  message?: string;
  className?: string;
  height?: number | string; // e.g., 200 or '300px'
}

export const SectionLoader: React.FC<SectionLoaderProps> = ({
  message = 'Loading section... ',
  className,
  height = 240,
}) => {
  return (
    <div
      className={cn('w-full flex items-center justify-center', className)}
      style={{ minHeight: typeof height === 'number' ? `${height}px` : height }}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin" />
        <Text variant="body" color="secondary">
          {message}
        </Text>
      </div>
    </div>
  );
};



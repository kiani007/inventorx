'/* stylelint-disable */'
'use client';

import React from 'react';
import { Text } from '@/presentation/atoms';
import { cn } from '@/shared/utils/cn';

export interface PageLoaderProps {
  message?: string;
  className?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ message = 'Loading...', className }) => {
  return (
    <div className={cn('container mx-auto px-4 py-20', className)}>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin" />
        <Text variant="body" color="secondary">
          {message}
        </Text>
      </div>
    </div>
  );
};



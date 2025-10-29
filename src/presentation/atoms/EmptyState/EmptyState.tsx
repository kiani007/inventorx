/* stylelint-disable */
'use client';

import React from 'react';
import { Text } from '@/presentation/atoms';
import { cn } from '@/shared/utils/cn';

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: 'search' | 'no-results' | 'empty';
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = 'no-results',
  className,
}) => {
  return (
    <div
      className={cn(
        'py-20 flex flex-col items-center justify-center gap-6 p-12 rounded-[24px] bg-linear-to-br from-[#FFF8F0] to-white',
        className
      )}
      style={{ boxShadow: 'var(--neo-shadow)' }}
    >
      <div
        className="w-24 h-24 rounded-full bg-linear-to-br from-[#FFF8F0] to-white flex items-center justify-center"
        style={{ boxShadow: 'var(--inner-shadow)' }}
      >
        <span className="text-6xl text-[#D4AF37]/50">
          {icon === 'search' && '🔍'}
          {icon === 'no-results' && '😞'}
          {icon === 'empty' && '📭'}
        </span>
      </div>
      <div className="text-center">
        <Text variant="h3" className="mb-2">
          {title}
        </Text>
        {description && (
          <Text variant="body" color="secondary">
            {description}
          </Text>
        )}
      </div>
    </div>
  );
};


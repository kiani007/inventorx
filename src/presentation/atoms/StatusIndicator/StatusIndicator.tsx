import React from 'react';
import { cn } from '@/shared/utils/cn';
import { ProjectStatus } from '@/core/domain/entities/Project';

export interface StatusIndicatorProps {
  status: ProjectStatus;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const statusConfig: Record<ProjectStatus, { color: string; label: string; bgColor: string }> = {
  AVAILABLE: {
    color: '#27AE60',
    label: 'Available',
    bgColor: 'bg-[#27AE60]',
  },
  IN_AUCTION: {
    color: '#E74C3C',
    label: 'Live Auction',
    bgColor: 'bg-[#E74C3C]',
  },
  IN_NEGOTIATION: {
    color: '#3498DB',
    label: 'In Negotiation',
    bgColor: 'bg-[#3498DB]',
  },
  SOLD: {
    color: '#95A5A6',
    label: 'Sold',
    bgColor: 'bg-[#95A5A6]',
  },
};

const sizeClasses = {
  sm: {
    dot: 'w-2 h-2',
    text: 'text-xs',
    gap: 'gap-1.5',
  },
  md: {
    dot: 'w-2.5 h-2.5',
    text: 'text-sm',
    gap: 'gap-2',
  },
  lg: {
    dot: 'w-3 h-3',
    text: 'text-base',
    gap: 'gap-2.5',
  },
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  showLabel = true,
  size = 'md',
  className,
}) => {
  const config = statusConfig[status];
  const sizes = sizeClasses[size];

  return (
    <div className={cn('inline-flex items-center', sizes.gap, className)}>
      <div className="relative">
        <div
          className={cn(sizes.dot, config.bgColor, 'rounded-full')}
          style={{
            boxShadow: `0 0 8px ${config.color}40`,
          }}
        />
        {status === 'IN_AUCTION' && (
          <div
            className={cn(
              sizes.dot,
              config.bgColor,
              'rounded-full absolute inset-0 animate-ping opacity-75'
            )}
          />
        )}
      </div>
      {showLabel && (
        <span
          className={cn(sizes.text, 'font-semibold')}
          style={{ color: config.color }}
        >
          {config.label}
        </span>
      )}
    </div>
  );
};

export { StatusIndicator };


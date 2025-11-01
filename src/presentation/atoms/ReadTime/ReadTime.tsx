import React from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

export interface ReadTimeProps {
  minutes: number;
  className?: string;
}

export const ReadTime: React.FC<ReadTimeProps> = ({ minutes, className }) => {
  return (
    <span className={cn('inline-flex items-center gap-1 text-[14px] text-[#666666]', className)}>
      <Clock className="w-4 h-4" />
      <span>{minutes} min read</span>
    </span>
  );
};


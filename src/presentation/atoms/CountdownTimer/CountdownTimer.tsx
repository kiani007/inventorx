'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/shared/utils/cn';
import { getTimeRemaining } from '@/core/domain/entities/Auction';

export interface CountdownTimerProps {
  endDate: Date;
  className?: string;
  compact?: boolean;
  onExpire?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  endDate,
  className,
  compact = false,
  onExpire,
}) => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getTimeRemaining(endDate);
      setTimeLeft(remaining);

      if (remaining.isExpired && onExpire) {
        onExpire();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, onExpire]);

  if (timeLeft.isExpired) {
    return (
      <div
        className={cn(
          'inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold',
          className
        )}
      >
        Auction Ended
      </div>
    );
  }

  if (compact) {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-1 text-sm font-semibold text-[#E74C3C]',
          className
        )}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
        <span>
          {timeLeft.days > 0 && `${timeLeft.days}d `}
          {`${timeLeft.hours}h ${timeLeft.minutes}m`}
        </span>
      </div>
    );
  }

  return (
    <div className={cn('flex gap-2', className)}>
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

interface TimeUnitProps {
  value: number;
  label: string;
}

const TimeUnit: React.FC<TimeUnitProps> = ({ value, label }) => {
  return (
    <div
      className="flex flex-col items-center justify-center px-3 py-2 rounded-[12px] bg-gradient-to-br from-[#FFF8F0] to-white min-w-[60px]"
      style={{ boxShadow: 'var(--neo-shadow)' }}
    >
      <span className="text-2xl font-bold font-display text-[#D4AF37]">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-[10px] uppercase tracking-wider text-[#666666] font-semibold mt-0.5">
        {label}
      </span>
    </div>
  );
};

export { CountdownTimer };


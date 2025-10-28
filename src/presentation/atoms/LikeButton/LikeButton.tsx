'use client';

import React, { useState } from 'react';
import { cn } from '@/shared/utils/cn';

export interface LikeButtonProps {
  initialCount: number;
  initialLiked?: boolean;
  onToggle?: (liked: boolean) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LikeButton: React.FC<LikeButtonProps> = ({
  initialCount,
  initialLiked = false,
  onToggle,
  className,
  size = 'md',
}) => {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [isAnimating, setIsAnimating] = useState(false);

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    const newLiked = !liked;
    setLiked(newLiked);
    setCount(prevCount => (newLiked ? prevCount + 1 : prevCount - 1));

    if (onToggle) {
      onToggle(newLiked);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300',
        'hover:-translate-y-0.5',
        sizeClasses[size],
        liked
          ? 'bg-gradient-to-r from-[#E74C3C] to-[#C0392B] text-white shadow-[0_8px_20px_rgba(231,76,60,0.3)]'
          : 'bg-white text-[#666666] border border-gray-200 hover:border-[#E74C3C]/50',
        isAnimating && 'scale-110',
        className
      )}
      style={!liked ? { boxShadow: 'var(--neo-shadow)' } : undefined}
    >
      <svg
        className={cn(iconSizes[size], 'transition-all duration-300', isAnimating && 'scale-125')}
        fill={liked ? 'currentColor' : 'none'}
        stroke={liked ? 'none' : 'currentColor'}
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span>{count.toLocaleString()}</span>
    </button>
  );
};

export { LikeButton };


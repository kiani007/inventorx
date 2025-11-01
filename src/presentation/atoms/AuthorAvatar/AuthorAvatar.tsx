import React from 'react';
import Image from 'next/image';
import { cn } from '@/shared/utils/cn';

export interface AuthorAvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

export const AuthorAvatar: React.FC<AuthorAvatarProps> = ({
  src,
  alt,
  size = 'md',
  className,
}) => {
  return (
    <div className={cn('relative rounded-full overflow-hidden ring-2 ring-[#D4AF37]/20', sizeClasses[size], className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={size === 'sm' ? '32px' : size === 'md' ? '48px' : '64px'}
      />
    </div>
  );
};


'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';
import { UserRole } from '@/core/domain/entities/AuthUser';
import { LucideIcon } from 'lucide-react';

export interface RoleCardProps {
  role: UserRole;
  title: string;
  description: string;
  icon: LucideIcon;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

export const RoleCard: React.FC<RoleCardProps> = ({
  role,
  title,
  description,
  icon: Icon,
  selected,
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative p-8 rounded-[30px] cursor-pointer transition-all duration-300',
        'bg-gradient-to-br from-[#FFF8F0] to-white',
        'border-2',
        selected
          ? 'border-[#D4AF37] shadow-[0_20px_40px_rgba(212,175,55,0.3)]'
          : 'border-transparent hover:border-[#D4AF37]/30',
        className
      )}
      style={{
        boxShadow: selected ? 'var(--neo-shadow-hover)' : 'var(--neo-shadow)',
      }}
    >
      {/* Selection Indicator */}
      {selected && (
        <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5C558] flex items-center justify-center shadow-lg">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}

      {/* Icon */}
      <div
        className={cn(
          'w-16 h-16 rounded-[20px] flex items-center justify-center mb-6 transition-all duration-300',
          selected
            ? 'bg-gradient-to-r from-[#D4AF37] to-[#E5C558]'
            : 'bg-[#D4AF37]/10'
        )}
      >
        <Icon
          size={32}
          className={cn(selected ? 'text-white' : 'text-[#D4AF37]')}
        />
      </div>

      {/* Content */}
      <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-3">
        {title}
      </h3>
      <p className="text-[14px] text-[#666666] leading-relaxed">
        {description}
      </p>
    </div>
  );
};


'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';

interface FeatureCardProps {
  icon: string;
  title: string;
  description?: string;
  gradient?: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  gradient = 'from-[#D4AF37] to-[#E5C558]',
  className 
}) => {
  return (
    <div className={cn(
      'bg-gradient-to-br from-[#FFF8F0] to-white rounded-[25px] p-8 text-center transition-all duration-300 hover:scale-105',
      className
    )}
    style={{ boxShadow: 'var(--neo-shadow)' }}>
      <div className="text-[48px] mb-4">{icon}</div>
      <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-2">{title}</h3>
      {description && <p className="text-[14px] text-[#666666]">{description}</p>}
    </div>
  );
};


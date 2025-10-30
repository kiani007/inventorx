'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';

export interface FormFieldGroupProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormFieldGroup: React.FC<FormFieldGroupProps> = ({
  title,
  description,
  children,
  className,
}) => {
  return (
    <div className={cn('space-y-6', className)}>
      {(title || description) && (
        <div className="space-y-2">
          {title && (
            <h3 className="text-[18px] font-semibold text-[#1A1A1A]">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-[14px] text-[#666666]">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-5">{children}</div>
    </div>
  );
};


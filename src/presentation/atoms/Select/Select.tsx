'use client';

import * as React from 'react';
import { cn } from '@/shared/utils/cn';
import {
  Select as UiSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface SelectOption {
  value: string | number | boolean;
  label: string;
}

export interface SelectProps {
  name: string;
  value?: string;
  placeholder?: string;
  options: SelectOption[];
  onChange: (name: string, value: string) => void;
  className?: string;
  variant?: 'default' | 'neomorphic';
}

export const Select: React.FC<SelectProps> = ({
  name,
  value,
  placeholder = 'Select...',
  options,
  onChange,
  className,
  variant = 'default',
}) => {
  return (
    <UiSelect value={value ?? ''} onValueChange={(val) => onChange(name, val)}>
      <SelectTrigger
        className={cn(
          'rounded-xl',
          variant === 'neomorphic'
            ? 'bg-white ring-1 ring-gray-200 focus:ring-2 focus:ring-[#D4AF37]/40'
            : '',
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={String(opt.value)} value={String(opt.value)}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </UiSelect>
  );
};



'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';
import { Input, InputProps } from '@/presentation/atoms/Input/Input';

export interface PhoneInputProps extends Omit<InputProps, 'type' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, label = 'Phone Number', placeholder = '+1 234 567 8900', ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Allow only numbers, spaces, plus, and hyphens
      const cleaned = e.target.value.replace(/[^0-9+\s-]/g, '');
      onChange(cleaned);
    };

    return (
      <Input
        ref={ref}
        type="tel"
        value={value}
        onChange={handleChange}
        label={label}
        placeholder={placeholder}
        {...props}
      />
    );
  }
);

PhoneInput.displayName = 'PhoneInput';


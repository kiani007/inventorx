'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';
import { ExternalLink } from 'lucide-react';

export interface URLInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean;
  errorMessage?: string;
  label?: string;
  requireHttps?: boolean;
}

export const URLInput = React.forwardRef<HTMLInputElement, URLInputProps>(
  ({ className, error, errorMessage, label, requireHttps = true, value, onChange, ...props }, ref) => {
    const [isValidUrl, setIsValidUrl] = React.useState(false);

    const validateUrl = (url: string) => {
      if (!url) {
        setIsValidUrl(false);
        return;
      }

      try {
        const urlObj = new URL(url);
        const isValid = requireHttps ? urlObj.protocol === 'https:' : true;
        setIsValidUrl(isValid);
      } catch {
        setIsValidUrl(false);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      validateUrl(newValue);
      onChange?.(e);
    };

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-[14px] font-semibold text-[#1A1A1A] uppercase tracking-[0.5px]">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type="url"
            className={cn(
              'w-full px-6 py-4 pr-12 rounded-[20px] border-2 border-transparent',
              'bg-gradient-to-br from-[#FFF8F0] to-white',
              'focus:border-[#D4AF37]/50 focus:outline-none',
              'text-[16px] text-[#1A1A1A] transition-all duration-300',
              'placeholder:text-[#999999]',
              error && 'border-red-500',
              className
            )}
            style={{ boxShadow: 'var(--neo-shadow)' }}
            ref={ref}
            value={value}
            onChange={handleChange}
            {...props}
          />
          {isValidUrl && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
              <ExternalLink size={20} />
            </div>
          )}
        </div>
        
        {requireHttps && (
          <p className="text-[12px] text-[#999999]">Must start with https://</p>
        )}
        
        {error && errorMessage && (
          <p className="text-[13px] text-red-500 mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }
);

URLInput.displayName = 'URLInput';


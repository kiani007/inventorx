'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';
import countries from 'world-countries';

export interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

// Sort countries alphabetically by common name
const sortedCountries = countries
  .map((country) => ({
    name: country.name.common,
    code: country.cca2,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const CountrySelect = React.forwardRef<HTMLSelectElement, CountrySelectProps>(
  (
    {
      value,
      onChange,
      error,
      errorMessage,
      label,
      placeholder = 'Select your country',
      required,
      className,
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-[14px] font-semibold text-[#1A1A1A] uppercase tracking-[0.5px]">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <select
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full px-6 py-4 rounded-[20px] border-2 border-transparent',
            'bg-gradient-to-br from-[#FFF8F0] to-white',
            'focus:border-[#D4AF37]/50 focus:outline-none',
            'text-[16px] text-[#1A1A1A] transition-all duration-300',
            'appearance-none cursor-pointer',
            error && 'border-red-500',
            className
          )}
          style={{ boxShadow: 'var(--neo-shadow)' }}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {sortedCountries.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        {error && errorMessage && (
          <p className="text-[13px] text-red-500 mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }
);

CountrySelect.displayName = 'CountrySelect';


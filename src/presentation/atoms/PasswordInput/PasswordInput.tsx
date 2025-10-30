'use client';

import React, { useState, useMemo } from 'react';
import { cn } from '@/shared/utils/cn';
import { Eye, EyeOff } from 'lucide-react';

export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean;
  errorMessage?: string;
  label?: string;
  showStrength?: boolean;
}

export enum PasswordStrength {
  NONE = 'NONE',
  WEAK = 'WEAK',
  FAIR = 'FAIR',
  GOOD = 'GOOD',
  STRONG = 'STRONG',
}

const calculatePasswordStrength = (password: string): PasswordStrength => {
  if (!password || password.length === 0) return PasswordStrength.NONE;
  
  let score = 0;
  
  // Length check
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  
  // Character variety checks
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z\d]/.test(password)) score++;
  
  if (score <= 2) return PasswordStrength.WEAK;
  if (score <= 3) return PasswordStrength.FAIR;
  if (score <= 4) return PasswordStrength.GOOD;
  return PasswordStrength.STRONG;
};

const strengthConfig = {
  [PasswordStrength.NONE]: { color: 'bg-gray-300', text: '', width: '0%' },
  [PasswordStrength.WEAK]: { color: 'bg-red-500', text: 'Weak', width: '25%' },
  [PasswordStrength.FAIR]: { color: 'bg-orange-500', text: 'Fair', width: '50%' },
  [PasswordStrength.GOOD]: { color: 'bg-yellow-500', text: 'Good', width: '75%' },
  [PasswordStrength.STRONG]: { color: 'bg-green-500', text: 'Strong', width: '100%' },
};

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, error, errorMessage, label, showStrength = false, value, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    
    const strength = useMemo(() => {
      return showStrength && value ? calculatePasswordStrength(String(value)) : PasswordStrength.NONE;
    }, [value, showStrength]);

    const config = strengthConfig[strength];

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-[14px] font-semibold text-[#1A1A1A] uppercase tracking-[0.5px]">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
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
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#1A1A1A] transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        
        {showStrength && value && strength !== PasswordStrength.NONE && (
          <div className="space-y-1">
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={cn('h-full transition-all duration-300', config.color)}
                style={{ width: config.width }}
              />
            </div>
            <p className={cn('text-[12px] font-medium', config.color.replace('bg-', 'text-'))}>
              Password strength: {config.text}
            </p>
          </div>
        )}
        
        {error && errorMessage && (
          <p className="text-[13px] text-red-500 mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';


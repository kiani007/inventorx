import React from 'react';
import { cn } from '@/shared/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  label?: string;
  errorMessage?: string;
  look?: 'neo' | 'flat';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, errorMessage, look = 'neo', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-[14px] font-semibold text-[#1A1A1A] uppercase tracking-[0.5px]">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'w-full px-6 py-4',
            look === 'neo' ? 'rounded-[20px] border-2 border-transparent bg-gradient-to-br from-[#FFF8F0] to-white focus:border-[#D4AF37]/50' : 'rounded-xl bg-white ring-1 ring-gray-200 focus:ring-2 focus:ring-[#D4AF37]/40',
            'text-[16px] text-[#1A1A1A] transition-all duration-300 placeholder:text-[#999999]',
            error && "border-red-500",
            className
          )}
          style={look === 'neo' ? { boxShadow: 'var(--neo-shadow)' } : undefined}
          ref={ref}
          {...props}
        />
        {error && errorMessage && (
          <p className="text-[13px] text-red-500 mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
import React from 'react';
import { cn } from '@/shared/utils/cn';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  look?: 'neo' | 'flat';
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, error, label, errorMessage, look = 'neo', disabled, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label className={cn(
          'flex items-center space-x-2',
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
        )}>
          <input
            type="checkbox"
            ref={ref}
            disabled={disabled}
            className={cn(
              'w-5 h-5 rounded transition-all duration-300',
              look === 'neo' 
                ? 'border-2 border-[#D4AF37]/30 text-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 focus:ring-offset-0 bg-gradient-to-br from-[#FFF8F0] to-white'
                : 'border-2 border-gray-300 text-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 focus:ring-offset-0',
              error && 'border-red-500',
              disabled && 'cursor-not-allowed',
              className
            )}
            style={look === 'neo' && !disabled ? { boxShadow: 'var(--neo-shadow-sm)' } : undefined}
            {...props}
          />
          {label && (
            <span className={cn(
              'text-[14px] text-[#666666]',
              disabled && 'opacity-60'
            )}>
              {label}
            </span>
          )}
        </label>
        {error && errorMessage && (
          <p className="text-[13px] text-red-500 ml-7">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };


import React from 'react';
import { cn } from '@/shared/utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  label?: string;
  errorMessage?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, errorMessage, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-[14px] font-semibold text-[#1A1A1A] uppercase tracking-[0.5px]">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            "w-full px-6 py-4 rounded-[20px]",
            "border-2 border-transparent",
            "bg-gradient-to-br from-[#FFF8F0] to-white",
            "text-[16px] text-[#1A1A1A]",
            "focus:outline-none focus:border-[#D4AF37]/50",
            "transition-all duration-300",
            "placeholder:text-[#999999]",
            "resize-none",
            error && "border-red-500",
            className
          )}
          style={{ boxShadow: 'var(--neo-shadow)' }}
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

Textarea.displayName = 'Textarea';

export { Textarea };


import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';

const badgeVariants = cva(
  'inline-flex items-center justify-center px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300',
  {
    variants: {
      variant: {
        live: 'bg-gradient-to-r from-[#E74C3C] to-[#C0392B] text-white shadow-[0_4px_12px_rgba(231,76,60,0.3)]',
        new: 'bg-gradient-to-r from-[#3498DB] to-[#2980B9] text-white shadow-[0_4px_12px_rgba(52,152,219,0.3)]',
        trending: 'bg-gradient-to-r from-[#F39C12] to-[#E67E22] text-white shadow-[0_4px_12px_rgba(243,156,18,0.3)]',
        validated: 'bg-gradient-to-r from-[#27AE60] to-[#229954] text-white shadow-[0_4px_12px_rgba(39,174,96,0.3)]',
        featured: 'bg-gradient-to-r from-[#D4AF37] to-[#E5C558] text-white shadow-[0_4px_12px_rgba(212,175,55,0.3)]',
        available: 'bg-[#27AE60]/10 text-[#27AE60] border border-[#27AE60]/30',
        inAuction: 'bg-[#E74C3C]/10 text-[#E74C3C] border border-[#E74C3C]/30',
        inNegotiation: 'bg-[#3498DB]/10 text-[#3498DB] border border-[#3498DB]/30',
        sold: 'bg-[#95A5A6]/10 text-[#95A5A6] border border-[#95A5A6]/30',
        default: 'bg-gray-100 text-gray-700 border border-gray-200',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-3 py-1 text-xs',
        lg: 'px-4 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  pulse?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, icon, pulse = false, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          badgeVariants({ variant, size }),
          pulse && 'animate-pulse',
          className
        )}
        {...props}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };


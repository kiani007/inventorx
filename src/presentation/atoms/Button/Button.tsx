import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full font-semibold uppercase tracking-[1px] transition-all duration-300 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-[#D4AF37] to-[#E5C558] text-white shadow-[0_20px_40px_-10px_rgba(212,175,55,0.4)] hover:shadow-[0_25px_50px_-10px_rgba(212,175,55,0.5)] hover:-translate-y-1',
        secondary: 'bg-white text-[#D4AF37] border-2 border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white hover:-translate-y-1',
        ghost: 'hover:bg-gray-100 hover:text-gray-900',
        link: 'text-[#D4AF37] underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-10 px-6 text-[13px]',
        md: 'h-12 px-8 text-[14px]',
        lg: 'h-14 px-12 text-[16px]',
        full: 'w-full h-14 px-12 text-[16px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
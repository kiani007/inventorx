import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';

const avatarVariants = cva(
  'relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#FFF8F0] to-white overflow-hidden transition-all duration-300',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-12 w-12 text-base',
        lg: 'h-16 w-16 text-lg',
        xl: 'h-24 w-24 text-2xl',
      },
      variant: {
        default: 'border-2 border-gray-200',
        gold: 'border-2 border-[#D4AF37]',
        verified: 'border-2 border-[#27AE60]',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
  verified?: boolean;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, variant, src, alt, fallback, verified = false, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    const getFallbackText = () => {
      if (fallback) return fallback;
      if (alt) {
        return alt
          .split(' ')
          .map(word => word[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);
      }
      return '?';
    };

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, variant }), 'group', className)}
        style={{ boxShadow: 'var(--neo-shadow)' }}
        {...props}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="font-semibold text-[#D4AF37]">{getFallbackText()}</span>
        )}
        
        {verified && (
          <div
            className="absolute -bottom-0.5 -right-0.5 bg-[#27AE60] rounded-full p-1 border-2 border-white"
            title="Verified Inventor"
          >
            <svg
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar, avatarVariants };


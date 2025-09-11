import React from 'react';
import { cn } from '@/shared/utils/cn';
import { Text } from '@/presentation/atoms';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, title, description, footer, variant = 'default', children, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-white border border-gray-200',
      outlined: 'bg-transparent border-2 border-gray-300',
      elevated: 'bg-white shadow-lg',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg p-6 transition-all',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {title && (
          <Text variant="h4" className="mb-2">
            {title}
          </Text>
        )}
        {description && (
          <Text variant="body" color="secondary" className="mb-4">
            {description}
          </Text>
        )}
        {children && <div className="mb-4">{children}</div>}
        {footer && (
          <div className="mt-4 pt-4 border-t border-gray-200">{footer}</div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };
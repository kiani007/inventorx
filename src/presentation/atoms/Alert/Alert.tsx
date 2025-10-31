import React from 'react';
import { cn } from '@/shared/utils/cn';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

export interface AlertProps {
  variant?: 'error' | 'success' | 'warning' | 'info';
  title?: string;
  message: string;
  className?: string;
  icon?: boolean;
}

const variantStyles = {
  error: {
    container: 'bg-red-50 border-red-200 text-red-600',
    icon: <XCircle className="h-5 w-5 flex-shrink-0" />,
  },
  success: {
    container: 'bg-green-50 border-green-200 text-green-600',
    icon: <CheckCircle className="h-5 w-5 flex-shrink-0" />,
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200 text-yellow-600',
    icon: <AlertCircle className="h-5 w-5 flex-shrink-0" />,
  },
  info: {
    container: 'bg-blue-50 border-blue-200 text-blue-600',
    icon: <Info className="h-5 w-5 flex-shrink-0" />,
  },
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  message,
  className,
  icon = true,
}) => {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        'rounded-[20px] border-2 p-4',
        styles.container,
        className
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {icon && <div className="mt-0.5">{styles.icon}</div>}
        <div className="flex-1">
          {title && (
            <h3 className="text-[14px] font-semibold mb-1">{title}</h3>
          )}
          <p className="text-[14px] font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};


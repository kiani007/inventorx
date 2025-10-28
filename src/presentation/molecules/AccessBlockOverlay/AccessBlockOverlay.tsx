import React from 'react';
import { cn } from '@/shared/utils/cn';
import { Button } from '@/presentation/atoms';

export interface AccessBlockOverlayProps {
  title?: string;
  message?: string;
  className?: string;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

const AccessBlockOverlay: React.FC<AccessBlockOverlayProps> = ({
  title = 'Login Required',
  message = 'Register or login to view full project details and investment opportunities',
  className,
  onLoginClick,
  onRegisterClick,
}) => {
  return (
    <div
      className={cn(
        'relative rounded-[20px] overflow-hidden',
        className
      )}
    >
      {/* Blurred content backdrop */}
      <div className="absolute inset-0 backdrop-blur-md bg-white/60 z-10" />
      
      {/* Lock icon and CTA */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8">
        <div
          className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFF8F0] to-white flex items-center justify-center mb-6"
          style={{ boxShadow: 'var(--neo-shadow)' }}
        >
          <svg
            className="w-10 h-10 text-[#D4AF37]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <h3 className="text-2xl font-bold font-display text-[#1A1A1A] mb-3 text-center">
          {title}
        </h3>
        <p className="text-[#666666] text-center mb-6 max-w-md">
          {message}
        </p>

        <div className="flex gap-3 flex-wrap justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={onLoginClick || (() => window.location.href = '/login')}
          >
            Login
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={onRegisterClick || (() => window.location.href = '/register')}
          >
            Register
          </Button>
        </div>

        <p className="text-xs text-[#999999] mt-6 text-center">
          Already have an account?{' '}
          <button
            className="text-[#D4AF37] font-semibold hover:underline"
            onClick={onLoginClick || (() => window.location.href = '/login')}
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export { AccessBlockOverlay };


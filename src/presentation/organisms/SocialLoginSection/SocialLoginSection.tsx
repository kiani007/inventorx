'use client';

import React from 'react';
import { SocialLoginButton } from '@/presentation/molecules/SocialLoginButton/SocialLoginButton';
import { cn } from '@/shared/utils/cn';

export interface SocialLoginSectionProps {
  onGoogleLogin: () => void;
  onLinkedInLogin: () => void;
  disabled?: boolean;
  className?: string;
}

export const SocialLoginSection: React.FC<SocialLoginSectionProps> = ({
  onGoogleLogin,
  onLinkedInLogin,
  disabled,
  className,
}) => {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Divider with text */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-[#999999] uppercase tracking-[1px] text-[12px] font-semibold">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SocialLoginButton
          provider="google"
          onClick={onGoogleLogin}
          disabled={disabled}
        />
        <SocialLoginButton
          provider="linkedin"
          onClick={onLinkedInLogin}
          disabled={disabled}
        />
      </div>
    </div>
  );
};


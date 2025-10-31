'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';
import { Button } from '@/presentation/atoms';
import { Mail, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

export interface EmailVerificationProps {
  email: string;
  status: 'pending' | 'success' | 'error';
  onResend?: () => Promise<void>;
  onBackToLogin?: () => void;
  className?: string;
}

export const EmailVerification: React.FC<EmailVerificationProps> = ({
  email,
  status,
  onResend,
  onBackToLogin,
  className,
}) => {
  const [isResending, setIsResending] = React.useState(false);
  const [resendSuccess, setResendSuccess] = React.useState(false);

  const handleResend = async () => {
    if (!onResend) return;

    setIsResending(true);
    setResendSuccess(false);

    try {
      await onResend();
      setResendSuccess(true);
    } catch (error) {
      console.error('Resend error:', error);
    } finally {
      setIsResending(false);
    }
  };

  const config = {
    pending: {
      icon: Mail,
      iconColor: 'text-[#D4AF37]',
      iconBg: 'bg-[#D4AF37]/10',
      title: 'Verify Your Email',
      message: `We've sent a verification link to ${email}. Please check your inbox and click the link to verify your account.`,
    },
    success: {
      icon: CheckCircle,
      iconColor: 'text-green-500',
      iconBg: 'bg-green-50',
      title: 'Email Verified!',
      message: 'Your email has been successfully verified. You can now access your dashboard.',
    },
    error: {
      icon: XCircle,
      iconColor: 'text-red-500',
      iconBg: 'bg-red-50',
      title: 'Verification Failed',
      message: 'The verification link is invalid or has expired. Please request a new one.',
    },
  };

  const currentConfig = config[status];
  const Icon = currentConfig.icon;

  return (
    <div className={cn('w-full max-w-[600px] mx-auto', className)}>
      <div
        className="bg-white rounded-[40px] p-12 text-center space-y-8"
        style={{ boxShadow: 'var(--neo-shadow-hover)' }}
      >
        {/* Icon */}
        <div className="flex justify-center">
          <div
            className={cn(
              'w-24 h-24 rounded-full flex items-center justify-center',
              currentConfig.iconBg
            )}
          >
            <Icon size={48} className={currentConfig.iconColor} />
          </div>
        </div>

        {/* Title & Message */}
        <div className="space-y-3">
          <h2 className="text-[32px] font-semibold text-[#1A1A1A]">
            {currentConfig.title}
          </h2>
          <p className="text-[16px] text-[#666666] leading-relaxed">
            {currentConfig.message}
          </p>
        </div>

        {/* Resend Success Message */}
        {resendSuccess && (
          <div className="p-4 rounded-[20px] bg-green-50 border-2 border-green-200">
            <p className="text-[14px] text-green-700 font-medium">
              ✓ Verification email sent! Please check your inbox.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-4">
          {status === 'pending' && onResend && (
            <Button
              type="button"
              onClick={handleResend}
              variant="secondary"
              size="lg"
              disabled={isResending}
              className="w-full"
            >
              {isResending ? (
                <>
                  <RefreshCw size={16} className="mr-2 animate-spin" />
                  Resending...
                </>
              ) : (
                <>
                  <RefreshCw size={16} className="mr-2" />
                  Resend Verification Email
                </>
              )}
            </Button>
          )}

          {status === 'success' && (
            <Button
              type="button"
              onClick={onBackToLogin}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Go to Dashboard
            </Button>
          )}

          {status === 'error' && onResend && (
            <Button
              type="button"
              onClick={handleResend}
              variant="primary"
              size="lg"
              disabled={isResending}
              className="w-full"
            >
              {isResending ? 'Sending...' : 'Request New Link'}
            </Button>
          )}
        </div>

        {/* Help Text */}
        <div className="pt-6 border-t-2 border-gray-100">
          <p className="text-[13px] text-[#999999]">
            Didn&apos;t receive the email? Check your spam folder or{' '}
            <button
              type="button"
              onClick={handleResend}
              className="text-[#D4AF37] hover:underline font-medium"
              disabled={isResending}
            >
              resend it
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};


'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { EmailVerification } from '@/presentation/organisms/EmailVerification/EmailVerification';
import { SupabaseAuthRepository } from '@/infrastructure/repositories/SupabaseAuthRepository';
import { VerifyEmail } from '@/core/usecases/auth';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [email, setEmail] = useState('');

  const authRepo = new SupabaseAuthRepository();
  const verifyEmailUseCase = new VerifyEmail(authRepo);

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token');
      const emailParam = searchParams.get('email');

      if (emailParam) {
        setEmail(emailParam);
      }

      if (!token) {
        setStatus('error');
        toast.error('Invalid verification link');
        return;
      }

      const loadingToast = toast.loading('Verifying your email...');

      try {
        const result = await verifyEmailUseCase.execute(token);

        if (result.success) {
          setStatus('success');
          toast.success('Email verified successfully!', { id: loadingToast });
          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            router.push('/dashboard');
          }, 3000);
        } else {
          setStatus('error');
          toast.error(result.message, { id: loadingToast });
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        toast.error('Verification failed', { id: loadingToast });
      }
    };

    verifyToken();
  }, [searchParams, router]);

  const handleResend = async () => {
    if (!email) {
      toast.error('Email address not found');
      return;
    }

    const loadingToast = toast.loading('Resending verification email...');

    try {
      await authRepo.resendVerificationEmail(email);
      toast.success('Verification email sent!', { id: loadingToast });
    } catch (error) {
      console.error('Resend error:', error);
      toast.error('Failed to resend email', { id: loadingToast });
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-[#F0F0F0] to-[#FAFAFA] py-20 px-4">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-[#E5C558]/5 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Back Button */}
        <div className="max-w-[1200px] mx-auto mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-[14px] text-[#666666] hover:text-[#D4AF37] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Verification Component */}
        <EmailVerification
          email={email || 'your email'}
          status={status}
          onResend={email ? handleResend : undefined}
          onBackToLogin={() => router.push('/dashboard')}
        />
      </div>
    </div>
  );
}

export const VerifyEmailPage: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-[#F0F0F0] to-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-[#D4AF37] border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
};


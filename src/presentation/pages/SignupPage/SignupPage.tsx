'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignupForm } from '@/presentation/organisms/SignupForm/SignupForm';
import { EmailVerification } from '@/presentation/organisms/EmailVerification/EmailVerification';
import { SignupFormData } from '@/core/domain/entities/AuthUser';
import { SupabaseAuthRepository } from '@/infrastructure/repositories/SupabaseAuthRepository';
import { SignUpWithEmail, SignUpWithSocial } from '@/core/usecases/auth';
import { BackLinkButton } from '@/presentation/atoms';
import Link from 'next/link';
import toast from 'react-hot-toast';

export const SignupPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Initialize repository and use cases
  const authRepo = new SupabaseAuthRepository();
  const signUpWithEmailUseCase = new SignUpWithEmail(authRepo);
  const signUpWithSocialUseCase = new SignUpWithSocial(authRepo);

  const handleSignup = async (data: SignupFormData) => {
    setIsLoading(true);

    const loadingToast = toast.loading('Creating your account...');

    try {
      const result = await signUpWithEmailUseCase.execute(data);

      if (result.success) {
        // Check if email verification is required (two-phase flow)
        if (result.requiresEmailVerification) {
          toast.success(
            result.message || 'Account created! Please check your email.',
            { id: loadingToast }
          );
          setUserEmail(data.email);
          setShowVerification(true);
        } else {
          // Profile created immediately (email confirmation disabled)
          toast.success('Account created successfully!', { id: loadingToast });
          router.push('/dashboard');
        }
      } else {
        toast.error(result.error?.message || 'Signup failed. Please try again.', {
          id: loadingToast,
        });
      }
    } catch (err) {
      console.error('Signup error:', err);
      toast.error(
        err instanceof Error ? err.message : 'An unexpected error occurred',
        { id: loadingToast }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'linkedin') => {
    setIsLoading(true);

    const loadingToast = toast.loading(`Connecting to ${provider}...`);

    try {
      const result = await signUpWithSocialUseCase.execute(provider);

      if (result.success) {
        toast.success(`Redirecting to ${provider}...`, { id: loadingToast });
        // OAuth redirect will happen automatically
      } else {
        toast.error(result.error?.message || 'Social login failed', {
          id: loadingToast,
        });
      }
    } catch (err) {
      console.error('Social login error:', err);
      toast.error(
        err instanceof Error ? err.message : 'Social login failed',
        { id: loadingToast }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!userEmail) return;

    const loadingToast = toast.loading('Resending verification email...');

    try {
      await authRepo.resendVerificationEmail(userEmail);
      toast.success('Verification email sent!', { id: loadingToast });
    } catch (err) {
      console.error('Resend error:', err);
      toast.error('Failed to resend email', { id: loadingToast });
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-[#F0F0F0] to-[#FAFAFA] py-12 px-4">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-[#E5C558]/5 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <BackLinkButton href="/" label="Back to Home" className="text-[14px]" />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-[48px] font-light text-[#1A1A1A] mb-4">
            Join{' '}
            <span className="font-semibold bg-gradient-to-r from-[#D4AF37] to-[#E5C558] bg-clip-text text-transparent">
              InventorX
            </span>
          </h1>
          <p className="text-[18px] text-[#666666]">
            Create your account to start innovating
          </p>
          <p className="text-[14px] text-[#999999] mt-2">
            Already have an account?{' '}
            <Link href="/login" className="text-[#D4AF37] hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>

        {/* Show Signup Form or Verification */}
        {!showVerification ? (
          <SignupForm
            onSubmit={handleSignup}
            onSocialLogin={handleSocialLogin}
            isLoading={isLoading}
          />
        ) : (
          <EmailVerification
            email={userEmail}
            status="pending"
            onResend={handleResendVerification}
            onBackToLogin={() => router.push('/login')}
          />
        )}
      </div>
    </div>
  );
};


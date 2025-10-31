'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoginForm, LoginFormData } from '@/presentation/organisms/LoginForm/LoginForm';
import { SupabaseAuthRepository } from '@/infrastructure/repositories/SupabaseAuthRepository';
import { SignInWithEmail, SignUpWithSocial } from '@/core/usecases/auth';
import { PageLoader, BackLinkButton } from '@/presentation/atoms';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { AuthErrorCode } from '@/core/repositories/AuthRepository';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Initialize repository and use cases
  const authRepo = new SupabaseAuthRepository();
  const signInWithEmailUseCase = new SignInWithEmail(authRepo);
  const signUpWithSocialUseCase = new SignUpWithSocial(authRepo);

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setErrorMessage('');

    const loadingToast = toast.loading('Signing in...');

    try {
      const result = await signInWithEmailUseCase.execute(data.email, data.password);

      if (result.success) {
        // Check email verification status
        if (!result.user?.emailVerified) {
          toast.error('Please verify your email before logging in.', { id: loadingToast });
          setErrorMessage('Please verify your email. Check your inbox for the verification link.');
          
          // Optionally redirect to verify-email page
          setTimeout(() => {
            router.push('/verify-email');
          }, 2000);
          return;
        }

        // Check if profile is incomplete
        if (!result.profile) {
          toast.success('Please complete your profile', { id: loadingToast });
          router.push('/auth/complete-profile');
          return;
        }

        // Success! Redirect to intended destination or dashboard
        toast.success('Welcome back!', { id: loadingToast });
        
        const redirectPath = searchParams.get('redirect') || '/dashboard';
        router.push(redirectPath);
      } else {
        // Handle specific error codes
        const error = result.error;
        let userMessage = 'Invalid email or password. Please try again.';

        if (error) {
          switch (error.code) {
            case AuthErrorCode.INVALID_CREDENTIALS:
              userMessage = 'Invalid email or password. Please try again.';
              break;
            case AuthErrorCode.EMAIL_NOT_VERIFIED:
              userMessage = 'Please verify your email before logging in.';
              break;
            case AuthErrorCode.NETWORK_ERROR:
              userMessage = 'Connection error. Please check your internet.';
              break;
            default:
              userMessage = error.message || 'Something went wrong. Please try again.';
          }
        }

        setErrorMessage(userMessage);
        toast.error(userMessage, { id: loadingToast });
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred';
      setErrorMessage(errorMsg);
      toast.error(errorMsg, { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'linkedin') => {
    setIsLoading(true);
    setErrorMessage('');

    const loadingToast = toast.loading(`Connecting to ${provider}...`);

    try {
      const result = await signUpWithSocialUseCase.execute(provider);

      if (result.success) {
        toast.success(`Redirecting to ${provider}...`, { id: loadingToast });
        // OAuth redirect will happen automatically
      } else {
        const errorMsg = result.error?.message || 'Social login failed';
        setErrorMessage(errorMsg);
        toast.error(errorMsg, { id: loadingToast });
      }
    } catch (err) {
      console.error('Social login error:', err);
      const errorMsg = err instanceof Error ? err.message : 'Social login failed';
      setErrorMessage(errorMsg);
      toast.error(errorMsg, { id: loadingToast });
    } finally {
      setIsLoading(false);
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
      <div className="relative z-10 max-w-[600px] mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <BackLinkButton href="/" label="Back to Home" className="text-[14px]" />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-[48px] font-light text-[#1A1A1A] mb-4">
            Welcome Back to{' '}
            <span className="font-semibold bg-gradient-to-r from-[#D4AF37] to-[#E5C558] bg-clip-text text-transparent">
              InventorX
            </span>
          </h1>
          <p className="text-[18px] text-[#666666]">
            Sign in to your account to continue
          </p>
          <p className="text-[14px] text-[#999999] mt-2">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[#D4AF37] hover:underline font-medium">
              Sign up here
            </Link>
          </p>
        </div>

        {/* Login Form */}
        <LoginForm
          onSubmit={handleLogin}
          onSocialLogin={handleSocialLogin}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}

export const LoginPage: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader message="Loading login page..." />}>
      <LoginContent />
    </Suspense>
  );
};


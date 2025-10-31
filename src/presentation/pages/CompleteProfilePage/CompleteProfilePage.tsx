'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { retrievePendingSignup, clearPendingSignup } from '@/shared/services/pending-signup-storage';
import { SupabaseAuthRepository } from '@/infrastructure/repositories/SupabaseAuthRepository';
import { CompleteProfileAfterVerification } from '@/core/usecases/auth';
import { createClient } from '@/lib/supabase/client';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Complete Profile Page
 * 
 * Shown after email verification when user needs profile creation.
 * Part of two-phase signup flow.
 * 
 * Flow:
 * 1. User verifies email → session established
 * 2. Redirect to this page
 * 3. Retrieve pending signup data from storage
 * 4. Upload files and create profile
 * 5. Redirect to dashboard
 */
export const CompleteProfilePage: React.FC = () => {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Setting up your profile...');

  const authRepo = new SupabaseAuthRepository();
  const completeProfileUseCase = new CompleteProfileAfterVerification(authRepo);

  useEffect(() => {
    // Small delay to ensure cookies are synced after redirect
    const timer = setTimeout(() => {
      completeProfile();
    }, 100);
    
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function completeProfile() {
    try {
      // Retrieve pending signup data
      console.log('📝 Retrieving pending signup data...');
      const pendingSignup = await retrievePendingSignup();

      if (!pendingSignup) {
        // No pending data - likely OAuth user
        console.log('⚠️ No pending signup data found - checking if OAuth user...');
        
        // Check if user has active session (OAuth users will have session)
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log('👤 OAuth user detected - redirecting to profile setup form');
          setStatus('error');
          setMessage('Please complete your profile to continue.');
          
          // Redirect to OAuth profile setup
          setTimeout(() => {
            router.push('/auth/setup-profile');
          }, 1500);
          return;
        }
        
        // No session and no pending data - user needs to signup
        console.error('No pending signup data and no session');
        setStatus('error');
        setMessage('No signup data found. Please sign up again.');
        toast.error('Signup data not found');
        
        setTimeout(() => {
          router.push('/signup');
        }, 3000);
        return;
      }

      console.log('✅ Pending signup data retrieved');
      console.log('User ID:', pendingSignup.userId);
      console.log('Email:', pendingSignup.email);

      // Create profile with files
      setMessage('Uploading files and creating your profile...');
      
      const result = await completeProfileUseCase.execute(
        pendingSignup.userId,
        pendingSignup.data
      );

      if (!result.success) {
        console.error('Profile creation failed:', result.error);
        setStatus('error');
        setMessage(result.error?.message || 'Failed to create profile');
        toast.error('Profile creation failed');
        return;
      }

      // Success!
      console.log('✅ Profile created successfully!');
      clearPendingSignup();
      
      setStatus('success');
      setMessage('Profile created! Redirecting to dashboard...');
      toast.success('Welcome to InventorX! 🎉');

      // Redirect to dashboard
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Profile completion error:', error);
      setStatus('error');
      setMessage('An unexpected error occurred');
      toast.error('Failed to complete profile');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-[#F0F0F0] to-[#FAFAFA] flex items-center justify-center px-4">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-[#E5C558]/5 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[600px]">
        <div
          className="bg-white rounded-[40px] p-12 text-center space-y-8"
          style={{ boxShadow: 'var(--neo-shadow-hover)' }}
        >
          {/* Status Icon */}
          <div className="flex justify-center">
            {status === 'loading' && (
              <div className="w-24 h-24 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                <Loader2 size={48} className="text-[#D4AF37] animate-spin" />
              </div>
            )}
            {status === 'success' && (
              <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle2 size={48} className="text-green-500" />
              </div>
            )}
            {status === 'error' && (
              <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
                <XCircle size={48} className="text-red-500" />
              </div>
            )}
          </div>

          {/* Title & Message */}
          <div className="space-y-3">
            <h2 className="text-[32px] font-semibold text-[#1A1A1A]">
              {status === 'loading' && 'Creating Your Profile'}
              {status === 'success' && 'Profile Created!'}
              {status === 'error' && 'Something Went Wrong'}
            </h2>
            <p className="text-[16px] text-[#666666] leading-relaxed">
              {message}
            </p>
          </div>

          {/* Loading Progress */}
          {status === 'loading' && (
            <div className="space-y-3">
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E5C558] animate-progress"></div>
              </div>
              <p className="text-[13px] text-[#999999]">
                Please wait while we set up your account...
              </p>
            </div>
          )}

          {/* Error Actions */}
          {status === 'error' && (
            <div className="space-y-3 pt-4">
              <button
                onClick={() => router.push('/signup')}
                className="w-full bg-[#D4AF37] text-white py-4 rounded-[20px] font-medium hover:bg-[#C4A137] transition-colors"
                style={{ boxShadow: 'var(--neo-shadow)' }}
              >
                Try Signing Up Again
              </button>
              <button
                onClick={() => router.push('/login')}
                className="w-full bg-gray-100 text-gray-700 py-4 rounded-[20px] font-medium hover:bg-gray-200 transition-colors"
              >
                Go to Login
              </button>
            </div>
          )}

          {/* Success indicator */}
          {status === 'success' && (
            <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
              <Loader2 size={16} className="animate-spin" />
              <span>Redirecting to dashboard...</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Animation Styles */}
      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};


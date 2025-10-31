'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { loginInitialValues } from '@/shared/forms/initialValues';
import { loginValidation } from '@/shared/validation/form.login';
import { SocialLoginSection } from '@/presentation/organisms/SocialLoginSection/SocialLoginSection';
import { Input, Button, PasswordInput, Checkbox, Alert, ButtonLoader } from '@/presentation/atoms';
import Link from 'next/link';

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  onSocialLogin: (provider: 'google' | 'linkedin') => Promise<void>;
  isLoading?: boolean;
  errorMessage?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onSocialLogin,
  isLoading = false,
  errorMessage,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: loginInitialValues,
  });

  const handleFormSubmit = async (data: LoginFormData) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Error Message Display */}
      {errorMessage && (
        <Alert variant="error" message={errorMessage} />
      )}

      {/* Form Container */}
      <div
        className="bg-white rounded-[40px] p-10 md:p-12 space-y-6"
        style={{ boxShadow: 'var(--neo-shadow-hover)' }}
      >
        {/* Email Input */}
        <Input
          {...register('email', loginValidation.email)}
          label="Email"
          type="email"
          placeholder="john@example.com"
          error={!!errors.email}
          errorMessage={errors.email?.message}
          required
          disabled={isLoading}
        />

        {/* Password Input */}
        <PasswordInput
          {...register('password', loginValidation.password)}
          label="Password"
          placeholder="Enter your password"
          error={!!errors.password}
          errorMessage={errors.password?.message}
          required
          disabled={isLoading}
        />

        {/* Remember Me & Forgot Password Row */}
        <div className="flex items-center justify-between">
          {/* Remember Me Checkbox */}
          <Checkbox
            {...register('rememberMe')}
            label="Remember me"
            disabled={isLoading}
          />

          {/* Forgot Password Link */}
          <Link
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-[14px] text-[#D4AF37] hover:underline font-medium"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <ButtonLoader size="lg" className="mr-2" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </Button>

        {/* Sign Up Link */}
        <div className="text-center pt-2">
          <p className="text-[14px] text-[#666666]">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[#D4AF37] hover:underline font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </div>

      {/* Social Login Section */}
      <SocialLoginSection
        onGoogleLogin={() => onSocialLogin('google')}
        disabled={isLoading}
      />
    </form>
  );
};


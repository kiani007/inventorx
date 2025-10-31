'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { UserRole, SignupFormData } from '@/core/domain/entities/AuthUser';
import { SupabaseAuthRepository } from '@/infrastructure/repositories/SupabaseAuthRepository';
import { createClient } from '@/lib/supabase/client';
import { RoleSelector } from '@/presentation/organisms/RoleSelector/RoleSelector';
import {
  Input,
  Button,
  CountrySelect,
  PhoneInput,
  FileUpload,
  Textarea,
} from '@/presentation/atoms';
import { Loader2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { oauthProfileSetupInitialValues } from '@/shared/forms/initialValues';
import { oauthProfileValidation } from '@/shared/validation/form.signup';

/**
 * OAuth Profile Setup Page
 * 
 * Shown to OAuth users (Google/LinkedIn) who need to complete their profile.
 * Email is already verified from OAuth provider.
 * User needs to provide: role, phone, country, and optional fields.
 */

interface FormData {
  role: UserRole | null;
  phoneNumber: string;
  country: string;
  city?: string;
  shortDescription?: string;
  profilePhoto?: File | null;
  companyNames?: string[];
  companyLogos?: File[];
  companyWebsites?: string[];
}

export const OAuthProfileSetupPage: React.FC = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: oauthProfileSetupInitialValues as unknown as FormData,
  });

  const watchedRole = watch('role');

  useEffect(() => {
    loadUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadUserData() {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('No active session. Please sign in again.');
        router.push('/signup');
        return;
      }

      setUserEmail(session.user.email || '');
      setUserName(session.user.user_metadata?.full_name || session.user.user_metadata?.name || '');
      
      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', session.user.id)
        .single();
        
      if (existingProfile) {
        toast.success('Profile already exists!');
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  }

  const onSubmit = async (formData: FormData) => {
    if (!selectedRole) {
      toast.error('Please select your role');
      return;
    }

    if (selectedRole === UserRole.INVESTOR && !formData.profilePhoto) {
      toast.error('Profile photo is required for investors');
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading('Creating your profile...');

    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('Session expired. Please sign in again.', { id: loadingToast });
        router.push('/signup');
        return;
      }

      // Prepare signup data
      const signupData: SignupFormData = {
        role: selectedRole,
        fullName: userName,
        email: userEmail,
        phoneNumber: formData.phoneNumber,
        country: formData.country,
        city: formData.city,
        shortDescription: formData.shortDescription,
        profilePhoto: formData.profilePhoto || undefined,
        companyNames: formData.companyNames?.filter(Boolean),
        companyLogos: formData.companyLogos?.filter(Boolean),
        companyWebsites: formData.companyWebsites?.filter(Boolean),
        password: '', // Not needed for OAuth
      };

      // Create profile using the repository
      const authRepo = new SupabaseAuthRepository();
      const result = await authRepo.completeProfileAfterVerification(
        session.user.id,
        signupData
      );

      if (!result.success) {
        toast.error(result.error?.message || 'Failed to create profile', { id: loadingToast });
        return;
      }

      toast.success('Profile created successfully! 🎉', { id: loadingToast });
      
      // Redirect to dashboard
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);

    } catch (error) {
      console.error('Profile creation error:', error);
      toast.error('Failed to create profile', { id: loadingToast });
    } finally {
      setIsSubmitting(false);
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
        <button
          onClick={() => router.push('/signup')}
          className="inline-flex items-center space-x-2 text-[14px] text-[#666666] hover:text-[#D4AF37] transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-[48px] font-light text-[#1A1A1A] mb-4">
            Complete Your{' '}
            <span className="font-semibold bg-gradient-to-r from-[#D4AF37] to-[#E5C558] bg-clip-text text-transparent">
              Profile
            </span>
          </h1>
          <p className="text-[18px] text-[#666666]">
            Welcome, {userName}! Just a few more details to get started.
          </p>
          <p className="text-[14px] text-[#999999] mt-2">
            ✅ Email verified: {userEmail}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[800px] mx-auto">
          <div
            className="bg-white rounded-[40px] p-12 space-y-8"
            style={{ boxShadow: 'var(--neo-shadow-hover)' }}
          >
            {/* Role Selection */}
            <div className="space-y-4">
              <label className="text-[16px] font-medium text-[#1A1A1A]">
                Select Your Role <span className="text-red-500">*</span>
              </label>
              <Controller
                name="role"
                control={control}
                rules={{ required: 'Role is required' }}
                render={({ field }) => (
                  <RoleSelector
                    selectedRole={selectedRole}
                    onRoleSelect={(role) => {
                      setSelectedRole(role);
                      field.onChange(role);
                    }}
                  />
                )}
              />
              {errors.role && (
                <p className="text-sm text-red-500">{errors.role.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-4">
              <label className="text-[16px] font-medium text-[#1A1A1A]">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <Controller
                name="phoneNumber"
                control={control}
                rules={oauthProfileValidation.phoneNumber}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    placeholder="+1 234 567 8900"
                    disabled={isSubmitting}
                  />
                )}
              />
              {errors.phoneNumber && (
                <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
              )}
            </div>

            {/* Country */}
            <div className="space-y-4">
              <label className="text-[16px] font-medium text-[#1A1A1A]">
                Country <span className="text-red-500">*</span>
              </label>
              <Controller
                name="country"
                control={control}
                rules={oauthProfileValidation.country}
                render={({ field }) => (
                  <CountrySelect
                    {...field}
                    placeholder="Select your country"
                  />
                )}
              />
              {errors.country && (
                <p className="text-sm text-red-500">{errors.country.message}</p>
              )}
            </div>

            {/* Investor-specific fields */}
            {watchedRole === UserRole.INVESTOR && (
              <>
                {/* City */}
                <div className="space-y-4">
                  <label className="text-[16px] font-medium text-[#1A1A1A]">
                    City <span className="text-[#999999] text-[14px]">(Optional)</span>
                  </label>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter your city"
                        disabled={isSubmitting}
                      />
                    )}
                  />
                </div>

                {/* Profile Photo */}
                <div className="space-y-4">
                  <label className="text-[16px] font-medium text-[#1A1A1A]">
                    Profile Photo <span className="text-red-500">*</span>
                    <span className="text-[#999999] text-[14px] ml-2">Waist-up professional photo</span>
                  </label>
                  <Controller
                    name="profilePhoto"
                    control={control}
                    rules={{ required: 'Profile photo is required for investors' }}
                    render={({ field: { onChange, value } }) => (
                      <FileUpload
                        accept="image/*"
                        onChange={onChange}
                        value={value || null}
                        preview
                      />
                    )}
                  />
                  {errors.profilePhoto && (
                    <p className="text-sm text-red-500">{errors.profilePhoto.message}</p>
                  )}
                </div>
              </>
            )}

            {/* Short Description */}
            <div className="space-y-4">
              <label className="text-[16px] font-medium text-[#1A1A1A]">
                About You <span className="text-[#999999] text-[14px]">(Optional)</span>
              </label>
              <Controller
                name="shortDescription"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    disabled={isSubmitting}
                  />
                )}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="mr-2 animate-spin" />
                  Creating Profile...
                </>
              ) : (
                'Complete Profile'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};


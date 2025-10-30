'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { cn } from '@/shared/utils/cn';
import { UserRole, SignupFormData } from '@/core/domain/entities/AuthUser';
import { RoleSelector } from '@/presentation/organisms/RoleSelector/RoleSelector';
import { SocialLoginSection } from '@/presentation/organisms/SocialLoginSection/SocialLoginSection';
import { FormFieldGroup } from '@/presentation/molecules/FormFieldGroup/FormFieldGroup';
import {
  Input,
  Button,
  CountrySelect,
  PhoneInput,
  PasswordInput,
  FileUpload,
  URLInput,
  Textarea,
} from '@/presentation/atoms';
import { Loader2, Plus, X } from 'lucide-react';

export interface SignupFormProps {
  onSubmit: (data: SignupFormData) => Promise<void>;
  onSocialLogin: (provider: 'google' | 'linkedin') => Promise<void>;
  isLoading?: boolean;
}

interface FormData {
  role: UserRole | null;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  country: string;
  city?: string;
  shortDescription?: string;
  profilePhoto?: File | null;
  companyNames?: string[];
  companyLogos?: File[];
  companyWebsites?: string[];
}

export const SignupForm: React.FC<SignupFormProps> = ({
  onSubmit,
  onSocialLogin,
  isLoading = false,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [companyFields, setCompanyFields] = useState<{ name: string; website: string }[]>([]);
  const [companyLogos, setCompanyLogos] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      role: null,
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      country: '',
      city: '',
      shortDescription: '',
      profilePhoto: null,
      companyNames: [],
      companyWebsites: [],
    },
  });

  const password = watch('password');

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setValue('role', role);
  };

  const addCompanyField = () => {
    setCompanyFields([...companyFields, { name: '', website: '' }]);
  };

  const removeCompanyField = (index: number) => {
    setCompanyFields(companyFields.filter((_, i) => i !== index));
  };

  const updateCompanyField = (index: number, field: 'name' | 'website', value: string) => {
    const updated = [...companyFields];
    updated[index][field] = value;
    setCompanyFields(updated);
  };

  const handleFormSubmit = async (data: FormData) => {
    if (!selectedRole) {
      return; // Form won't submit if no role selected
    }

    if (data.password !== data.confirmPassword) {
      return; // Password validation handled by react-hook-form
    }

    // Prepare signup data
    const signupData: SignupFormData = {
      role: selectedRole,
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
      country: data.country,
      city: data.city,
      shortDescription: data.shortDescription,
    };

    // Add investor-specific fields
    if (selectedRole === UserRole.INVESTOR) {
      signupData.profilePhoto = data.profilePhoto || undefined;
      signupData.companyNames = companyFields.map((f) => f.name).filter((n) => n);
      signupData.companyWebsites = companyFields.map((f) => f.website).filter((w) => w);
      signupData.companyLogos = companyLogos.length > 0 ? companyLogos : undefined;
    }

    await onSubmit(signupData);
  };

  return (
    <div className="w-full max-w-[900px] mx-auto space-y-12">
      {/* Role Selection */}
      <RoleSelector selectedRole={selectedRole} onRoleSelect={handleRoleSelect} />

      {/* Registration Form - Only show after role selection */}
      {selectedRole && (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-10">
          {/* Step Indicator */}
          <div className="text-center space-y-3">
            <div className="inline-block px-5 py-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-[13px] font-semibold uppercase tracking-[1px]">
              Step 2
            </div>
            <h2 className="text-[32px] font-light text-[#1A1A1A]">
              Complete Your{' '}
              <span className="font-semibold bg-gradient-to-r from-[#D4AF37] to-[#E5C558] bg-clip-text text-transparent">
                Profile
              </span>
            </h2>
          </div>

          {/* Form Container */}
          <div
            className="bg-white rounded-[40px] p-10 md:p-12 space-y-8"
            style={{ boxShadow: 'var(--neo-shadow-hover)' }}
          >
            {/* Basic Information */}
            <FormFieldGroup title="Basic Information" description="Tell us about yourself">
              <Input
                {...register('fullName', {
                  required: 'Full name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' },
                })}
                label="Full Name"
                placeholder="John Doe"
                error={!!errors.fullName}
                errorMessage={errors.fullName?.message}
                required
              />

              <Input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                label="Email"
                type="email"
                placeholder="john@example.com"
                error={!!errors.email}
                errorMessage={errors.email?.message}
                required
              />

              <Controller
                name="phoneNumber"
                control={control}
                rules={{
                  required: 'Phone number is required',
                  minLength: { value: 5, message: 'Phone number is too short' },
                }}
                render={({ field }) => (
                  <PhoneInput
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.phoneNumber}
                    errorMessage={errors.phoneNumber?.message}
                  />
                )}
              />
            </FormFieldGroup>

            {/* Security */}
            <FormFieldGroup title="Security" description="Create a secure password">
              <PasswordInput
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: 'Password must contain uppercase, lowercase, and number',
                  },
                })}
                label="Password"
                placeholder="Create a strong password"
                showStrength
                error={!!errors.password}
                errorMessage={errors.password?.message}
              />

              <PasswordInput
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === password || 'Passwords do not match',
                })}
                label="Confirm Password"
                placeholder="Re-enter your password"
                error={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message}
              />
            </FormFieldGroup>

            {/* Location */}
            <FormFieldGroup title="Location" description="Where are you based?">
              <Controller
                name="country"
                control={control}
                rules={{ required: 'Country is required' }}
                render={({ field }) => (
                  <CountrySelect
                    value={field.value}
                    onChange={field.onChange}
                    label="Country"
                    error={!!errors.country}
                    errorMessage={errors.country?.message}
                    required
                  />
                )}
              />

              {selectedRole === UserRole.INVESTOR && (
                <Input
                  {...register('city')}
                  label="City"
                  placeholder="San Francisco"
                  error={!!errors.city}
                  errorMessage={errors.city?.message}
                />
              )}
            </FormFieldGroup>

            {/* Optional Description */}
            <FormFieldGroup
              title="About You (Optional)"
              description="Tell us a bit about your work or interests"
            >
              <Textarea
                {...register('shortDescription')}
                label="Short Description"
                rows={4}
                placeholder="I'm passionate about..."
                error={!!errors.shortDescription}
                errorMessage={errors.shortDescription?.message}
              />
            </FormFieldGroup>

            {/* Investor-Specific Fields */}
            {selectedRole === UserRole.INVESTOR && (
              <>
                <FormFieldGroup
                  title="Profile Photo"
                  description="Upload a professional waist-up photo (Required for investors)"
                >
                  <Controller
                    name="profilePhoto"
                    control={control}
                    rules={{ required: 'Profile photo is required for investors' }}
                    render={({ field }) => (
                      <FileUpload
                        value={field.value}
                        onChange={field.onChange}
                        label="Profile Photo"
                        accept="image/*"
                        maxSizeMB={5}
                        preview
                        required
                        error={!!errors.profilePhoto}
                        errorMessage={errors.profilePhoto?.message}
                        helpText="JPG, PNG or GIF up to 5MB"
                      />
                    )}
                  />
                </FormFieldGroup>

                <FormFieldGroup
                  title="Company Information (Optional)"
                  description="Add your company details to enhance your profile"
                >
                  <div className="space-y-4">
                    {companyFields.map((field, index) => (
                      <div
                        key={index}
                        className="p-6 rounded-[20px] bg-gradient-to-br from-[#FFF8F0] to-white space-y-4 relative"
                        style={{ boxShadow: 'var(--neo-shadow)' }}
                      >
                        <button
                          type="button"
                          onClick={() => removeCompanyField(index)}
                          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors"
                        >
                          <X size={16} className="text-red-500" />
                        </button>

                        <Input
                          value={field.name}
                          onChange={(e) => updateCompanyField(index, 'name', e.target.value)}
                          label={`Company Name ${index + 1}`}
                          placeholder="Company Inc."
                        />

                        <URLInput
                          value={field.website}
                          onChange={(e) => updateCompanyField(index, 'website', e.target.value)}
                          label={`Company Website ${index + 1}`}
                          placeholder="https://company.com"
                          requireHttps
                        />
                      </div>
                    ))}

                    <Button
                      type="button"
                      onClick={addCompanyField}
                      variant="secondary"
                      size="md"
                      className="w-full"
                    >
                      <Plus size={16} className="mr-2" />
                      Add Company
                    </Button>
                  </div>
                </FormFieldGroup>

                <FormFieldGroup
                  title="Company Logos (Optional)"
                  description="Upload up to 3 company logos for your profile card"
                >
                  <div className="space-y-4">
                    {[0, 1, 2].map((index) => (
                      <FileUpload
                        key={index}
                        value={companyLogos[index] || null}
                        onChange={(file) => {
                          const updated = [...companyLogos];
                          if (file) {
                            updated[index] = file;
                          } else {
                            updated.splice(index, 1);
                          }
                          setCompanyLogos(updated);
                        }}
                        label={`Company Logo ${index + 1}`}
                        accept="image/*"
                        maxSizeMB={2}
                        preview
                        helpText="PNG or SVG recommended, up to 2MB"
                      />
                    ))}
                  </div>
                </FormFieldGroup>
              </>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="full"
                disabled={isLoading || !selectedRole}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </div>

            {/* Terms */}
            <p className="text-[12px] text-center text-[#999999]">
              By signing up, you agree to our{' '}
              <a href="/terms" className="text-[#D4AF37] hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-[#D4AF37] hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>

          {/* Social Login */}
          <SocialLoginSection
            onGoogleLogin={() => onSocialLogin('google')}
            onLinkedInLogin={() => onSocialLogin('linkedin')}
            disabled={isLoading}
          />
        </form>
      )}
    </div>
  );
};


import { UserRole } from '@/core/domain/entities/AuthUser';

/**
 * Signup Form Initial Values
 */
export const signupInitialValues = {
  role: null as UserRole | null,
  fullName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  country: '',
  city: '',
  shortDescription: '',
  profilePhoto: null as File | null,
  companyNames: [] as string[],
  companyWebsites: [] as string[],
};

/**
 * OAuth Profile Setup Initial Values
 */
export const oauthProfileSetupInitialValues = {
  role: null as UserRole | null,
  phoneNumber: '',
  country: '',
  city: '',
  shortDescription: '',
  profilePhoto: null as File | null,
  companyNames: [] as string[],
  companyWebsites: [] as string[],
};


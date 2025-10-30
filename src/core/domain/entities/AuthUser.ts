/**
 * User Role Enum
 * Represents the three types of users in the system
 */
export enum UserRole {
  INVENTOR = 'INVENTOR',
  CONCEPTOR = 'CONCEPTOR',
  INVESTOR = 'INVESTOR',
}

/**
 * Base User Profile Interface
 * Common fields required for all user roles
 */
export interface BaseUserProfile {
  id: string;
  role: UserRole;
  fullName: string;
  email: string;
  phoneNumber: string;
  phoneVerified: boolean;
  country: string;
  city?: string;
  shortDescription?: string;
  emailVerified: boolean;
  profileCompleted: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Inventor/Conceptor Profile Interface
 * Inventors and Conceptors share the same profile structure
 */
export interface InventorProfile extends BaseUserProfile {
  role: UserRole.INVENTOR | UserRole.CONCEPTOR;
}

/**
 * Investor Profile Interface
 * Includes additional fields specific to investors
 */
export interface InvestorProfile extends BaseUserProfile {
  role: UserRole.INVESTOR;
  profilePhotoUrl: string; // Mandatory for investors
  companyNames?: string[]; // Optional, can be multiple
  companyLogoUrls?: string[]; // Optional, max 3 (paid feature)
  companyWebsites?: string[]; // Optional, must be HTTPS
}

/**
 * Union type for all user profiles
 */
export type UserProfile = InventorProfile | InvestorProfile;

/**
 * Signup Form Data Interface
 * Data collected during registration
 */
export interface SignupFormData {
  role: UserRole;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  country: string;
  city?: string; // Required for investors
  shortDescription?: string; // Optional for all
  
  // Investor-specific fields
  profilePhoto?: File; // Mandatory for investors
  companyNames?: string[];
  companyLogos?: File[]; // Max 3
  companyWebsites?: string[];
}

/**
 * Social Login Data Interface
 * Data received from OAuth providers
 */
export interface SocialLoginData {
  provider: 'google' | 'linkedin';
  email: string;
  fullName: string;
  avatarUrl?: string;
}

/**
 * Email Verification Status
 */
export interface EmailVerificationStatus {
  isVerified: boolean;
  verificationSentAt?: Date;
  verificationToken?: string;
}

/**
 * Auth Session Interface
 * Represents current authenticated session
 */
export interface AuthSession {
  user: {
    id: string;
    email: string;
    emailVerified: boolean;
  };
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

/**
 * Password Strength Levels
 */
export enum PasswordStrength {
  WEAK = 'WEAK',
  FAIR = 'FAIR',
  GOOD = 'GOOD',
  STRONG = 'STRONG',
}

/**
 * Helper function to check if user is investor
 */
export function isInvestorProfile(profile: UserProfile): profile is InvestorProfile {
  return profile.role === UserRole.INVESTOR;
}

/**
 * Helper function to check if user is inventor/conceptor
 */
export function isInventorProfile(profile: UserProfile): profile is InventorProfile {
  return profile.role === UserRole.INVENTOR || profile.role === UserRole.CONCEPTOR;
}

/**
 * Validation helper to check if investor profile is complete
 */
export function isInvestorProfileComplete(profile: InvestorProfile): boolean {
  return (
    profile.emailVerified &&
    !!profile.profilePhotoUrl &&
    profile.fullName.trim().length > 0 &&
    profile.phoneNumber.trim().length > 0 &&
    profile.country.trim().length > 0
  );
}

/**
 * Validation helper to check if inventor profile is complete
 */
export function isInventorProfileComplete(profile: InventorProfile): boolean {
  return (
    profile.emailVerified &&
    profile.fullName.trim().length > 0 &&
    profile.phoneNumber.trim().length > 0 &&
    profile.country.trim().length > 0
  );
}


import {
  SignupFormData,
  UserProfile,
  AuthSession,
} from '@/core/domain/entities/AuthUser';

/**
 * Authentication Repository Interface
 * Defines all authentication-related operations
 */
export interface AuthRepository {
  /**
   * Sign up a new user with email and password
   * Creates user in auth.users and profile in profiles table
   * Sends verification email automatically
   */
  signUpWithEmail(data: SignupFormData): Promise<AuthResult>;

  /**
   * Complete profile creation after email verification
   * Called from auth callback after user verifies email
   */
  completeProfileAfterVerification(
    userId: string,
    data: SignupFormData
  ): Promise<AuthResult>;

  /**
   * Sign up or sign in with social OAuth provider (Google/LinkedIn)
   * Auto-verifies email if new user
   */
  signUpWithSocial(
    provider: 'google' | 'linkedin',
    additionalData?: Partial<SignupFormData>
  ): Promise<AuthResult>;

  /**
   * Sign in with email and password
   */
  signInWithEmail(email: string, password: string): Promise<AuthResult>;

  /**
   * Sign out current user
   */
  signOut(): Promise<void>;

  /**
   * Get current authenticated session
   */
  getSession(): Promise<AuthSession | null>;

  /**
   * Get current user profile
   */
  getCurrentUserProfile(): Promise<UserProfile | null>;

  /**
   * Update user profile
   */
  updateProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile>;

  /**
   * Verify email with OTP code sent to user's email
   */
  verifyEmail(token: string): Promise<boolean>;

  /**
   * Resend email verification
   */
  resendVerificationEmail(email: string): Promise<void>;

  /**
   * Check if email already exists
   */
  checkEmailExists(email: string): Promise<boolean>;

  /**
   * Upload profile photo to storage
   * Returns public URL
   */
  uploadProfilePhoto(userId: string, file: File): Promise<string>;

  /**
   * Upload company logo to storage
   * Returns public URL
   */
  uploadCompanyLogo(userId: string, file: File, index: number): Promise<string>;

  /**
   * Delete file from storage
   */
  deleteFile(bucket: string, path: string): Promise<void>;

  /**
   * Request password reset email
   */
  requestPasswordReset(email: string): Promise<void>;

  /**
   * Reset password with token
   */
  resetPassword(token: string, newPassword: string): Promise<void>;
}

/**
 * Authentication Result
 * Returned by signup/signin operations
 */
export interface AuthResult {
  success: boolean;
  user?: {
    id: string;
    email: string;
    emailVerified: boolean;
  };
  profile?: UserProfile;
  session?: AuthSession;
  error?: AuthError;
  requiresEmailVerification?: boolean;
  requiresProfileCompletion?: boolean;
  message?: string;
}

/**
 * Authentication Errors
 */
export enum AuthErrorCode {
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  WEAK_PASSWORD = 'WEAK_PASSWORD',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',
  PROFILE_INCOMPLETE = 'PROFILE_INCOMPLETE',
  UPLOAD_FAILED = 'UPLOAD_FAILED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface AuthError {
  code: AuthErrorCode;
  message: string;
  details?: string;
}


import { createClient } from '@/lib/supabase/client';
import {
  AuthRepository,
  AuthResult,
  AuthError,
  AuthErrorCode,
} from '@/core/repositories/AuthRepository';
import {
  SignupFormData,
  UserProfile,
  AuthSession,
  UserRole,
} from '@/core/domain/entities/AuthUser';
import { SupabaseClient } from '@supabase/supabase-js';
import { storePendingSignup } from '@/shared/services/pending-signup-storage';
import type { ProfileInsertDTO, ProfileUpdateDTO } from '@/shared/types';
import { mapDatabaseProfileToUserProfile, mapUserProfileToUpdateDTO, createProfileInsertFromSignup } from '@/shared/mappers/profile';

/**
 * Supabase Implementation of AuthRepository
 * Handles all authentication operations using Supabase
 */
export class SupabaseAuthRepository implements AuthRepository {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient();
  }

  /**
   * Complete profile creation after email verification
   * Called from auth callback after user verifies email
   */
  async completeProfileAfterVerification(
    userId: string,
    data: SignupFormData
  ): Promise<AuthResult> {
    try {
      console.log('📝 Completing profile creation for verified user:', userId);

      // Refresh session to ensure we have the latest session from cookies
      console.log('🔄 Refreshing session...');
      const { data: { session }, error: sessionError } = await this.supabase.auth.refreshSession();
      
      if (sessionError) {
        console.error('Session refresh error:', sessionError);
      }
      
      if (!session) {
        console.error('No valid session after refresh');
        return {
          success: false,
          error: {
            code: AuthErrorCode.UNKNOWN_ERROR,
            message: 'Authentication session expired. Please sign in again.',
          },
        };
      }
      
      console.log('✅ Session refreshed, user:', session.user.id);
      
      if (session.user.id !== userId) {
        console.error('Session user ID mismatch. Expected:', userId, 'Got:', session.user.id);
        return {
          success: false,
          error: {
            code: AuthErrorCode.UNKNOWN_ERROR,
            message: 'Session user mismatch. Please sign in again.',
          },
        };
      }

      // Upload profile photo if investor
      let profilePhotoUrl: string | undefined;
      if (data.role === UserRole.INVESTOR && data.profilePhoto) {
        try {
          profilePhotoUrl = await this.uploadProfilePhoto(userId, data.profilePhoto);
          console.log('✅ Profile photo uploaded');
        } catch (uploadError) {
          console.error('Profile photo upload failed:', uploadError);
          // Continue with signup, user can upload later
        }
      }

      // Upload company logos if provided
      const companyLogoUrls: string[] = [];
      if (data.companyLogos && data.companyLogos.length > 0) {
        for (let i = 0; i < Math.min(data.companyLogos.length, 3); i++) {
          try {
            const logoUrl = await this.uploadCompanyLogo(userId, data.companyLogos[i], i);
            companyLogoUrls.push(logoUrl);
            console.log(`✅ Company logo ${i + 1} uploaded`);
          } catch (uploadError) {
            console.error(`Company logo ${i + 1} upload failed:`, uploadError);
          }
        }
      }

      // Create profile in profiles table
      const profile = await this.createProfile(userId, data, profilePhotoUrl, companyLogoUrls);

      if (!profile) {
        return {
          success: false,
          error: {
            code: AuthErrorCode.UNKNOWN_ERROR,
            message: 'Failed to create user profile',
          },
        };
      }

      console.log('✅ Profile created successfully');

      // Return success result
      return {
        success: true,
        user: {
          id: userId,
          email: session.user.email!,
          emailVerified: true,
        },
        profile,
        session: {
          user: {
            id: userId,
            email: session.user.email!,
            emailVerified: true,
          },
          accessToken: session.access_token,
          refreshToken: session.refresh_token,
          expiresAt: session.expires_at || 0,
        },
      };
    } catch (error) {
      console.error('Profile completion error:', error);
      return {
        success: false,
        error: {
          code: AuthErrorCode.UNKNOWN_ERROR,
          message: 'Failed to complete profile creation',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      };
    }
  }

  /**
   * Sign up with email and password
   */
  async signUpWithEmail(data: SignupFormData): Promise<AuthResult> {
    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await this.supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
          data: {
            full_name: data.fullName,
          },
        },
      });

      if (authError) {
        return this.handleAuthError(authError);
      }

      if (!authData.user) {
        return {
          success: false,
          error: {
            code: AuthErrorCode.UNKNOWN_ERROR,
            message: 'Failed to create user account',
          },
        };
      }

      // IMPORTANT: When email confirmation is enabled, authData.session is null
      // We cannot create profile immediately because:
      // 1. User hasn't confirmed email yet
      // 2. Supabase won't allow sign-in without confirmation
      // 3. RLS policies require authenticated session
      //
      // SOLUTION: Store signup data temporarily, complete profile after email verification
      if (!authData.session) {
        console.log('📧 Email confirmation required - storing signup data temporarily');
        
        try {
          // Store signup data securely for completion after verification
          await storePendingSignup(authData.user.id, authData.user.email!, data);
          
          console.log('✅ Signup data stored - awaiting email verification');
          
          return {
            success: true,
            user: {
              id: authData.user.id,
              email: authData.user.email!,
              emailVerified: false,
            },
            requiresEmailVerification: true,
            message: 'Account created! Please check your email to verify your account.',
          };
        } catch (storageError) {
          console.error('Failed to store pending signup data:', storageError);
          // Do not attempt admin deletion from client; surface error to user
          return {
            success: false,
            error: {
              code: AuthErrorCode.UNKNOWN_ERROR,
              message: 'Failed to save signup data. Please try again.',
              details: storageError instanceof Error ? storageError.message : 'Storage error',
            },
          };
        }
      }

      // 2. Upload profile photo if investor
      let profilePhotoUrl: string | undefined;
      if (data.role === UserRole.INVESTOR && data.profilePhoto) {
        try {
          profilePhotoUrl = await this.uploadProfilePhoto(authData.user.id, data.profilePhoto);
        } catch (uploadError) {
          console.error('Profile photo upload failed:', uploadError);
          // Continue with signup, user can upload later
        }
      }

      // 3. Upload company logos if provided
      const companyLogoUrls: string[] = [];
      if (data.companyLogos && data.companyLogos.length > 0) {
        for (let i = 0; i < Math.min(data.companyLogos.length, 3); i++) {
          try {
            const logoUrl = await this.uploadCompanyLogo(
              authData.user.id,
              data.companyLogos[i],
              i
            );
            companyLogoUrls.push(logoUrl);
          } catch (uploadError) {
            console.error(`Company logo ${i + 1} upload failed:`, uploadError);
          }
        }
      }

      // 4. Create profile in profiles table
      const profile = await this.createProfile(authData.user.id, data, profilePhotoUrl, companyLogoUrls);

      if (!profile) {
        return {
          success: false,
          error: {
            code: AuthErrorCode.UNKNOWN_ERROR,
            message: 'Failed to create user profile',
          },
        };
      }

      // 5. Return success result
      return {
        success: true,
        user: {
          id: authData.user.id,
          email: authData.user.email!,
          emailVerified: authData.user.email_confirmed_at != null,
        },
        profile,
        requiresEmailVerification: !authData.user.email_confirmed_at,
      };
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        error: {
          code: AuthErrorCode.UNKNOWN_ERROR,
          message: 'An unexpected error occurred during signup',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      };
    }
  }

  /**
   * Sign up or sign in with OAuth provider
   */
  async signUpWithSocial(
    provider: 'google' | 'linkedin',
    additionalData?: Partial<SignupFormData>
  ): Promise<AuthResult> {
    try {
      const providerMap = {
        google: 'google' as const,
        linkedin: 'linkedin_oidc' as const,
      };

      const { data, error } = await this.supabase.auth.signInWithOAuth({
        provider: providerMap[provider],
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
          queryParams: additionalData
            ? {
                access_type: 'offline',
                prompt: 'consent',
              }
            : undefined,
        },
      });

      if (error) {
        return this.handleAuthError(error);
      }

      // OAuth flow is handled by redirect, return success
      return {
        success: true,
        requiresProfileCompletion: true,
      };
    } catch (error) {
      console.error('Social signup error:', error);
      return {
        success: false,
        error: {
          code: AuthErrorCode.UNKNOWN_ERROR,
          message: 'Failed to sign in with ' + provider,
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      };
    }
  }

  /**
   * Sign in with email and password
   */
  async signInWithEmail(email: string, password: string): Promise<AuthResult> {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return this.handleAuthError(error);
      }

      if (!data.user || !data.session) {
        return {
          success: false,
          error: {
            code: AuthErrorCode.INVALID_CREDENTIALS,
            message: 'Invalid email or password',
          },
        };
      }

      // Fetch user profile
      const profile = await this.getCurrentUserProfile();

      return {
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email!,
          emailVerified: data.user.email_confirmed_at != null,
        },
        profile: profile || undefined,
        session: {
          user: {
            id: data.user.id,
            email: data.user.email!,
            emailVerified: data.user.email_confirmed_at != null,
          },
          accessToken: data.session.access_token,
          refreshToken: data.session.refresh_token,
          expiresAt: data.session.expires_at || 0,
        },
      };
    } catch (error) {
      console.error('Sign in error:', error);
      return {
        success: false,
        error: {
          code: AuthErrorCode.UNKNOWN_ERROR,
          message: 'An unexpected error occurred during sign in',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      };
    }
  }

  /**
   * Sign out current user
   */
  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
  }

  /**
   * Get current session
   */
  async getSession(): Promise<AuthSession | null> {
    const { data } = await this.supabase.auth.getSession();

    if (!data.session) {
      return null;
    }

    return {
      user: {
        id: data.session.user.id,
        email: data.session.user.email!,
        emailVerified: data.session.user.email_confirmed_at != null,
      },
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      expiresAt: data.session.expires_at || 0,
    };
  }

  /**
   * Get current user profile
   */
  async getCurrentUserProfile(): Promise<UserProfile | null> {
    try {
      const { data: { user } } = await this.supabase.auth.getUser();

      if (!user) {
        return null;
      }

      const { data: profile, error } = await this.supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error || !profile) {
        return null;
      }

      return this.mapDatabaseProfileToUserProfile(profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    const { data, error } = await this.supabase
      .from('profiles')
      .update(this.mapUserProfileToDatabase(updates))
      .eq('id', userId)
      .select()
      .single();

    if (error || !data) {
      throw new Error('Failed to update profile');
    }

    return this.mapDatabaseProfileToUserProfile(data);
  }

  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase.auth.verifyOtp({
        token_hash: token,
        type: 'email',
      });

      if (error) {
        console.error('Email verification error:', error);
        return false;
      }

      // Update profile to mark email as verified
      if (data.user) {
        await this.supabase
          .from('profiles')
          .update({ email_verified: true })
          .eq('id', data.user.id);
      }

      return true;
    } catch (error) {
      console.error('Email verification error:', error);
      return false;
    }
  }

  /**
   * Resend verification email
   */
  async resendVerificationEmail(email: string): Promise<void> {
    await this.supabase.auth.resend({
      type: 'signup',
      email,
    });
  }

  /**
   * Check if email exists
   */
  async checkEmailExists(email: string): Promise<boolean> {
    // Note: Supabase doesn't provide a direct way to check email existence
    // This is a security feature to prevent email enumeration
    // We'll return false and let signup handle duplicate email errors
    return false;
  }

  /**
   * Upload profile photo
   */
  async uploadProfilePhoto(userId: string, file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/avatar.${fileExt}`;
    const filePath = `profile-photos/${fileName}`;

    const { error: uploadError } = await this.supabase.storage
      .from('profile-photos')
      .upload(filePath, file, {
        upsert: true,
      });

    if (uploadError) {
      throw new Error(`Failed to upload profile photo: ${uploadError.message}`);
    }

    const { data } = this.supabase.storage
      .from('profile-photos')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  /**
   * Upload company logo
   */
  async uploadCompanyLogo(userId: string, file: File, index: number): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/logo-${index + 1}.${fileExt}`;
    const filePath = `company-logos/${fileName}`;

    const { error: uploadError } = await this.supabase.storage
      .from('company-logos')
      .upload(filePath, file, {
        upsert: true,
      });

    if (uploadError) {
      throw new Error(`Failed to upload company logo: ${uploadError.message}`);
    }

    const { data } = this.supabase.storage
      .from('company-logos')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  /**
   * Delete file from storage
   */
  async deleteFile(bucket: string, path: string): Promise<void> {
    await this.supabase.storage.from(bucket).remove([path]);
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<void> {
    await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
    });
  }

  /**
   * Reset password
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    const { error } = await this.supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw new Error('Failed to reset password');
    }
  }

  // ============================================
  // PRIVATE HELPER METHODS
  // ============================================

  /**
   * Create profile in database
   */
  private async createProfile(
    userId: string,
    data: SignupFormData,
    profilePhotoUrl?: string,
    companyLogoUrls?: string[]
  ): Promise<UserProfile | null> {
    const profileData: ProfileInsertDTO = createProfileInsertFromSignup(
      userId,
      data,
      profilePhotoUrl,
      companyLogoUrls
    );

    const { data: profile, error } = await this.supabase
      .from('profiles')
      .insert(profileData as never)
      .select()
      .single();

    if (error) {
      console.error('Profile creation error:', error);
      console.error('Profile data attempted:', JSON.stringify(profileData, null, 2));
      
      // Check if user is authenticated
      const { data: { session } } = await this.supabase.auth.getSession();
      console.error('Current session:', session ? 'Authenticated' : 'Not authenticated');
      console.error('User ID from session:', session?.user?.id);
      
      return null;
    }

    return mapDatabaseProfileToUserProfile(profile);
  }

  /**
   * Map database profile to domain UserProfile
   */
  private mapDatabaseProfileToUserProfile(dbProfile: Record<string, unknown>): UserProfile {
    return mapDatabaseProfileToUserProfile(dbProfile);
  }

  /**
   * Map domain UserProfile to database format
   */
  private mapUserProfileToDatabase(profile: Partial<UserProfile>): ProfileUpdateDTO {
    return mapUserProfileToUpdateDTO(profile);
  }

  /**
   * Handle Supabase auth errors
   */
  private handleAuthError(error: unknown): AuthResult {
    console.error('Auth error:', error);

    let errorCode = AuthErrorCode.UNKNOWN_ERROR;
    let message = 'An unexpected error occurred';
    let details: string | undefined;

    // Type guard to check if error has a message property
    if (error && typeof error === 'object' && 'message' in error) {
      const errorMessage = (error as { message: string }).message;
      details = errorMessage;

      if (errorMessage?.includes('already registered')) {
        errorCode = AuthErrorCode.EMAIL_ALREADY_EXISTS;
        message = 'An account with this email already exists';
      } else if (errorMessage?.includes('Invalid login credentials')) {
        errorCode = AuthErrorCode.INVALID_CREDENTIALS;
        message = 'Invalid email or password';
      } else if (errorMessage?.includes('Password')) {
        errorCode = AuthErrorCode.WEAK_PASSWORD;
        message = 'Password does not meet requirements';
      } else if (errorMessage?.includes('Email not confirmed')) {
        errorCode = AuthErrorCode.EMAIL_NOT_VERIFIED;
        message = 'Please verify your email address';
      }
    }

    return {
      success: false,
      error: {
        code: errorCode,
        message,
        details,
      },
    };
  }
}


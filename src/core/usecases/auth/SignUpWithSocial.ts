import { AuthRepository, AuthResult } from '@/core/repositories/AuthRepository';
import { SignupFormData, UserRole } from '@/core/domain/entities/AuthUser';

/**
 * Use Case: Sign Up With Social OAuth
 * Handles user registration/login with Google or LinkedIn
 */
export class SignUpWithSocial {
  constructor(private authRepository: AuthRepository) {}

  /**
   * Initiate social login
   * For new users, they'll need to complete profile after OAuth
   */
  async execute(
    provider: 'google' | 'linkedin',
    additionalData?: Partial<SignupFormData>
  ): Promise<AuthResult> {
    // Validate additional data if provided (for new users)
    if (additionalData) {
      this.validateAdditionalData(additionalData);
    }

    // Perform social auth
    const result = await this.authRepository.signUpWithSocial(provider, additionalData);

    return result;
  }

  private validateAdditionalData(data: Partial<SignupFormData>): void {
    if (data.role && !Object.values(UserRole).includes(data.role)) {
      throw new Error('Invalid user role');
    }

    if (data.role === UserRole.INVESTOR) {
      if (!data.profilePhoto) {
        throw new Error('Profile photo is required for investors');
      }
    }

    if (data.companyWebsites && data.companyWebsites.length > 0) {
      for (const website of data.companyWebsites) {
        if (!website.startsWith('https://')) {
          throw new Error('Company websites must use HTTPS');
        }
      }
    }
  }
}


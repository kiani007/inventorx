import { AuthRepository, AuthResult, AuthErrorCode } from '@/core/repositories/AuthRepository';
import { SignupFormData } from '@/core/domain/entities/AuthUser';

/**
 * Use Case: Sign Up With Email
 * Handles user registration with email and password
 */
export class SignUpWithEmail {
  constructor(private authRepository: AuthRepository) {}

  async execute(data: SignupFormData): Promise<AuthResult> {
    // Validate input data
    this.validateSignupData(data);

    // Check if email already exists
    const emailExists = await this.authRepository.checkEmailExists(data.email);
    if (emailExists) {
      return {
        success: false,
        error: {
          code: AuthErrorCode.EMAIL_ALREADY_EXISTS,
          message: 'An account with this email already exists',
        },
      };
    }

    // Validate password strength
    if (!this.isPasswordStrong(data.password)) {
      return {
        success: false,
        error: {
          code: AuthErrorCode.WEAK_PASSWORD,
          message: 'Password must be at least 8 characters with uppercase, lowercase, and numbers',
        },
      };
    }

    // Perform signup
    const result = await this.authRepository.signUpWithEmail(data);

    return result;
  }

  private validateSignupData(data: SignupFormData): void {
    if (!data.fullName || data.fullName.trim().length < 2) {
      throw new Error('Full name must be at least 2 characters');
    }

    if (!data.email || !this.isValidEmail(data.email)) {
      throw new Error('Invalid email address');
    }

    if (!data.phoneNumber || data.phoneNumber.trim().length < 5) {
      throw new Error('Invalid phone number');
    }

    if (!data.country || data.country.trim().length === 0) {
      throw new Error('Country is required');
    }

    // Investor-specific validation
    if (data.role === 'INVESTOR') {
      if (!data.city || data.city.trim().length === 0) {
        // City is optional but recommended for investors
      }
      if (!data.profilePhoto) {
        throw new Error('Profile photo is required for investors');
      }
    }

    // Validate company websites are HTTPS
    if (data.companyWebsites && data.companyWebsites.length > 0) {
      for (const website of data.companyWebsites) {
        if (!website.startsWith('https://')) {
          throw new Error('Company websites must use HTTPS');
        }
      }
    }

    // Validate max 3 company logos
    if (data.companyLogos && data.companyLogos.length > 3) {
      throw new Error('Maximum 3 company logos allowed');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isPasswordStrong(password: string): boolean {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    return hasMinLength && hasUpperCase && hasLowerCase && hasNumber;
  }
}


import { AuthRepository, AuthResult, AuthErrorCode } from '@/core/repositories/AuthRepository';
import { SignupFormData } from '@/core/domain/entities/AuthUser';
import { validateSignupData, isPasswordStrong } from '@/shared/validation/signup.domain';

/**
 * Use Case: Sign Up With Email
 * Handles user registration with email and password
 */
export class SignUpWithEmail {
  constructor(private authRepository: AuthRepository) {}

  async execute(data: SignupFormData): Promise<AuthResult> {
    // Validate input data (domain-level validation)
    validateSignupData(data);

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
    if (!isPasswordStrong(data.password)) {
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

  // Validation moved to '@/shared/validation/domain/signup'
}


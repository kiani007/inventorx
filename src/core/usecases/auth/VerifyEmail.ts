import { AuthRepository } from '@/core/repositories/AuthRepository';

/**
 * Use Case: Verify Email
 * Verifies user's email address using token from email
 */
export class VerifyEmail {
  constructor(private authRepository: AuthRepository) {}

  async execute(token: string): Promise<{ success: boolean; message: string }> {
    if (!token || token.trim().length === 0) {
      return {
        success: false,
        message: 'Invalid verification token',
      };
    }

    try {
      const isVerified = await this.authRepository.verifyEmail(token);

      if (isVerified) {
        return {
          success: true,
          message: 'Email verified successfully! You can now access your dashboard.',
        };
      } else {
        return {
          success: false,
          message: 'Verification failed. The link may be expired or invalid.',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred during verification. Please try again.',
      };
    }
  }
}


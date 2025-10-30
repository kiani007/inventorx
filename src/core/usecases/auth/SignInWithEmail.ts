import { AuthRepository, AuthResult, AuthErrorCode } from '@/core/repositories/AuthRepository';

/**
 * Use Case: Sign In With Email
 * Handles user login with email and password
 */
export class SignInWithEmail {
  constructor(private authRepository: AuthRepository) {}

  async execute(email: string, password: string): Promise<AuthResult> {
    // Validate input
    if (!email || !password) {
      return {
        success: false,
        error: {
          code: AuthErrorCode.INVALID_CREDENTIALS,
          message: 'Email and password are required',
        },
      };
    }

    // Perform sign in
    const result = await this.authRepository.signInWithEmail(email, password);

    return result;
  }
}


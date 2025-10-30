import { AuthRepository, AuthResult } from '@/core/repositories/AuthRepository';
import { SignupFormData } from '@/core/domain/entities/AuthUser';

/**
 * Complete Profile After Email Verification Use Case
 * 
 * Handles profile creation after user verifies their email.
 * This is part of the two-phase signup flow when email confirmation is enabled.
 * 
 * Flow:
 * 1. User verifies email
 * 2. Retrieve pending signup data
 * 3. Upload files (now have authenticated session)
 * 4. Create profile with complete data
 * 5. Clear temporary storage
 */
export class CompleteProfileAfterVerification {
  constructor(private authRepository: AuthRepository) {}

  async execute(userId: string, signupData: SignupFormData): Promise<AuthResult> {
    return this.authRepository.completeProfileAfterVerification(userId, signupData);
  }
}


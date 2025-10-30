import { AuthRepository } from '@/core/repositories/AuthRepository';
import { UserProfile } from '@/core/domain/entities/AuthUser';

/**
 * Use Case: Get Current User
 * Retrieves the currently authenticated user's profile
 */
export class GetCurrentUser {
  constructor(private authRepository: AuthRepository) {}

  async execute(): Promise<UserProfile | null> {
    try {
      const profile = await this.authRepository.getCurrentUserProfile();
      return profile;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  }
}


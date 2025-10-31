import { InvestorProfile, InventorProfile, UserProfile, UserRole, SignupFormData } from '@/core/domain/entities/AuthUser';
import type { ProfileInsertDTO, ProfileUpdateDTO } from '@/shared/types';

export function mapDatabaseProfileToUserProfile(dbProfile: Record<string, unknown>): UserProfile {
	const baseProfile = {
		id: dbProfile.id as string,
		role: dbProfile.role as UserRole,
		fullName: dbProfile.full_name as string,
		email: (dbProfile.email as string) || '',
		phoneNumber: dbProfile.phone_number as string,
		phoneVerified: dbProfile.phone_verified as boolean,
		country: dbProfile.country as string,
		city: dbProfile.city as string | undefined,
		shortDescription: dbProfile.short_description as string | undefined,
		emailVerified: dbProfile.email_verified as boolean,
		profileCompleted: dbProfile.profile_completed as boolean,
		isActive: dbProfile.is_active as boolean,
		createdAt: new Date(dbProfile.created_at as string),
		updatedAt: new Date(dbProfile.updated_at as string),
	};

	if (dbProfile.role === UserRole.INVESTOR) {
		return {
			...baseProfile,
			role: UserRole.INVESTOR,
			profilePhotoUrl: dbProfile.profile_photo_url as string | undefined,
			companyNames: dbProfile.company_names as string[] | undefined,
			companyLogoUrls: dbProfile.company_logo_urls as string[] | undefined,
			companyWebsites: dbProfile.company_websites as string[] | undefined,
		} as InvestorProfile;
	}

	return baseProfile as InventorProfile;
}

export function mapUserProfileToUpdateDTO(profile: Partial<UserProfile>): ProfileUpdateDTO {
	const dbProfile: ProfileUpdateDTO = {};
	if (profile.fullName) dbProfile.full_name = profile.fullName;
	if (profile.phoneNumber) dbProfile.phone_number = profile.phoneNumber;
	if (profile.phoneVerified !== undefined) dbProfile.phone_verified = profile.phoneVerified;
	if (profile.country) dbProfile.country = profile.country;
	if (profile.city) dbProfile.city = profile.city;
	if (profile.shortDescription !== undefined) dbProfile.short_description = profile.shortDescription ?? null;
	if (profile.emailVerified !== undefined) dbProfile.email_verified = profile.emailVerified;
	if (profile.profileCompleted !== undefined) dbProfile.profile_completed = profile.profileCompleted;
	if (profile.isActive !== undefined) dbProfile.is_active = profile.isActive;
	if ((profile as InvestorProfile).profilePhotoUrl !== undefined) {
		dbProfile.profile_photo_url = (profile as InvestorProfile).profilePhotoUrl ?? null;
	}
	if ((profile as InvestorProfile).companyNames !== undefined) {
		dbProfile.company_names = (profile as InvestorProfile).companyNames ?? null;
	}
	if ((profile as InvestorProfile).companyLogoUrls !== undefined) {
		dbProfile.company_logo_urls = (profile as InvestorProfile).companyLogoUrls ?? null;
	}
	if ((profile as InvestorProfile).companyWebsites !== undefined) {
		dbProfile.company_websites = (profile as InvestorProfile).companyWebsites ?? null;
	}
	return dbProfile;
}

export function createProfileInsertFromSignup(
	userId: string,
	data: SignupFormData,
	profilePhotoUrl?: string,
	companyLogoUrls?: string[]
): ProfileInsertDTO {
	return {
		id: userId,
		role: data.role,
		full_name: data.fullName,
		phone_number: data.phoneNumber,
		phone_verified: false,
		country: data.country,
		city: data.city ?? null,
		short_description: data.shortDescription ?? null,
		email_verified: false,
		profile_completed: data.role === UserRole.INVESTOR ? Boolean(profilePhotoUrl) : true,
		is_active: true,
		profile_photo_url: data.role === UserRole.INVESTOR ? (profilePhotoUrl ?? null) : undefined,
		company_names: data.role === UserRole.INVESTOR ? (data.companyNames ?? null) : undefined,
		company_logo_urls: data.role === UserRole.INVESTOR ? (companyLogoUrls ?? null) : undefined,
		company_websites: data.role === UserRole.INVESTOR ? (data.companyWebsites ?? null) : undefined,
	};
}



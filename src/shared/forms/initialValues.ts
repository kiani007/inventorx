import { UserRole } from '@/core/domain/entities/AuthUser';

export const signupInitialValues = {
	role: null as UserRole | null,
	fullName: '',
	email: '',
	phoneNumber: '',
	password: '',
	confirmPassword: '',
	country: '',
	city: '',
	shortDescription: '',
	profilePhoto: null as File | null,
	companyNames: [] as string[],
	companyWebsites: [] as string[],
};

export const oauthProfileSetupInitialValues = {
	role: null as UserRole | null,
	phoneNumber: '',
	country: '',
	city: '',
	shortDescription: '',
	profilePhoto: null as File | null,
	companyNames: [] as string[],
	companyWebsites: [] as string[],
};



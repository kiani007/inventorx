import { SignupFormData, UserRole } from '@/core/domain/entities/AuthUser';

export function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

export function isPasswordStrong(password: string): boolean {
	const hasMinLength = password.length >= 8;
	const hasUpperCase = /[A-Z]/.test(password);
	const hasLowerCase = /[a-z]/.test(password);
	const hasNumber = /\d/.test(password);
	return hasMinLength && hasUpperCase && hasLowerCase && hasNumber;
}

export function validateSignupData(data: SignupFormData): void {
	if (!data.fullName || data.fullName.trim().length < 2) {
		throw new Error('Full name must be at least 2 characters');
	}
	if (!data.email || !isValidEmail(data.email)) {
		throw new Error('Invalid email address');
	}
	if (!data.phoneNumber || data.phoneNumber.trim().length < 5) {
		throw new Error('Invalid phone number');
	}
	if (!data.country || data.country.trim().length === 0) {
		throw new Error('Country is required');
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
	if (data.companyLogos && data.companyLogos.length > 3) {
		throw new Error('Maximum 3 company logos allowed');
	}
}



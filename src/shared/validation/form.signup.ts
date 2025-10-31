import type { RegisterOptions } from 'react-hook-form';

export const signupValidation = {
	fullName: {
		required: 'Full name is required',
		minLength: { value: 2, message: 'Name must be at least 2 characters' },
	} satisfies RegisterOptions,
	email: {
		required: 'Email is required',
		pattern: {
			value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
			message: 'Invalid email address',
		},
	} satisfies RegisterOptions,
	phoneNumber: {
		required: 'Phone number is required',
		minLength: { value: 5, message: 'Phone number is too short' },
	} satisfies RegisterOptions,
	password: {
		required: 'Password is required',
		minLength: { value: 8, message: 'Password must be at least 8 characters' },
		pattern: {
			value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
			message: 'Password must contain uppercase, lowercase, and number',
		},
	} satisfies RegisterOptions,
};

export const oauthProfileValidation = {
	phoneNumber: {
		required: 'Phone number is required',
		minLength: { value: 5, message: 'Phone number is too short' },
	} satisfies RegisterOptions,
	country: {
		required: 'Country is required',
	} satisfies RegisterOptions,
};



/* stylelint-disable */
// Generic, reusable types to keep the codebase consistent and strongly typed.

// Represents the state of an async fetch/process
export type AsyncState<T> = {
  data?: T;
  loading: boolean;
  error?: string;
};

// Success/Failure result type to avoid throwing for control flow
export type Result<T, E = string> =
  | { ok: true; value: T }
  | { ok: false; error: E };

// Basic pagination envelope
export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

// Utility helpers
export type Nullable<T> = T | null;
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: NonNullable<T[P]> };

// Brands (nominal typing) for IDs and similar
export type Brand<T, B extends string> = T & { __brand: B };


// Domain-aligned DTOs
// Profiles table DTOs to avoid loose Record<string, unknown>
export type ProfileInsertDTO = {
	id: string;
	role: 'INVENTOR' | 'CONCEPTOR' | 'INVESTOR';
	full_name: string;
	phone_number: string;
	phone_verified: boolean;
	country: string;
	city: string | null;
	short_description: string | null;
	email_verified: boolean;
	profile_completed: boolean;
	is_active: boolean;
	// Investor-only (nullable for non-investors)
	profile_photo_url?: string | null;
	company_names?: string[] | null;
	company_logo_urls?: string[] | null;
	company_websites?: string[] | null;
};

export type ProfileUpdateDTO = Partial<
	Pick<
		ProfileInsertDTO,
		| 'full_name'
		| 'phone_number'
		| 'phone_verified'
		| 'country'
		| 'city'
		| 'short_description'
		| 'email_verified'
		| 'profile_completed'
		| 'is_active'
		| 'profile_photo_url'
		| 'company_names'
		| 'company_logo_urls'
		| 'company_websites'
	>
>;


import { SignupFormData } from '@/core/domain/entities/AuthUser';
import { useAuthStore } from '@/presentation/state/authStore';

const STORAGE_KEY = 'inventorx_pending_signup';
const EXPIRATION_HOURS = 24;

interface PendingSignupData {
	userId: string;
	email: string;
	data: SignupFormData;
	profilePhotoBase64?: string;
	companyLogosBase64?: string[];
	timestamp: number;
	expiresAt: number;
}

function encrypt(data: string): string {
	return btoa(encodeURIComponent(data));
}

function decrypt(encrypted: string): string {
	return decodeURIComponent(atob(encrypted));
}

async function fileToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});
}

function base64ToFile(base64: string, filename: string, mimeType: string): File {
	const arr = base64.split(',');
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, { type: mimeType });
}

export async function storePendingSignup(
	userId: string,
	email: string,
	data: SignupFormData
): Promise<void> {
	const now = Date.now();
	const expiresAt = now + EXPIRATION_HOURS * 60 * 60 * 1000;

	let profilePhotoBase64: string | undefined;
	if (data.profilePhoto) {
		profilePhotoBase64 = await fileToBase64(data.profilePhoto);
	}

	const companyLogosBase64: string[] = [];
	if (data.companyLogos && data.companyLogos.length > 0) {
		for (const logo of data.companyLogos) {
			const base64 = await fileToBase64(logo);
			companyLogosBase64.push(base64);
		}
	}

	const pendingData: PendingSignupData = {
		userId,
		email,
		data: { ...data, profilePhoto: undefined, companyLogos: undefined },
		profilePhotoBase64,
		companyLogosBase64: companyLogosBase64.length > 0 ? companyLogosBase64 : undefined,
		timestamp: now,
		expiresAt,
	};

	// Persist to localStorage (legacy)
	try {
		const encrypted = encrypt(JSON.stringify(pendingData));
		localStorage.setItem(STORAGE_KEY, encrypted);
	} catch {}

	// Mirror to Zustand store (preferred access)
	useAuthStore.getState().setPendingSignup({ userId, email, data });
}

export async function retrievePendingSignup(): Promise<{
	userId: string;
	email: string;
	data: SignupFormData;
} | null> {
	// Try Zustand first
	const z = useAuthStore.getState().pendingSignup;
	if (z) return z;

	// Fallback to legacy localStorage
	const encrypted = localStorage.getItem(STORAGE_KEY);
	if (!encrypted) return null;

	const pendingData: PendingSignupData = JSON.parse(decrypt(encrypted));
	if (Date.now() > pendingData.expiresAt) {
		clearPendingSignup();
		return null;
	}

	let profilePhoto: File | undefined;
	if (pendingData.profilePhotoBase64) {
		profilePhoto = base64ToFile(pendingData.profilePhotoBase64, 'profile-photo.jpg', 'image/jpeg');
	}

	const companyLogos: File[] = [];
	if (pendingData.companyLogosBase64) {
		for (let i = 0; i < pendingData.companyLogosBase64.length; i++) {
			companyLogos.push(
				base64ToFile(pendingData.companyLogosBase64[i], `company-logo-${i + 1}.png`, 'image/png')
			);
		}
	}

	const restoredData: SignupFormData = {
		...pendingData.data,
		profilePhoto,
		companyLogos: companyLogos.length > 0 ? companyLogos : undefined,
	};

	// Hydrate Zustand for next reads
	useAuthStore.getState().setPendingSignup({ userId: pendingData.userId, email: pendingData.email, data: restoredData });

	return { userId: pendingData.userId, email: pendingData.email, data: restoredData };
}

export function hasPendingSignup(): boolean {
	if (useAuthStore.getState().pendingSignup) return true;
	try {
		const encrypted = localStorage.getItem(STORAGE_KEY);
		if (!encrypted) return false;
		const pendingData: PendingSignupData = JSON.parse(decrypt(encrypted));
		if (Date.now() > pendingData.expiresAt) {
			clearPendingSignup();
			return false;
		}
		return true;
	} catch {
		clearPendingSignup();
		return false;
	}
}

export function getPendingSignupEmail(): string | null {
	const z = useAuthStore.getState().pendingSignup;
	if (z) return z.email;
	try {
		const encrypted = localStorage.getItem(STORAGE_KEY);
		if (!encrypted) return null;
		const pendingData: PendingSignupData = JSON.parse(decrypt(encrypted));
		if (Date.now() > pendingData.expiresAt) {
			clearPendingSignup();
			return null;
		}
		return pendingData.email;
	} catch {
		return null;
	}
}

export function clearPendingSignup(): void {
	useAuthStore.getState().clearPendingSignup();
	try {
		localStorage.removeItem(STORAGE_KEY);
	} catch {}
}



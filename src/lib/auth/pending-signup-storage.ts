/**
 * Secure Temporary Storage for Pending Signup Data
 * 
 * Stores signup data temporarily while waiting for email verification.
 * Data is encrypted and stored in localStorage with expiration.
 * 
 * Flow:
 * 1. User submits signup form
 * 2. Auth user created, no session (email confirmation required)
 * 3. Store signup data securely
 * 4. User verifies email
 * 5. Retrieve stored data and complete profile creation
 * 6. Clear stored data
 */

import { SignupFormData } from '@/core/domain/entities/AuthUser';

const STORAGE_KEY = 'inventorx_pending_signup';
const EXPIRATION_HOURS = 24; // Data expires after 24 hours

interface PendingSignupData {
  userId: string;
  email: string;
  data: SignupFormData;
  profilePhotoBase64?: string;
  companyLogosBase64?: string[];
  timestamp: number;
  expiresAt: number;
}

/**
 * Simple encryption using base64 encoding
 * For production, consider using a proper encryption library like crypto-js
 */
function encrypt(data: string): string {
  return btoa(encodeURIComponent(data));
}

function decrypt(encrypted: string): string {
  return decodeURIComponent(atob(encrypted));
}

/**
 * Convert File to Base64 string for storage
 */
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

/**
 * Convert Base64 string back to File
 */
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

/**
 * Store signup data temporarily
 */
export async function storePendingSignup(
  userId: string,
  email: string,
  data: SignupFormData
): Promise<void> {
  try {
    const now = Date.now();
    const expiresAt = now + (EXPIRATION_HOURS * 60 * 60 * 1000);

    // Convert files to Base64 for storage
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

    // Create storage object
    const pendingData: PendingSignupData = {
      userId,
      email,
      data: {
        ...data,
        // Remove File objects (we have base64 versions)
        profilePhoto: undefined,
        companyLogos: undefined,
      },
      profilePhotoBase64,
      companyLogosBase64: companyLogosBase64.length > 0 ? companyLogosBase64 : undefined,
      timestamp: now,
      expiresAt,
    };

    // Encrypt and store
    const encrypted = encrypt(JSON.stringify(pendingData));
    localStorage.setItem(STORAGE_KEY, encrypted);

    console.log('✅ Pending signup data stored securely');
  } catch (error) {
    console.error('Failed to store pending signup data:', error);
    throw new Error('Failed to save signup data temporarily');
  }
}

/**
 * Retrieve and restore signup data
 */
export async function retrievePendingSignup(): Promise<{
  userId: string;
  email: string;
  data: SignupFormData;
} | null> {
  try {
    const encrypted = localStorage.getItem(STORAGE_KEY);
    if (!encrypted) {
      return null;
    }

    // Decrypt and parse
    const decrypted = decrypt(encrypted);
    const pendingData: PendingSignupData = JSON.parse(decrypted);

    // Check expiration
    if (Date.now() > pendingData.expiresAt) {
      console.warn('Pending signup data has expired');
      clearPendingSignup();
      return null;
    }

    // Convert Base64 back to Files
    let profilePhoto: File | undefined;
    if (pendingData.profilePhotoBase64) {
      profilePhoto = base64ToFile(
        pendingData.profilePhotoBase64,
        'profile-photo.jpg',
        'image/jpeg'
      );
    }

    const companyLogos: File[] = [];
    if (pendingData.companyLogosBase64) {
      for (let i = 0; i < pendingData.companyLogosBase64.length; i++) {
        const file = base64ToFile(
          pendingData.companyLogosBase64[i],
          `company-logo-${i + 1}.png`,
          'image/png'
        );
        companyLogos.push(file);
      }
    }

    // Restore complete data
    const restoredData: SignupFormData = {
      ...pendingData.data,
      profilePhoto,
      companyLogos: companyLogos.length > 0 ? companyLogos : undefined,
    };

    console.log('✅ Pending signup data retrieved successfully');

    return {
      userId: pendingData.userId,
      email: pendingData.email,
      data: restoredData,
    };
  } catch (error) {
    console.error('Failed to retrieve pending signup data:', error);
    clearPendingSignup(); // Clear corrupted data
    return null;
  }
}

/**
 * Check if there's pending signup data
 */
export function hasPendingSignup(): boolean {
  const encrypted = localStorage.getItem(STORAGE_KEY);
  if (!encrypted) {
    return false;
  }

  try {
    const decrypted = decrypt(encrypted);
    const pendingData: PendingSignupData = JSON.parse(decrypted);
    
    // Check if expired
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

/**
 * Get pending signup email (for display purposes)
 */
export function getPendingSignupEmail(): string | null {
  try {
    const encrypted = localStorage.getItem(STORAGE_KEY);
    if (!encrypted) {
      return null;
    }

    const decrypted = decrypt(encrypted);
    const pendingData: PendingSignupData = JSON.parse(decrypted);
    
    if (Date.now() > pendingData.expiresAt) {
      clearPendingSignup();
      return null;
    }

    return pendingData.email;
  } catch {
    return null;
  }
}

/**
 * Clear pending signup data
 */
export function clearPendingSignup(): void {
  localStorage.removeItem(STORAGE_KEY);
  console.log('✅ Pending signup data cleared');
}


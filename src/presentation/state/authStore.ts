'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SignupFormData } from '@/core/domain/entities/AuthUser';

type PendingSignup = {
	userId: string;
	email: string;
	data: SignupFormData;
};

type AuthState = {
	pendingSignup: PendingSignup | null;
	setPendingSignup: (value: PendingSignup | null) => void;
	clearPendingSignup: () => void;
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			pendingSignup: null,
			setPendingSignup: (value) => set({ pendingSignup: value }),
			clearPendingSignup: () => set({ pendingSignup: null }),
		}),
		{
			name: 'inventorx_auth',
			partialize: (state) => ({ pendingSignup: state.pendingSignup }),
		}
	)
);



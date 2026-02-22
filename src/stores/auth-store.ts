/**
 * Phase 2: 사용자 인증 상태 (목업)
 * 추후 Supabase Auth / NextAuth 등 연동 시 이 스토어 또는 Provider로 교체
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  createdAt: string; // ISO
}

interface AuthState {
  user: AuthUser | null;
  isHydrated: boolean;
  login: (email: string, displayName: string) => void;
  logout: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isHydrated: false,

      login: (email, displayName) => {
        set({
          user: {
            id: `user_${Date.now()}`,
            email,
            displayName: displayName || email.split('@')[0],
            createdAt: new Date().toISOString(),
          },
        });
      },

      logout: () => set({ user: null }),

      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: 'zodiac-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => () => {
        useAuthStore.getState().setHydrated();
      },
    }
  )
);

export const useUser = () => useAuthStore((s) => s.user);
export const useIsAuthenticated = () => useAuthStore((s) => !!s.user);

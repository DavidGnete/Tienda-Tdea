import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AuthUser } from '@/features/auth/types';
import { TOKEN_KEY } from '@/lib/constants';

export type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  status: AuthStatus;
  setUser: (user: AuthUser | null) => void;
  setToken: (token: string | null) => void;
  setStatus: (status: AuthStatus) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      status: 'checking',
      setUser: (user) => set({ user }),
      setToken: (token) => {
        if (typeof window !== 'undefined') {
          if (token) {
            localStorage.setItem(TOKEN_KEY, token);
          } else {
            localStorage.removeItem(TOKEN_KEY);
          }
        }
        set({ token });
      },
      setStatus: (status) => set({ status }),
      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(TOKEN_KEY);
        }
        set({ user: null, token: null, status: 'unauthenticated' });
      },
    }),
    {
      name: 'tienda-tdea-auth',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? localStorage : ({} as Storage),
      ),
      partialize: (state) => ({ user: state.user, token: state.token }),
    },
  ),
);

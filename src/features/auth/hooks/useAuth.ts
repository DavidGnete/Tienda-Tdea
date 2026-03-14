'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TOKEN_KEY } from '@/lib/constants';
import { authService } from '../services/auth.service';
import type { LoginDto, RegisterDto } from '../types';
import { useAuthStore } from '@/store/auth.store';

export function useAuth() {
  const { user, status, setUser, setToken, setStatus, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = useCallback(() => {
    logout();
    router.push('/login');
  }, [logout, router]);

  const checkSession = useCallback(async () => {
    setStatus('checking');

    try {
      const data = await authService.checkStatus();
      setUser(data.user);
      setToken(data.token);
      setStatus('authenticated');
    } catch {
      logout();
    }
  }, [logout, setStatus, setToken, setUser]);

  useEffect(() => {
    // La store persistida puede ya tener un token.
    if (status !== 'checking') return;

    const token = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
    if (token) {
      setToken(token);
      void checkSession();
      return;
    }

    setStatus('unauthenticated');
  }, [checkSession, setStatus, setToken, status]);

  const login = useCallback(
    async (dto: LoginDto) => {
      setStatus('checking');
      const data = await authService.login(dto);
      setToken(data.token);
      setUser(data.user);
      setStatus('authenticated');
      return data;
    },
    [setStatus, setToken, setUser],
  );

  const register = useCallback(
    async (dto: RegisterDto) => {
      setStatus('checking');
      const data = await authService.register(dto);
      setToken(data.token);
      setUser(data.user);
      setStatus('authenticated');
      return data;
    },
    [setStatus, setToken, setUser],
  );

  return {
    user,
    status,
    login,
    register,
    logout: handleLogout,
    checkSession,
  };
}

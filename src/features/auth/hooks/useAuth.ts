'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '../services/auth.service';
import { TOKEN_KEY } from '@/lib/constants';
import type { LoginDto, RegisterDto } from '../types';

export function useAuth() {
  const { user, status, token, setUser, setToken, setStatus, logout } = useAuthStore();
  const router = useRouter();

  const checkSession = async () => {
    const savedToken =
      typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;

    if (!savedToken) {
      logout();
      return;
    }

    setStatus('checking');
    try {
      const response = await authService.checkStatus();
     const { token, ...user } = response;
     setUser(user as unknown as any);
     setToken(token as unknown as string);
      setStatus('authenticated');
    } catch {
      logout();
    }
  };

  const login = async (dto: LoginDto) => {
    const response = await authService.login(dto);
    setUser(response.user);
    setToken(response.token);
    setStatus('authenticated');
    router.push('/');
  };

 const register = async (dto: RegisterDto) => {
  await authService.register(dto);
};

  const logoutUser = () => {
    logout();
    router.push('/login');
  };

  return {
    user,
    token,
    status,
    isAuthenticated: status === 'authenticated',
    isAdmin: user?.roles?.includes('admin') ?? false,
    checkSession,
    login,
    register,
    logout: logoutUser,
  };
}
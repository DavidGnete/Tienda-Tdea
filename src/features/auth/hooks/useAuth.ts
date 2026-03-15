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
    const savedToken = localStorage.getItem(TOKEN_KEY);

    if (!savedToken) {
      logout();
      return;
    }

    setStatus('checking');

    try {
      const response = await authService.checkStatus();
      setUser(response.user);    // ← guarda el user
      setToken(response.token);  // ← guarda el token
      setStatus('authenticated'); // ← cambia el status ✅
    } catch {
      logout();
    }
  };

  const login = async (dto: LoginDto) => {
    const response = await authService.login(dto);
    setUser(response.user);    // ← guarda el user
    setToken(response.token);  // ← guarda el token
    setStatus('authenticated'); // ← cambia el status ✅
    router.push('/');
  };

  const register = async (dto: RegisterDto) => {
    const response = await authService.register(dto);
    setUser(response.user);    // ← guarda el user
    setToken(response.token);  // ← guarda el token
    setStatus('authenticated'); // ← cambia el status ✅
    router.push('/login');
  };

  const logoutUser = () => {
    logout();
    router.push('/');
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
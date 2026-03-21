'use client';

import { useState } from 'react';
import type { LoginDto } from '../types';
import { useAuth } from './useAuth';

export function useLogin() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (dto: LoginDto) => {
    setError(null);
    setIsLoading(true);

    try {
      await login(dto);
    } catch (err) {
      setError('Credenciales inválidas, verifica tu correo y contraseña e intenta nuevamente.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login: execute, isLoading, error };
}

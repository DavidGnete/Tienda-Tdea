'use client';

import { useState } from 'react';
import type { RegisterDto } from '../types';
import { useAuth } from './useAuth';

export function useRegister() {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (dto: RegisterDto) => {
    setError(null);
    setIsLoading(true);

    try {
      await register(dto);
    } catch (err) {
      setError('No se pudo registrar. Revisa tus datos e inténtalo de nuevo.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { register: execute, isLoading, error };
}

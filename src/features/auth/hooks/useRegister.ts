'use client';

import { AxiosError } from 'axios';
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
      if (err instanceof AxiosError) {
        const status = err.response?.status;
        const backendMessage = String(err.response?.data?.message ?? '').toLowerCase();

        if (
          status === 409 ||
          backendMessage.includes('already exists') ||
          backendMessage.includes('ya existe') ||
          backendMessage.includes('email exists') ||
          backendMessage.includes('correo')
        ) {
          setError('Este correo ya está registrado. Inicia sesión o usa otro correo.');
          throw err;
        }
      }

      setError('No se pudo registrar. Revisa tus datos e inténtalo de nuevo.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { register: execute, isLoading, error };
}

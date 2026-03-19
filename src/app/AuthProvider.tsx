'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';


export function AuthProvider({ children }: { children: ReactNode }) {
  const { status, checkSession } = useAuth();

  useEffect(() => {
    checkSession(); 
  }, []);

  if (status === 'checking') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-background">
        <div className="w-10 h-10 rounded-full border-5 border-muted border-t-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Estamos Verificando sesión……</p>
        </div>
    );
  }

  return <>{children}</>;
}
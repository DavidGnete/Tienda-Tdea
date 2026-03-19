'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const status = useAuthStore((state) => state.status);
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'checking') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-full border-5 border-muted border-t-primary animate-spin" />
        <p className="text-sm text-muted-foreground">Estamos Verificando acceso…</p>
      </div>
    );
  }

  if (status === 'unauthenticated') return null;

  return <>{children}</>;
}
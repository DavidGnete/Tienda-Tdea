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
      <div className="min-h-[60vh] grid place-items-center">
        <p className="text-sm text-muted-foreground">Verificando acceso…</p>
      </div>
    );
  }

  if (status === 'unauthenticated') return null;

  return <>{children}</>;
}
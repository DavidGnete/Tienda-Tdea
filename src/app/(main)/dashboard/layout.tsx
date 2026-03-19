'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

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
        <DotLottieReact
        src="https://lottie.host/1d7d83ac-baba-4cc5-9db1-14bb9390fd9f/IhgW6c31Iq.lottie"
        loop
        autoplay
        style={{ height: "220px", width: "220px" }}
      />
        <p className="text-sm text-muted-foreground">Estamos Verificando acceso…</p>
      </div>
    );
  }

  if (status === 'unauthenticated') return null;

  return <>{children}</>;
}
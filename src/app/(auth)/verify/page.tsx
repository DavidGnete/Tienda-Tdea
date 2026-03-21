// src/app/(auth)/verify/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

type Status = 'loading' | 'success' | 'error';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    const token = searchParams.get('token');

    // Si no hay token en la URL algo está mal
    if (!token) {
      setStatus('error');
      return;
    }

    // Le manda el token al backend para verificar
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setStatus('success');
          // Espera 3 segundos y redirige al login
          setTimeout(() => router.push('/login'), 3000);
        } else {
          setStatus('error');
        }
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'sans-serif'
    }}>
      {status === 'loading' && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: '#666' }}>
            Verificando tu cuenta...
          </p>
        </div>
      )}

      {status === 'success' && (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#4F46E5' }}>¡Cuenta verificada! ✅</h2>
          <p style={{ color: '#666' }}>
            Tu cuenta ha sido activada correctamente.
          </p>
          <p style={{ color: '#999', fontSize: '14px' }}>
            Redirigiendo al login en 3 segundos...
          </p>
        </div>
      )}

      {status === 'error' && (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#EF4444' }}>Enlace inválido ❌</h2>
          <p style={{ color: '#666' }}>
            El enlace es inválido o ya expiró.
          </p>
          <button
            onClick={() => router.push('/register')}
            style={{
              marginTop: '16px',
              background: '#4F46E5',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Volver a registrarse
          </button>
        </div>
      )}
    </div>
  );
}
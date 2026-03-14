"use client";

import type { ReactNode } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";


export function AuthProvider({ children }: { children: ReactNode }) {
  const { status } = useAuth();

  if (status === "checking") {
    return (
      <div className="min-h-screen grid place-items-center bg-background px-4 py-16">
        <div className="flex flex-col items-center gap-3">
          
          <p className="text-sm text-muted-foreground">Verificando sesión…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

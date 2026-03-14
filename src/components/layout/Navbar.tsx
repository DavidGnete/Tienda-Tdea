"use client";

import Link from "next/link";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const { user, status, logout } = useAuth();

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-foreground"
        >
          Tienda TDEA
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline"
          >
            Inicio
          </Link>

          {status === "authenticated" ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Mi tienda
              </Link>
              <span className="text-sm text-muted-foreground">
                {user?.fullName}
              </span>
              <Button variant="ghost" onClick={logout} className="text-sm">
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Registrarse
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

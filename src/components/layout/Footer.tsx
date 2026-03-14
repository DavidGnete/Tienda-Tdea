"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Tienda TDEA. Todo lo reservado.
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground"
          >
            Inicio
          </Link>
          <Link
            href="/dashboard"
            className="text-muted-foreground hover:text-foreground"
          >
            Mi tienda
          </Link>
          <a
            href="https://tiendatdeaback.onrender.com/api"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            API
          </a>
        </div>
      </div>
    </footer>
  );
}

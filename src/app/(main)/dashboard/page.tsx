"use client";

import Link from "next/link";
import { useRequireAuth } from "@/features/auth/hooks/useRequireAuth";
import { useProducts } from "@/features/products/hooks/useProducts";
import {
  ProductGrid,
  ProductGridSkeleton,
} from "@/features/products/components/ProductGrid";
import { PAGINATION_DEFAULTS } from "@/lib/constants";

export default function DashboardPage() {
  const { isLoading } = useRequireAuth();
  const { products, error } = useProducts({
    limit: PAGINATION_DEFAULTS.limit,
    offset: 0,
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <p className="text-sm text-muted-foreground">Verificando acceso…</p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mi dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Aquí puedes ver tus productos y agregar nuevos.
          </p>
        </div>
        <Link
          href="/dashboard/new"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Publicar producto
        </Link>
      </div>

      {error ? (
        <div className="mt-16 flex flex-col items-center justify-center py-24 text-center">
          <p className="text-base font-medium text-destructive">{error}</p>
        </div>
      ) : isLoading ? (
        <ProductGridSkeleton count={PAGINATION_DEFAULTS.limit} />
      ) : (
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      )}
    </main>
  );
}

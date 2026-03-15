'use client';

import { useState } from 'react';
import { useProducts } from '@/features/products/hooks/useProducts';
import {
  ProductGrid,
  ProductGridSkeleton,
} from '@/features/products/components/ProductGrid';
import { Pagination } from '@/components/layout/Pagination';
import { PAGINATION_DEFAULTS } from '@/lib/constants';

const LIMIT = PAGINATION_DEFAULTS.limit;

export default function HomePage() {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * LIMIT;

  const { products, isLoading, error, hasMore } = useProducts({
    limit: LIMIT,
    offset,
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* ── Header de sección ──────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Lo último publicado
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Descubre lo que venden tus compañeros de la TDEA
        </p>
      </div>

      {/* ── Contenido ──────────────────────────────────────── */}
      {error ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-base font-medium text-destructive">{error}</p>
          <button
            onClick={() => setPage(1)}
            className="mt-4 text-sm underline text-muted-foreground hover:text-foreground"
          >
            Intentar de nuevo
          </button>
        </div>
      ) : isLoading ? (
        <ProductGridSkeleton count={LIMIT} />
      ) : (
        <ProductGrid products={products} />
      )}

      {/* ── Paginación ─────────────────────────────────────── */}
      {!isLoading && !error && (
        <Pagination
          currentPage={page}
          hasMore={hasMore}
          onPageChange={setPage}
        />
      )}
    </main>
  );
}
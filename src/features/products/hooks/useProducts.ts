'use client';

import { useEffect, useState } from 'react';
import { PAGINATION_DEFAULTS } from '@/lib/constants';
import { productService } from '../services/product.service';
import { Product } from '../types'

interface UseProductsOptions {
  limit?: number;
  offset?: number;
}

interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
}

export function useProducts({
  limit = PAGINATION_DEFAULTS.limit,
  offset = PAGINATION_DEFAULTS.offset,
}: UseProductsOptions = {}): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetch = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await productService.getAll({ limit, offset });
        if (!cancelled) {
          setProducts(data);
          // Si el backend devuelve menos que el límite, no hay más páginas
          setHasMore(data.length === limit);
        }
      } catch {
        if (!cancelled) setError('No se pudieron cargar los productos.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetch();
    return () => { cancelled = true; };
  }, [limit, offset]);

  return { products, isLoading, error, hasMore };
}
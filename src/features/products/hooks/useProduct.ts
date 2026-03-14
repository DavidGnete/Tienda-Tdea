'use client';

import { useEffect, useState } from 'react';
import { productService } from '../services/product.service';
import type { Product } from '../types';

interface UseProductReturn {
  product: Product | null;
  isLoading: boolean;
  error: string | null;
}

export function useProduct(term: string): UseProductReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await productService.getBySlug(term);
        if (!cancelled) setProduct(data);
      } catch {
        if (!cancelled) setError('No se pudo cargar el producto.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    if (term) fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [term]);

  return { product, isLoading, error };
}

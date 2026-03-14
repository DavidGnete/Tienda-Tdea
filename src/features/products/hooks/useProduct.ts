'use client';

import { useEffect, useState } from 'react';
import { productService } from '../services/product.service';
import { Product } from '../types';

interface UseProductReturn {
  product: Product | null;
  isLoading: boolean;
  error: string | null;
}

export function useProduct(slug: string): UseProductReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;

    const fetch = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await productService.getBySlug(slug);
        if (!cancelled) setProduct(data);
      } catch {
        if (!cancelled) setError('Producto no encontrado.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetch();
    return () => { cancelled = true; };
  }, [slug]);

  return { product, isLoading, error };
}
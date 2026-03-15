'use client';

import { useCallback, useState } from 'react';
import { productService } from '../services/product.service';
import type { CreateProductDto, Product, UpdateProductDto } from '../types';

interface UseProductMutationReturn {
  isLoading: boolean;
  error: string | null;
  create: (dto: CreateProductDto) => Promise<Product>;
  update: (id: string, dto: UpdateProductDto) => Promise<Product>;
  remove: (id: string) => Promise<void>;
}

export function useProductMutation(): UseProductMutationReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (dto: CreateProductDto) => {
    setError(null);
    setIsLoading(true);

    try {
      return await productService.create(dto);
    } catch (err) {
      setError('No se pudo crear el producto.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const update = useCallback(async (id: string, dto: UpdateProductDto) => {
    setError(null);
    setIsLoading(true);

    try {
      return await productService.update(id, dto);
    } catch (err) {
      setError('No se pudo actualizar el producto.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    setError(null);
    setIsLoading(true);

    try {
      await productService.remove(id);
    } catch (err) {
      setError('No se pudo eliminar el producto.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error, create, update, remove };
}

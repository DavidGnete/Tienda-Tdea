import axiosClient from '@/lib/axios';
import { PAGINATION_DEFAULTS } from '@/lib/constants';
import {
  CreateProductDto,
  PaginationParams,
  Product,
  ProductsResponse,
  UpdateProductDto,
} from '../types';

export const productService = {
  /**
   * GET /products — listado paginado
   */
  getAll: async (params: PaginationParams = {}): Promise<ProductsResponse> => {
    const { data } = await axiosClient.get<ProductsResponse>('/products', {
      params: {
        limit: params.limit ?? PAGINATION_DEFAULTS.limit,
        offset: params.offset ?? PAGINATION_DEFAULTS.offset,
      },
    });
    return data;
  },

  /**
   * GET /products/:term — detalle por slug o id
   */
  getBySlug: async (term: string): Promise<Product> => {
    const { data } = await axiosClient.get<Product>(`/products/${term}`);
    return data;
  },

  /* Get By User Products */
  getMyProducts: async (params: PaginationParams = {}):Promise<ProductsResponse> => {
    const { data } = await axiosClient.get<ProductsResponse>('/products/my-products', {
      params: {
        limit: params.limit ?? PAGINATION_DEFAULTS.limit,
        offset: params.offset ?? PAGINATION_DEFAULTS.offset,
      },
    });
    return data;
  },
  /**
   * POST /products — crear producto (requiere auth)
   */
  create: async (dto: CreateProductDto): Promise<Product> => {
    const { data } = await axiosClient.post<Product>('/products', dto);
    return data;
  },

  /**
   * PATCH /products/:id — editar producto (requiere auth)
   */
  update: async (id: string, dto: UpdateProductDto): Promise<Product> => {
    const { data } = await axiosClient.patch<Product>(`/products/${id}`, dto);
    return data;
  },

  /**
   * DELETE /products/:id — eliminar producto (requiere auth)
   */
  remove: async (id: string): Promise<void> => {
    await axiosClient.delete(`/products/${id}`);
  },
};
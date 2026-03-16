// ─── Vendedor embebido en el producto ───────────────────────────────
export interface ProductSeller {
  id: string;
  fullName: string;
  WhattsapNumber: string;
}

export interface ProductImage {
  id: number;
  url: string;
}

// ─── Entidad principal ───────────────────────────────────────────────
export interface Product {
  status: any;
  tags: any;
  id: string;
  title: string;
  description: string;
  price: number;
  slug: string;
  images: ProductImage[];   // URLs de Cloudinary
  user: ProductSeller;
}

export type ProductsResponse = Product[];

// ─── Parámetros de paginación ────────────────────────────────────────
export interface PaginationParams {
  limit?: number;
  offset?: number;
}

// ─── DTOs para crear / editar ────────────────────────────────────────
export interface CreateProductDto {
  title: string;
  description: string;
  price: number;
  images?: string[];
}

export type UpdateProductDto = Partial<CreateProductDto>;
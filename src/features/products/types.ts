// ─── Vendedor embebido en el producto ───────────────────────────────
export interface ProductSeller {
  id: string;
  fullName: string;
  whattsapNumber: string;
}

export interface ProductImage {
  id: number;
  url: string;
}

// ─── Entidad principal ───────────────────────────────────────────────
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  slug: string;
  stock: number;
  images: ProductImage[];   // URLs de Cloudinary
  tags: string[];     // Se usan como categorías
  user: ProductSeller;
}

// ─── Respuesta paginada del GET /products ───────────────────────────
// El backend retorna un array directamente, ajusta si cambia la forma
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
  stock: number;
  tags?: string[];
  images?: string[];
}

export type UpdateProductDto = Partial<CreateProductDto>;
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://tiendatdeaback.onrender.com/api';
  
export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? 'dtdiyk4iv';

// ← Agrega esta línea:
export const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const TOKEN_KEY = 'tdea_token';

export const PAGINATION_DEFAULTS = {
  limit: 12,
  offset: 0,
} as const;
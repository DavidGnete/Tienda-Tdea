'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Tag } from 'lucide-react';
import { CLOUDINARY_BASE_URL } from '@/lib/constants';
import {Product} from '../types'

interface ProductCardProps {
  product: Product;
}

const FALLBACK_IMAGE = '/images/no-image.png';

export function ProductCard({ product }: ProductCardProps) {
  const rawUrl = product.images?.[0]?.url ?? '';

const isValidCloudinaryUrl = rawUrl.startsWith('https://res.cloudinary.com') ||
  rawUrl.startsWith('http://res.cloudinary.com');

const mainImage = isValidCloudinaryUrl
  ? rawUrl
  : rawUrl && !rawUrl.startsWith('http')
  ? `${CLOUDINARY_BASE_URL}/${rawUrl}`
  : '/images/no-image.png';
  // El primer tag actúa como categoría visible

  return (
    <Link href={`/products/${product.slug}`}>
      <article className="group cursor-pointer">
        {/* ── Imagen ─────────────────────────────────────────── */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
          <Image
            src={mainImage}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Botón favorito */}
          <button
            onClick={(e) => {
              e.preventDefault(); // evita navegar al detalle
              // TODO: lógica de favoritos en fase de auth
            }}
            className="absolute top-2 right-2 w-8 h-8 bg-card/80 backdrop-blur-sm rounded-full
                       flex items-center justify-center opacity-0 group-hover:opacity-100
                       transition-opacity hover:bg-card"
            aria-label="Añadir a favoritos"
          >
            <Heart className="w-4 h-4 text-foreground" />
          </button>

          
        </div>

        {/* ── Info ───────────────────────────────────────────── */}
        <div className="mt-3 space-y-1">
          {/* Precio */}
          <p className="font-semibold text-foreground text-base leading-tight">
            ${product.price.toLocaleString('es-CO')}
          </p>

          {/* Título */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.title}
          </p>

          {/* Vendedor */}
          <p className="text-xs text-muted-foreground pt-0.5">
            {product.user.fullName}
          </p>
        </div>
      </article>
    </Link>
  );
}
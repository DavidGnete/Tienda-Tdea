'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CLOUDINARY_BASE_URL } from '@/lib/constants';
import type { ProductImage } from '../types';

interface ImageSlideshowProps {
  images: ProductImage[];
  alt: string;
}

// Convierte ProductImage a URL usable
function resolveImageUrl(image: ProductImage): string {
  const { url } = image;
  if (!url) return '/images/no-image.png';
  const isValidCloudinary =
    url.startsWith('https://res.cloudinary.com') ||
    url.startsWith('http://res.cloudinary.com');
  if (isValidCloudinary) return url;
  if (url.startsWith('http')) return '/images/no-image.png';
  return `${CLOUDINARY_BASE_URL}/${url}`;
}

export function ImageSlideshow({ images, alt }: ImageSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Si no hay imágenes mostramos el fallback
  const resolvedImages =
    images.length > 0
      ? images.map(resolveImageUrl)
      : ['/images/no-image.png'];

  const goToPrevious = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? resolvedImages.length - 1 : prev - 1,
    );

  const goToNext = () =>
    setCurrentIndex((prev) =>
      prev === resolvedImages.length - 1 ? 0 : prev + 1,
    );

  return (
    <div className="relative">
      {/* ── Imagen principal ───────────────────────────────── */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        <Image
          src={resolvedImages[currentIndex]}
          alt={`${alt} - Imagen ${currentIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />

        {/* Flechas de navegación */}
        {resolvedImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10
                         bg-card/80 backdrop-blur-sm rounded-full hover:bg-card shadow-sm"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10
                         bg-card/80 backdrop-blur-sm rounded-full hover:bg-card shadow-sm"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </Button>
          </>
        )}

        {/* Contador */}
        {resolvedImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2
                          bg-foreground/70 backdrop-blur-sm text-card
                          text-sm font-medium px-3 py-1 rounded-full">
            {currentIndex + 1}/{resolvedImages.length}
          </div>
        )}
      </div>

      {/* ── Dots de miniaturas ─────────────────────────────── */}
      {resolvedImages.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {resolvedImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-primary w-4'
                  : 'w-2 bg-border hover:bg-muted-foreground'
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
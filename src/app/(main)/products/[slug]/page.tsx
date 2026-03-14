"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useProduct } from "@/features/products/hooks/useProduct";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

export default function ProductPage() {
  const { slug } = useParams() as { slug: string };
  const { product, isLoading, error } = useProduct(slug);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <Spinner size="lg" className="text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-4 text-center">
        <p className="text-base font-medium text-destructive">{error}</p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="rounded-2xl bg-card p-6">
          <img
            src={product.images?.[0] ?? "/images/no-image.png"}
            alt={product.title}
            className="h-72 w-full rounded-xl object-cover"
          />

          <div className="mt-6 space-y-3">
            <p className="text-sm text-muted-foreground">
              Publicado por {product.user.fullName}
            </p>
            <p className="text-sm text-muted-foreground">
              Contacto: {product.user.whattsapNumber}
            </p>
          </div>
        </div>

        <section className="rounded-2xl bg-card p-6">
          <h1 className="text-2xl font-bold text-foreground">
            {product.title}
          </h1>
          <p className="mt-2 text-lg font-semibold text-foreground">
            ${product.price.toLocaleString("es-CO")}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {product.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/dashboard"
              className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Ver mis productos
            </Link>
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90"
            >
              Volver al inicio
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

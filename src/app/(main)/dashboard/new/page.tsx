"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRequireAuth } from "@/features/auth/hooks/useRequireAuth";
import { ProductForm } from "@/features/products/components/ProductForm";
import type { CreateProductDto } from "@/features/products/types";
import { useProductMutation } from "@/features/products/hooks/useProductMutation";

export default function NewProductPage() {
  const { isLoading: authLoading } = useRequireAuth();
  const { create, isLoading } = useProductMutation();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (values: Parameters<typeof create>[0]) => {
    setError(null);

    try {
      const product = await create(values);
      router.push(`/products/${product.slug}`);
    } catch (err) {
      setError("No se pudo crear el producto.");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <p className="text-sm text-muted-foreground">Verificando acceso…</p>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Publicar nuevo producto
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Completa los datos para publicar tu producto en el marketplace.
        </p>
      </header>

      {error ? <p className="mb-4 text-sm text-destructive">{error}</p> : null}

      <ProductForm<CreateProductDto> onSubmit={handleCreate} />

      <p className="mt-6 text-sm text-muted-foreground">
        Solo necesitas una imagen para publicar. Puedes editar el producto más
        tarde.
      </p>
    </main>
  );
}

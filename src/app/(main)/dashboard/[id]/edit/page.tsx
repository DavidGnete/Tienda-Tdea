"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useRequireAuth } from "@/features/auth/hooks/useRequireAuth";
import { useProduct } from "@/features/products/hooks/useProduct";
import { useProductMutation } from "@/features/products/hooks/useProductMutation";
import { ProductForm } from "@/features/products/components/ProductForm";
import type { UpdateProductDto } from "@/features/products/types";
import { Button } from "@/components/ui/Button";

export default function EditProductPage() {
  const { isLoading: authLoading } = useRequireAuth();
  const params = useParams();
  const router = useRouter();
  const id = useMemo(() => {
    const rawId = params?.id;
    return Array.isArray(rawId) ? rawId[0] : (rawId ?? "");
  }, [params]);

  const {
    product,
    isLoading: productLoading,
    error: productError,
  } = useProduct(id);
  const { update, remove, isLoading: mutationLoading } = useProductMutation();

  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async (values: Parameters<typeof update>[1]) => {
    setError(null);

    try {
      await update(id, values);
      router.push(`/products/${product?.slug ?? id}`);
    } catch (err) {
      setError("No se pudo actualizar el producto.");
    }
  };

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      await remove(id);
      router.push("/dashboard");
    } catch {
      setError("No se pudo eliminar el producto.");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <p className="text-sm text-muted-foreground">Verificando acceso…</p>
      </div>
    );
  }

  if (productLoading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <p className="text-sm text-muted-foreground">Cargando producto…</p>
      </div>
    );
  }

  if (productError) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <p className="text-sm text-destructive">{productError}</p>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Editar producto
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Modifica la información de tu producto.
          </p>
        </div>

        <Button
          variant="secondary"
          onClick={handleDelete}
          disabled={mutationLoading}
        >
          Eliminar producto
        </Button>
      </header>

      {error ? <p className="mb-4 text-sm text-destructive">{error}</p> : null}

      <ProductForm<UpdateProductDto>
        initialValues={product}
        onSubmit={handleUpdate}
      />
    </main>
  );
}

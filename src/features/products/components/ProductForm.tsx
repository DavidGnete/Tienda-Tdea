"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ProductImageUpload } from "./ProductImageUpload";
import type { CreateProductDto, Product, UpdateProductDto } from "../types";

const productSchema = z.object({
  title: z.string().min(3, "El título es obligatorio."),
  description: z.string().min(10, "La descripción es obligatoria."),
  price: z
    .number({ message: "El precio debe ser un número." })
    .min(0, "El precio debe ser mayor o igual a cero."),
  stock: z
    .number({ message: "El stock debe ser un número." })
    .min(0, "El stock debe ser mayor o igual a cero."),
  tags: z.string().optional(),
  images: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps<T extends CreateProductDto | UpdateProductDto> {
  initialValues?: Product | null;
  onSubmit: (values: T) => Promise<void>;
  children?: ReactNode;
}

export function ProductForm<T extends CreateProductDto | UpdateProductDto>({
  initialValues,
  onSubmit,
  children,
}: ProductFormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      stock: 0,
      tags: "",
      images: "",
    },
  });

  const imageUrl = watch("images");

  useEffect(() => {
    if (!initialValues) return;

    setValue("title", initialValues.title);
    setValue("description", initialValues.description);
    setValue("price", initialValues.price);
    setValue("stock", initialValues.stock);
    setValue("tags", initialValues.tags?.join(", ") ?? "");
    setValue("images", initialValues.images?.[0]?.url ?? "");
  }, [initialValues, setValue]);

  const handleValues = async (values: ProductFormValues) => {
    const dto: CreateProductDto | UpdateProductDto = {
      title: values.title,
      description: values.description,
      price: values.price,
      stock: values.stock,
      tags: values.tags
        ? values.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
      images: values.images ? [values.images] : [],
    };

    await onSubmit(dto as T);
  };

  return (
    <form onSubmit={handleSubmit(handleValues)} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Título"
          {...register("title")}
          error={errors.title?.message}
        />
        <Input
          label="Precio"
          type="number"
          min={0}
          step={0.01}
          {...register("price", { valueAsNumber: true })}
          error={errors.price?.message}
        />
        <Input
          label="Stock"
          type="number"
          min={0}
          step={1}
          {...register("stock", { valueAsNumber: true })}
          error={errors.stock?.message}
        />
        <Input
          label="Categorías (separadas por coma)"
          {...register("tags")}
          error={errors.tags?.message}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Descripción
        </label>
        <textarea
          {...register("description")}
          rows={5}
          className="w-full resize-none rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        {errors.description ? (
          <p className="mt-1 text-xs text-destructive">
            {errors.description.message}
          </p>
        ) : null}
      </div>

      <ProductImageUpload
        value={imageUrl}
        onUpload={(url) => setValue("images", url)}
      />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" isLoading={isSubmitting}>
          Guardar producto
        </Button>
        {children}
      </div>
    </form>
  );
}

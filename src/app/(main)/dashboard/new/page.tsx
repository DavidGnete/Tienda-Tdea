"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useProductMutation } from "@/features/products/hooks/useProductMutation";
import { ProductImageUpload } from "@/features/products/components/ProductImageUpload";

// ─── Validación ───────────────────────────────────────────────────────
const schema = z.object({
  title: z.string().min(3, "Mínimo 3 caracteres"),
  description: z.string().min(10, "Mínimo 10 caracteres"),
  price:z .string()
  .min(1, "Ingresa un precio")
  .transform((val) => parseFloat(val))
  .pipe(z.number().min(1, "El precio debe ser mayor a 0")),

  tags: z.array(z.string()).optional(),
  images: z.array(z.string()).min(1, "Sube al menos una imagen"),
});

type FormValues = z.infer<typeof schema>;

type FormInput = {
  title: string;
  description: string;
  price: string;       // el <input type="number"> entrega string al DOM
  tags?: string[];
  images: string[];
};

// ─── Constantes ───────────────────────────────────────────────────────
const CATEGORIES = ["Libros", "Electrónica", "Deportes", "Apuntes", "Ropa", "Muebles", "Transporte", "Otros"];

export default function NewProductPage() {
  const { create, isLoading: isSubmitting } = useProductMutation();
  const router = useRouter();

  const {
  register,
  handleSubmit,
  setValue,
  watch,
  formState: { errors },
} = useForm<FormInput, unknown, FormValues>({
  resolver: zodResolver(schema),
  defaultValues: { images: [], tags: [], price: "" },
});

  const images = watch("images");

  const onSubmit = async (values: FormValues) => {
    try {
      const product = await create({
        title: values.title,
        description: values.description,
        price: values.price,                  
        images: values.images,
      });
      router.push(`/products/${product.slug}`);
    } catch {
      // el error ya lo maneja useProductMutation
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">
        Subir artículo
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Imágenes */}
        <div className="space-y-1">
          <ProductImageUpload
            images={images}
            onImagesChange={(urls) => setValue("images", urls, { shouldValidate: true })}
          />
          {errors.images && (
            <p className="text-xs text-destructive">{errors.images.message}</p>
          )}
        </div>

        {/* Card de detalles */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {/* Título */}
          <div className="flex flex-col sm:flex-row sm:items-center px-4 py-4 border-b border-border">
            <label className="text-sm font-semibold text-foreground w-full sm:w-32 shrink-0 mb-2 sm:mb-0">
              Título
            </label>
            <div className="flex-1">
              <input
                {...register("title")}
                placeholder="Indica claramente qué vendes"
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
              />
              {errors.title && (
                <p className="text-xs text-destructive mt-1">{errors.title.message}</p>
              )}
            </div>
          </div>

          {/* Descripción */}
          <div className="flex flex-col sm:flex-row px-4 py-4 border-b border-border">
            <label className="text-sm font-semibold text-foreground w-full sm:w-32 shrink-0 mb-2 sm:mb-0 sm:pt-0.5">
              Descripción
            </label>
            <div className="flex-1">
              <textarea
                {...register("description")}
                placeholder="Añade información detallada"
                rows={4}
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm resize-none"
              />
              {errors.description && (
                <p className="text-xs text-destructive mt-1">{errors.description.message}</p>
              )}
            </div>
          </div>


          {/* Precio */}
          <div className="flex flex-col sm:flex-row sm:items-center px-4 py-4">
            <label className="text-sm font-semibold text-foreground w-full sm:w-32 shrink-0 mb-2 sm:mb-0">
              Precio
            </label>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">COP $</span>
                <input
                  {...register("price")}
                  type="number"
                  placeholder="0"
                  min="0"
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              {errors.price && (
                <p className="text-xs text-destructive mt-1">{errors.price.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="text-center space-y-3 pt-2">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-base py-6"
          >
            {isSubmitting ? "Publicando…" : "Publicar artículo"}
          </Button>
          <p className="text-sm text-muted-foreground">
            Tu publicación será visible para toda la comunidad TDEA
          </p>
        </div>
      </form>
    </main>
  );
}
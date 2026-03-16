"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, Trash2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ProductImageUpload } from "@/features/products/components/ProductImageUpload"
import { useProduct } from "@/features/products/hooks/useProduct"
import { useProductMutation } from "@/features/products/hooks/useProductMutation"
import { DeleteModal } from "@/features/products/components/deleteProduct"


// ─── Validación ───────────────────────────────────────────────────────
const schema = z.object({
  title: z.string().min(3, "Mínimo 3 caracteres"),
  description: z.string().min(10, "Mínimo 10 caracteres"),
  price: z.string()
    .min(1, "Ingresa un precio")
    .transform((val) => parseFloat(val))
    .pipe(z.number().min(1, "El precio debe ser mayor a 0")),
  images: z.array(z.string()).min(1, "Sube al menos una imagen"),
})

type FormValues = z.infer<typeof schema>
type FormInput = {
  title: string
  description: string
  price: string
  images: string[]
}

// ─── Página ───────────────────────────────────────────────────────────
export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { product, isLoading: productLoading, error: productError } = useProduct(id)
  const { update, remove, isLoading: isSubmitting } = useProductMutation()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },reset} = useForm<FormInput, unknown, FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", description: "", price: "", images: [] }
  })

  useEffect(() => {
  if (product) {
    reset({
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      images: product.images.map((img) => img.url),
    })
  }
}, [product, reset])

  const images = watch("images")

  const onSubmit = async (values: FormValues) => {
    try {
      await update(id, {
        title: values.title,
        description: values.description,
        price: values.price,
        images: values.images,
      })
      router.push(`/products/${product?.slug ?? id}`)
    } catch {
      // el error ya lo maneja useProductMutation
    }
  }

  const handleDelete = async () => {
    try {
      await remove(id)
      router.push("/dashboard/products")
    } catch {
      // el error ya lo maneja useProductMutation
    }
  }

  if (productLoading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <p className="text-sm text-muted-foreground">Cargando producto…</p>
      </div>
    )
  }

  if (productError || !product) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <p className="text-sm text-destructive">{productError ?? "Producto no encontrado."}</p>
      </div>
    )
  }

  return (
    <>
      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/dashboard/products"
            className="p-2 -ml-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Volver a mis productos"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Editar producto</h1>
        </div>

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

          {/* Acciones */}
          <div className="space-y-3 pt-2">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-base py-6"
            >
              {isSubmitting ? "Guardando…" : "Guardar cambios"}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setIsDeleteModalOpen(true)}
              disabled={isSubmitting}
              className="w-full rounded-full border-destructive text-destructive hover:bg-destructive/10 text-base py-6"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Eliminar producto
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              Los cambios se aplicarán inmediatamente
            </p>
          </div>
        </form>
      </main>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        productName={product.title}
      />
    </>
  )
}
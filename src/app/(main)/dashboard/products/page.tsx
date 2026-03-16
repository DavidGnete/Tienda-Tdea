"use client"

import { useState } from "react"
import { Product } from "@/features/products/types"
import { Button } from "@/components/ui/Button"
import { useMyProducts } from "@/features/products/hooks/useMyProducts"
import { Plus, Search, SlidersHorizontal, Pencil, Trash2,} from "lucide-react"
import Image from "next/image"
import { CLOUDINARY_BASE_URL, PAGINATION_DEFAULTS } from "@/lib/constants"
import Link from "next/link"
import { Pagination } from "@/components/layout/Pagination"

function resolveImage(url: string) {
  if (!url) return '/images/no-image.png';
  if (url.startsWith('https://res.cloudinary.com') || url.startsWith('http://res.cloudinary.com')) return url;
  if (!url.startsWith('http')) return `${CLOUDINARY_BASE_URL}/${url}`;
  return '/images/no-image.png';
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-card rounded-xl border border-border p-4 sm:p-5">
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl sm:text-3xl font-bold text-foreground">{value}</p>
    </div>
  )
}

function ProductRow({ product }: { product: Product }) {
  const mainImage = resolveImage(product.images?.[0]?.url ?? '');

  return (
    <tr className="group hover:bg-muted/50 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-muted">
            <Image src={mainImage} alt={product.title} fill className="object-cover" sizes="44px" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-foreground text-sm truncate max-w-50">{product.title}</p>
            <p className="text-xs text-muted-foreground truncate max-w-50">{product.description}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 hidden md:table-cell">
        <span className="font-semibold text-foreground text-sm">
          ${product.price.toLocaleString("es-CO")}
        </span>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/dashboard/${product.id}/edit`}
            className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Editar producto"
          >
            <Pencil className="w-4 h-4" />
          </Link>
          <button
            className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
            aria-label="Eliminar producto"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

function ProductCard({ product }: { product: Product }) {
  const mainImage = resolveImage(product.images?.[0]?.url ?? '');

  return (
    <div className="flex items-start gap-3 p-4 border-b border-border last:border-b-0">
      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-muted">
        <Image src={mainImage} alt={product.title} fill className="object-cover" sizes="64px" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-semibold text-foreground text-sm truncate">{product.title}</p>
            <p className="text-xs text-muted-foreground truncate">{product.description}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Link
              href={`/dashboard/${product.id}/edit`}
              className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Editar producto"
            >
              <Pencil className="w-4 h-4" />
            </Link>
            <button
              className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
              aria-label="Eliminar producto"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="mt-2">
          <span className="font-semibold text-foreground text-sm">
            ${product.price.toLocaleString("es-CO")}
          </span>
        </div>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-16 px-4">
      <p className="text-muted-foreground mb-4">Aún no tienes productos publicados</p>
      <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
        <Link href="/dashboard/new">
          <Plus className="w-4 h-4 mr-2" />
          Publicar tu primer producto
        </Link>
      </Button>
    </div>
  )
}

export default function MisProductosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const { products, isLoading, error, hasMore } = useMyProducts({
    offset: (currentPage - 1) * PAGINATION_DEFAULTS.limit
  })

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <p className="text-sm text-muted-foreground">Cargando tus productos…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <p className="text-sm text-destructive">{error}</p>
      </div>
    )
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-foreground">Mis productos</h1>
        <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
          <Link href="/dashboard/new">
            <Plus className="w-4 h-4 mr-2" />
            Publicar producto
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
        <StatCard label="Publicados" value={products.length} />
        <StatCard label="Encontrados" value={filteredProducts.length} />
      </div>

      {/* Products Card */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">

        {filteredProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Producto</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Precio</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredProducts.map((product) => (
                    <ProductRow key={product.id} product={product} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

          </>
          
        )}
        
      </div>
      <Pagination
                currentPage={currentPage}
                hasMore={hasMore}
                onPageChange={setCurrentPage}
                />
    </main>
  )
}
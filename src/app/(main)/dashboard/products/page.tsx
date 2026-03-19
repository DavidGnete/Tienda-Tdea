"use client"
import { useState } from "react"
import { Product } from "@/features/products/types"
import { Button } from "@/components/ui/Button"
import { useMyProducts } from "@/features/products/hooks/useMyProducts"
import { Plus } from "lucide-react"
import Image from "next/image"
import { PAGINATION_DEFAULTS } from "@/lib/constants"
import Link from "next/link"
import { Pagination } from "@/components/layout/Pagination"
import { ProductActions } from "@/features/products/components/productAction"
import { ProductRow } from "@/features/products/components/productRow"
import { resolveImage } from "@/utils/resolveImage"
import { EmptyPage } from "../empty/page"



// ─── ProductCard (mobile) ─────────────────────────────────────────────
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
            <ProductActions product={product} />
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



// ─── Página principal ─────────────────────────────────────────────────
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

      {/* Products Card */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {filteredProducts.length === 0 ? (
          <EmptyPage />
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
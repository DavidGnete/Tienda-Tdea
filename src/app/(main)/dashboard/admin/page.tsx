"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { useProducts } from "@/features/products/hooks/useProducts"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { Pagination } from "@/components/layout/Pagination"
import { ProductRow } from "@/features/products/components/productRow"
import { ProductCard } from "@/features/products/components/productCard"
import { StatCard } from "@/components/ui/startCard"
import EmptyPage from "../empty/page"
import { PAGINATION_DEFAULTS } from "@/lib/constants"

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const { products, isLoading, error, hasMore } = useProducts({
    limit: PAGINATION_DEFAULTS.limit,
    offset: (currentPage - 1) * PAGINATION_DEFAULTS.limit,
  })

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <p className="text-sm text-muted-foreground">Cargando productos…</p>
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

    function setRefreshKey(arg0: (k: any) => any): void {
        throw new Error("Function not implemented.")
    }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Panel Admin</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Todos los productos publicados en la plataforma
          </p>
        </div>
        <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
          <Link href="/dashboard/new">
            <Plus className="w-4 h-4 mr-2" />
            Publicar producto
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
        <StatCard label="Total productos" value={products.length} />
        <StatCard label="Encontrados" value={filteredProducts.length} />
      </div>

      {/* Products Card */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {/* Search bar */}
        <div className="p-4 border-b border-border">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

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
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Vendedor</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredProducts.map((product) => (
                    <ProductRow
                      key={product.id}
                      product={product}
                      showSeller 
                      
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  
                />
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
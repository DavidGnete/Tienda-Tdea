import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { DeleteModal } from "./deleteProduct"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Product } from "../types"
import { useProductMutation } from "../hooks/useProductMutation"


interface ProductActionsProps {
  product: Product
  onDeleted?: () => void  
}

export function ProductActions({ product,  onDeleted}: ProductActionsProps) {
  const router = useRouter()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const { remove, isLoading } = useProductMutation()

  const handleDelete = async () => {
    try {
      await remove(product.id)
      setIsDeleteModalOpen(false)
      if (onDeleted) {
        onDeleted()  
      } else {
        router.refresh()  
      }
    } catch {}
  }

  return (
    <>
      <Link
        href={`/dashboard/${product.id}/edit`}
        className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Editar producto"
      >
        <Pencil className="w-4 h-4" />
      </Link>
      <button
        onClick={() => setIsDeleteModalOpen(true)}
        disabled={isLoading}
        className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
        aria-label="Eliminar producto"
      >
        <Trash2 className="w-4 h-4" />
      </button>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        productName={product.title}
      />
    </>
  )
}

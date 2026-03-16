import Image from "next/image";
import { Product } from "../types";
import { ProductActions } from "./productAction";
import { resolveImage } from "@/utils/resolveImage";

interface ProductRowProps {
  product: Product
  onDeleted?: () => void
  showSeller?: boolean
}

export function ProductRow({ product, onDeleted, showSeller = false }: ProductRowProps) {
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
      {showSeller && (
        <td className="px-4 py-3 hidden lg:table-cell">
          <span className="text-sm text-muted-foreground">
            {product.user.fullName}
          </span>
        </td>
      )}
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <ProductActions product={product} onDeleted={onDeleted} />
        </div>
      </td>
    </tr>
  )
}
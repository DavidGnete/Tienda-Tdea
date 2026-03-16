import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import Link from "next/link";

export function EmptyState() {
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
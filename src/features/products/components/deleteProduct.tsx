import { Button } from "@/components/ui/Button";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  productName,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  productName: string;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      await onConfirm();
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={() => {
          if (!isDeleting) onClose();
        }}
      />
      <div className="relative bg-card rounded-xl border border-border shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <Trash2 className="w-6 h-6 text-destructive" />
          </div>
          <h2 className="text-lg font-semibold text-white mb-2">
            Eliminar producto
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            ¿Estás seguro de que deseas eliminar{" "}
            <span className="font-medium text-foreground">"{productName}"</span>
            ? Esta acción no se puede deshacer.
          </p>
          <div className="flex items-center gap-3 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 rounded-full"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              size="lg"
              onClick={handleConfirm}
              disabled={isDeleting}
              className="flex-1 rounded-full  text-base py-6"
            >
              {isDeleting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Eliminando...
                </span>
              ) : (
                "Eliminar"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

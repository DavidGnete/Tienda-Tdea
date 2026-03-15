"use client";

import { useState } from "react";
import { fileService } from "../services/file.service";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

interface ProductImageUploadProps {
  onUpload: (url: string) => void;
  value?: string;
}

export function ProductImageUpload({
  onUpload,
  value,
}: ProductImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setError(null);

    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await fileService.uploadProductImage(file);
      onUpload(url);
    } catch {
      setError("No se pudo subir la imagen. Intenta nuevamente.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-foreground">
          Imagen principal
        </label>
        {isUploading && <Spinner size="sm" className="text-primary" />}
      </div>
      <div className="flex flex-col gap-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="text-sm text-muted-foreground"
        />
        {value ? (
          <img
            src={value}
            alt="Imagen del producto"
            className="h-28 w-full max-w-xs rounded-md object-cover"
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            Aún no has seleccionado una imagen.
          </p>
        )}
        {error ? <p className="text-xs text-destructive">{error}</p> : null}
      </div>
    </div>
  );
}

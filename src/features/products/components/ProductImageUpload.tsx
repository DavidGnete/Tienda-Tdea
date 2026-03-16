"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fileService } from "../services/file.service";

interface PhotoUploadProps {
  images: string[];                        // URLs de Cloudinary
  onImagesChange: (urls: string[]) => void;
  maxImages?: number;
}

export function ProductImageUpload({
  images,
  onImagesChange,
  maxImages = 5,
}: PhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── Sube archivos a Cloudinary y devuelve las URLs ──────────────
  const uploadFiles = async (files: File[]) => {
    const imageFiles = files.filter((f) => f.type.startsWith("image/"));
    const slots = maxImages - images.length;
    const toUpload = imageFiles.slice(0, slots);
    if (!toUpload.length) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const urls = await Promise.all(
        toUpload.map((file) => fileService.uploadProductImage(file))
      );
      onImagesChange([...images, ...urls]);
    } catch {
      setUploadError("No se pudo subir alguna imagen. Intenta nuevamente.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    uploadFiles(files);
    // Resetea el input para permitir subir el mismo archivo de nuevo
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    uploadFiles(Array.from(e.dataTransfer.files));
  };

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Zona de drop */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDrop={handleDrop}
        className={`relative min-h-55 rounded-xl border-2 border-dashed transition-colors flex items-center justify-center
          ${isDragging ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        {isUploading ? (
          <p className="text-sm text-muted-foreground animate-pulse">
            Subiendo imágenes…
          </p>
        ) : images.length === 0 ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg border-primary text-primary hover:bg-primary/5 hover:text-primary gap-2"
          >
            <Plus className="w-4 h-4" />
            Subir fotos
          </Button>
        ) : (
          <div className="w-full p-4">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((url, index) => (
                <div
                  key={url}
                  className="relative shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-muted"
                >
                  <Image
                  src={url}
                  alt={`Imagen ${index + 1}`}
                  sizes="96px"
                  fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-foreground/80 text-background flex items-center justify-center hover:bg-foreground transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {images.length < maxImages && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="shrink-0 w-24 h-24 rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <Plus className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {uploadError && (
        <p className="text-xs text-destructive">{uploadError}</p>
      )}

      {/* Banner informativo */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10">
        <Camera className="w-5 h-5 text-primary shrink-0" />
        <p className="text-sm text-foreground">
          Atrae más compradores con fotos de calidad. Máximo {maxImages} imágenes.
        </p>
      </div>
    </div>
  );
}
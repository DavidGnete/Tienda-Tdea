'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;         // base 1
  hasMore: boolean;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, hasMore, onPageChange }: PaginationProps) {
  const isFirstPage = currentPage === 1;

  return (
    <div className="flex items-center justify-center gap-4 py-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg
                   border border-border bg-card text-foreground
                   hover:bg-muted transition-colors
                   disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
        Anterior
      </button>

      <span className="text-sm text-muted-foreground">
        Página {currentPage}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasMore}
        className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg
                   border border-border bg-card text-foreground
                   hover:bg-muted transition-colors
                   disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Siguiente
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
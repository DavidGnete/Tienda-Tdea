"use client";

import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary/50",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus-visible:ring-secondary/50",
  ghost:
    "bg-transparent text-foreground hover:bg-muted focus-visible:ring-foreground/30",
};

export function Button({
  children,
  className = "",
  variant = "primary",
  disabled,
  isLoading,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type="button"
      className={
        "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
        variantClasses[variant] +
        (isDisabled ? " opacity-50 cursor-not-allowed" : "") +
        " " +
        className
      }
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? <span className="opacity-70">Cargando…</span> : children}
    </button>
  );
}

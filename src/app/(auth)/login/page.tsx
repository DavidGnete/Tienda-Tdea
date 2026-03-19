import Link from "next/link";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
      <header className="mb-8">
        <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground
                   hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a la tienda
      </Link>
        <h1 className="text-2xl font-bold text-foreground">Iniciar sesión</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Accede para ver tus publicaciones y publicar nuevos productos.
        </p>
      </header>

      <LoginForm />

      <div className="mt-6 text-center text-sm text-muted-foreground">
        ¿No tienes cuenta?{" "}
        <Link
          href="/register"
          className="font-medium text-foreground hover:underline"
        >
          Regístrate aquí
        </Link>
        .
      </div>
    </div>
  );
}

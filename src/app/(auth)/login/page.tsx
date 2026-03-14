import Link from "next/link";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
      <header className="mb-8">
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

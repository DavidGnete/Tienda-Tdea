import Link from "next/link";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Crear cuenta</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Regístrate como estudiante para comenzar a vender y comprar.
        </p>
      </header>

      <RegisterForm />

      <div className="mt-6 text-center text-sm text-muted-foreground">
        ¿Ya tienes cuenta?{" "}
        <Link
          href="/login"
          className="font-medium text-foreground hover:underline"
        >
          Inicia sesión
        </Link>
        .
      </div>
    </div>
  );
}

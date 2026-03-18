"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useLogin } from "../hooks/useLogin";

const loginSchema = z.object({
  email: z.string().email("Ingresa un correo válido."),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
});

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    await login(data);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Correo"
        type="email"
        autoComplete="email"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        label="Contraseña"
        type="password"
        autoComplete="current-password"
        {...register("password")}
        error={errors.password?.message}
      />

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <Button type="submit" disabled={isLoading} className="w-full">
        Iniciar sesión
      </Button>
    </form>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRegister } from "../hooks/useRegister";

const registerSchema = z
  .object({
    fullName: z.string().min(3, "Ingresa tu nombre completo."),
    email: z.string().email("Ingresa un correo válido."),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres."),
    whattsapNumber: z.string().min(6, "Ingresa un número de WhatsApp válido."),
  })
  .refine((data) => data.password.length >= 6, {
    message: "La contraseña debe tener al menos 6 caracteres.",
    path: ["password"],
  });

export function RegisterForm() {
  const router = useRouter();
  const { register: registerUser, isLoading, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    await registerUser(data);
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Nombre completo"
        {...register("fullName")}
        error={errors.fullName?.message}
      />
      <Input
        label="Correo"
        type="email"
        autoComplete="email"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        label="WhatsApp"
        placeholder="(+57) 300 000 0000"
        {...register("whattsapNumber")}
        error={errors.whattsapNumber?.message}
      />
      <Input
        label="Contraseña"
        type="password"
        autoComplete="new-password"
        {...register("password")}
        error={errors.password?.message}
      />

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <Button type="submit" isLoading={isLoading} className="w-full">
        Crear cuenta
      </Button>
    </form>
  );
}

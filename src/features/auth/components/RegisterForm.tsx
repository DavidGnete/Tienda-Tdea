"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRegister } from "../hooks/useRegister";
import { useState } from "react";

const registerSchema = z
  .object({
    fullName: z.string().min(3, "Ingresa tu nombre completo."),
    email: z.string().email("Ingresa un correo válido.")
    .endsWith("@correo.tdea.edu.co", "El Marketplace es exclusivo para estudiantes del TDEA. Ingresa tu correo institucional para registrarte."),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres."),
    WhattsapNumber: z
    .string()
    .length(10, 'Debe tener exactamente 10 dígitos.')
    .regex(/^\d+$/, 'Solo se permiten números, sin espacios ni símbolos.'),
  })
  .refine((data) => data.password.length >= 6, {
    message: "La contraseña debe tener al menos 6 caracteres.",
    path: ["password"],
  });

export function RegisterForm() {
  
  const router = useRouter();
  const { register: registerUser, isLoading, error } = useRegister();
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try{
      await registerUser(data);
      setEmailSent(true);
    }catch(err){
      // El error ya se maneja en el hook useRegister, así que no necesitamos hacer nada aquí
  };
}

  if (emailSent) {
    return (
      <div className="text-center space-y-4 py-8">
        <div className="text-5xl">📧</div>
        <h2 className="text-xl font-semibold">Verifica tu correo</h2>
        <p className="text-muted-foreground text-sm">
          Te enviamos un enlace de confirmación a{" "}
          <span className="font-medium text-foreground">
            {getValues("email")}
          </span>
        </p>
        <p className="text-xs text-muted-foreground">
          Revisa tu bandeja de entrada y también la carpeta de spam.
          El mensaje puede tardar entre (3-5) minutos en llegar.
          El enlace expira en 24 horas.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Nombre completo"
        {...register("fullName")}
        error={errors.fullName?.message}
      />
      <Input
        label="Correo"
        placeholder="Ingresa solo correo institucional"
        type="email"
        autoComplete="email"
        {...register("email")}
        error={errors.email?.message}
      />

  <div className="space-y-1.5">
        <label className="text-sm font-medium">Número de WhatsApp</label>
      <p className="text-xs text-muted-foreground  rounded-lg">
        Los compradores te contactarán por este número.
      </p>
     <div className="flex">
      {/* Prefijo estático */}
      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 
                border-border bg-muted text-sm text-muted-foreground select-none">
        +57
      </span>
      {/* Input sin el label — ya lo pusimos arriba */}
      <input
        type="tel"
        placeholder="3001234567"
        maxLength={10}
        {...register("WhattsapNumber")}
        className="flex-1 px-3 py-2 rounded-r-lg border border-border bg-input
                text-sm text-foreground placeholder:text-muted-foreground
                focus:outline-none focus:ring-2 focus:ring-primary/20
                focus:border-primary transition-all"
      />
    </div>

     {errors.WhattsapNumber && (
      <p className="text-xs text-destructive">{errors.WhattsapNumber.message}</p>
    )}
</div>


      <Input
        label="Contraseña"
        type="password"
        autoComplete="new-password"
        {...register("password")}
        error={errors.password?.message}
      />

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <Button type="submit" disabled={isLoading} className="w-full">
        Crear cuenta
      </Button>
    </form>
  );
}

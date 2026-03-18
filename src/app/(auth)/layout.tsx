import Image from "next/image";

export const metadata = {
  title: "Tienda TDEA | Autenticación",
  description: "Inicia sesión o crea una cuenta en Tienda TDEA.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounder-2xl relative min-h-screen flex items-center justify-center px-7 py-10">

      <Image
      src = "/green.jpg"
      alt = "Tienda TDEA"
      fill
      className="object-cover object-center -z-10"
      priority
      />
      

        <div className="absolute top-7 left-1/2 -translate-x-1/2 sm:top-40">
        <Image
          src="/logo.webp"
          alt="Tienda TdeA"
          width={8000}
          height={900}
          className="h-15 w-auto"
          priority
        />
      </div>
      <div className="w-full max-w-md mt-16">{children}</div>
    </div>
  );
}

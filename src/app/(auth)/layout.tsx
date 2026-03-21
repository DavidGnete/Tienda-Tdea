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
    <div className="relative min-h-screen flex items-center justify-center ">

      <Image
      src = "/green.jpg"
      alt = "Tienda TDEA"
      fill
      className="object-cover -z-10"
      priority
      />
      
        <div className="flex flex-col items-center gap-6 w-full max-w-md px-7 py-10">
        <Image
          src="/LogoWhite.webp"
          alt="Tienda TdeA"
          width={8000}
          height={900}
          className="w-58 h-auto"
          priority
        />
        {children}
      </div>
    </div>
  );
}

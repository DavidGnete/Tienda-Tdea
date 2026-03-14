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
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}

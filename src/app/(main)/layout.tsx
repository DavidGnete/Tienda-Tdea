import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { useProducts } from "@/features/products/hooks/useProducts";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Purple Bonnes — Portafolio",
  description: "Obra entre lo visible y lo invisible. Galería y tienda.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
     <body className="min-h-dvh bg-pb-grape text-pb-lavender">
        <Navbar />
        <main className="container py-8">{children}</main>
        <Footer />
      </body>

    </html>
  );
}

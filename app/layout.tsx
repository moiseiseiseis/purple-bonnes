// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Purple Bonnes — Portafolio",
  description: "Obra entre lo visible y lo invisible. Galería y tienda.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${playfair.variable} 
          antialiased 
          min-h-dvh 
          bg-pb-grape 
          text-pb-lavender
        `}
      >
        {/* Navbar fija, pero controlamos visibilidad desde el propio componente */}
        <Navbar />

        {/* OJO: sin .container aquí para que el Hero pueda ser full width */}
        <main className="pt-14">{children}</main>

        <Footer className= "relative z-20" />
      </body>
    </html>
  );
}


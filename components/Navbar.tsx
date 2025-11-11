"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/tienda", label: "Tienda" },
  { href: "/plasticas", label: "Plásticas" },
  { href: "/audiovisual", label: "Audiovisual" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/procesos", label: "Procesos" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Cierra el panel si cambias de ruta
  useEffect(() => { setOpen(false); }, [pathname]);

  // Cierra si haces clic fuera
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 backdrop-blur bg-pb-grape/90">
      <div className="container h-14 flex items-center justify-between">
        {/* Marca */}
        <Link
          href="/"
          className="text-pb-lilac font-display text-lg font-bold hover:text-white transition"
        >
          Purple Bonnes
        </Link>

        {/* Menú desktop (>= md) */}
        <nav className="hidden md:flex gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition ${
                pathname === l.href
                  ? "text-white underline underline-offset-4"
                  : "text-pb-lavender/80 hover:text-pb-lilac"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Botón hamburguesa (solo móviles) */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-pb-lavender/90 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-pb-lilac/60"
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Backdrop móvil */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/30"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Panel móvil */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={`md:hidden absolute left-0 right-0 top-14 origin-top transition-transform duration-200 ${
          open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-3 rounded-xl border border-white/15 bg-pb-grape/95 shadow-xl">
          <nav className="flex flex-col p-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-4 py-3 text-base transition ${
                  pathname === l.href
                    ? "bg-white/10 text-white"
                    : "text-pb-lavender/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

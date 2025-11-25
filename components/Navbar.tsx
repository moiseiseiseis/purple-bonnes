"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Route } from "next";

type SimpleLink = { href: Route; label: string };

const obrasLinks: SimpleLink[] = [
  { href: "/plasticas", label: "Plásticas" },
  { href: "/audiovisual", label: "Audiovisual" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/procesos", label: "Procesos" },
];

const otherLinks: SimpleLink[] = [
  { href: "/", label: "Home" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(!isHome); // en home arranca oculto
  const panelRef = useRef<HTMLDivElement | null>(null);

  // HOME: aparece/desaparece con scroll
  useEffect(() => {
    if (!isHome) {
      setVisible(true);
      return;
    }

    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > 40);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // cerrar panel móvil al hacer click fuera
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

  const shouldHide = isHome && !visible;
  const obrasActive = obrasLinks.some((l) => pathname?.startsWith(l.href));

  return (
    <>
      <header
        className={`
          fixed inset-x-0 top-0 z-50 
          border-b border-white/20 
          backdrop-blur bg-pb-grape/90
          transition-transform duration-300 ease-out 
          ${shouldHide ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}
        `}
      >
        <div className="container h-14 flex items-center justify-between">
          {/* Logo / título */}
          <Link
            href="/"
            className="text-pb-lilac font-display text-lg font-bold hover:text-white transition"
          >
            Purple Bonnes
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Home */}
            {otherLinks
              .filter((l) => l.href === "/")
              .map((l) => (
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

            {/* Dropdown OBRAS */}
            <div className="relative group">
              <button
                className={`text-sm inline-flex items-center gap-1 transition ${
                  obrasActive
                    ? "text-white underline underline-offset-4"
                    : "text-pb-lavender/80 group-hover:text-pb-lilac"
                }`}
              >
                Obras
                <span className="text-xs">▾</span>
              </button>

              <div className="absolute left-0 top-full pt-2 hidden min-w-[9rem] rounded-xl bg-pb-grape/95 border border-white/15 shadow-xl group-hover:block">
                <div className="py-2">
                  {obrasLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={`block px-4 py-2 text-sm transition ${
                        pathname === l.href
                          ? "bg-white/10 text-white"
                          : "text-pb-lavender/90 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Contacto */}
            {otherLinks
              .filter((l) => l.href === "/contacto")
              .map((l) => (
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

          {/* BOTÓN MÓVIL */}
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
      </header>

      {/* BACKDROP MÓVIL */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-40"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      {/* PANEL MÓVIL */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={`
          md:hidden fixed left-0 right-0 top-14 z-50 origin-top 
          transition-transform duration-200 
          ${open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}
        `}
      >
        <div className="mx-3 rounded-xl border border-white/15 bg-pb-grape/95 shadow-xl">
          <nav className="flex flex-col p-2">
            {/* Home */}
            <Link
              href="/"
              className={`rounded-lg px-4 py-3 text-base transition ${
                pathname === "/"
                  ? "bg-white/10 text-white"
                  : "text-pb-lavender/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              Home
            </Link>

            {/* Obras - secciones */}
            <div className="mt-2 mb-1 px-4 text-xs uppercase tracking-[0.2em] text-pb-lilac/80">
              Obras
            </div>
            {obrasLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-6 py-2 text-sm transition ${
                  pathname === l.href
                    ? "bg-white/10 text-white"
                    : "text-pb-lavender/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}

            {/* Contacto */}
            <div className="mt-3 border-t border-white/10 pt-2">
              <Link
                href="/contacto"
                className={`rounded-lg px-4 py-3 text-base transition ${
                  pathname === "/contacto"
                    ? "bg-white/10 text-white"
                    : "text-pb-lavender/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                Contacto
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

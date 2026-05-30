// app/admin/layout.tsx
import type { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    // 👇 Aquí cambiamos bg-pb-grape por bg-black
    <div className="min-h-dvh bg-black text-pb-lavender">
      <main className="container py-10">
        <h1 className="font-display text-3xl text-pb-lilac mb-6">
          Panel de administración
        </h1>
        
        <div className="grid gap-8 lg:grid-cols-[280px,1fr]">
          <aside className="card p-4 text-sm space-y-2 h-fit bg-neutral-900/50 border border-white/5">
            <p className="font-semibold text-pb-lilac mb-2">Secciones</p>
            
            <ul className="space-y-1 flex flex-col gap-2">
              <li>
                <Link 
                  href="/admin/obras" 
                  className="hover:underline hover:text-white transition-colors"
                >
                  Obras
                </Link>
              </li>
              
              <li>
                <Link 
                  href="/admin/orders" 
                  className="hover:underline hover:text-white transition-colors"
                >
                  Órdenes
                </Link>
              </li>
              
              {/* luego: contenido, reseñas, etc. */}
            </ul>
          </aside>
          
          <section>{children}</section>
        </div>
      </main>
    </div>
  );
}
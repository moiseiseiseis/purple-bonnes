// app/admin/obras/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

interface Artwork {
  id: string;
  title: string;
  slug: string;
  year: number | null;
  category: string;
  collection: string;
  status: string;
}

export default function AdminObrasPage() {
  const [items, setItems] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/artworks");
        const data = await res.json();
        setItems(data);
      } catch (e) {
        console.error("Error cargando obras", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta obra? Esta acción no se puede deshacer.")) return;
    try {
      const res = await fetch(`/api/admin/artworks/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        alert("Error al eliminar");
        return;
      }
      setItems((prev) => prev.filter((a) => a.id !== id));
    } catch (e) {
      console.error(e);
      alert("Error de red");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-2xl text-pb-lilac">Obras</h2>
        <Link href="/admin/obras/nueva" className="btn-primary">
          Nueva obra
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-pb-lavender/70">Cargando obras…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-pb-lavender/80">
          Aún no hay obras en la base de datos.
        </p>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-pb-ink/40 text-pb-lavender">
              <tr>
                <th className="text-left px-4 py-2">Título</th>
                <th className="text-left px-4 py-2">Colección</th>
                <th className="text-left px-4 py-2">Categoría</th>
                <th className="text-left px-4 py-2">Estado</th>
                <th className="text-right px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((a) => (
                <tr key={a.id} className="border-t border-white/10">
                  <td className="px-4 py-2">{a.title}</td>
                  <td className="px-4 py-2 text-pb-lavender/80">
                    {a.collection}
                  </td>
                  <td className="px-4 py-2 text-pb-lavender/80">
                    {a.category}
                  </td>
                  <td className="px-4 py-2">
                    <span className="rounded-full bg-pb-purple/40 px-2 py-0.5 text-xs uppercase tracking-wide">
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right space-x-2">
                    <Link
                      href={`/admin/obras/${a.id}`}
                      className="inline-flex items-center text-xs hover:underline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="inline-flex items-center text-xs text-red-300 hover:text-red-200"
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

"use client";

import { use, useEffect, useState, FormEvent } from "react";

export const dynamic = 'force-dynamic';
import { useRouter } from "next/navigation";
import { COLLECTIONS, CATEGORIES } from "@/lib/constants";

interface Artwork {
  id: string;
  title: string;
  slug: string;
  year: number | null;
  technique: string | null;
  dimensions: string | null;
  price: number | null;
  category: string;
  collection: string;
  status: string;
  media: string[];
  about: string | null;
}

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

export default function EditarObraPage({
  params,
}: {
  params: Promise<{ id: string }>; // 👈 Tipado correcto para Next 15
}) {
  const { id } = use(params); // 👈 Desempaquetado correcto con use()
  const router = useRouter();

  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/artworks/${id}`);
        if (!res.ok) throw new Error();
        
        const data = await res.json();
        setArtwork(data);
        setUploadedImage(data.media?.[0] ?? null);
      } catch {
        alert("No se pudo cargar la obra");
        router.push("/admin/obras");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id, router]);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      
      setUploadedImage(data.url);
    } catch {
      alert("Error subiendo imagen");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!artwork) return;

    setSaving(true);
    const formData = new FormData(e.currentTarget);

    const body = {
      title: formData.get("title"),
      slug: normalizeSlug(String(formData.get("slug"))),
      year: formData.get("year") ? Number(formData.get("year")) : null,
      technique: formData.get("technique") || null,
      dimensions: formData.get("dimensions") || null,
      price: formData.get("price") ? Number(formData.get("price")) : null,
      category: formData.get("category"),
      collection: formData.get("collection"),
      // Si status no está en el form, mantenemos el actual para no borrarlo
      status: formData.get("status") || artwork.status, 
      media: uploadedImage ? [uploadedImage] : artwork.media ?? [],
      about: formData.get("about") || null,
    };

    try {
      const res = await fetch(`/api/admin/artworks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error();

      router.refresh(); // 👈 Vital para invalidar la caché y ver los cambios al instante
      router.push("/admin/obras");
    } catch {
      alert("Error al actualizar");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="p-6">Cargando…</p>;
  if (!artwork) return <p className="p-6">No encontrada.</p>;

  return (
    <div className="card p-6 space-y-4 max-w-2xl mx-auto">
      <h2 className="font-display text-2xl text-pb-lilac">
        Editar obra: {artwork.title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm flex flex-col">
        <label>Título</label>
        <input name="title" defaultValue={artwork.title} required className="input" />

        <label>Slug</label>
        <input
          name="slug"
          defaultValue={artwork.slug}
          required
          onBlur={(e) => (e.currentTarget.value = normalizeSlug(e.currentTarget.value))}
          className="input"
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label>Categoría</label>
            <select name="category" defaultValue={artwork.category} className="input">
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label>Colección</label>
            <select name="collection" defaultValue={artwork.collection} className="input">
              {COLLECTIONS.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 👇 Campos extra agregados para que el FormData no los envíe nulos */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label>Año</label>
            <input name="year" type="number" defaultValue={artwork.year ?? ""} className="input" />
          </div>
          <div className="flex flex-col">
            <label>Precio</label>
            <input name="price" type="number" defaultValue={artwork.price ?? ""} className="input" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label>Técnica</label>
            <input name="technique" defaultValue={artwork.technique ?? ""} className="input" />
          </div>
          <div className="flex flex-col">
            <label>Dimensiones</label>
            <input name="dimensions" defaultValue={artwork.dimensions ?? ""} className="input" />
          </div>
        </div>

        <label>Sobre la obra</label>
        <textarea name="about" defaultValue={artwork.about ?? ""} rows={4} className="input" />

        <label>Imagen principal</label>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        {uploading && <p className="text-xs text-gray-500">Subiendo imagen...</p>}

        {uploadedImage && (
          <img
            src={uploadedImage}
            alt="Preview"
            className="w-32 h-32 object-cover rounded shadow-md border"
          />
        )}

        <button type="submit" disabled={saving || uploading} className="btn-primary mt-4 py-2">
          {saving ? "Guardando…" : "Guardar cambios"}
        </button>
      </form>
    </div>
  );
}
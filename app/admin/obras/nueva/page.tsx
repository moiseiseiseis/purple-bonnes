"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { COLLECTIONS, CATEGORIES } from "@/lib/constants";

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

export default function NuevaObraPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFileUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
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

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setUploadedImage(data.url);
    } catch (err) {
      console.error(err);
      alert("Error subiendo imagen");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const body = {
      title: formData.get("title"),
      slug: normalizeSlug(String(formData.get("slug"))),
      year: formData.get("year")
        ? Number(formData.get("year"))
        : null,
      technique: formData.get("technique") || null,
      dimensions: formData.get("dimensions") || null,
      price: formData.get("price")
        ? Number(formData.get("price"))
        : null,
      category: formData.get("category"),
      collection: formData.get("collection"),
      status: formData.get("status"),
      media: uploadedImage ? [uploadedImage] : [],
      about: formData.get("about") || null,
    };

    setLoading(true);

    try {
      const res = await fetch("/api/admin/artworks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Error al crear obra");
        return;
      }

      router.push("/admin/obras");
    } catch (err) {
      console.error(err);
      alert("Error de red");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-6 space-y-4">
      <h2 className="font-display text-2xl text-pb-lilac mb-2">
        Nueva obra
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1">
            <span>Título *</span>
            <input
              name="title"
              required
              className="input"
            />
          </label>

          <label className="space-y-1">
            <span>Slug *</span>
            <input
              name="slug"
              required
              onBlur={(e) =>
                (e.currentTarget.value = normalizeSlug(
                  e.currentTarget.value
                ))
              }
              className="input"
            />
          </label>

          <label className="space-y-1">
            <span>Año</span>
            <input name="year" type="number" className="input" />
          </label>

          <label className="space-y-1">
            <span>Precio (MXN)</span>
            <input name="price" type="number" className="input" />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1">
            <span>Categoría *</span>
            <select name="category" required className="input">
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1">
            <span>Colección *</span>
            <select name="collection" required className="input">
              {COLLECTIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="space-y-1 block">
          <span>Técnica</span>
          <input name="technique" className="input" />
        </label>

        <label className="space-y-1 block">
          <span>Dimensiones</span>
          <input name="dimensions" className="input" />
        </label>

        <label className="space-y-1 block">
          <span>Imagen principal</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
          />
        </label>

        {uploading && <p className="text-xs">Subiendo imagen…</p>}

        {uploadedImage && (
          <img
            src={uploadedImage}
            alt="Preview"
            className="w-32 h-32 object-cover rounded"
          />
        )}

        <label className="space-y-1 block">
          <span>Estado *</span>
          <select
            name="status"
            defaultValue="available"
            className="input"
          >
            <option value="available">Disponible</option>
            <option value="inquire">Solo consulta</option>
            <option value="sold">Vendida</option>
            <option value="process">Proceso</option>
            <option value="for-exhibition">En exhibición</option>
          </select>
        </label>

        <label className="space-y-1 block">
          <span>Sobre la obra</span>
          <textarea name="about" rows={4} className="input" />
        </label>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary text-sm"
          >
            {loading ? "Guardando…" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
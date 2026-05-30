import { z } from "zod";

export const artworkSchema = z.object({
  title: z.string().min(1, "Título requerido"),
  slug: z
    .string()
    .min(1, "Slug requerido")
    .regex(/^[a-z0-9-]+$/, "Slug inválido (solo minúsculas, números y guiones)"),
  year: z.number().int().nullable(),
  technique: z.string().nullable(),
  dimensions: z.string().nullable(),
  price: z.number().nullable(),
  category: z.string().min(1, "Categoría requerida"),
  collection: z.string().min(1, "Colección requerida"),
  status: z.enum(["available", "inquire", "sold", "process", "for-exhibition"]),
  media: z.array(z.string()),
  about: z.string().nullable(),
  isFeaturedHome: z.boolean().default(false),
  isFeaturedCollection: z.boolean().default(false),
});

export type ArtworkInput = z.infer<typeof artworkSchema>;

export function normalizeArtworkInput(raw: Record<string, unknown>): ArtworkInput {
  return artworkSchema.parse({
    title: raw.title ?? "",
    slug: raw.slug ?? "",
    year: raw.year && !isNaN(Number(raw.year)) ? Number(raw.year) : null,
    price: raw.price && !isNaN(Number(raw.price)) ? Number(raw.price) : null,
    technique: raw.technique || null,
    dimensions: raw.dimensions || null,
    category: raw.category ?? "",
    collection: raw.collection ?? "",
    status: raw.status ?? "available",
    media: Array.isArray(raw.media)
      ? raw.media.map(String)
      : raw.media
      ? [String(raw.media)]
      : [],
    about: raw.about || null,
    isFeaturedHome: !!raw.isFeaturedHome,
    isFeaturedCollection: !!raw.isFeaturedCollection,
  });
}

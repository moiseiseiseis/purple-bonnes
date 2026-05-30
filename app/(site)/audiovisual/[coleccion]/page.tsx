import { notFound } from "next/navigation";
import { getByCollection } from "@/lib/data";
import GalleryGrid from "@/components/GalleryGrid";

export const revalidate = 60;

const COLLECTION_CONFIG: Record<
  string,
  {
    label: string;
    tagline: string;
    intro: string;
  }
> = {
  foto: {
    label: "Fotografía",
    tagline: "Luz fija, gesto en tránsito",
    intro:
      "Serie de imágenes que capturan fragmentos de presencia y ausencia. La cámara como cuerpo testigo, el encuadre como respiración.",
  },
  video: {
    label: "Video",
    tagline: "Movimiento, pulso y montaje",
    intro:
      "Piezas en movimiento donde el tiempo se estira, se fragmenta y se repite. Rituales, gestos y respiraciones en loop.",
  },
  digital: {
    label: "Digital / Collage",
    tagline: "Capas, glitch y recomposición",
    intro:
      "Obras construidas por superposición: recortes, texturas, color digital y ruido visual. Lo híbrido como espacio de juego.",
  },
};


export async function generateMetadata({
  params,
}: {
  params: Promise<{ coleccion: string }>;
}) {
  const { coleccion } = await params; // 👈 lo desempaquetas
  const config = COLLECTION_CONFIG[coleccion];
  const baseTitle = config ? config.label : "Colección";

  return {
    title: `${baseTitle} — Audiovisual · Purple Bonnes`,
  };
}

export default async function ColeccionPage({
  params,
}: {
  params: Promise<{ coleccion: string }>;
}) {
  const { coleccion } = await params; // 👈 igual aquí

  const config = COLLECTION_CONFIG[coleccion];
  if (!config) notFound();

  // Traer todas las obras de la colección "audiovisual"
  const allItems = await getByCollection("audiovisual");

  // Filtrar por categoría (foto / video / digital)
  const items = allItems.filter((i) => i.category === coleccion);

  return (
    <div className="container pt-14 pb-20">
      {/* Hero de la colección */}
      <section className="mb-10">
        <h1 className="font-display text-4xl sm:text-5xl text-pb-lilac mb-2">
          {config.label}
        </h1>
        <p className="text-xs uppercase tracking-[0.25em] text-pb-lavender/70 mb-4">
          {config.tagline}
        </p>
        <p className="max-w-2xl text-pb-lavender/85 leading-relaxed text-sm sm:text-base">
          {config.intro}
        </p>
      </section>

      {items.length === 0 ? (
        <p className="text-pb-lavender/70 italic">
          Aún no hay obras catalogadas en esta colección.
        </p>
      ) : (
        <GalleryGrid items={items} />
      )}
    </div>
  );
}

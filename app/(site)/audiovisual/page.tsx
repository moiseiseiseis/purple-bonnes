import { getByCollection } from "@/lib/data";
import AudiovisualCollections from "@/components/AudiovisualCollections";

export const metadata = { title: "Audiovisual — Purple Bonnes" };
export const revalidate = 60;

// Etiquetas bonitas para cada categoría de la colección audiovisual
const COLECCIONES: Record<string, string> = {
  video: "Video",
  foto: "Fotografía",
  
};

export default async function AudiovisualPage() {
  // 1. Obtener todos los items de la colección "audiovisual"
  const allItems = await getByCollection("audiovisual");

  // 2. Definir el video destacado (si en el futuro lo metes al JSON, se puede mapear)
  const fallbackFeatured = {
    title: "Ausencia Presente",
    srcMp4: "/video/hero-bg.mp4",
    srcWebm: "/video/hero-bg.webm",
    poster: "/video/audiovisual-poster.jpg",
    description:
      "Secuencia breve sobre presencia y ausencia. Color púrpura como pulso. Plano quieto, respiración de luz, y el fuera de campo como espacio narrativo.",
    credits: "Dirección: Purple Bonnes · Duración: 4:10 · 2025",
  };

  const featuredVideoItem = fallbackFeatured; // si luego lo ligas al JSON, aquí hacemos el mapping

  // 3. Construir las colecciones para las tarjetas
  const collectionsArray = Object.entries(COLECCIONES)
    .map(([key, label]) => {
      const items = allItems.filter((item) => item.category === key);
      if (items.length === 0) return null;

      const first = items[0];
      const preview = first.media?.[0] ?? "/video/audiovisual-poster.jpg";

      return {
        key,
        label,
        preview,
      };
    })
    .filter(
      (col): col is { key: string; label: string; preview: string } =>
        col !== null
    );

  return (
    // pt-14 para compensar la navbar fija
    <div className="container pt-14 pb-10">
      {/* ===== HERO CON OVERLAYS ARTÍSTICOS ===== */}
      <section className="relative h-[60vh] sm:h-[70vh] overflow-hidden rounded-2xl mb-10">
        {/* Fondo negro base */}
        <div className="absolute inset-0 bg-black" />

        {/* Duotono morado */}
        <div className="absolute inset-0 bg-gradient-to-tr from-pb-grape/85 via-pb-purple/40 to-transparent mix-blend-multiply" />

        {/* Destellos */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_90%,rgba(206,168,240,0.35),transparent_60%),radial-gradient(40%_40%_at_15%_10%,rgba(107,31,173,0.45),transparent_60%)]" />

        {/* Grano sutil */}
        <div className="pointer-events-none absolute inset-0 opacity-25 mix-blend-soft-light bg-[repeating-linear-gradient(0deg,transparent_0,transparent_2px,rgba(255,255,255,0.06)_3px,rgba(255,255,255,0.06)_3.5px)]" />

        {/* Texto */}
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div>
            <h1 className="font-display text-5xl sm:text-6xl text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.55)]">
              <span className="relative inline-block">
                Audiovisual
                <span className="absolute left-0 right-0 -bottom-2 h-[6px] rounded-full bg-gradient-to-r from-pb-lilac/80 to-white/60"></span>
              </span>
            </h1>
            <p className="mt-4 text-pb-lavender/90">Audiovisual</p>
          </div>
        </div>
      </section>

      {/* ===== VIDEO DESTACADO ===== */}
      <section className="mb-12">
        <div className="grid gap-6 md:grid-cols-5">
          {/* Player */}
          <div className="md:col-span-3 rounded-2xl overflow-hidden border border-white/15 bg-black/30">
            <div className="relative w-full aspect-video">
              <video
                controls
                playsInline
                preload="metadata"
                poster={featuredVideoItem.poster}
                className="absolute inset-0 h-full w-full object-cover"
              >
                {featuredVideoItem.srcWebm && (
                  <source
                    src={featuredVideoItem.srcWebm}
                    type="video/webm"
                  />
                )}
                <source src={featuredVideoItem.srcMp4} type="video/mp4" />
                Tu navegador no soporta video en HTML5.
              </video>
            </div>
          </div>

          {/* Texto del “post” del video */}
          <div className="md:col-span-2 card p-6">
            <h2 className="font-display text-2xl text-pb-lilac">
              {featuredVideoItem.title}
            </h2>
            <p className="mt-2 text-pb-lavender/85 leading-relaxed">
              {featuredVideoItem.description}
            </p>
            <p className="mt-4 text-sm text-pb-lavender/70">
              {featuredVideoItem.credits}
            </p>
          </div>
        </div>
      </section>

      {/* ===== TARJETAS DE COLECCIONES ===== */}
      {collectionsArray.length > 0 && (
        <>
          <h2 className="font-display text-3xl text-pb-lilac mb-4">
            Colecciones audiovisuales
          </h2>
          <p className="text-sm text-pb-lavender/80 mb-6">
            Series agrupadas por tipo de exploración visual: video, fotografía y
            digital.
          </p>

          <AudiovisualCollections collections={collectionsArray} />
        </>
      )}
    </div>
  );
}

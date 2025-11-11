import GalleryGrid from "@/components/GalleryGrid";
import { getByCollection } from "@/lib/data";

export const metadata = { title: "Audiovisual — Purple Bonnes" };

export default async function AudiovisualPage() {
  const items = await getByCollection("audiovisual");

   const featured = {
  title: "Ausencia Presente",
  srcMp4: "/video/hero-bg.mp4",     // debe existir: /public/video/hero-bg.mp4
  srcWebm: "/video/hero-bg.webm",   // opcional, si lo tienes
  poster: "/video/audiovisual-poster.jpg",
  description:
    "Secuencia breve sobre presencia y ausencia. Color púrpura como pulso. Plano quieto, respiración de luz, y el fuera de campo como espacio narrativo.",
  credits: "Dirección: Purple Bonnes · Duración: 4:10 · 2025",
};


  return (
    <>
      {/* HERO con video + overlays artísticos */}
      <section className="relative h-[60vh] sm:h-[70vh] overflow-hidden rounded-2xl mb-10">
        

        {/* Duotono morado (multiplica sobre el video) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-pb-grape/85 via-pb-purple/40 to-transparent mix-blend-multiply" />

        {/* Destellos “pretenciosos”  */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_90%,rgba(206,168,240,0.35),transparent_60%),radial-gradient(40%_40%_at_15%_10%,rgba(107,31,173,0.45),transparent_60%)]" />

        {/* “Grano” sutil tipo película */}
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
            <p className="mt-4 text-pb-lavender/90">
              Fragmentos de lo visible
            </p>
          </div>
        </div>
      </section>

      {/* ===== VIDEO DESTACADO (debajo del hero) ===== */}
      <section className="mb-12">
        <div className="grid gap-6 md:grid-cols-5">
          {/* Player */}
<div className="md:col-span-3 rounded-2xl overflow-hidden border border-white/15 bg-black/30">
  <div className="relative w-full aspect-video">
    <video
      controls
      playsInline
      preload="metadata"
      poster={featured.poster}
      className="absolute inset-0 h-full w-full object-cover"
    >
      {/* primero WebM (si lo tienes), luego MP4 */}
      {featured.srcWebm && <source src={featured.srcWebm} type="video/webm" />}
      <source src={featured.srcMp4} type="video/mp4" />
      Tu navegador no soporta video en HTML5.
    </video>
  </div>
</div>

          {/* Texto del “post” del video */}
          <div className="md:col-span-2 card p-6">
            <h2 className="font-display text-2xl text-pb-lilac">{featured.title}</h2>
            <p className="mt-2 text-pb-lavender/85 leading-relaxed">
              {featured.description}
            </p>
            <p className="mt-4 text-sm text-pb-lavender/70">{featured.credits}</p>
          </div>
        </div>
      </section>

      {/* ===== GRID DE OBRAS AUDIOVISUALES ===== */}
      <GalleryGrid items={items} />
    </>
  );
}

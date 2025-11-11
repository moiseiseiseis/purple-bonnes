import SectionHeader from "@/components/SectionHeader";
import GalleryGrid from "@/components/GalleryGrid";
import { getArtworks } from "@/lib/data";  
import GalleryGridHome from "@/components/GalleryGridHome";

export default async function HomePage() {
  const items = await getArtworks();
  return (
    <>
      {/* --- HERO con video de fondo --- */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-12 rounded-2xl">
        {/* Video de fondo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/video/hero-bg.mp4" type="video/mp4" />
          {/* fallback */}
          Tu navegador no soporta video en HTML5.
        </video>

        {/* Capa de color para oscurecer ligeramente */}
        <div className="absolute inset-0 bg-pb-grape/60 mix-blend-multiply" />

        {/* Título centrado */}
        <h1 className="relative z-10 font-display text-5xl sm:text-6xl text-pb-lilac drop-shadow-lg">
          Purple Bonnes
        </h1>
      </section>

      {/* --- Galería --- */}
      <SectionHeader
        title="Galería destacada"
        subtitle="Obra seleccionada recientemente"
      />
      <GalleryGridHome items={items.slice(0, 6)} />
    </>
  );
}

import SectionHero from "@/components/SectionHero";
import GalleryGrid from "@/components/GalleryGrid";
import { getAvailableArtworks } from "@/lib/data";

export const metadata = { title: "Tienda — Purple Bonnes" };
export const revalidate = 60;

export default async function TiendaPage() {
  const items = await getAvailableArtworks();

  return (
    <div className="container py-10">
      <SectionHero title="Tienda" subtitle="Obra disponible para adquirir" />
      {items.length === 0 ? (
        <p className="text-center text-pb-lavender/60 py-20">
          No hay obras disponibles en este momento.
        </p>
      ) : (
        <GalleryGrid items={items} />
      )}
    </div>
  );
}


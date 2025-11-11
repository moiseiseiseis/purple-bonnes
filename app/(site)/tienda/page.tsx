import SectionHero from "@/components/SectionHero";
import GalleryGrid from "@/components/GalleryGrid";
import { getByCollection } from "@/lib/data";

export const metadata = { title: "Tienda — Purple Bonnes" };

export default async function TiendaPage() {
  const items = await getByCollection("plasticas"); // o como hayas definido tu dataset

  return (
    <>
      <SectionHero title="Tienda" subtitle="Obra disponible para adquirir" />
      <GalleryGrid items={items} />
    </>
  );
}


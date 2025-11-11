import SectionHero from "@/components/SectionHero";
import GalleryGrid from "@/components/GalleryGrid";
import { getByCollection } from "@/lib/data";

export const metadata = { title: "Plásticas — Purple Bonnes" };

export default async function PlasticasPage() {
  const items = await getByCollection("plasticas");

  return (
    <>
      <SectionHero title="Plásticas" subtitle="Pintura, dibujo y escultura" />
      <GalleryGrid items={items} />
    </>
  );
}

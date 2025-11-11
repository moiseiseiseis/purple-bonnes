import SectionHero from "@/components/SectionHero";
import GalleryGrid from "@/components/GalleryGrid";
import { getByCollection } from "@/lib/data";

export const metadata = { title: "Proyectos — Purple Bonnes" };

export default async function ProyectosPage() {
  const items = await getByCollection("proyectos");

  return (
    <>
      <SectionHero title="Proyectos" subtitle="Maquillaje, vestuario y experimentación visual" />
      <GalleryGrid items={items} />
    </>
  );
}

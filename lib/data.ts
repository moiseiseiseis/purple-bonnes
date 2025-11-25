import artworks from "@/data/artworks.json";
import collections from "@/data/collections.json";
import pages from "@/data/pages.json";

export async function getArtworks() { return artworks; }
export async function getByCollection(slug: string) { return artworks.filter(a => a.collection === slug); }
export async function getByCategory(cat: string) { return artworks.filter(a => a.category === cat); }
export async function getPages() { return pages; }
export async function getCollections() { return collections; }
export async function getArtworkBySlug(slug: string) {
  const s = decodeURIComponent(slug);
  return (artworks as any[]).find(a => a.slug === s);
}
export async function getProjects() {
  return artworks.filter((a) => a.collection === "proyectos");
}

export async function getProjectsByCategory(category: "maquillaje" | "vestuario") {
  const all = await getProjects();
  return all.filter((a) => a.category === category);
}

export async function getProcessesByCategory(
  category: "vestuarios" | "maquillaje" | "miscelanea"
) {
  return artworks.filter(
    (a) => a.collection === "procesos" && a.category === category
  );
}
export type Artwork = {
  id: string; title: string; year: number; technique: string; dimensions: string;
  price: number; category: string; collection: string; media: string[]; status: "available"|"inquire"|"sold"; slug: string;
}

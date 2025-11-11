// components/GalleryGrid.tsx
import ArtworkCard from "./ArtworkCard";

export default function GalleryGrid({ items, showPrice = true }: { items: any[]; showPrice?: boolean }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((a) => <ArtworkCard key={a.id} item={a} showPrice={showPrice} />)}
    </div>
  );
}

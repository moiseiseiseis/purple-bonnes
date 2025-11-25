import ArtworkCard from "./ArtworkCard";

interface GalleryGridProps {
  items: any[];
  hidePrice?: boolean;   
  hideButton?: boolean;  
  buttonHrefBase?: string;
}

export default function GalleryGrid({
  items,
  hidePrice = false,
  hideButton = false,
  buttonHrefBase = "/obra",
}: GalleryGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ArtworkCard
          key={item.id}
          item={item}
          showPrice={!hidePrice}
          showButton={!hideButton}
          buttonHrefBase={buttonHrefBase}
        />
      ))}
    </div>
  );
}

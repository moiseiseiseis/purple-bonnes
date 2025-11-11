// components/ArtworkCard.tsx
import Image from "next/image";
import Link from "next/link";
import Badge from "./ui/Badge";

export default function ArtworkCard({ item, showPrice = true }: { item: any; showPrice?: boolean }) {
  return (
    <div className="card overflow-hidden">
      <div className="relative aspect-[3/4]">
        <Image src={item.media[0]} alt={item.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw"/>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold">{item.title}</h3>
          <Badge>{item.year}</Badge>
        </div>
        <p className="text-sm text-pb-lavender/80">{item.technique} · {item.dimensions}</p>

        <div className="mt-3 flex items-center justify-between">
          {showPrice ? (
            <span className="font-medium">
              {item.status === "inquire" ? "Consultar" : `$${item.price.toLocaleString()}`}
            </span>
          ) : <span />}

          <Link href={`/obra/${item.slug}`} className="btn-primary text-sm">Ver</Link>
        </div>
      </div>
    </div>
  );
}

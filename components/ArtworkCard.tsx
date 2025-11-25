import Image from "next/image";
import Link from "next/link";
import Badge from "./ui/Badge";

interface ArtworkCardProps {
  item: any;
  showPrice?: boolean;      // ⬅️ nuevo
  showButton?: boolean;     // ⬅️ nuevo
  buttonHrefBase?: string;  // ⬅️ opcional (por si quieres /obra o /tienda)
}

export default function ArtworkCard({
  item,
  showPrice = true,
  showButton = true,
  buttonHrefBase = "/obra",
}: ArtworkCardProps) {
  const hasPrice = typeof item.price === "number" && !Number.isNaN(item.price);

  const priceLabel =
    item.status === "inquire"
      ? "Consultar"
      : hasPrice
      ? `$${item.price.toLocaleString("es-MX")}`
      : "";

  return (
    <div className="card overflow-hidden">
      <div className="relative aspect-[3/4]">
        <Image
          src={item.media[0]}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 33vw"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold">{item.title}</h3>
          {item.year && <Badge>{item.year}</Badge>}
        </div>

        {(item.technique || item.dimensions) && (
          <p className="text-sm text-pb-lavender/80">
            {item.technique}
            {item.dimensions && ` · ${item.dimensions}`}
          </p>
        )}

        {/* Sólo mostramos la fila inferior si hay que mostrar algo */}
        {(showPrice || showButton) && (
          <div className="mt-3 flex items-center justify-between">
            {showPrice && priceLabel && (
              <span className="font-medium">{priceLabel}</span>
            )}

            {showButton && (
              <Link
                href={`${buttonHrefBase}/${item.slug ?? ""}` as any}

                className="btn-primary text-sm"
              >
                Ver
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import Badge from "./ui/Badge";

interface ArtworkCardProps {
  item: any;
  showPrice?: boolean;
  showButton?: boolean;
  buttonHrefBase?: string;
  // Añadimos una propiedad para controlar el modo de visualización
  variant?: "grid" | "detail"; 
}

const STATUS_LABELS: Record<string, string> = {
  available: "Disponible",
  inquire: "Solo consulta",
  sold: "Vendida",
  process: "En proceso",
  "for-exhibition": "En exhibición",
};

export default function ArtworkCard({
  item,
  showPrice = true,
  showButton = true,
  buttonHrefBase = "/obra",
  variant = "grid", // Por defecto funciona como tu galería original
}: ArtworkCardProps) {
  const hasPrice = typeof item.price === "number" && !Number.isNaN(item.price);
  const showRealPrice = item.status === "available" && hasPrice;

  const priceLabel =
    item.status === "inquire"
      ? "Consultar"
      : showRealPrice
      ? `$${item.price.toLocaleString("es-MX")}`
      : "";

  // Variable auxiliar para simplificar las clases
  const isGrid = variant === "grid";

  return (
    <div className={`card overflow-hidden ${isGrid ? "" : "border-none shadow-none bg-transparent"}`}>
      
      {/* MAGIA AQUÍ: 
        Si es grid: Mantiene aspect-[3/4] y object-cover (recorta para uniformidad).
        Si es detail: Usa una altura dinámica y object-contain (muestra imagen completa).
      */}
      <div className={`relative w-full ${isGrid ? "aspect-[3/4]" : "h-[50vh] md:h-[70vh]"}`}>
        <Image
          src={item.media?.[0] ?? "/og-cover.jpg"}
          alt={item.title}
          fill
          className={isGrid ? "object-cover" : "object-contain"}
          sizes={isGrid ? "(max-width:768px) 100vw, 33vw" : "100vw"}
          priority={!isGrid} // Prioridad de carga si es la vista de detalle
        />
      </div>

      <div className={isGrid ? "p-4" : "py-6"}>
        <div className="flex items-center gap-2 mb-1">
          <h3 className={isGrid ? "font-semibold" : "text-2xl font-bold"}>
            {item.title}
          </h3>
          {item.year && <Badge>{item.year}</Badge>}
        </div>

        {(item.technique || item.dimensions) && (
          <p className={`text-pb-lavender/80 ${isGrid ? "text-sm" : "text-base mt-2"}`}>
            {item.technique}
            {item.dimensions && ` · ${item.dimensions}`}
          </p>
        )}

        {/* Estado */}
        <p className={`text-pb-lavender/60 mt-1 ${isGrid ? "text-xs" : "text-sm"}`}>
          {STATUS_LABELS[item.status] ?? "Disponible"}
        </p>

        {(showPrice || showButton) && (
          <div className={`mt-3 flex items-center justify-between ${isGrid ? "" : "max-w-xs mt-6"}`}>
            {showPrice && priceLabel && (
              <span className={isGrid ? "font-medium" : "text-xl font-semibold"}>
                {priceLabel}
              </span>
            )}

            {showButton && (
              <Link
                href={`${buttonHrefBase}/${item.slug ?? ""}`}
                className={`btn-primary ${isGrid ? "text-sm" : "px-8 py-2"}`}
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
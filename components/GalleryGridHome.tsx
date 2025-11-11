import Image from "next/image";
import Link from "next/link";

export default function GalleryGridHome({ items }: { items: any[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((a: any) => (
        <div
          key={a.id}
          className="relative group overflow-hidden rounded-2xl aspect-[3/4] shadow-lg"
        >
          {/* Imagen */}
          <Image
            src={a.media[0]}
            alt={a.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 33vw"
          />

          {/* Overlay base SIEMPRE visible (mejora legibilidad) */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pb-grape/70 via-pb-grape/25 to-transparent" />

          {/* Overlay extra SOLO en hover (ligero, no tapa todo) */}
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-pb-purple/40 via-pb-purple/10 to-transparent" />

          {/* Texto + botón */}
          <div className="absolute inset-x-0 bottom-0 p-4 z-10">
            <h3 className="text-xl font-semibold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
              {a.title}
            </h3>
            <p className="text-sm text-white/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              {a.year}
            </p>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-3">
              <Link
  href={`/obra/${a.slug}`}
  className="inline-block rounded-xl px-3 py-1.5 text-sm font-semibold
             bg-pb-lilac !text-black ring-1 ring-white/40
             backdrop-blur-sm hover:bg-white hover:!text-black no-underline transition"
>
  Ver obra
</Link>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

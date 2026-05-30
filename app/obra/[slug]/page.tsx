import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArtworkBySlug } from "@/lib/data";
import type { Metadata } from "next";
import ZoomImage from "@/components/ZoomImage";
import BuyButton from "./BuyButton";

type Params = { slug: string };

// ✅ En Next 16, params es Promise: desenvuélvelo
export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const art = await getArtworkBySlug(slug);
  if (!art) return { title: "Obra no encontrada — Purple Bonnes" };
  return {
    title: `${art.title} — Purple Bonnes`,
    description: `${art.title} (${art.year}) · ${art.technique} · ${art.dimensions}`,
    openGraph: { title: `${art.title} — Purple Bonnes`, images: art.media?.[0] ? [art.media[0]] : undefined },
  };
}

export default async function ArtworkPage(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;      // ✅ desestructurar con await
  const art = await getArtworkBySlug(slug);
  if (!art) return notFound();

  const { title, year, technique, dimensions, category, collection, price, status, media } = art;

  const STATUS_LABELS: Record<string, string> = {
    available: "Disponible",
    inquire: "Solo consulta",
    sold: "Vendida",
    process: "En proceso",
    "for-exhibition": "En exhibición",
  };

  return (
    <section className="container max-w-5xl mx-auto py-8 px-4">
      <div className="mb-6">
        <nav className="text-sm mb-2 text-pb-lavender/70">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tienda" className="hover:text-white transition-colors">Tienda</Link>
          <span className="mx-2">/</span>
          <span className="text-pb-lilac">{title}</span>
        </nav>
        <h1 className="font-display text-4xl sm:text-5xl text-pb-lilac">{title}</h1>
        <p className="mt-2 text-pb-lavender/85">
          {year} · {technique} · {dimensions}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 👇 Contenedor de exhibición flexible. Sin recortes. 👇 */}
        <div className="flex items-center justify-center bg-neutral-900/40 rounded-xl overflow-hidden h-[50vh] md:h-[75vh] p-2 md:p-6 border border-white/5">
          <div className="relative w-full h-full">
            <ZoomImage
              src={media?.[0] ?? "/og-cover.jpg"}
              alt={title}
              className="object-contain drop-shadow-2xl" 
            />
          </div>
        </div>

        {/* 👇 Detalles de la obra 👇 */}
        <div className="card p-5 flex flex-col gap-4 h-fit">
          <ul className="text-pb-lavender/90 text-sm space-y-2">
            <li><strong className="text-pb-lilac">Técnica:</strong> {technique}</li>
            <li><strong className="text-pb-lilac">Dimensiones:</strong> {dimensions}</li>
            <li><strong className="text-pb-lilac">Categoría:</strong> {category}</li>
            <li><strong className="text-pb-lilac">Colección:</strong> {collection}</li>
            <li>
              <strong className="text-pb-lilac">Estado:</strong>{" "}
              {STATUS_LABELS[status] ?? "Disponible"}
            </li>
            {status !== "inquire" && price && (
              <li><strong className="text-pb-lilac text-lg">Precio:</strong> <span className="text-lg">${price.toLocaleString("es-MX")}</span></li>
            )}
          </ul>

          <div className="mt-4 pt-4 border-t border-white/10">
            {status === "available" && price ? (
              <BuyButton artworkId={art.id} />
            ) : (
              <p className="text-sm text-pb-lavender/60 text-center">
                Esta obra no está disponible para compra directa.
              </p>
            )}

            <p className="mt-3 text-xs text-pb-lavender/60 text-center leading-relaxed">
              La compra se completa de forma segura mediante Stripe.
            </p>
          </div>
        </div>
      </div>

      <article className="prose prose-invert prose-p:leading-relaxed mt-12 max-w-none bg-neutral-900/20 p-6 md:p-8 rounded-xl border border-white/5">
        <h2 className="text-pb-lilac mt-0">Sobre la obra</h2>
        <p>
          {art.about
            ? art.about
            : `${title}${year ? ` (${year})` : ""} explora relaciones entre materia y gesto. Realizada en ${technique?.toLowerCase() ?? "su técnica"}, su formato de ${dimensions} enfatiza tensiones entre lo orgánico y lo simbólico.`}
        </p>
      </article>

      <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
        <Link href="/" className="text-pb-lilac hover:text-white underline underline-offset-4 transition-colors">Volver al Home</Link>
        <Link href="/tienda" className="btn-primary">Ir a la Tienda</Link>
      </div>
    </section>
  );
}
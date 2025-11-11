import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArtworkBySlug } from "@/lib/data";
import type { Metadata } from "next";

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

  return (
    <section className="container max-w-5xl mx-auto py-8">
      <div className="mb-6">
        <nav className="text-sm mb-2 text-pb-lavender/70">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tienda" className="hover:text-white">Tienda</Link>
          <span className="mx-2">/</span>
          <span className="text-pb-lilac">{title}</span>
        </nav>
        <h1 className="font-display text-4xl sm:text-5xl text-pb-lilac">{title}</h1>
        <p className="mt-2 text-pb-lavender/85">
          {year} · {technique} · {dimensions}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card overflow-hidden">
          <div className="relative aspect-[3/4]">
            <Image
              src={media?.[0] ?? "/og-cover.jpg"}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="card p-5 flex flex-col gap-4">
          <ul className="text-pb-lavender/90 text-sm space-y-1">
            <li><strong className="text-pb-lilac">Técnica:</strong> {technique}</li>
            <li><strong className="text-pb-lilac">Dimensiones:</strong> {dimensions}</li>
            <li><strong className="text-pb-lilac">Categoría:</strong> {category}</li>
            <li><strong className="text-pb-lilac">Colección:</strong> {collection}</li>
            <li><strong className="text-pb-lilac">Estado:</strong> {status === "inquire" ? "Consultar" : "Disponible"}</li>
            {status !== "inquire" && (
              <li><strong className="text-pb-lilac">Precio:</strong> ${price?.toLocaleString()}</li>
            )}
          </ul>

          <div className="mt-2">
            <Link href="/tienda" className="btn-primary">Comprar</Link>
            <p className="mt-2 text-xs text-pb-lavender/70">
              La compra se completa en Tienda. Contáctanos si prefieres coordinar envío/pago.
            </p>
          </div>
        </div>
      </div>

      <article className="prose prose-invert prose-p:leading-relaxed mt-8 max-w-none">
        <h2 className="text-pb-lilac">Sobre la obra</h2>
        <p>
          {title} ({year}) explora relaciones entre materia y gesto. Realizada en {technique.toLowerCase()},
          su formato de {dimensions} enfatiza tensiones entre lo orgánico y lo simbólico.
        </p>
      </article>

      <div className="mt-10 flex items-center gap-3">
        <Link href="/tienda" className="btn-primary">Ir a Tienda</Link>
        <Link href="/" className="text-pb-lilac hover:text-white underline underline-offset-4">Volver al Home</Link>
      </div>
    </section>
  );
}

import HomeBackground from "@/components/HomeBackground";
import HomeHero from "@/components/HomeHero";
import AboutBlock from "@/components/AboutBlock";
import ReviewsMarquee from "@/components/ReviewsMarquee";
import ReviewsGrid from "@/components/ReviewsGrid";
import SectionHeader from "@/components/SectionHeader";
import { getSemblanza, getReviews } from "@/lib/content";
import Link from "next/link";

export default async function HomePage() {
  const semblanza = await getSemblanza();
  const reviews = await getReviews();

  return (
    <>
      {/* BACKGROUND FIJO SOLO EN HOME */}
      <HomeBackground />

      {/* CONTENIDO DE HOME */}
      <div className="relative z-10">
        <HomeHero />

        {/* SEMBLANZA */}
        <div className="container py-16">
          <AboutBlock markdown={semblanza} />
        </div>



              {/*ilustración en movimiento*/}
              <section className="container pb-16">
                <div className="max-w-xs mx-auto card overflow-hidden relative">
                  
                          <div className="relative w-full">
                            {/* CAMBIO CLAVE: Usar la etiqueta <video> en lugar de <img> */}
                            <video
                              src="/video/videito.mp4" 
                              alt="Obra en movimiento"
                              className="w-full h-auto object-cover"
                              
                              // Atributos esenciales para que funcione como un GIF animado:
                              autoPlay // Inicia la reproducción automáticamente
                              loop     // Se repite indefinidamente
                              muted    // Necesario para la reproducción automática en muchos navegadores
                              playsInline // Recomendado para iOS
                            />
                          </div>
          </div>
        </section>

        {/* RESEÑAS MARQUEE */}
        {reviews.length > 0 && (
          <div className="container">
            <ReviewsMarquee items={reviews} />
          </div>
        )}

        {/* RESEÑAS EN GRID */}
        {reviews.length > 0 && (
          <section className="container pb-20">
            <SectionHeader title="Reseñas destacadas" />
            <ReviewsGrid items={reviews.slice(0, 6)} />
          </section>
        )}

        {/* Botón al final del Home */}
        <section className="container pb-20">
          <div className="flex justify-center">
            <Link href="/plasticas" className="btn-primary text-base">
              Ver obras
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

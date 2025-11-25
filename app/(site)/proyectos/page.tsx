import SectionHeader from "@/components/SectionHeader";
import GalleryGrid from "@/components/GalleryGrid";
import { getProjectsByCategory } from "@/lib/data";

export const metadata = {
  title: "Proyectos — Purple Bonnes",
  description: "Maquillaje y vestuario como extensión plástica.",
};

export default async function ProyectosPage() {
  // 1️⃣ Cargar las obras reales del JSON
  const maquillaje = await getProjectsByCategory("maquillaje");
  const vestuario = await getProjectsByCategory("vestuario");

  return (
    <div className="container py-14">
      <SectionHeader
        title="Proyectos"
        subtitle="Maquillaje y vestuario"
      />

      <section className="mt-10 space-y-8">

        {/* MAQUILLAJE */}
        <details className="card p-6 group">
          <summary className="flex cursor-pointer items-center justify-between">
            <span className="font-display text-2xl text-pb-lilac">
              Maquillaje
            </span>
            <span className="text-pb-lavender/70 text-sm group-open:hidden">
              ver más
            </span>
            <span className="text-pb-lilac/70 text-sm hidden group-open:block">
              cerrar
            </span>
          </summary>

          <div className="mt-6 space-y-3 text-sm leading-relaxed text-pb-lavender/90">
            <p>
              Maquillaje artístico orientado a fotografía, performance y procesos narrativos.
              Esta sección incluye piezas experimentales, documentación y exploraciones visuales.
            </p>

            {/* Galería si hay obras */}
            {maquillaje.length > 0 ? (
              <div className="mt-6">
                <GalleryGrid  items={maquillaje} hidePrice hideButton />
              </div>
            ) : (
              <p className="italic text-pb-lavender/60">
                Próximamente se agregarán proyectos de maquillaje.
              </p>
            )}
          </div>
        </details>

        {/* VESTUARIO */}
        <details className="card p-6 group">
          <summary className="flex cursor-pointer items-center justify-between">
            <span className="font-display text-2xl text-pb-lilac">
              Vestuario
            </span>
            <span className="text-pb-lavender/70 text-sm group-open:hidden">
              ver más
            </span>
            <span className="text-pb-lilac/70 text-sm hidden group-open:block">
              cerrar
            </span>
          </summary>

          <div className="mt-6 space-y-3 text-sm leading-relaxed text-pb-lavender/90">
            <p>
              Diseño de vestuario, piezas textiles intervenidas y elementos visuales 
              desarrollados para escenas, fotografía conceptual y procesos experimentales.
            </p>

            {vestuario.length > 0 ? (
              <div className="mt-6">
                <GalleryGrid items={vestuario} hidePrice hideButton/>
              </div>
            ) : (
              <p className="italic text-pb-lavender/60">
                Próximamente se agregarán proyectos de vestuario.
              </p>
            )}
          </div>
        </details>

      </section>
    </div>
  );
}

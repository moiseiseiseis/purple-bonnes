import SectionHeader from "@/components/SectionHeader";
import GalleryGrid from "@/components/GalleryGrid";
import { getProcessesByCategory } from "@/lib/data";

export const metadata = {
  title: "Procesos — Purple Bonnes",
  description:
    "Bocetos, ensayos, vestuario, maquillaje y miscelánea en torno a la obra.",
};

export default async function ProcesosPage() {
  const [vestuarios, maquillaje, miscelanea] = await Promise.all([
    getProcessesByCategory("vestuarios"),
    getProcessesByCategory("maquillaje"),
    getProcessesByCategory("miscelanea"),
  ]);

  return (
    <div className="container py-14">
      <SectionHeader
        title="Procesos"
        subtitle="Bocetos, ensayos, vestuario, maquillaje y miscelánea"
      />

      <section className="mt-10 space-y-8">
        {/* VESTUARIOS */}
        <details className="card p-6 group">
          <summary className="flex cursor-pointer items-center justify-between">
            <div>
              <h2 className="font-display text-2xl text-pb-lilac">
                Vestuarios
              </h2>
              <p className="mt-1 text-sm text-pb-lavender/80">
                Pruebas de vestuario, fittings, bocetos textiles y registros de
                proceso.
              </p>
            </div>
            <span className="text-pb-lavender/70 text-sm group-open:hidden">
              ver más
            </span>
            <span className="text-pb-lilac/80 text-sm hidden group-open:block">
              cerrar
            </span>
          </summary>

          <div className="mt-6">
            {vestuarios.length === 0 ? (
              <p className="text-sm text-pb-lavender/60 italic">
                Próximamente se agregarán procesos de vestuario.
              </p>
            ) : (
              <GalleryGrid items={vestuarios} hidePrice hideButton />
            )}
          </div>
        </details>

        {/* MAQUILLAJE */}
        <details className="card p-6 group">
          <summary className="flex cursor-pointer items-center justify-between">
            <div>
              <h2 className="font-display text-2xl text-pb-lilac">
                Maquillaje
              </h2>
              <p className="mt-1 text-sm text-pb-lavender/80">
                Ensayos de maquillaje, pruebas de color, variaciones y registros.
              </p>
            </div>
            <span className="text-pb-lavender/70 text-sm group-open:hidden">
              ver más
            </span>
            <span className="text-pb-lilac/80 text-sm hidden group-open:block">
              cerrar
            </span>
          </summary>

          <div className="mt-6">
            {maquillaje.length === 0 ? (
              <p className="text-sm text-pb-lavender/60 italic">
                Próximamente se agregarán procesos de maquillaje.
              </p>
            ) : (
              <GalleryGrid items={maquillaje} hidePrice hideButton />
            )}
          </div>
        </details>

        {/* MISCELÁNEA */}
        <details className="card p-6 group">
          <summary className="flex cursor-pointer items-center justify-between">
            <div>
              <h2 className="font-display text-2xl text-pb-lilac">
                Miscelánea
              </h2>
              <p className="mt-1 text-sm text-pb-lavender/80">
                Diarios visuales, bocetos sueltos, notas de taller y referencias.
              </p>
            </div>
            <span className="text-pb-lavender/70 text-sm group-open:hidden">
              ver más
            </span>
            <span className="text-pb-lilac/80 text-sm hidden group-open:block">
              cerrar
            </span>
          </summary>

          <div className="mt-6">
            {miscelanea.length === 0 ? (
              <p className="text-sm text-pb-lavender/60 italic">
                Espacio abierto para procesos, pruebas y materiales en tránsito.
              </p>
            ) : (
              <GalleryGrid items={miscelanea} hidePrice hideButton />
            )}
          </div>
        </details>
      </section>
    </div>
  );
}

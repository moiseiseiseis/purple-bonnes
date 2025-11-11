import SectionHero from "@/components/SectionHero";

export const metadata = { title: "Procesos — Purple Bonnes" };

export default function ProcesosPage() {
  return (
    <>
      <SectionHero
        title="Procesos"
        subtitle="La obra como tránsito — bocetos, ensayos y materiales"
      />
      <div className="container py-8 text-pb-lavender/85">
        <p>
          Esta sección explora las fases intermedias del trabajo artístico:
          pigmento, soporte, gesto, error y hallazgo. Documentos de estudio y
          fragmentos que revelan la construcción del lenguaje plástico.
        </p>
      </div>
    </>
  );
}

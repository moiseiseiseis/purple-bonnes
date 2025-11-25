// components/AboutBlock.tsx
"use client";

import { useScrollReveal } from "./useScrollReveal";

export default function AboutBlock({ markdown }: { markdown?: string }) {
  const ref = useScrollReveal();
  const text = markdown ?? "";
  const paragraphs = text.split("\n\n").filter(Boolean);

  return (
    <section
      ref={ref}
      // CAMBIO 1: Eliminamos 'text-center' de la sección. Usamos 'mx-auto' para centrar el bloque.
      className="opacity-0 translate-y-10 transition-all duration-700 max-w-3xl mx-auto px-6" 
    >
      {/* Título (Se mantiene centrado por defecto con 'mx-auto' del padre o se puede centrar explícitamente) */}
      <h2 className="font-display text-4xl sm:text-5xl text-pb-lilac mb-6 tracking-tight text-center">
        Semblanza
      </h2>

      {/* Lead sin dropcap */}
      {paragraphs[0] && (
        // CAMBIO 2: Aplicamos text-justify al párrafo principal.
        <p className="text-lg sm:text-xl text-pb-lavender/95 mb-8 leading-relaxed font-medium text-justify"> 
          {paragraphs[0]}
        </p>
      )}

      {/* CUERPO centradito */}
      <div className="space-y-6 text-pb-lavender/85 leading-loose text-base sm:text-lg">
        {paragraphs.slice(1).map((p, i) => (
          // CAMBIO 3: Aplicamos text-justify a cada párrafo del cuerpo.
          <p key={i} className="text-justify">{p}</p> 
        ))}
      </div>

      {/* Cita opcional (Volvemos a centrar la cita explícitamente si se desea) */}
      {paragraphs.length > 1 && (
        <p className="mt-12 text-center text-pb-lilac/90 italic text-lg sm:text-xl tracking-[0.12em] uppercase">
          “Oscilar entre belleza y perturbación es abrir un espacio sensible.”
        </p>
      )}
    </section>
  );
}
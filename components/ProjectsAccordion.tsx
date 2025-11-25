"use client";

import { useState } from "react";
import Image from "next/image";

interface ProjectsAccordionProps {
  makeup: any[];
  wardrobe: any[];
}

interface SectionProps {
  title: string;
  description: string;
  items: any[];
}

function Section({ title, description, items }: SectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card px-6 py-5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-left"
      >
        <div>
          <h2 className="font-display text-2xl text-pb-lilac">{title}</h2>
          <p className="mt-1 text-sm text-pb-lavender/80">{description}</p>
        </div>
        <span className="text-sm text-pb-lilac/80 underline">
          {open ? "cerrar" : "ver más"}
        </span>
      </button>

      {open && (
        <div className="mt-4 border-t border-white/10 pt-4">
          {items.length === 0 ? (
            <p className="text-sm text-pb-lavender/70 italic">
              Próximamente se agregarán proyectos en esta categoría.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {items.map((item) => (
                <div key={item.id} className="bg-black/40 rounded-xl overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src={item.media[0]}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-pb-lilac">{item.title}</h3>
                    <p className="text-xs text-pb-lavender/70 mt-1">
                      {item.year} · {item.technique}
                    </p>
                    {item.price && (
                      <p className="mt-1 text-xs text-pb-lavender/80">
                        Precio: ${item.price.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProjectsAccordion({ makeup, wardrobe }: ProjectsAccordionProps) {
  return (
    <div className="space-y-6">
      <Section
        title="Maquillaje"
        description="Maquillaje artístico para proyectos personales, editoriales y procesos performáticos."
        items={makeup}
      />
      <Section
        title="Vestuario"
        description="Diseño de vestuario, piezas textiles y exploraciones de cuerpo, tela y símbolo."
        items={wardrobe}
      />
    </div>
  );
}

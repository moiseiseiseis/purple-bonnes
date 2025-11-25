"use client";

import { useEffect, useRef } from "react";

export default function ReviewsMarquee({ items }: { items: {source: string; quote: string; year?: number}[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicamos contenido para scroll continuo
  const doubled = [...items, ...items];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let pos = 0;
    let raf = 0;

    const step = () => {
      pos -= 0.4; // velocidad
      if (pos <= -el.scrollWidth / 2) pos = 0;
      el.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative my-12 overflow-hidden rounded-2xl border border-white/15">
      <div className="absolute inset-0 bg-gradient-to-r from-pb-grape via-transparent to-pb-grape pointer-events-none" />
      <div className="whitespace-nowrap will-change-transform py-4" ref={trackRef}>
        {doubled.map((r, i) => (
          <span key={i} className="inline-block mx-6 text-pb-lavender/85">
            <q className="text-pb-lilac">{r.quote}</q>
            <span className="ml-2 text-pb-lavender/70">— {r.source}{r.year ? `, ${r.year}` : ""}</span>
          </span>
        ))}
      </div>
    </section>
  );
}

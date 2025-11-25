// components/HomeHero.tsx
"use client";

export default function HomeHero() {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center text-center">
      <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.65)] tracking-tight">
        Purple Bonnes
      </h1>

      <p className="mt-4 text-pb-lavender/90 max-w-xl text-lg sm:text-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
        Obra entre lo visible y lo invisible. Pintura, dibujo, grabado y procesos.
      </p>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-pulse text-white/80 text-sm tracking-[0.2em] uppercase">
        scroll
      </div>
    </section>
  );
}

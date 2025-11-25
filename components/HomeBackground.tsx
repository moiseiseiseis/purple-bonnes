// components/HomeBackground.tsx
"use client";

export default function HomeBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover opacity-70"
      >
        <source src="/video/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay Negro para oscurecer y aumentar el contraste */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Overlay morado (reducido para un tono más sutil) */}
      <div className="absolute inset-0 bg-pb-grape/10 mix-blend-multiply" />

      {/* Destellos (MODIFICADO: Opacidad de color reducida para que se vean menos) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_90%,rgba(206,168,240,0.15),transparent_60%),radial-gradient(40%_40%_at_15%_10%,rgba(107,31,173,0.20),transparent_60%)]" />

      {/* Grano */}
      <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-soft-light bg-[repeating-linear-gradient(0deg,transparent_0,transparent_2px,rgba(255,255,255,0.05)_3px)]" />
    </div>
  );
}

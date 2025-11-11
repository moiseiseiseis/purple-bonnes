interface SectionHeroProps {
  title: string;
  subtitle?: string;
}

export default function SectionHero({ title, subtitle }: SectionHeroProps) {
  return (
    <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden rounded-2xl mb-10">
      {/* Fondo duotono */}
      <div className="absolute inset-0 bg-gradient-to-tr from-pb-grape/85 via-pb-purple/40 to-transparent mix-blend-multiply" />

      {/* Destellos */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_90%,rgba(206,168,240,0.35),transparent_60%),radial-gradient(40%_40%_at_15%_10%,rgba(107,31,173,0.45),transparent_60%)]" />

      {/* Grano */}
      <div className="pointer-events-none absolute inset-0 opacity-25 mix-blend-soft-light bg-[repeating-linear-gradient(0deg,transparent_0,transparent_2px,rgba(255,255,255,0.06)_3px,rgba(255,255,255,0.06)_3.5px)]" />

      {/* Texto */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div>
          <h1 className="font-display text-5xl sm:text-6xl text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.55)]">
            <span className="relative inline-block">
              {title}
              <span className="absolute left-0 right-0 -bottom-2 h-[6px] rounded-full bg-gradient-to-r from-pb-lilac/80 to-white/60" />
            </span>
          </h1>
          {subtitle && (
            <p className="mt-4 text-pb-lavender/90 text-lg">{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  );
}

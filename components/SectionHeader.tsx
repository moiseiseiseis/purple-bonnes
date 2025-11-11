export default function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl sm:text-4xl font-bold font-display text-pb-grape">{title}</h1>
      {subtitle && <p className="text-white/80 mt-1">{subtitle}</p>
}
    </div>
  );
}

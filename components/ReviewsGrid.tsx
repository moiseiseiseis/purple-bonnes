export default function ReviewsGrid({ items }: { items: {source: string; quote: string; year?: number | null}[] }) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((r, i) => (
        <article key={i} className="card p-5 h-full flex flex-col">
          <p className="text-pb-lavender/90 italic leading-relaxed">“{r.quote}”</p>
          <div className="mt-3 text-sm text-pb-lavender/70">
            — {r.source}{r.year ? `, ${r.year}` : ""}
          </div>
        </article>
      ))}
    </section>
  );
}

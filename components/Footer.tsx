export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/30">
      <div className="container py-8 text-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Purple Bonnes</p>
        <p className="text-pb-ink/60">Paleta #e6ddf5 · #6b1fad · #401268 · #cea8f0</p>
      </div>
    </footer>
  );
}

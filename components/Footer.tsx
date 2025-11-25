// components/Footer.jsx
export default function Footer({ className = '' }) { // Aceptar prop className
  const year = new Date().getFullYear();

  return (
    // Aplicar la prop className
    <footer className={`mt-12 border-t border-white/10 bg-pb-grape/95 ${className}`}> 
      <div className="container py-6 text-sm flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-pb-lavender/80">
          Purple Bonnes
        </span>
        <span className="text-xs text-pb-lavender/60 text-center sm:text-right">
          © {year} Purple Bonnes. Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
}
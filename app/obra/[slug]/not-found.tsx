import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container py-12">
      <h1 className="font-display text-3xl text-pb-lilac">Obra no encontrada</h1>
      <p className="mt-2 text-pb-lavender/80">Revisa el enlace o explora la tienda.</p>
      <div className="mt-4">
        <Link href="/tienda" className="btn-primary">Ir a Tienda</Link>
      </div>
    </div>
  );
}

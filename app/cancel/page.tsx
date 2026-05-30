import Link from "next/link";

export const metadata = { title: "Pago cancelado — Purple Bonnes" };

export default function CancelPage() {
  return (
    <div className="container py-20 text-center space-y-6">
      <h1 className="font-display text-3xl text-pb-lilac">
        Pago cancelado
      </h1>
      <p className="text-pb-lavender/80 max-w-sm mx-auto">
        Tu pago no fue procesado. Puedes regresar a la tienda cuando quieras.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/tienda" className="btn-primary">
          Volver a la tienda
        </Link>
        <Link
          href="/contacto"
          className="text-sm text-pb-lilac underline underline-offset-4 hover:text-white transition-colors self-center"
        >
          ¿Tienes dudas? Contáctanos
        </Link>
      </div>
    </div>
  );
}

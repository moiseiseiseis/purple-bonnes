import { redirect } from "next/navigation";
import Link from "next/link";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

export const metadata = { title: "Compra exitosa — Purple Bonnes" };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-01-28.clover",
});

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) redirect("/tienda");

  let artworkTitle = "tu obra";

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") redirect("/cancel");

    const productId = session.metadata?.productId;
    if (productId) {
      const artwork = await prisma.artwork.findUnique({
        where: { id: productId },
        select: { title: true },
      });
      if (artwork) artworkTitle = artwork.title;
    }
  } catch {
    // Sesión no encontrada o expirada — mostramos éxito genérico
  }

  return (
    <div className="container py-20 text-center space-y-6 max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-full bg-pb-purple/30 border border-pb-lilac/40 flex items-center justify-center mx-auto text-pb-lilac text-2xl">
        ✓
      </div>

      <h1 className="font-display text-3xl text-pb-lilac">
        ¡Gracias por tu compra!
      </h1>

      <p className="text-pb-lavender/85 leading-relaxed">
        <strong className="text-white">{artworkTitle}</strong> está en camino a ti.
        Te contactaremos en las próximas 24–48 horas para coordinar el envío y
        el certificado de autenticidad.
      </p>

      <p className="text-xs text-pb-lavender/50">
        Stripe enviará un recibo a tu correo electrónico.
      </p>

      <div className="flex justify-center gap-4 pt-2">
        <Link href="/tienda" className="btn-primary">
          Seguir explorando
        </Link>
        <Link
          href="/contacto"
          className="text-sm text-pb-lilac underline underline-offset-4 hover:text-white transition-colors self-center"
        >
          Contactar
        </Link>
      </div>
    </div>
  );
}

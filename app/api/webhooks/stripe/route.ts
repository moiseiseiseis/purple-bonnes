import Stripe from "stripe";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-01-28.clover",
});

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return new NextResponse("Falta la firma de Stripe", { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error(`Error de firma del webhook: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { productType, productId } = session.metadata || {};

    if (!productType || !productId) {
      console.error("Faltan metadatos en la sesión de Stripe:", session.id);
      return new NextResponse("Metadatos incompletos", { status: 400 });
    }

    try {
      await prisma.$transaction(async (tx) => {
        // Idempotencia: si Stripe reintenta el webhook, no duplicamos la orden
        const existing = await tx.order.findUnique({
          where: { stripeSessionId: session.id },
        });
        if (existing) return;

        await tx.order.create({
          data: {
            stripeSessionId: session.id,
            stripePaymentId: (session.payment_intent as string) || null,
            productType,
            productId,
            amount: session.amount_total ?? 0,
            currency: session.currency ?? "mxn",
            customerEmail: session.customer_details?.email ?? null,
            customerName: session.customer_details?.name ?? null,
            phone: session.customer_details?.phone ?? null,
            shippingAddress: session.customer_details?.address
              ? JSON.parse(JSON.stringify(session.customer_details.address))
              : null,
          },
        });

        if (productType === "artwork") {
          // updateMany: solo actualiza si la obra sigue "available"
          // Protege contra doble venta: si ya está sold, no hace nada
          await tx.artwork.updateMany({
            where: { id: productId, status: "available" },
            data: { status: "sold" },
          });
        }
      });
    } catch (dbError) {
      console.error("Error guardando en la base de datos:", dbError);
      // Retornamos 500 para que Stripe reintente
      return new NextResponse("Error interno guardando la orden", { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

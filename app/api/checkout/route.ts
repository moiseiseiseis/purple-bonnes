// app/api/checkout/route.ts

import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-01-28.clover",
});

export async function POST(req: Request) {
  try {
    const { type, id } = await req.json();

    let product;

    if (type === "artwork") {
      product = await prisma.artwork.findUnique({
        where: { id },
      });

      if (!product || product.status !== "available") {
        return NextResponse.json(
          { error: "La obra no está disponible o no existe." },
          { status: 400 }
        );
      }

      if (!product.price || product.price <= 0) {
        return NextResponse.json(
          { error: "Esta obra no tiene precio asignado. Usa el formulario de contacto para consultarla." },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Tipo de producto no válido." },
        { status: 400 }
      );
    }

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      
      // Aquí está la metadata que viaja con la sesión de pago
      metadata: {
        productType: type,
        productId: product.id,
      },

      line_items: [
        {
          price_data: {
            currency: "mxn",
            product_data: {
              name: product.title,
            },
            unit_amount: (product.price ?? 0) * 100,
          },
          quantity: 1,
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      shipping_address_collection: {
        allowed_countries: ["MX"],
      },
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
    });

    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error("Error al crear la sesión de Stripe:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al procesar el pago." },
      { status: 500 }
    );
  }
}
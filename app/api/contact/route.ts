import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, "Nombre requerido").max(100),
  email: z.string().email("Email inválido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres").max(2000),
  obra: z.string().max(200).optional(),
});

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const { name, email, message, obra } = contactSchema.parse(raw);

    const subject = obra
      ? `Consulta sobre "${obra}" — Purple Bonnes`
      : `Nuevo mensaje de contacto — Purple Bonnes`;

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#6b1fad">Nuevo mensaje de contacto</h2>
        ${obra ? `<p><strong>Obra de interés:</strong> ${obra}</p>` : ""}
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr style="border-color:#e6ddf5;margin:16px 0"/>
        <p style="white-space:pre-wrap">${message}</p>
      </div>
    `;

    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Contact API error:", err);
    if (err?.name === "ZodError") {
      return NextResponse.json(
        { error: "Datos inválidos. Revisa los campos e intenta de nuevo." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}

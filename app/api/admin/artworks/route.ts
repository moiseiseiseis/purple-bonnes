import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { normalizeArtworkInput } from "@/lib/schemas";

export async function GET() {
  try {
    const artworks = await prisma.artwork.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(artworks);
  } catch (err) {
    console.error("GET /admin/artworks error", err);
    return NextResponse.json({ error: "Error al obtener obras" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const data = normalizeArtworkInput(raw);

    const artwork = await prisma.artwork.create({ data });

    revalidatePath("/");
    revalidatePath("/plasticas");
    revalidatePath("/tienda");
    revalidatePath("/audiovisual");
    revalidatePath("/audiovisual/[coleccion]", "page");
    revalidatePath("/procesos");
    revalidatePath("/proyectos");
    revalidatePath("/obra/[slug]", "page");
    revalidatePath(`/obra/${artwork.slug}`);

    return NextResponse.json(artwork, { status: 201 });
  } catch (err: any) {
    console.error("POST /admin/artworks error", err);
    if (err?.name === "ZodError") {
      return NextResponse.json({ error: err.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Error al crear obra" }, { status: 500 });
  }
}

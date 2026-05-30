import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { normalizeArtworkInput } from "@/lib/schemas";

function revalidateGalleries(slug?: string) {
  revalidatePath("/");
  revalidatePath("/plasticas");
  revalidatePath("/tienda");
  revalidatePath("/audiovisual");
  revalidatePath("/audiovisual/[coleccion]", "page");
  revalidatePath("/procesos");
  revalidatePath("/proyectos");
  revalidatePath("/obra/[slug]", "page");
  if (slug) revalidatePath(`/obra/${slug}`);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const artwork = await prisma.artwork.findUnique({ where: { id } });
    if (!artwork) {
      return NextResponse.json({ error: "Obra no encontrada" }, { status: 404 });
    }
    return NextResponse.json(artwork);
  } catch (error) {
    console.error("GET /admin/artworks/[id]:", error);
    return NextResponse.json({ error: "Error al obtener obra" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const raw = await request.json();
    const data = normalizeArtworkInput(raw);

    const existingSlug = await prisma.artwork.findFirst({
      where: { slug: data.slug, NOT: { id } },
    });
    if (existingSlug) {
      return NextResponse.json(
        { error: "Ya existe una obra con ese slug" },
        { status: 400 }
      );
    }

    const updated = await prisma.artwork.update({ where: { id }, data });
    revalidateGalleries(updated.slug);
    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PUT /admin/artworks/[id]:", error);
    if (error?.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: error?.message || "Error al actualizar obra" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const artwork = await prisma.artwork.findUnique({ where: { id }, select: { slug: true } });
    if (!artwork) {
      return NextResponse.json({ error: "Obra no encontrada" }, { status: 404 });
    }
    await prisma.artwork.delete({ where: { id } });
    revalidateGalleries(artwork.slug);
    return NextResponse.json({ message: "Obra eliminada" });
  } catch (error) {
    console.error("DELETE /admin/artworks/[id]:", error);
    return NextResponse.json({ error: "Error al eliminar obra" }, { status: 500 });
  }
}

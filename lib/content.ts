import prisma from "@/lib/prisma";

export async function getReviews() {
  try {
    return await prisma.review.findMany({
      orderBy: { year: "desc" }, // O 'createdAt' si prefieres
    });
  } catch (error) {
    console.error("Error cargando reviews:", error);
    return [];
  }
}

export async function getSemblanza() {
  try {
    const page = await prisma.page.findUnique({
      where: { slug: "semblanza" },
    });
    return page?.content ?? "Semblanza próximamente.";
  } catch (error) {
    console.error("Error cargando semblanza:", error);
    return "Semblanza próximamente.";
  }
}

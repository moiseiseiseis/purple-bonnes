import prisma from "@/lib/prisma"

export async function getArtworks() {
  return prisma.artwork.findMany({
    orderBy: { createdAt: "desc" },
  })
}

export async function getArtworkBySlug(slug: string) {
  return prisma.artwork.findUnique({
    where: { slug },
  })
}

export async function getByCollection(slug: string) {
  return prisma.artwork.findMany({
    where: { collection: slug },
    orderBy: { createdAt: "desc" },
  })
}

export async function getByCategory(category: string) {
  return prisma.artwork.findMany({
    where: { category },
    orderBy: { createdAt: "desc" },
  })
}

export async function getProjects() {
  return prisma.artwork.findMany({
    where: { collection: "proyectos" },
    orderBy: { createdAt: "desc" },
  })
}

export async function getProjectsByCategory(category: string) {
  return prisma.artwork.findMany({
    where: {
      collection: "proyectos",
      category,
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function getProcessesByCategory(category: string) {
  return prisma.artwork.findMany({
    where: {
      collection: "procesos",
      category,
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function getAvailableArtworks() {
  return prisma.artwork.findMany({
    where: { status: "available" },
    orderBy: { createdAt: "desc" },
  })
}
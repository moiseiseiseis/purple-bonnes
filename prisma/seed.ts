import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando proceso de seeding...");

  // --- 1. SEMBLANZA ---
  const semblanzaPath = path.join(process.cwd(), "data", "semblanza.md");
  let semblanzaContent = "Semblanza próximamente.";

  if (fs.existsSync(semblanzaPath)) {
    semblanzaContent = fs.readFileSync(semblanzaPath, "utf8");
    console.log("📖 semblanza.md cargado.");
  }

  await prisma.page.upsert({
    where: { slug: "semblanza" },
    update: { content: semblanzaContent },
    create: {
      slug: "semblanza",
      title: "Semblanza",
      content: semblanzaContent,
    },
  });

  // --- 2. ARTWORKS ---
  const artworksPath = path.join(process.cwd(), "data", "artworks.json");

  if (fs.existsSync(artworksPath)) {
    const artworks = JSON.parse(
      fs.readFileSync(artworksPath, "utf8")
    );

    for (const item of artworks) {
      await prisma.artwork.upsert({
        where: { slug: item.slug },
        update: {
          title: item.title,
          year: item.year ?? null,
          technique: item.technique ?? null,
          dimensions: item.dimensions ?? null,
          price: item.price ?? null,
          category: item.category,
          collection: item.collection,
          status: item.status,
          media: item.media ?? [],
          about: item.about ?? null,
        },
        create: {
          title: item.title,
          slug: item.slug,
          year: item.year ?? null,
          technique: item.technique ?? null,
          dimensions: item.dimensions ?? null,
          price: item.price ?? null,
          category: item.category,
          collection: item.collection,
          status: item.status,
          media: item.media ?? [],
          about: item.about ?? null,
        },
      });
    }

    console.log(`🎨 ${artworks.length} obras procesadas.`);
  }

  // --- 3. REVIEWS ---
  const reviewsPath = path.join(process.cwd(), "data", "reviews.json");

  if (fs.existsSync(reviewsPath)) {
    const reviews = JSON.parse(
      fs.readFileSync(reviewsPath, "utf8")
    );

    await prisma.review.deleteMany({});

    for (const r of reviews) {
      await prisma.review.create({
        data: {
          source: r.source,
          quote: r.quote,
          year: r.year ?? null,
        },
      });
    }

    console.log(`💬 ${reviews.length} reseñas añadidas.`);
  }

  console.log("✅ Seed completado.");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
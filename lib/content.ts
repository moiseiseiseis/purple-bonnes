import fs from "node:fs";
import path from "node:path";

export async function getSemblanza(): Promise<string> {
  const file = path.join(process.cwd(), "data", "semblanza.md");
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return "Semblanza próximamente.";
  }
}

export async function getReviews(): Promise<{source: string; quote: string; year?: number}[]> {
  try {
    const data = fs.readFileSync(path.join(process.cwd(), "data", "reviews.json"), "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

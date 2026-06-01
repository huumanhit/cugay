/**
 * Cập nhật image/gallery của các bird trong DB từ local path → Cloudinary URL
 * Chạy: npx tsx prisma/update-images.ts
 */

import { PrismaClient } from "../src/generated/prisma";
import urlMap from "./cloudinary-urls.json";

const prisma = new PrismaClient();

function toCloudinary(path: string): string {
  return (urlMap as Record<string, string>)[path] ?? path;
}

async function main() {
  console.log("🔄 Cập nhật ảnh trong database...\n");

  const birds = await prisma.bird.findMany({ select: { id: true, slug: true, image: true, gallery: true } });

  let updated = 0;
  for (const bird of birds) {
    const newImage = toCloudinary(bird.image);
    const newGallery = bird.gallery.map(toCloudinary);

    const changed = newImage !== bird.image || newGallery.some((u, i) => u !== bird.gallery[i]);
    if (!changed) continue;

    await prisma.bird.update({
      where: { id: bird.id },
      data: { image: newImage, gallery: newGallery },
    });
    console.log(`  ✅ ${bird.slug}`);
    updated++;
  }

  // Cập nhật timeline events
  const events = await prisma.timelineEvent.findMany({ select: { id: true, image: true } });
  for (const evt of events) {
    if (!evt.image) continue;
    const newImage = toCloudinary(evt.image);
    if (newImage === evt.image) continue;
    await prisma.timelineEvent.update({ where: { id: evt.id }, data: { image: newImage } });
    console.log(`  ✅ timeline event ${evt.id}`);
    updated++;
  }

  // Cập nhật clubs
  const clubs = await prisma.club.findMany({ select: { id: true, name: true, coverImage: true, logo: true } });
  for (const club of clubs) {
    const newCover = club.coverImage ? toCloudinary(club.coverImage) : undefined;
    if (!newCover || newCover === club.coverImage) continue;
    await prisma.club.update({ where: { id: club.id }, data: { coverImage: newCover } });
    console.log(`  ✅ club: ${club.name}`);
    updated++;
  }

  if (updated === 0) {
    console.log("  ℹ️  Không có gì thay đổi (có thể đã cập nhật rồi)");
  } else {
    console.log(`\n✅ Đã cập nhật ${updated} bản ghi`);
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

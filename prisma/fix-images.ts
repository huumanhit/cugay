/**
 * Thay thế Unsplash URLs → Cloudinary URLs thật trong DB
 * Chạy: npx tsx prisma/fix-images.ts
 */

import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

// 14 ảnh Cloudinary theo thứ tự bird-01 → bird-14
const CG = [
  "https://res.cloudinary.com/dl51jugpu/image/upload/v1780299840/cugay/birds/bird-01.jpg",
  "https://res.cloudinary.com/dl51jugpu/image/upload/v1780299841/cugay/birds/bird-02.jpg",
  "https://res.cloudinary.com/dl51jugpu/image/upload/v1780299842/cugay/birds/bird-03.jpg",
  "https://res.cloudinary.com/dl51jugpu/image/upload/v1780299843/cugay/birds/bird-04.jpg",
  "https://res.cloudinary.com/dl51jugpu/image/upload/v1780299844/cugay/birds/bird-05.jpg",
  "https://res.cloudinary.com/dl51jugpu/image/upload/v1780299845/cugay/birds/bird-06.jpg",
  "https://res.cloudinary.com/dl51jugpu/image/upload/v1780299846/cugay/birds/bird-07.jpg",
  "https://res.cloudinary.com/dl51jugpu/image/upload/v1780299846/cugay/birds/bird-08.jpg",
  "https://res.cloudinary.com/dl51jugpu/image/upload/v1780299847/cugay/birds/bird-09.jpg",
  "https://res.cloudinary.com/dl51jugpu/image/upload/v1780299848/cugay/birds/bird-10.jpg",
  "https://res.cloudinary.com/dl51jugpu/image/upload/v1780299849/cugay/birds/bird-11.jpg",
  "https://res.cloudinary.com/dl51jugpu/image/upload/v1780299849/cugay/birds/bird-12.jpg",
  "https://res.cloudinary.com/dl51jugpu/image/upload/v1780299850/cugay/birds/bird-13.jpg",
  "https://res.cloudinary.com/dl51jugpu/image/upload/v1780299851/cugay/birds/bird-14.jpg",
];

// Map slug → { image, gallery } dùng đúng ảnh Cloudinary
const BIRD_IMAGES: Record<string, { image: string; gallery: string[] }> = {
  "dung-si-tay-do":     { image: CG[0], gallery: [CG[0], CG[1], CG[2], CG[3]] },
  "chien-binh-ha-thanh":{ image: CG[4], gallery: [CG[4], CG[5], CG[6]] },
  "kim-cuong-da-lat":   { image: CG[7], gallery: [CG[7], CG[8]] },
  "than-ung-sai-gon":   { image: CG[9], gallery: [CG[9], CG[10], CG[11]] },
  "ngoc-trai-xu-hue":   { image: CG[12], gallery: [CG[12], CG[13]] },
  "bach-ngoc-da-nang":  { image: CG[2], gallery: [CG[2], CG[1]] },
};

async function main() {
  console.log("🔄 Cập nhật ảnh Cloudinary vào database...\n");

  for (const [slug, imgs] of Object.entries(BIRD_IMAGES)) {
    await prisma.bird.update({
      where: { slug },
      data: { image: imgs.image, gallery: imgs.gallery },
    });
    console.log(`  ✅ ${slug}`);
    console.log(`     image: ${imgs.image.split("/").pop()}`);
  }

  console.log("\n✅ Xong! Tất cả ảnh đã được lưu trên Cloudinary.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

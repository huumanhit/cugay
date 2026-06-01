/**
 * Upload 14 ảnh cu gáy từ public/birds/ lên Cloudinary
 * Chạy: npx tsx prisma/upload-images.ts
 */

import fs from "fs";
import path from "path";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME ?? "dl51jugpu";
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET ?? "cugay_uploads";
const FOLDER = "cugay/birds";

const BIRDS_DIR = path.join(process.cwd(), "public", "birds");

async function uploadImage(filePath: string, publicId: string): Promise<string> {
  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer], { type: "image/jpeg" });

  const form = new FormData();
  form.append("file", blob, path.basename(filePath));
  form.append("upload_preset", UPLOAD_PRESET);
  form.append("folder", FOLDER);
  form.append("public_id", publicId);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: form }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Upload ${filePath} thất bại: ${err?.error?.message ?? res.status}`);
  }

  const data = await res.json();
  return data.secure_url as string;
}

async function main() {
  const files = fs.readdirSync(BIRDS_DIR)
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort();

  if (files.length === 0) {
    console.error("❌ Không tìm thấy ảnh trong public/birds/");
    process.exit(1);
  }

  console.log(`📸 Tìm thấy ${files.length} ảnh. Bắt đầu upload lên Cloudinary...\n`);

  const results: Record<string, string> = {};

  for (const file of files) {
    const filePath = path.join(BIRDS_DIR, file);
    const publicId = file.replace(/\.[^.]+$/, ""); // bird-01, bird-02, ...
    process.stdout.write(`  ↑ ${file} ... `);

    try {
      const url = await uploadImage(filePath, publicId);
      results[`/birds/${file}`] = url;
      console.log(`✅`);
    } catch (err) {
      console.log(`❌ ${err}`);
    }
  }

  console.log("\n📋 Kết quả URLs Cloudinary:\n");
  console.log("const CG_URLS = [");
  files.forEach((file) => {
    const localPath = `/birds/${file}`;
    const url = results[localPath];
    if (url) console.log(`  "${url}", // ${file}`);
  });
  console.log("];\n");

  // Ghi ra file JSON để dùng lại
  const outputPath = path.join(process.cwd(), "prisma", "cloudinary-urls.json");
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`💾 Đã lưu mapping vào prisma/cloudinary-urls.json`);
}

main().catch((e) => { console.error(e); process.exit(1); });

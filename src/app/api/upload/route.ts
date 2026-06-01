export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME ?? "dl51jugpu";
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET ?? "cugay_uploads";
const FOLDER = "cugay/birds";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Không có file" }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File quá lớn, tối đa 10MB" }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Chỉ chấp nhận JPG, PNG, WebP, GIF" }, { status: 400 });
    }

    const cloudForm = new FormData();
    cloudForm.append("file", file);
    cloudForm.append("upload_preset", UPLOAD_PRESET);
    cloudForm.append("folder", FOLDER);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: cloudForm }
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("[Cloudinary]", res.status, err);
      return NextResponse.json(
        { error: err?.error?.message ?? `Upload thất bại: ${res.status}` },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json({
      url: data.secure_url,
      publicId: data.public_id,
      width: data.width,
      height: data.height,
    });
  } catch (err) {
    console.error("[Upload API]", err);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

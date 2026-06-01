import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VOICE_MAP: Record<string, "THO"|"DONG"|"KIM"|"THUY"|"DAU"|"VANG"> = {
  Thổ:"THO", Đồng:"DONG", Kim:"KIM", Thủy:"THUY", Đấu:"DAU", Vàng:"VANG",
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d").replace(/[^a-z0-9\s-]/g, "")
    .trim().replace(/\s+/g, "-")
    + "-" + Date.now();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      // Người bán
      sellerName, sellerPhone, sellerProvince,
      // Chim
      birdName, voice, age, origin, province, weight, color, lineage, description,
      image, gallery,
      // Listing
      price, negotiable, listingDescription,
    } = body;

    // Validate bắt buộc
    if (!birdName || !voice || !age || !province || !image || !price || !sellerName) {
      return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 });
    }

    // Tìm hoặc tạo User (dùng phone làm identifier tạm thời)
    const email = `${sellerPhone?.replace(/\D/g, "") || Date.now()}@cugay.local`;
    const seller = await prisma.user.upsert({
      where: { email },
      update: { name: sellerName, province: sellerProvince ?? province, phone: sellerPhone },
      create: {
        email,
        name: sellerName,
        province: sellerProvince ?? province,
        phone: sellerPhone,
      },
    });

    // Tạo Bird
    const bird = await prisma.bird.create({
      data: {
        name: birdName,
        slug: slugify(birdName),
        voice: VOICE_MAP[voice] ?? "THO",
        age: Number(age),
        origin: origin || province,
        province,
        image,
        gallery: gallery ?? [],
        description: description || listingDescription || "",
        weight: weight || undefined,
        color: color || "",
        lineage: lineage || undefined,
        forSale: true,
        price: Number(price) * 1_000_000,
        ownerId: seller.id,
      },
    });

    // Tạo MarketplaceListing
    const listing = await prisma.marketplaceListing.create({
      data: {
        birdId: bird.id,
        sellerId: seller.id,
        price: Number(price) * 1_000_000,
        negotiable: negotiable ?? false,
        description: listingDescription || description || "",
      },
      include: {
        bird: { select: { id: true, name: true, image: true } },
        seller: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json({ success: true, listingId: listing.id, birdId: bird.id }, { status: 201 });
  } catch (err: any) {
    console.error("[POST /api/listings]", err);
    return NextResponse.json({ error: "Lỗi server, vui lòng thử lại" }, { status: 500 });
  }
}

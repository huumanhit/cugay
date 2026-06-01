import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VOICE_MAP: Record<string, "THO" | "DONG" | "KIM" | "THUY" | "DAU" | "VANG"> = {
  Thổ: "THO", Đồng: "DONG", Kim: "KIM", Thủy: "THUY", Đấu: "DAU", Vàng: "VANG",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sort     = searchParams.get("sort") ?? "newest";
  const province = searchParams.get("province");
  const voice    = searchParams.get("voice");
  const minPrice = Number(searchParams.get("minPrice") ?? "0");
  const maxPrice = Number(searchParams.get("maxPrice") ?? "999999999");
  const limit    = Math.min(Number(searchParams.get("limit") ?? "20"), 50);
  const page     = Math.max(Number(searchParams.get("page") ?? "1"), 1);

  const voiceEnum = voice && voice !== "Tất cả" ? VOICE_MAP[voice] : undefined;

  const where: any = {
    active: true,
    ...(minPrice > 0 || maxPrice < 999999999 ? {
      price: { gte: minPrice * 1_000_000, lte: maxPrice * 1_000_000 },
    } : {}),
    bird: {
      ...(province && province !== "Tất cả" ? { province } : {}),
      ...(voiceEnum ? { voice: voiceEnum } : {}),
    },
  };

  const orderBy: any =
    sort === "views"      ? { views: "desc" } :
    sort === "price_asc"  ? { price: "asc" } :
    sort === "price_desc" ? { price: "desc" } :
                            { createdAt: "desc" };

  // Chạy song song
  const [rows, total] = await Promise.all([
    prisma.marketplaceListing.findMany({
      where, orderBy, take: limit, skip: (page - 1) * limit,
      select: {
        id: true, birdId: true, price: true, negotiable: true,
        description: true, views: true, createdAt: true,
        bird: { select: { id: true, name: true, image: true, voice: true, age: true, province: true, verified: true } },
        seller: { select: { id: true, name: true, avatar: true } },
      },
    }),
    prisma.marketplaceListing.count({ where }),
  ]);

  return NextResponse.json(
    { listings: rows, total },
    { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } }
  );
}

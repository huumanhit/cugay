import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sort = searchParams.get("sort") ?? "newest";
  const province = searchParams.get("province");
  const voice = searchParams.get("voice");
  const minPrice = Number(searchParams.get("minPrice") ?? "0");
  const maxPrice = Number(searchParams.get("maxPrice") ?? "999999999");
  const limit = Number(searchParams.get("limit") ?? "20");
  const page = Number(searchParams.get("page") ?? "1");

  const orderBy =
    sort === "views"      ? { views: "desc" as const } :
    sort === "price_asc"  ? { price: "asc" as const } :
    sort === "price_desc" ? { price: "desc" as const } :
                            { createdAt: "desc" as const };

  const listings = await prisma.marketplaceListing.findMany({
    where: {
      active: true,
      price: { gte: minPrice * 1_000_000, lte: maxPrice * 1_000_000 },
      bird: {
        ...(province && province !== "Tất cả" ? { province } : {}),
        ...(voice && voice !== "Tất cả" ? { voice: voiceMap[voice] } : {}),
      },
    },
    include: {
      bird: {
        select: { id: true, name: true, image: true, voice: true, age: true, province: true, verified: true },
      },
      seller: {
        select: { id: true, name: true, avatar: true },
      },
    },
    orderBy,
    take: limit,
    skip: (page - 1) * limit,
  });

  const total = await prisma.marketplaceListing.count({ where: { active: true } });

  return NextResponse.json({ listings, total });
}

const voiceMap: Record<string, "THO" | "DONG" | "KIM" | "THUY" | "DAU" | "VANG"> = {
  Thổ: "THO", Đồng: "DONG", Kim: "KIM", Thủy: "THUY", Đấu: "DAU", Vàng: "VANG",
};

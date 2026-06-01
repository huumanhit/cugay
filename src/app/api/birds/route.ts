import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VOICE_MAP: Record<string, "THO" | "DONG" | "KIM" | "THUY" | "DAU" | "VANG"> = {
  Thổ: "THO", Đồng: "DONG", Kim: "KIM", Thủy: "THUY", Đấu: "DAU", Vàng: "VANG",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const voice    = searchParams.get("voice");
  const province = searchParams.get("province");
  const search   = searchParams.get("search") ?? "";
  const sort     = searchParams.get("sort") ?? "popular";
  const limit    = Math.min(Number(searchParams.get("limit") ?? "20"), 50);
  const page     = Math.max(Number(searchParams.get("page") ?? "1"), 1);

  const voiceEnum = voice && voice !== "Tất cả" ? VOICE_MAP[voice] : undefined;

  const where: any = {
    ...(voiceEnum ? { voice: voiceEnum } : {}),
    ...(province && province !== "Tất cả" ? { province } : {}),
    ...(search ? {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { province: { contains: search, mode: "insensitive" } },
        { owner: { name: { contains: search, mode: "insensitive" } } },
      ],
    } : {}),
  };

  const orderBy: any =
    sort === "score"     ? { score: "desc" } :
    sort === "newest"    ? { createdAt: "desc" } :
    sort === "followers" ? { followers: { _count: "desc" } } :
                           { views: "desc" };

  // Chạy song song findMany + count
  const [rows, total] = await Promise.all([
    prisma.bird.findMany({
      where,
      select: {
        id: true, name: true, slug: true, image: true,
        voice: true, age: true, province: true,
        rating: true, views: true, likes: true, score: true,
        verified: true, forSale: true, price: true,
        owner: { select: { id: true, name: true, avatar: true } },
        achievements: { select: { title: true }, take: 3 },
        _count: { select: { followers: true } },
      },
      orderBy,
      take: limit,
      skip: (page - 1) * limit,
    }),
    prisma.bird.count({ where }),
  ]);

  return NextResponse.json(
    { birds: rows, total, page, limit },
    { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } }
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const bird = await prisma.bird.create({
    data: {
      name: body.name,
      slug: body.slug,
      voice: VOICE_MAP[body.voice] ?? "THO",
      age: body.age,
      origin: body.origin,
      province: body.province,
      image: body.image,
      gallery: body.gallery ?? [],
      description: body.description,
      ownerId: body.ownerId,
      weight: body.weight,
      color: body.color,
      lineage: body.lineage,
    },
    include: { owner: true },
  });
  return NextResponse.json(bird, { status: 201 });
}

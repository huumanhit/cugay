import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const voice = searchParams.get("voice");
  const province = searchParams.get("province");
  const sort = searchParams.get("sort") ?? "popular";
  const limit = Number(searchParams.get("limit") ?? "20");
  const page = Number(searchParams.get("page") ?? "1");

  const orderBy =
    sort === "score"     ? { score: "desc" as const } :
    sort === "newest"    ? { createdAt: "desc" as const } :
    sort === "followers" ? { followers: { _count: "desc" as const } } :
                           { views: "desc" as const };

  const birds = await prisma.bird.findMany({
    where: {
      ...(voice && voice !== "Tất cả" ? { voice: voiceMap[voice] } : {}),
      ...(province && province !== "Tất cả" ? { province } : {}),
    },
    include: {
      owner: { select: { id: true, name: true, avatar: true } },
      achievements: { select: { title: true } },
      _count: { select: { followers: true } },
    },
    orderBy,
    take: limit,
    skip: (page - 1) * limit,
  });

  const total = await prisma.bird.count({
    where: {
      ...(voice && voice !== "Tất cả" ? { voice: voiceMap[voice] } : {}),
      ...(province && province !== "Tất cả" ? { province } : {}),
    },
  });

  return NextResponse.json({ birds, total, page, limit });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const bird = await prisma.bird.create({
    data: {
      name: body.name,
      slug: body.slug,
      voice: voiceMap[body.voice] ?? "THO",
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

const voiceMap: Record<string, "THO" | "DONG" | "KIM" | "THUY" | "DAU" | "VANG"> = {
  Thổ: "THO",
  Đồng: "DONG",
  Kim: "KIM",
  Thủy: "THUY",
  Đấu: "DAU",
  Vàng: "VANG",
};

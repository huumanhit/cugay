import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VOICE_LABEL: Record<string, string> = {
  THO: "Thổ", DONG: "Đồng", KIM: "Kim", THUY: "Thủy", DAU: "Đấu", VANG: "Vàng",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const bird = await prisma.bird.findUnique({
    where: { id },
    select: {
      id: true, name: true, slug: true, voice: true, age: true,
      origin: true, province: true, image: true, gallery: true,
      description: true, weight: true, color: true, lineage: true,
      forSale: true, price: true, verified: true, rating: true,
      views: true, likes: true, score: true, rank: true, createdAt: true,
      owner: { select: { id: true, name: true, avatar: true, province: true, verified: true } },
      achievements: { select: { id: true, title: true, year: true }, orderBy: { year: "desc" } },
      timelineEvents: {
        select: { id: true, date: true, title: true, description: true, type: true, image: true },
        orderBy: { date: "desc" },
      },
      _count: { select: { followers: true, reviews: true } },
    },
  });

  if (!bird) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Non-blocking — không chờ update xong mới trả về
  prisma.bird.update({ where: { id }, data: { views: { increment: 1 } } }).catch(() => {});

  return NextResponse.json(
    { ...bird, voice: VOICE_LABEL[bird.voice] ?? bird.voice },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const bird = await prisma.bird.update({ where: { id }, data: body });
  return NextResponse.json(bird);
}

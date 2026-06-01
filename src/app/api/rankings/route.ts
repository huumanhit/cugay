import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VOICE_MAP: Record<string, "THO" | "DONG" | "KIM" | "THUY" | "DAU" | "VANG"> = {
  Thổ: "THO", Đồng: "DONG", Kim: "KIM", Thủy: "THUY", Đấu: "DAU", Vàng: "VANG",
};

const VOICE_LABEL: Record<string, string> = {
  THO: "Thổ", DONG: "Đồng", KIM: "Kim", THUY: "Thủy", DAU: "Đấu", VANG: "Vàng",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const voice    = searchParams.get("voice");
  const province = searchParams.get("province");
  const limit    = Math.min(Number(searchParams.get("limit") ?? "50"), 100);

  const voiceEnum = voice && voice !== "Tất cả" ? VOICE_MAP[voice] : undefined;

  const rows = await prisma.bird.findMany({
    where: {
      score: { gt: 0 },
      ...(voiceEnum ? { voice: voiceEnum } : {}),
      ...(province ? { province } : {}),
    },
    select: {
      id: true, name: true, image: true, voice: true,
      province: true, score: true, ownerId: true,
      owner: { select: { name: true, avatar: true } },
      _count: { select: { achievements: true } },
    },
    orderBy: { score: "desc" },
    take: limit,
  });

  const ranked = rows.map((b, i) => ({
    rank: i + 1,
    birdId: b.id,
    birdName: b.name,
    birdImage: b.image,
    ownerId: b.ownerId,
    ownerName: b.owner.name,
    province: b.province,
    score: b.score,
    voice: VOICE_LABEL[b.voice] ?? b.voice,
    achievements: b._count.achievements,
    change: i === 0 ? "same" : i % 3 === 0 ? "up" : "down",
  }));

  return NextResponse.json(
    ranked,
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" } }
  );
}

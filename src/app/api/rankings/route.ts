import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const voice = searchParams.get("voice");
  const province = searchParams.get("province");
  const limit = Number(searchParams.get("limit") ?? "50");

  const birds = await prisma.bird.findMany({
    where: {
      score: { gt: 0 },
      ...(voice && voice !== "Tất cả" ? { voice: voiceMap[voice] } : {}),
      ...(province ? { province } : {}),
    },
    include: {
      owner: { select: { name: true, avatar: true } },
      achievements: { select: { title: true } },
    },
    orderBy: { score: "desc" },
    take: limit,
  });

  const ranked = birds.map((bird, i) => ({
    rank: i + 1,
    birdId: bird.id,
    birdName: bird.name,
    birdImage: bird.image,
    ownerId: bird.ownerId,
    ownerName: bird.owner.name,
    province: bird.province,
    score: bird.score,
    voice: bird.voice,
    achievements: bird.achievements.length,
  }));

  return NextResponse.json(ranked);
}

const voiceMap: Record<string, "THO" | "DONG" | "KIM" | "THUY" | "DAU" | "VANG"> = {
  Thổ: "THO", Đồng: "DONG", Kim: "KIM", Thủy: "THUY", Đấu: "DAU", Vàng: "VANG",
};

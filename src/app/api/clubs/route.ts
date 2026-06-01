import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const province = searchParams.get("province");

  const clubs = await prisma.club.findMany({
    where: province ? { province } : undefined,
    select: {
      id: true, name: true, province: true, description: true,
      logo: true, coverImage: true, verified: true, foundedAt: true,
      _count: { select: { members: true } },
    },
    orderBy: { members: { _count: "desc" } },
  });

  return NextResponse.json(
    clubs,
    { headers: { "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300" } }
  );
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const province = searchParams.get("province");

  const clubs = await prisma.club.findMany({
    where: { ...(province ? { province } : {}) },
    include: {
      _count: { select: { members: true } },
    },
    orderBy: { members: { _count: "desc" } },
  });

  return NextResponse.json(clubs);
}

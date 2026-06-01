import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const bird = await prisma.bird.findUnique({
    where: { id },
    include: {
      owner: { select: { id: true, name: true, avatar: true, province: true, verified: true } },
      achievements: { orderBy: { year: "desc" } },
      timelineEvents: { orderBy: { date: "desc" } },
      _count: { select: { followers: true, reviews: true } },
    },
  });

  if (!bird) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Increment view count
  await prisma.bird.update({ where: { id }, data: { views: { increment: 1 } } });

  return NextResponse.json(bird);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const bird = await prisma.bird.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(bird);
}

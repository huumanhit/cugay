import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const limit = Number(searchParams.get("limit") ?? "10");
  const page = Number(searchParams.get("page") ?? "1");

  const articles = await prisma.newsArticle.findMany({
    where: {
      published: true,
      ...(category && category !== "Tất cả" ? { category } : {}),
    },
    orderBy: { publishedAt: "desc" },
    take: limit,
    skip: (page - 1) * limit,
    select: {
      id: true, title: true, slug: true, excerpt: true,
      coverImage: true, author: true, authorAvatar: true,
      category: true, readTime: true, views: true, publishedAt: true,
    },
  });

  return NextResponse.json(articles);
}

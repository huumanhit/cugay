import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const limit    = Math.min(Number(searchParams.get("limit") ?? "10"), 50);
  const page     = Math.max(Number(searchParams.get("page") ?? "1"), 1);

  const where: any = {
    published: true,
    ...(category && category !== "Tất cả" ? { category } : {}),
  };

  const [articles, total] = await Promise.all([
    prisma.newsArticle.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      take: limit,
      skip: (page - 1) * limit,
      select: {
        id: true, title: true, slug: true, excerpt: true,
        coverImage: true, author: true, authorAvatar: true,
        category: true, readTime: true, views: true, publishedAt: true,
      },
    }),
    prisma.newsArticle.count({ where }),
  ]);

  return NextResponse.json(
    { articles, total },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" } }
  );
}

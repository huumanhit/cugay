import { prisma } from "./prisma";
import type { Bird, MarketplaceListing, NewsArticle, Club, RankingEntry } from "@/types";
import { VoiceType } from "@/generated/prisma";

// Map DB enum → display string
const VOICE_LABEL: Record<VoiceType, string> = {
  THO: "Thổ", DONG: "Đồng", KIM: "Kim",
  THUY: "Thủy", DAU: "Đấu", VANG: "Vàng",
};

// Prisma Bird → App Bird type
function mapBird(b: any): Bird {
  return {
    id: b.id,
    name: b.name,
    slug: b.slug,
    ownerId: b.ownerId,
    ownerName: b.owner?.name ?? "",
    ownerAvatar: b.owner?.avatar ?? "https://i.pravatar.cc/150?img=1",
    voice: VOICE_LABEL[b.voice as VoiceType] as any,
    age: b.age,
    origin: b.origin,
    province: b.province,
    image: b.image,
    gallery: b.gallery ?? [],
    achievements: b.achievements?.map((a: any) => a.title) ?? [],
    description: b.description ?? "",
    rating: b.rating,
    followers: b._count?.followers ?? 0,
    videoCount: b.videoCount ?? 0,
    verified: b.verified,
    views: b.views,
    likes: b.likes,
    price: b.price ?? undefined,
    forSale: b.forSale,
    createdAt: b.createdAt?.toISOString?.() ?? b.createdAt,
    lineage: b.lineage ?? undefined,
    weight: b.weight ?? undefined,
    color: b.color ?? "",
    rank: b.rank ?? undefined,
    score: b.score,
  };
}

// ─── BIRDS ────────────────────────────────────────────────────────

export async function getFeaturedBirds(limit = 6): Promise<Bird[]> {
  const rows = await prisma.bird.findMany({
    include: {
      owner: { select: { id: true, name: true, avatar: true } },
      achievements: { select: { title: true } },
      _count: { select: { followers: true } },
    },
    orderBy: { score: "desc" },
    take: limit,
  });
  return rows.map(mapBird);
}

export async function getBirds({
  search, voice, sort = "popular", limit = 20, page = 1,
}: {
  search?: string; voice?: string; sort?: string; limit?: number; page?: number;
} = {}): Promise<{ birds: Bird[]; total: number }> {
  const voiceEnum = Object.entries(VOICE_LABEL).find(([, v]) => v === voice)?.[0] as VoiceType | undefined;

  const where: any = {
    ...(search ? {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { province: { contains: search, mode: "insensitive" } },
        { owner: { name: { contains: search, mode: "insensitive" } } },
      ],
    } : {}),
    ...(voiceEnum ? { voice: voiceEnum } : {}),
  };

  const orderBy: any =
    sort === "score"     ? { score: "desc" } :
    sort === "newest"    ? { createdAt: "desc" } :
    sort === "followers" ? { followers: { _count: "desc" } } :
                           { views: "desc" };

  const [rows, total] = await Promise.all([
    prisma.bird.findMany({
      where,
      include: {
        owner: { select: { id: true, name: true, avatar: true } },
        achievements: { select: { title: true } },
        _count: { select: { followers: true } },
      },
      orderBy,
      take: limit,
      skip: (page - 1) * limit,
    }),
    prisma.bird.count({ where }),
  ]);
  return { birds: rows.map(mapBird), total };
}

export async function getBirdById(id: string): Promise<Bird | null> {
  const b = await prisma.bird.findUnique({
    where: { id },
    include: {
      owner: { select: { id: true, name: true, avatar: true, province: true, verified: true } },
      achievements: { orderBy: { year: "desc" } },
      _count: { select: { followers: true, reviews: true } },
    },
  });
  if (!b) return null;
  // Increment views
  await prisma.bird.update({ where: { id }, data: { views: { increment: 1 } } });
  return mapBird(b);
}

export async function getSimilarBirds(birdId: string, voice: VoiceType, limit = 3): Promise<Bird[]> {
  const rows = await prisma.bird.findMany({
    where: { voice, id: { not: birdId } },
    include: { owner: { select: { name: true, avatar: true } }, _count: { select: { followers: true } } },
    orderBy: { score: "desc" },
    take: limit,
  });
  return rows.map(mapBird);
}

// ─── TIMELINE ─────────────────────────────────────────────────────

export async function getTimelineEvents(birdId: string) {
  const rows = await prisma.timelineEvent.findMany({
    where: { birdId },
    orderBy: { date: "desc" },
  });
  const TYPE_MAP: Record<string, string> = {
    MILESTONE: "milestone", AWARD: "award",
    HEALTH: "health", TRAINING: "training", OTHER: "other",
  };
  return rows.map((e) => ({
    id: e.id, birdId: e.birdId,
    date: e.date.toISOString().split("T")[0],
    title: e.title, description: e.description,
    type: TYPE_MAP[e.type] as any,
    image: e.image ?? undefined,
    videoUrl: e.videoUrl ?? undefined,
  }));
}

// ─── MARKETPLACE ──────────────────────────────────────────────────

export async function getListings({
  sort = "newest", province, voice, minPrice, maxPrice, limit = 20, page = 1,
}: {
  sort?: string; province?: string; voice?: string;
  minPrice?: number; maxPrice?: number; limit?: number; page?: number;
} = {}): Promise<{ listings: MarketplaceListing[]; total: number }> {
  const voiceEnum = Object.entries(VOICE_LABEL).find(([, v]) => v === voice)?.[0] as VoiceType | undefined;

  const where: any = {
    active: true,
    ...(minPrice || maxPrice ? { price: { gte: minPrice, lte: maxPrice } } : {}),
    bird: {
      ...(province && province !== "Tất cả" ? { province } : {}),
      ...(voiceEnum ? { voice: voiceEnum } : {}),
    },
  };

  const orderBy: any =
    sort === "views"      ? { views: "desc" } :
    sort === "price_asc"  ? { price: "asc" } :
    sort === "price_desc" ? { price: "desc" } :
                            { createdAt: "desc" };

  const [rows, total] = await Promise.all([
    prisma.marketplaceListing.findMany({
      where, orderBy, take: limit, skip: (page - 1) * limit,
      include: {
        bird: { select: { id: true, name: true, image: true, voice: true, age: true, province: true, verified: true } },
        seller: { select: { id: true, name: true, avatar: true } },
      },
    }),
    prisma.marketplaceListing.count({ where }),
  ]);

  return {
    total,
    listings: rows.map((l) => ({
      id: l.id,
      birdId: l.birdId,
      birdName: l.bird.name,
      birdImage: l.bird.image,
      sellerId: l.sellerId,
      sellerName: l.seller.name,
      sellerAvatar: l.seller.avatar ?? "https://i.pravatar.cc/150?img=1",
      price: l.price,
      province: l.bird.province,
      voice: VOICE_LABEL[l.bird.voice] as any,
      age: l.bird.age,
      negotiable: l.negotiable,
      views: l.views,
      postedAt: l.createdAt.toISOString(),
      description: l.description ?? "",
      verified: l.bird.verified,
    })),
  };
}

// ─── RANKINGS ─────────────────────────────────────────────────────

export async function getRankings(limit = 20): Promise<RankingEntry[]> {
  const rows = await prisma.bird.findMany({
    where: { score: { gt: 0 } },
    include: {
      owner: { select: { name: true, avatar: true } },
      achievements: { select: { title: true } },
    },
    orderBy: { score: "desc" },
    take: limit,
  });
  return rows.map((b, i) => ({
    rank: i + 1,
    birdId: b.id,
    birdName: b.name,
    birdImage: b.image,
    ownerId: b.ownerId,
    ownerName: b.owner.name,
    province: b.province,
    score: b.score,
    voice: VOICE_LABEL[b.voice] as any,
    achievements: b.achievements.length,
    change: i === 0 ? "same" : i % 3 === 0 ? "up" : "down",
  }));
}

// ─── CLUBS ────────────────────────────────────────────────────────

export async function getClubs(): Promise<Club[]> {
  const rows = await prisma.club.findMany({
    include: { _count: { select: { members: true } } },
    orderBy: { members: { _count: "desc" } },
  });
  return rows.map((c) => ({
    id: c.id,
    name: c.name,
    province: c.province,
    memberCount: c._count.members,
    founded: c.foundedAt?.toISOString() ?? c.createdAt.toISOString(),
    logo: c.logo ?? "https://i.pravatar.cc/150?img=1",
    description: c.description ?? "",
    verified: c.verified,
    coverImage: c.coverImage ?? "https://i.pravatar.cc/150?img=1",
  }));
}

// ─── NEWS ─────────────────────────────────────────────────────────

export async function getLatestNews(limit = 6): Promise<NewsArticle[]> {
  const rows = await prisma.newsArticle.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
  return rows.map((a) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt ?? "",
    content: a.content,
    coverImage: a.coverImage ?? "",
    author: a.author,
    authorAvatar: a.authorAvatar ?? "https://i.pravatar.cc/150?img=1",
    category: a.category,
    publishedAt: a.publishedAt?.toISOString() ?? a.createdAt.toISOString(),
    readTime: a.readTime,
    views: a.views,
  }));
}

// ─── STATS ────────────────────────────────────────────────────────

export async function getSiteStats() {
  const [totalBirds, totalMembers, totalListings, totalClubs] = await Promise.all([
    prisma.bird.count(),
    prisma.user.count(),
    prisma.marketplaceListing.count({ where: { active: true } }),
    prisma.club.count(),
  ]);
  return { totalBirds, totalMembers, totalListings, totalClubs };
}

import Image from "next/image";
import { Clock, Eye, TrendingUp, BookOpen, Newspaper, Zap } from "lucide-react";
import { getLatestNews } from "@/lib/db";
import { timeAgo, formatNumber } from "@/lib/utils";
import NewsClient from "./NewsClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tin tức – CuGay.vn" };
export const revalidate = 120;

const CATEGORY_META: Record<string, { color: string; bg: string; icon: string }> = {
  "Tin tức":    { color: "text-blue-700",   bg: "bg-blue-100",   icon: "📰" },
  "Kinh nghiệm":{ color: "text-green-700",  bg: "bg-green-100",  icon: "💡" },
  "Sự kiện":   { color: "text-purple-700",  bg: "bg-purple-100", icon: "🎯" },
  "Thị trường": { color: "text-amber-700",   bg: "bg-amber-100",  icon: "📈" },
  "Câu chuyện": { color: "text-rose-700",    bg: "bg-rose-100",   icon: "✨" },
  "Hướng dẫn":  { color: "text-teal-700",    bg: "bg-teal-100",   icon: "📖" },
};

function getCatMeta(cat: string) {
  return CATEGORY_META[cat] ?? { color: "text-primary-700", bg: "bg-primary-100", icon: "📌" };
}

export default async function NewsPage() {
  const articles = await getLatestNews(20);

  if (articles.length === 0) {
    return (
      <div className="px-4 lg:px-8 py-12 text-center">
        <Newspaper className="w-16 h-16 text-border mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-text-primary mb-2">Tin tức & Kiến thức</h1>
        <p className="text-muted">Nội dung sẽ được cập nhật sớm.</p>
      </div>
    );
  }

  const [hero, second, ...rest] = articles;
  const trending = [...articles].sort((a, b) => b.views - a.views).slice(0, 4);
  const categories = [...new Set(articles.map((a) => a.category))];

  return (
    <div className="animate-fade-in">
      {/* ── HEADER ── */}
      <div className="px-4 lg:px-8 pt-6 pb-4 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 text-primary-600 text-xs font-semibold uppercase tracking-widest mb-1">
            <Newspaper className="w-3.5 h-3.5" /> Tin tức & Kiến thức
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-text-primary">Cập nhật mới nhất</h1>
        </div>
        <p className="text-xs text-muted hidden sm:block">{articles.length} bài viết</p>
      </div>

      {/* ── BREAKING TICKER ── */}
      <div className="mx-4 lg:mx-8 mb-6 bg-primary-500 rounded-2xl px-4 py-2.5 flex items-center gap-3 overflow-hidden">
        <span className="flex-shrink-0 flex items-center gap-1.5 bg-white text-primary-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
          <Zap className="w-3 h-3 fill-primary-500" /> Nóng
        </span>
        <div className="flex-1 overflow-hidden">
          <p className="text-white text-sm font-medium truncate">{hero.title}</p>
        </div>
        <span className="flex-shrink-0 text-primary-200 text-xs">{timeAgo(hero.publishedAt)}</span>
      </div>

      <div className="px-4 lg:px-8">
        {/* ── HERO + SECOND ── */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-4 mb-6">
          {/* Hero */}
          <div className="relative rounded-3xl overflow-hidden group cursor-pointer bg-accent aspect-[16/9] lg:aspect-auto lg:min-h-[420px]">
            {hero.coverImage ? (
              <Image src={hero.coverImage} alt={hero.title} fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 65vw" priority />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-700" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              {(() => { const m = getCatMeta(hero.category); return (
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 ${m.bg} ${m.color}`}>
                  {m.icon} {hero.category}
                </span>
              ); })()}
              <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-white leading-tight mb-2">
                {hero.title}
              </h2>
              {hero.excerpt && (
                <p className="text-white/70 text-sm line-clamp-2 mb-4 max-w-2xl">{hero.excerpt}</p>
              )}
              <div className="flex items-center gap-3 flex-wrap">
                {hero.authorAvatar && (
                  <img src={hero.authorAvatar} alt={hero.author} className="w-7 h-7 rounded-full object-cover border-2 border-white/30" />
                )}
                <span className="text-white/80 text-xs font-medium">{hero.author}</span>
                <span className="text-white/40 text-xs">·</span>
                <span className="flex items-center gap-1 text-white/60 text-xs"><Clock className="w-3 h-3" />{hero.readTime} phút</span>
                <span className="flex items-center gap-1 text-white/60 text-xs"><Eye className="w-3 h-3" />{formatNumber(hero.views)}</span>
              </div>
            </div>
          </div>

          {/* Second + Trending sidebar */}
          <div className="flex flex-col gap-4">
            {/* Second article */}
            {second && (
              <div className="relative rounded-2xl overflow-hidden group cursor-pointer bg-accent flex-shrink-0 h-52">
                {second.coverImage ? (
                  <Image src={second.coverImage} alt={second.title} fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="340px" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary-400 to-secondary-600" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {(() => { const m = getCatMeta(second.category); return (
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-2 ${m.bg} ${m.color}`}>
                      {m.icon} {second.category}
                    </span>
                  ); })()}
                  <h3 className="text-white font-bold text-sm line-clamp-2 group-hover:text-primary-200 transition-colors">{second.title}</h3>
                  <p className="text-white/60 text-xs mt-1 flex items-center gap-1"><Clock className="w-3 h-3" />{second.readTime} phút · {timeAgo(second.publishedAt)}</p>
                </div>
              </div>
            )}

            {/* Trending */}
            <div className="bg-white rounded-2xl border border-border shadow-card p-4 flex-1">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-primary-500" />
                <h3 className="font-bold text-text-primary text-sm">Đọc nhiều nhất</h3>
              </div>
              <div className="space-y-3">
                {trending.slice(0, 3).map((a, i) => (
                  <div key={a.id} className="flex gap-3 items-start cursor-pointer group">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                      i === 0 ? "bg-amber-500 text-white" : i === 1 ? "bg-slate-200 text-slate-700" : "bg-orange-100 text-orange-700"
                    }`}>{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-text-primary group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">{a.title}</p>
                      <p className="text-[10px] text-muted mt-1 flex items-center gap-1"><Eye className="w-2.5 h-2.5" />{formatNumber(a.views)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── CATEGORY TABS (client) ── */}
        <NewsClient articles={rest} categories={categories} />
      </div>
    </div>
  );
}

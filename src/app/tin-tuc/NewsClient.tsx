"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Clock, Eye, BookOpen } from "lucide-react";
import { timeAgo, formatNumber } from "@/lib/utils";
import type { NewsArticle } from "@/types";

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

interface Props {
  articles: NewsArticle[];
  categories: string[];
}

export default function NewsClient({ articles, categories }: Props) {
  const [active, setActive] = useState("Tất cả");

  const filtered = useMemo(
    () => active === "Tất cả" ? articles : articles.filter((a) => a.category === active),
    [articles, active]
  );

  const allCategories = ["Tất cả", ...categories];

  return (
    <div className="pb-8">
      {/* Category pills */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 -mx-4 px-4 lg:mx-0 lg:px-0">
        {allCategories.map((cat) => {
          const m = getCatMeta(cat);
          const isActive = active === cat;
          return (
            <button key={cat} onClick={() => setActive(cat)}
              className={`flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                isActive
                  ? "bg-primary-500 text-white border-primary-500 shadow-sm"
                  : "bg-white text-muted border-border hover:border-primary-300 hover:text-text-primary"
              }`}>
              {cat !== "Tất cả" && <span>{m.icon}</span>}
              {cat}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-border">
          <BookOpen className="w-12 h-12 text-border mx-auto mb-3" />
          <p className="font-semibold text-text-primary">Không có bài viết nào</p>
        </div>
      ) : (
        <>
          {/* Main grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((article) => {
              const m = getCatMeta(article.category);
              return (
                <article key={article.id}
                  className="bg-white rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer overflow-hidden flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-accent flex-shrink-0">
                    {article.coverImage ? (
                      <Image src={article.coverImage} alt={article.title} fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                        <span className="text-4xl">{m.icon}</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${m.bg} ${m.color}`}>
                        {m.icon} {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-text-primary text-sm leading-snug line-clamp-2 group-hover:text-primary-600 transition-colors mb-2">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-xs text-muted line-clamp-2 leading-relaxed flex-1">{article.excerpt}</p>
                    )}

                    {/* Footer */}
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
                      {article.authorAvatar && (
                        <img src={article.authorAvatar} alt={article.author}
                          className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
                      )}
                      <span className="text-xs text-muted flex-1 truncate font-medium">{article.author}</span>
                      <div className="flex items-center gap-2 text-[10px] text-muted flex-shrink-0">
                        <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{article.readTime}p</span>
                        <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" />{formatNumber(article.views)}</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-8 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-3xl p-8 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Không bỏ lỡ tin tức nào</h3>
              <p className="text-primary-100 text-sm mb-6 max-w-md mx-auto">
                Nhận bản tin hàng tuần về tin tức cu gáy, kết quả giải đấu và kiến thức chăm sóc.
              </p>
              <div className="flex gap-2 max-w-sm mx-auto">
                <input
                  type="email"
                  placeholder="Nhập email của bạn..."
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="bg-white text-primary-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-50 transition-colors flex-shrink-0 text-sm">
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

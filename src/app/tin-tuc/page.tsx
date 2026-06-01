import Image from "next/image";
import Link from "next/link";
import { Clock, Eye, ArrowRight } from "lucide-react";
import { getLatestNews } from "@/lib/db";
import { timeAgo, formatNumber } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tin tức – CuGay.vn" };
export const revalidate = 60;

const CATEGORIES = ["Tất cả", "Tin tức", "Kinh nghiệm", "Sự kiện", "Thị trường", "Câu chuyện", "Hướng dẫn"];

export default async function NewsPage() {
  const articles = await getLatestNews(10);
  const featured = articles[0];
  const rest = articles.slice(1);

  if (articles.length === 0) {
    return (
      <div className="px-4 lg:px-8 py-6 animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary">Tin tức & Kiến thức</h1>
          <p className="text-sm text-muted mt-1">Cập nhật mới nhất về thế giới cu gáy Việt Nam</p>
        </div>
        <div className="text-center py-20 bg-white rounded-2xl border border-border">
          <p className="text-5xl mb-4">📰</p>
          <p className="font-semibold text-text-primary">Chưa có bài viết nào</p>
          <p className="text-sm text-muted mt-1">Nội dung sẽ được cập nhật sớm</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-8 py-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Tin tức & Kiến thức</h1>
        <p className="text-sm text-muted mt-1">Cập nhật mới nhất về thế giới cu gáy Việt Nam</p>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`flex-shrink-0 text-xs px-4 py-2 rounded-full border transition-all ${
              cat === "Tất cả"
                ? "bg-primary-500 text-white border-primary-500"
                : "bg-white text-muted border-border hover:border-primary-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured article */}
      {featured && (
        <div className="mb-8">
          <div className="relative rounded-3xl overflow-hidden group cursor-pointer">
            <div className="relative h-72 lg:h-96">
              {featured.coverImage ? (
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="100vw"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <span className="text-xs font-semibold text-primary-300 uppercase tracking-wide bg-primary-900/50 px-3 py-1 rounded-full">
                {featured.category}
              </span>
              <h2 className="text-xl lg:text-2xl font-bold text-white mt-2 leading-tight max-w-2xl">
                {featured.title}
              </h2>
              {featured.excerpt && (
                <p className="text-white/70 text-sm mt-2 line-clamp-2 max-w-xl">{featured.excerpt}</p>
              )}
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  {featured.authorAvatar && (
                    <img src={featured.authorAvatar} alt={featured.author} className="w-7 h-7 rounded-full object-cover" />
                  )}
                  <span className="text-white/80 text-xs">{featured.author}</span>
                </div>
                <span className="flex items-center gap-1 text-white/60 text-xs">
                  <Clock className="w-3.5 h-3.5" /> {featured.readTime} phút đọc
                </span>
                <span className="flex items-center gap-1 text-white/60 text-xs">
                  <Eye className="w-3.5 h-3.5" /> {formatNumber(featured.views)}
                </span>
                <span className="text-white/60 text-xs ml-auto">{timeAgo(featured.publishedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {rest.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text-primary">Bài viết mới nhất</h2>
            <Link href="#" className="flex items-center gap-1 text-sm text-primary-600 font-medium hover:text-primary-700">
              Xem thêm <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((article) => (
              <div key={article.id} className="bg-white rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all group cursor-pointer overflow-hidden">
                <div className="relative h-44 overflow-hidden bg-accent">
                  {article.coverImage && (
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-semibold text-primary-600 uppercase tracking-wide">{article.category}</span>
                  <h3 className="font-semibold text-text-primary text-sm mt-1 line-clamp-2 group-hover:text-primary-600 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-xs text-muted mt-2 line-clamp-2">{article.excerpt}</p>
                  )}
                  <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
                    {article.authorAvatar && (
                      <img src={article.authorAvatar} alt={article.author} className="w-6 h-6 rounded-full object-cover" />
                    )}
                    <span className="text-xs text-muted flex-1 truncate">{article.author}</span>
                    <span className="flex items-center gap-1 text-xs text-muted">
                      <Clock className="w-3 h-3" /> {article.readTime} phút
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

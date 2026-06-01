import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import HeroSection from "@/components/home/HeroSection";
import BirdCard from "@/components/birds/BirdCard";
import { getFeaturedBirds, getLatestNews, getSiteStats } from "@/lib/db";
import { MOCK_EVENTS } from "@/lib/mock-data";
import { timeAgo } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Trang chủ – CuGay.vn" };
export const revalidate = 60; // ISR: tái tạo mỗi 60 giây

export default async function HomePage() {
  // Fetch từ Supabase thật
  const [featuredBirds, latestNews, stats] = await Promise.all([
    getFeaturedBirds(6),
    getLatestNews(3),
    getSiteStats(),
  ]);

  return (
    <div className="animate-fade-in">
      <HeroSection sampleBirdId={featuredBirds[0]?.id} />

      {/* Stats từ database thật */}
      <section className="px-4 lg:px-8 mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Hồ sơ chim", value: stats.totalBirds.toLocaleString("vi-VN"), trend: "Cập nhật liên tục", color: "bg-primary-50 text-primary-600", icon: "🐦" },
            { label: "Thành viên", value: stats.totalMembers.toLocaleString("vi-VN"), trend: "Người chơi tin dùng", color: "bg-blue-50 text-blue-600", icon: "👥" },
            { label: "Giao dịch", value: stats.totalListings.toLocaleString("vi-VN"), trend: "Tin đang hoạt động", color: "bg-purple-50 text-purple-600", icon: "🛒" },
            { label: "CLB tham gia", value: stats.totalClubs.toLocaleString("vi-VN"), trend: "Trên toàn quốc", color: "bg-amber-50 text-amber-600", icon: "🏆" },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-2xl border border-border shadow-card p-4 lg:p-5 hover:shadow-card-hover transition-shadow">
              <div className={`w-9 h-9 lg:w-10 lg:h-10 rounded-xl ${item.color} flex items-center justify-center mb-2 lg:mb-3 text-lg`}>
                {item.icon}
              </div>
              <p className="text-xl lg:text-2xl font-bold text-text-primary">{item.value}</p>
              <p className="text-xs lg:text-sm text-muted mt-0.5">{item.label}</p>
              <p className="text-xs text-primary-500 font-medium mt-1.5">{item.trend}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Birds từ database thật */}
      <section className="px-4 lg:px-8 mb-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-text-primary">Hồ sơ nổi bật</h2>
            <p className="text-sm text-muted mt-0.5">Những chiến binh được yêu thích nhất</p>
          </div>
          <Link href="/ho-so-chim" className="flex items-center gap-1 text-sm text-primary-600 font-medium hover:text-primary-700">
            Xem tất cả <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {featuredBirds.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredBirds.map((bird) => (
              <BirdCard key={bird.id} bird={bird} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-border">
            <p className="text-4xl mb-3">🐦</p>
            <p className="font-semibold text-text-primary">Chưa có hồ sơ nào</p>
            <p className="text-sm text-muted mt-1">Hãy tạo hồ sơ đầu tiên cho chiến binh của bạn</p>
          </div>
        )}
      </section>

      {/* News & Events */}
      <div className="px-4 lg:px-8 mb-8 grid lg:grid-cols-2 gap-6">
        {/* News */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text-primary">Tin tức mới nhất</h2>
            <Link href="/tin-tuc" className="flex items-center gap-1 text-sm text-primary-600 font-medium">
              Xem thêm <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {latestNews.length > 0 ? latestNews.map((article) => (
              <Link key={article.id} href="/tin-tuc" className="flex gap-3 bg-white rounded-2xl border border-border shadow-card p-3 hover:shadow-card-hover transition-all group">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-accent">
                  {article.coverImage && (
                    <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold text-primary-600 uppercase tracking-wide">{article.category}</span>
                  <h3 className="text-sm font-semibold text-text-primary mt-0.5 line-clamp-2 group-hover:text-primary-600 transition-colors">{article.title}</h3>
                  <p className="text-xs text-muted mt-1">{timeAgo(article.publishedAt)} · {article.readTime} phút đọc</p>
                </div>
              </Link>
            )) : (
              <p className="text-sm text-muted text-center py-8">Chưa có tin tức nào.</p>
            )}
          </div>
        </div>

        {/* Events */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text-primary">Sự kiện sắp tới</h2>
            <Link href="/cong-dong" className="flex items-center gap-1 text-sm text-primary-600 font-medium">
              Xem thêm <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {MOCK_EVENTS.map((event) => {
              const d = new Date(event.date);
              return (
                <div key={event.id} className="flex gap-3 bg-white rounded-2xl border border-border shadow-card p-3 hover:shadow-card-hover transition-all group cursor-pointer">
                  <div className="flex-shrink-0 w-14 text-center bg-primary-50 rounded-xl py-2 px-1">
                    <p className="text-lg font-bold text-primary-600 leading-tight">{d.getDate()}</p>
                    <p className="text-[10px] text-primary-400 uppercase font-semibold">
                      {d.toLocaleDateString("vi-VN", { month: "short" })}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`text-[10px] font-semibold uppercase tracking-wide ${event.type === "competition" ? "text-red-500" : event.type === "exhibition" ? "text-purple-500" : "text-blue-500"}`}>
                      {event.type === "competition" ? "Thi đấu" : event.type === "exhibition" ? "Triển lãm" : "Giao lưu"}
                    </span>
                    <h3 className="text-sm font-semibold text-text-primary mt-0.5 line-clamp-1 group-hover:text-primary-600 transition-colors">{event.title}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-muted" />
                      <span className="text-xs text-muted">{event.location}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 lg:px-8 mb-8">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-8 text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3">Tạo hồ sơ cho chiến binh của bạn</h2>
            <p className="text-primary-100 mb-6 max-w-lg mx-auto">
              Mỗi con cu gáy đều xứng đáng có một danh tính số. Bắt đầu hành trình hôm nay.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/ho-so-chim" className="bg-white text-primary-600 font-semibold px-6 py-3 rounded-xl hover:bg-primary-50 transition-colors">
                Tạo hồ sơ ngay
              </Link>
              <Link href="/cho-chim" className="bg-primary-400/40 text-white font-semibold px-6 py-3 rounded-xl border border-white/20 hover:bg-primary-400/60 transition-colors">
                Đăng tin bán chim
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

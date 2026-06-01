import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedBirds from "@/components/home/FeaturedBirds";
import { MOCK_NEWS, MOCK_EVENTS } from "@/lib/mock-data";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { timeAgo } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang chủ – CuGay.vn",
};

export default function HomePage() {
  const latestNews = MOCK_NEWS.slice(0, 3);
  const upcomingEvents = MOCK_EVENTS.slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <HeroSection />

      {/* Stats */}
      <StatsSection />

      {/* Featured Birds */}
      <FeaturedBirds />

      {/* News & Events Grid */}
      <div className="px-4 lg:px-8 mb-8 grid lg:grid-cols-2 gap-6">
        {/* Latest News */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text-primary">Tin tức mới nhất</h2>
            <Link href="/tin-tuc" className="flex items-center gap-1 text-sm text-primary-600 font-medium hover:text-primary-700">
              Xem thêm <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {latestNews.map((article) => (
              <Link key={article.id} href={`/tin-tuc`} className="flex gap-3 bg-white rounded-2xl border border-border shadow-card p-3 hover:shadow-card-hover transition-all group">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={article.coverImage} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="80px" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold text-primary-600 uppercase tracking-wide">{article.category}</span>
                  <h3 className="text-sm font-semibold text-text-primary mt-0.5 line-clamp-2 group-hover:text-primary-600 transition-colors">{article.title}</h3>
                  <p className="text-xs text-muted mt-1">{timeAgo(article.publishedAt)} · {article.readTime} phút đọc</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text-primary">Sự kiện sắp tới</h2>
            <Link href="/cong-dong" className="flex items-center gap-1 text-sm text-primary-600 font-medium hover:text-primary-700">
              Xem thêm <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event) => {
              const d = new Date(event.date);
              return (
                <div key={event.id} className="flex gap-3 bg-white rounded-2xl border border-border shadow-card p-3 hover:shadow-card-hover transition-all group cursor-pointer">
                  {/* Date block */}
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
                      <span className="text-xs text-muted line-clamp-1">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3 text-muted" />
                      <span className="text-xs text-muted">{event.attendees} người tham dự</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="px-4 lg:px-8 mb-8">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-white blur-2xl" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3">Tạo hồ sơ cho chiến binh của bạn</h2>
            <p className="text-primary-100 mb-6 max-w-lg mx-auto">
              Mỗi con cu gáy đều xứng đáng có một danh tính số. Bắt đầu hành trình ghi lại câu chuyện của chiến binh bạn ngay hôm nay.
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

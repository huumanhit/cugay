import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-300/10 rounded-3xl mx-4 lg:mx-8 mt-6 mb-8">
      <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center p-8 lg:p-12">
        {/* Left content */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
            Nền tảng hàng đầu cho người chơi cu gáy Việt Nam
          </div>

          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-text-primary leading-tight">
            Nơi lưu giữ giá trị của những{" "}
            <span className="text-primary-500">chiến binh trời sinh</span>
          </h1>

          <p className="text-base lg:text-lg text-muted leading-relaxed max-w-lg">
            CuGay.vn là nền tảng hồ sơ và định danh số dành cho người chơi cu gáy Việt Nam.
            Mỗi con chim, một câu chuyện — được ghi lại và trân trọng.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/ho-so-chim"
              className="inline-flex items-center gap-2 bg-primary-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-600 transition-all active:scale-95 shadow-sm hover:shadow-md"
            >
              Khám phá ngay
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/ho-so-chim/bird-001"
              className="inline-flex items-center gap-2 bg-white text-text-primary font-semibold px-6 py-3 rounded-xl border border-border hover:bg-accent transition-all active:scale-95"
            >
              <Play className="w-4 h-4 text-primary-500" />
              Xem hồ sơ mẫu
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-6 pt-2">
            <div className="flex -space-x-2">
              {[1,2,3,4].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/150?img=${i}`}
                  alt=""
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <p className="text-sm text-muted">
              <span className="font-semibold text-text-primary">38,000+</span> người chơi tin dùng
            </p>
          </div>
        </div>

        {/* Right image */}
        <div className="relative lg:flex justify-end">
          <div className="relative w-full max-w-md mx-auto lg:mx-0">
            {/* Main image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1548550941-75b8e13fd1d9?w=600&h=750&fit=crop"
                alt="Cu gáy Việt Nam"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3">
                <p className="font-semibold text-text-primary text-sm">Dũng Sĩ Tây Đô</p>
                <p className="text-xs text-muted">Vô địch miền Tây 2023 · Giọng Thổ</p>
              </div>
            </div>

            {/* Floating stats card */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-card p-3 border border-border">
              <p className="text-xs text-muted">Điểm số</p>
              <p className="text-xl font-bold text-primary-600">9,850</p>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <span>↑ 12%</span>
                <span className="text-muted">tháng này</span>
              </div>
            </div>

            {/* Floating achievements card */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-card p-3 border border-border">
              <p className="text-xs text-muted mb-1">Thành tích gần đây</p>
              <p className="text-xs font-semibold text-amber-600">🏆 Vô địch miền Tây 2023</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-300/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
    </section>
  );
}

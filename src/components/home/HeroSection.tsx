import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";

const HERO_IMAGE =
  "https://inaturalist-open-data.s3.amazonaws.com/photos/10857163/medium.jpg";

export default function HeroSection() {
  return (
    <section className="mx-4 lg:mx-8 mt-4 lg:mt-6 mb-6 lg:mb-8">

      {/* ── MOBILE LAYOUT ─────────────────────────────── */}
      <div className="lg:hidden rounded-3xl overflow-hidden bg-gradient-to-b from-primary-50 to-white border border-primary-100">
        {/* Ảnh cu gáy full-width trên mobile */}
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={HERO_IMAGE}
            alt="Cu gáy Việt Nam"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-50/80" />
          {/* Badge nổi trên ảnh */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-primary-700">Nền tảng #1 Việt Nam</span>
          </div>
          {/* Rating nổi góc phải */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-sm text-center">
            <p className="text-lg font-bold text-primary-600 leading-none">9,850</p>
            <p className="text-[10px] text-muted leading-tight">điểm hàng đầu</p>
          </div>
        </div>

        {/* Nội dung text bên dưới ảnh */}
        <div className="px-5 pt-4 pb-6 space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary leading-tight">
              Nơi lưu giữ giá trị của những{" "}
              <span className="text-primary-500">chiến binh trời sinh</span>
            </h1>
            <p className="text-sm text-muted mt-2 leading-relaxed">
              Nền tảng hồ sơ số dành cho người chơi cu gáy Việt Nam.
              Mỗi con chim, một câu chuyện.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Link
              href="/ho-so-chim"
              className="flex-1 flex items-center justify-center gap-1.5 bg-primary-500 text-white font-semibold px-4 py-3 rounded-xl hover:bg-primary-600 transition-all active:scale-95 text-sm"
            >
              Khám phá <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/ho-so-chim/bird-001"
              className="flex items-center gap-1.5 bg-white text-text-primary font-semibold px-4 py-3 rounded-xl border border-border hover:bg-accent transition-all active:scale-95 text-sm"
            >
              <Play className="w-4 h-4 text-primary-500" />
              Mẫu
            </Link>
          </div>

          {/* Trust - compact */}
          <div className="flex items-center gap-2 pt-1">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/150?img=${i}`}
                  alt=""
                  className="w-7 h-7 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <p className="text-xs text-muted">
              <span className="font-semibold text-text-primary">38,000+</span> người tin dùng
            </p>
          </div>

          {/* Verified badge */}
          <div className="flex items-center gap-2 bg-primary-50 rounded-xl px-3 py-2">
            <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0" />
            <p className="text-xs text-primary-700 font-medium">
              Hồ sơ xác thực · Lịch sử rõ ràng · Cộng đồng uy tín
            </p>
          </div>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ────────────────────────────── */}
      <div className="hidden lg:block relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-300/10 rounded-3xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center p-10 xl:p-14">
          {/* Left */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
              Nền tảng hàng đầu cho người chơi cu gáy Việt Nam
            </div>

            <h1 className="text-4xl xl:text-5xl font-bold text-text-primary leading-tight">
              Nơi lưu giữ giá trị của những{" "}
              <span className="text-primary-500">chiến binh trời sinh</span>
            </h1>

            <p className="text-lg text-muted leading-relaxed max-w-lg">
              CuGay.vn là nền tảng hồ sơ và định danh số dành cho người chơi cu gáy Việt Nam.
              Mỗi con chim, một câu chuyện — được ghi lại và trân trọng.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/ho-so-chim"
                className="inline-flex items-center gap-2 bg-primary-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-600 transition-all active:scale-95 shadow-sm hover:shadow-md"
              >
                Khám phá ngay <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/ho-so-chim/bird-001"
                className="inline-flex items-center gap-2 bg-white text-text-primary font-semibold px-6 py-3 rounded-xl border border-border hover:bg-accent transition-all active:scale-95"
              >
                <Play className="w-4 h-4 text-primary-500" />
                Xem hồ sơ mẫu
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/150?img=${i}`}
                    alt=""
                    className="w-9 h-9 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <p className="text-sm text-muted">
                <span className="font-semibold text-text-primary">38,000+</span> người chơi tin dùng
              </p>
            </div>
          </div>

          {/* Right - Bird image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={HERO_IMAGE}
                  alt="Cu gáy Việt Nam"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3">
                  <p className="font-semibold text-text-primary text-sm">Dũng Sĩ Tây Đô</p>
                  <p className="text-xs text-muted">Vô địch miền Tây 2023 · Giọng Thổ</p>
                </div>
              </div>

              {/* Floating stat card */}
              <div className="absolute -top-3 -right-3 bg-white rounded-xl shadow-card border border-border p-3">
                <p className="text-xs text-muted">Điểm số</p>
                <p className="text-xl font-bold text-primary-600">9,850</p>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <span>↑ 12%</span>
                  <span className="text-muted">tháng này</span>
                </div>
              </div>

              {/* Floating achievement card */}
              <div className="absolute -bottom-3 -left-3 bg-white rounded-xl shadow-card border border-border p-3 max-w-[180px]">
                <p className="text-xs text-muted mb-1">Thành tích gần đây</p>
                <p className="text-xs font-semibold text-amber-600">🏆 Vô địch miền Tây 2023</p>
              </div>
            </div>
          </div>
        </div>

        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-300/15 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      </div>
    </section>
  );
}

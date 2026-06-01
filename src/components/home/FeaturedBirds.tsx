import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BirdCard from "@/components/birds/BirdCard";
import { MOCK_BIRDS } from "@/lib/mock-data";

export default function FeaturedBirds() {
  const featured = MOCK_BIRDS.slice(0, 6);

  return (
    <section className="px-4 lg:px-8 mb-8">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Hồ sơ nổi bật</h2>
          <p className="text-sm text-muted mt-0.5">Những chiến binh được yêu thích nhất tuần này</p>
        </div>
        <Link
          href="/ho-so-chim"
          className="flex items-center gap-1 text-sm text-primary-600 font-medium hover:text-primary-700 transition-colors"
        >
          Xem tất cả <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featured.map((bird) => (
          <BirdCard key={bird.id} bird={bird} />
        ))}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { ArrowUpDown, Flame, Clock, TrendingDown, TrendingUp } from "lucide-react";
import FilterSidebar from "@/components/marketplace/FilterSidebar";
import MarketplaceCard from "@/components/marketplace/MarketplaceCard";
import { MOCK_MARKETPLACE } from "@/lib/mock-data";

const SORT_OPTIONS = [
  { label: "Mới nhất", value: "newest", icon: Clock },
  { label: "Nhiều xem", value: "views", icon: Flame },
  { label: "Giá thấp", value: "price_asc", icon: TrendingDown },
  { label: "Giá cao", value: "price_desc", icon: TrendingUp },
];

export default function MarketplacePage() {
  const [sort, setSort] = useState("newest");

  const sorted = [...MOCK_MARKETPLACE].sort((a, b) => {
    if (sort === "views") return b.views - a.views;
    if (sort === "price_asc") return a.price - b.price;
    if (sort === "price_desc") return b.price - a.price;
    return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
  });

  return (
    <div className="px-4 lg:px-8 py-6 animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Chợ chim</h1>
        <p className="text-sm text-muted mt-1">
          Mua bán, trao đổi cu gáy uy tín — {MOCK_MARKETPLACE.length} tin đăng đang hoạt động
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <FilterSidebar />
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Sort bar */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-3 mb-4 flex items-center gap-2 flex-wrap">
            <ArrowUpDown className="w-4 h-4 text-muted flex-shrink-0" />
            <span className="text-sm text-muted">Sắp xếp:</span>
            {SORT_OPTIONS.map(({ label, value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setSort(value)}
                className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-all ${
                  sort === value
                    ? "bg-primary-500 text-white font-medium"
                    : "text-muted hover:bg-accent"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
            <span className="ml-auto text-xs text-muted">
              {sorted.length} kết quả
            </span>
          </div>

          {/* Listings */}
          <div className="space-y-4">
            {sorted.map((listing) => (
              <MarketplaceCard key={listing.id} listing={listing} />
            ))}
          </div>

          {/* Post listing CTA */}
          <div className="mt-6 bg-gradient-to-r from-primary-50 to-secondary-300/20 rounded-2xl border border-primary-100 p-6 text-center">
            <p className="font-semibold text-text-primary mb-1">Muốn bán chim của bạn?</p>
            <p className="text-sm text-muted mb-4">Đăng tin miễn phí, tiếp cận hàng nghìn người mua trong cộng đồng</p>
            <button className="bg-primary-500 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-primary-600 transition-colors">
              Đăng tin bán chim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

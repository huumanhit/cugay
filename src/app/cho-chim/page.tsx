"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowUpDown, Flame, Clock, TrendingDown, TrendingUp } from "lucide-react";
import FilterSidebar from "@/components/marketplace/FilterSidebar";
import MarketplaceCard from "@/components/marketplace/MarketplaceCard";
import type { MarketplaceListing } from "@/types";

const SORT_OPTIONS = [
  { label: "Mới nhất", value: "newest", icon: Clock },
  { label: "Nhiều xem", value: "views", icon: Flame },
  { label: "Giá thấp", value: "price_asc", icon: TrendingDown },
  { label: "Giá cao", value: "price_desc", icon: TrendingUp },
];

export default function MarketplacePage() {
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("newest");

  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/marketplace?sort=${sort}&limit=20`);
      const data = await res.json();
      setListings(data.listings ?? []);
      setTotal(data.total ?? 0);
    } finally {
      setLoading(false);
    }
  }, [sort]);

  useEffect(() => { fetchListings(); }, [fetchListings]);

  return (
    <div className="px-4 lg:px-8 py-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Chợ chim</h1>
        <p className="text-sm text-muted mt-1">
          {loading ? "Đang tải..." : `${total} tin đăng đang hoạt động`}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 flex-shrink-0">
          <FilterSidebar />
        </div>

        <div className="flex-1">
          {/* Sort bar */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-3 mb-4 flex items-center gap-2 flex-wrap">
            <ArrowUpDown className="w-4 h-4 text-muted flex-shrink-0" />
            <span className="text-sm text-muted">Sắp xếp:</span>
            {SORT_OPTIONS.map(({ label, value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setSort(value)}
                className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-all ${sort === value ? "bg-primary-500 text-white font-medium" : "text-muted hover:bg-accent"}`}
              >
                <Icon className="w-3.5 h-3.5" />{label}
              </button>
            ))}
            <span className="ml-auto text-xs text-muted">{total} kết quả</span>
          </div>

          {/* Listings */}
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-border p-4 animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-44 h-36 bg-accent rounded-xl flex-shrink-0" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-accent rounded w-1/2" />
                      <div className="h-4 bg-accent rounded w-1/3" />
                      <div className="h-3 bg-accent rounded w-full" />
                      <div className="h-3 bg-accent rounded w-4/5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : listings.length > 0 ? (
            <div className="space-y-4">
              {listings.map((listing) => (
                <MarketplaceCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-border">
              <p className="text-4xl mb-3">🛒</p>
              <p className="font-semibold text-text-primary">Chưa có tin bán nào</p>
              <p className="text-sm text-muted mt-1">Hãy là người đầu tiên đăng tin!</p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-6 bg-gradient-to-r from-primary-50 to-secondary-300/20 rounded-2xl border border-primary-100 p-6 text-center">
            <p className="font-semibold text-text-primary mb-1">Muốn bán chim của bạn?</p>
            <p className="text-sm text-muted mb-4">Đăng tin miễn phí, tiếp cận hàng nghìn người mua</p>
            <button className="bg-primary-500 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-primary-600 transition-colors">
              Đăng tin bán chim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useCallback, useTransition } from "react";
import { ArrowUpDown, Flame, Clock, TrendingDown, TrendingUp } from "lucide-react";
import MarketplaceCard from "@/components/marketplace/MarketplaceCard";
import type { MarketplaceListing } from "@/types";

const SORT_OPTIONS = [
  { label: "Mới nhất", value: "newest", icon: Clock },
  { label: "Nhiều xem", value: "views", icon: Flame },
  { label: "Giá thấp", value: "price_asc", icon: TrendingDown },
  { label: "Giá cao", value: "price_desc", icon: TrendingUp },
];

const VOICE_TYPES = ["Tất cả", "Thổ", "Đồng", "Kim", "Thủy", "Đấu", "Vàng"];
const PROVINCES = ["Tất cả", "Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Cần Thơ", "Thừa Thiên Huế", "Khánh Hòa", "Lâm Đồng", "Nghệ An"];

interface Props {
  initialListings: MarketplaceListing[];
  initialTotal: number;
}

export default function MarketplaceClient({ initialListings, initialTotal }: Props) {
  const [listings, setListings] = useState(initialListings);
  const [total, setTotal] = useState(initialTotal);
  const [sort, setSort] = useState("newest");
  const [voice, setVoice] = useState("Tất cả");
  const [province, setProvince] = useState("Tất cả");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isPending, startTransition] = useTransition();

  const fetchListings = useCallback((overrides: Record<string, string> = {}) => {
    const params = new URLSearchParams({
      sort: overrides.sort ?? sort,
      limit: "20",
      ...(( overrides.voice ?? voice) !== "Tất cả" ? { voice: overrides.voice ?? voice } : {}),
      ...((overrides.province ?? province) !== "Tất cả" ? { province: overrides.province ?? province } : {}),
      ...(minPrice ? { minPrice } : {}),
      ...(maxPrice ? { maxPrice } : {}),
    });

    startTransition(async () => {
      const res = await fetch(`/api/marketplace?${params}`);
      const data = await res.json();
      setListings(data.listings ?? []);
      setTotal(data.total ?? 0);
    });
  }, [sort, voice, province, minPrice, maxPrice]);

  function handleSort(val: string) {
    setSort(val);
    fetchListings({ sort: val });
  }

  function handleVoice(val: string) {
    setVoice(val);
    fetchListings({ voice: val });
  }

  function handleProvince(val: string) {
    setProvince(val);
    fetchListings({ province: val });
  }

  function handleApplyPrice() {
    fetchListings();
  }

  function handleReset() {
    setVoice("Tất cả");
    setProvince("Tất cả");
    setMinPrice("");
    setMaxPrice("");
    setSort("newest");
    const params = new URLSearchParams({ sort: "newest", limit: "20" });
    startTransition(async () => {
      const res = await fetch(`/api/marketplace?${params}`);
      const data = await res.json();
      setListings(data.listings ?? []);
      setTotal(data.total ?? 0);
    });
  }

  return (
    <div className="px-4 lg:px-8 py-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Chợ chim</h1>
        <p className="text-sm text-muted mt-1">
          {isPending ? "Đang lọc..." : `${total} tin đăng đang hoạt động`}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-border shadow-card p-5 space-y-5 sticky top-20">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-text-primary">Bộ lọc</h3>
              <button onClick={handleReset} className="text-xs text-muted hover:text-text-primary transition-colors">Xoá lọc</button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1.5">Giọng chim</label>
              <div className="flex flex-wrap gap-1.5">
                {VOICE_TYPES.map((v) => (
                  <button key={v} onClick={() => handleVoice(v)}
                    className={`text-xs px-3 py-1 rounded-full border transition-all ${voice === v ? "bg-primary-500 text-white border-primary-500" : "bg-white text-muted border-border hover:border-primary-300"}`}>
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1.5">Khu vực</label>
              <select value={province} onChange={(e) => handleProvince(e.target.value)}
                className="w-full text-xs border border-border rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-300 text-text-primary">
                {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1.5">Giá (triệu đ)</label>
              <div className="flex gap-2">
                <input type="number" placeholder="Từ" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full text-xs border border-border rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-300" />
                <input type="number" placeholder="Đến" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full text-xs border border-border rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-300" />
              </div>
            </div>

            <button onClick={handleApplyPrice}
              className="w-full bg-primary-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-600 transition-colors">
              Áp dụng bộ lọc
            </button>
          </div>
        </aside>

        <div className="flex-1">
          {/* Sort bar */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-3 mb-4 flex items-center gap-2 flex-wrap">
            <ArrowUpDown className="w-4 h-4 text-muted flex-shrink-0" />
            <span className="text-sm text-muted">Sắp xếp:</span>
            {SORT_OPTIONS.map(({ label, value, icon: Icon }) => (
              <button key={value} onClick={() => handleSort(value)}
                className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-all ${sort === value ? "bg-primary-500 text-white font-medium" : "text-muted hover:bg-accent"}`}>
                <Icon className="w-3.5 h-3.5" />{label}
              </button>
            ))}
            <span className="ml-auto text-xs text-muted">{total} kết quả</span>
          </div>

          {isPending ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-border p-4 animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-44 h-36 bg-accent rounded-xl flex-shrink-0" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-accent rounded w-1/2" />
                      <div className="h-4 bg-accent rounded w-1/3" />
                      <div className="h-3 bg-accent rounded w-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : listings.length > 0 ? (
            <div className="space-y-4">
              {listings.map((listing) => <MarketplaceCard key={listing.id} listing={listing} />)}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-border">
              <p className="text-4xl mb-3">🛒</p>
              <p className="font-semibold text-text-primary">Không tìm thấy tin phù hợp</p>
              <p className="text-sm text-muted mt-1">Thử thay đổi bộ lọc</p>
            </div>
          )}

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

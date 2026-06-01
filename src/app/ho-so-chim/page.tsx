"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Grid3X3, List } from "lucide-react";
import BirdCard from "@/components/birds/BirdCard";
import type { Bird } from "@/types";

const VOICE_FILTERS = ["Tất cả", "Thổ", "Đồng", "Kim", "Thủy", "Đấu", "Vàng"];
const SORT_OPTIONS = [
  { label: "Nổi bật nhất", value: "popular" },
  { label: "Mới nhất", value: "newest" },
  { label: "Điểm cao nhất", value: "score" },
  { label: "Nhiều theo dõi", value: "followers" },
];

export default function BirdProfilesPage() {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [voiceFilter, setVoiceFilter] = useState("Tất cả");
  const [sort, setSort] = useState("popular");

  const fetchBirds = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        sort,
        limit: "24",
        ...(search ? { search } : {}),
        ...(voiceFilter !== "Tất cả" ? { voice: voiceFilter } : {}),
      });
      const res = await fetch(`/api/birds?${params}`);
      const data = await res.json();
      setBirds(data.birds ?? []);
      setTotal(data.total ?? 0);
    } finally {
      setLoading(false);
    }
  }, [search, voiceFilter, sort]);

  useEffect(() => {
    const timer = setTimeout(fetchBirds, 300);
    return () => clearTimeout(timer);
  }, [fetchBirds]);

  return (
    <div className="px-4 lg:px-8 py-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Hồ sơ chim</h1>
        <p className="text-sm text-muted mt-1">Khám phá hồ sơ cu gáy được xác thực trên toàn quốc</p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl border border-border shadow-card p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm theo tên chim, chủ nhân, tỉnh thành..."
              className="w-full pl-9 pr-4 py-2.5 bg-accent rounded-xl text-sm border border-transparent focus:border-primary-300 focus:bg-white focus:outline-none transition-all placeholder:text-muted"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-border rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-300 text-text-primary"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 mt-3 flex-wrap">
          {VOICE_FILTERS.map((v) => (
            <button
              key={v}
              onClick={() => setVoiceFilter(v)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                voiceFilter === v ? "bg-primary-500 text-white border-primary-500" : "bg-white text-muted border-border hover:border-primary-300"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted">
          {loading ? "Đang tải..." : <><span className="font-semibold text-text-primary">{total}</span> kết quả</>}
        </p>
        <div className="flex gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-50 text-primary-600">
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:bg-accent transition-colors">
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border overflow-hidden animate-pulse">
              <div className="aspect-[4/3] bg-accent" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-accent rounded w-3/4" />
                <div className="h-3 bg-accent rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : birds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {birds.map((bird) => (
            <BirdCard key={bird.id} bird={bird} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🐦</p>
          <p className="font-semibold text-text-primary">Không tìm thấy hồ sơ nào</p>
          <p className="text-sm text-muted mt-1">Thử thay đổi từ khóa hoặc bộ lọc</p>
        </div>
      )}
    </div>
  );
}

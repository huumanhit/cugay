"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import BirdCard from "@/components/birds/BirdCard";
import { MOCK_BIRDS } from "@/lib/mock-data";
import { getVoiceColor } from "@/lib/utils";

const VOICE_FILTERS = ["Tất cả", "Thổ", "Đồng", "Kim", "Thủy", "Đấu", "Vàng"];
const SORT_OPTIONS = [
  { label: "Nổi bật nhất", value: "popular" },
  { label: "Mới nhất", value: "newest" },
  { label: "Điểm cao nhất", value: "score" },
  { label: "Nhiều theo dõi", value: "followers" },
];

export default function BirdProfilesPage() {
  const [search, setSearch] = useState("");
  const [voiceFilter, setVoiceFilter] = useState("Tất cả");
  const [sort, setSort] = useState("popular");

  const filtered = MOCK_BIRDS.filter((bird) => {
    const matchesSearch = bird.name.toLowerCase().includes(search.toLowerCase()) ||
      bird.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      bird.province.toLowerCase().includes(search.toLowerCase());
    const matchesVoice = voiceFilter === "Tất cả" || bird.voice === voiceFilter;
    return matchesSearch && matchesVoice;
  }).sort((a, b) => {
    if (sort === "score") return (b.score ?? 0) - (a.score ?? 0);
    if (sort === "followers") return b.followers - a.followers;
    if (sort === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return b.views - a.views;
  });

  return (
    <div className="px-4 lg:px-8 py-6 animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Hồ sơ chim</h1>
        <p className="text-sm text-muted mt-1">Khám phá {MOCK_BIRDS.length.toLocaleString()}+ hồ sơ cu gáy được xác thực trên toàn quốc</p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl border border-border shadow-card p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm theo tên chim, chủ nhân, tỉnh thành..."
              className="w-full pl-9 pr-4 py-2.5 bg-accent rounded-xl text-sm border border-transparent focus:border-primary-300 focus:bg-white focus:outline-none transition-all placeholder:text-muted"
            />
          </div>

          {/* Sort */}
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

        {/* Voice filters */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {VOICE_FILTERS.map((v) => (
            <button
              key={v}
              onClick={() => setVoiceFilter(v)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                voiceFilter === v
                  ? "bg-primary-500 text-white border-primary-500"
                  : "bg-white text-muted border-border hover:border-primary-300"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted">
          Hiển thị <span className="font-semibold text-text-primary">{filtered.length}</span> kết quả
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

      {/* Bird grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((bird) => (
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

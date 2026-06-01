"use client";

import { useState, useMemo, useTransition, useRef } from "react";
import { Search, Grid3X3 } from "lucide-react";
import BirdCard from "@/components/birds/BirdCard";
import type { Bird } from "@/types";

const VOICE_FILTERS = ["Tất cả", "Thổ", "Đồng", "Kim", "Thủy", "Đấu", "Vàng"];
const SORT_OPTIONS = [
  { label: "Nổi bật nhất", value: "popular" },
  { label: "Mới nhất", value: "newest" },
  { label: "Điểm cao nhất", value: "score" },
];

interface Props {
  initialBirds: Bird[];
  initialTotal: number;
  initialSearch: string;
  initialVoice: string;
  initialSort: string;
}

export default function BirdListClient({ initialBirds, initialTotal, initialSearch, initialVoice, initialSort }: Props) {
  const [allBirds, setAllBirds] = useState(initialBirds);
  const [search, setSearch] = useState(initialSearch);
  const [voice, setVoice] = useState(initialVoice);
  const [sort, setSort] = useState(initialSort);
  const [isSearching, startTransition] = useTransition();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Filter + sort hoàn toàn client-side — instant, không gọi API
  const birds = useMemo(() => {
    let result = allBirds;

    if (voice !== "Tất cả") {
      result = result.filter((b) => b.voice === voice);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.province.toLowerCase().includes(q) ||
          b.ownerName.toLowerCase().includes(q)
      );
    }

    const sorted = [...result];
    if (sort === "score") sorted.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    else if (sort === "newest") sorted.sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime());
    else sorted.sort((a, b) => b.views - a.views); // popular

    return sorted;
  }, [allBirds, voice, sort, search]);

  // Chỉ gọi API khi cần tìm kiếm từ server (từ khoá không có trong dữ liệu đã tải)
  function handleSearch(val: string) {
    setSearch(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!val.trim()) return;

    debounceRef.current = setTimeout(() => {
      const clientMatch = allBirds.some(
        (b) =>
          b.name.toLowerCase().includes(val.toLowerCase()) ||
          b.province.toLowerCase().includes(val.toLowerCase()) ||
          b.ownerName.toLowerCase().includes(val.toLowerCase())
      );
      // Chỉ gọi API nếu client không có kết quả
      if (!clientMatch) {
        startTransition(async () => {
          const params = new URLSearchParams({ search: val, sort, limit: "24" });
          if (voice !== "Tất cả") params.set("voice", voice);
          const res = await fetch(`/api/birds?${params}`);
          const data = await res.json();
          if (data.birds?.length) setAllBirds((prev) => {
            const ids = new Set(prev.map((b) => b.id));
            return [...prev, ...data.birds.filter((b: Bird) => !ids.has(b.id))];
          });
        });
      }
    }, 400);
  }

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
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Tìm theo tên chim, chủ nhân, tỉnh thành..."
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

        {/* Voice filter — instant client-side */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {VOICE_FILTERS.map((v) => (
            <button
              key={v}
              onClick={() => setVoice(v)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                voice === v
                  ? "bg-primary-500 text-white border-primary-500"
                  : "bg-white text-muted border-border hover:border-primary-300"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted">
          {isSearching
            ? "Đang tìm..."
            : <><span className="font-semibold text-text-primary">{birds.length}</span> kết quả</>}
        </p>
        <Grid3X3 className="w-4 h-4 text-primary-500" />
      </div>

      {/* Grid */}
      {birds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {birds.map((bird, i) => (
            <BirdCard key={bird.id} bird={bird} priority={i < 4} />
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

"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";

const VOICE_TYPES = ["Tất cả", "Thổ", "Đồng", "Kim", "Thủy", "Đấu", "Vàng"];
const PROVINCES = [
  "Tất cả", "Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Cần Thơ",
  "Thừa Thiên Huế", "Khánh Hòa", "Lâm Đồng", "Nghệ An",
];
const AGE_RANGES = ["Tất cả", "Dưới 2 tuổi", "2–4 tuổi", "4–6 tuổi", "Trên 6 tuổi"];

interface FilterState {
  keyword: string;
  voice: string;
  province: string;
  ageRange: string;
  minPrice: string;
  maxPrice: string;
}

interface Props {
  onFilter?: (filters: FilterState) => void;
}

export default function FilterSidebar({ onFilter }: Props) {
  const [filters, setFilters] = useState<FilterState>({
    keyword: "",
    voice: "Tất cả",
    province: "Tất cả",
    ageRange: "Tất cả",
    minPrice: "",
    maxPrice: "",
  });

  const update = (key: keyof FilterState, value: string) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    onFilter?.(next);
  };

  const reset = () => {
    const initial: FilterState = { keyword: "", voice: "Tất cả", province: "Tất cả", ageRange: "Tất cả", minPrice: "", maxPrice: "" };
    setFilters(initial);
    onFilter?.(initial);
  };

  return (
    <aside className="bg-white rounded-2xl border border-border shadow-card p-5 space-y-5 sticky top-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-primary-500" />
          <h3 className="font-semibold text-text-primary">Bộ lọc</h3>
        </div>
        <button
          onClick={reset}
          className="text-xs text-muted hover:text-text-primary flex items-center gap-1 transition-colors"
        >
          <X className="w-3 h-3" /> Xoá lọc
        </button>
      </div>

      {/* Keyword */}
      <div>
        <label className="block text-xs font-semibold text-text-primary mb-1.5">Từ khóa</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
          <Input
            placeholder="Tên chim, chủ nhân..."
            className="pl-8 text-xs"
            value={filters.keyword}
            onChange={(e) => update("keyword", e.target.value)}
          />
        </div>
      </div>

      {/* Voice */}
      <div>
        <label className="block text-xs font-semibold text-text-primary mb-1.5">Giọng chim</label>
        <div className="flex flex-wrap gap-1.5">
          {VOICE_TYPES.map((v) => (
            <button
              key={v}
              onClick={() => update("voice", v)}
              className={`text-xs px-3 py-1 rounded-full border transition-all ${
                filters.voice === v
                  ? "bg-primary-500 text-white border-primary-500"
                  : "bg-white text-muted border-border hover:border-primary-300"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Province */}
      <div>
        <label className="block text-xs font-semibold text-text-primary mb-1.5">Khu vực</label>
        <select
          value={filters.province}
          onChange={(e) => update("province", e.target.value)}
          className="w-full text-xs border border-border rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-300 text-text-primary"
        >
          {PROVINCES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Age */}
      <div>
        <label className="block text-xs font-semibold text-text-primary mb-1.5">Độ tuổi</label>
        <div className="space-y-1">
          {AGE_RANGES.map((a) => (
            <label key={a} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="age"
                value={a}
                checked={filters.ageRange === a}
                onChange={() => update("ageRange", a)}
                className="w-3.5 h-3.5 accent-primary-500"
              />
              <span className="text-xs text-muted group-hover:text-text-primary transition-colors">{a}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-xs font-semibold text-text-primary mb-1.5">Giá (triệu đ)</label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Từ"
            className="text-xs"
            value={filters.minPrice}
            onChange={(e) => update("minPrice", e.target.value)}
          />
          <Input
            type="number"
            placeholder="Đến"
            className="text-xs"
            value={filters.maxPrice}
            onChange={(e) => update("maxPrice", e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={() => onFilter?.(filters)}
        className="w-full bg-primary-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-600 transition-colors"
      >
        Áp dụng bộ lọc
      </button>
    </aside>
  );
}

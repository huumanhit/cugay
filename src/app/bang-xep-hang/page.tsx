"use client";

import { useState } from "react";
import { Trophy, Medal } from "lucide-react";
import RankingCard from "@/components/rankings/RankingCard";
import { MOCK_RANKINGS } from "@/lib/mock-data";

const TABS = [
  { label: "Toàn quốc", value: "national" },
  { label: "Miền Bắc", value: "north" },
  { label: "Miền Trung", value: "central" },
  { label: "Miền Nam", value: "south" },
];

const VOICE_TABS = ["Tất cả", "Thổ", "Đồng", "Kim", "Thủy", "Đấu", "Vàng"];

const REGION_MAP: Record<string, string[]> = {
  north: ["Hà Nội", "Nghệ An"],
  central: ["Thừa Thiên Huế", "Đà Nẵng", "Lâm Đồng"],
  south: ["TP. Hồ Chí Minh", "Cần Thơ", "Khánh Hòa"],
};

export default function RankingsPage() {
  const [region, setRegion] = useState("national");
  const [voice, setVoice] = useState("Tất cả");

  const filtered = MOCK_RANKINGS.filter((r) => {
    const matchesRegion =
      region === "national" ||
      (REGION_MAP[region] ?? []).includes(r.province);
    const matchesVoice = voice === "Tất cả" || r.voice === voice;
    return matchesRegion && matchesVoice;
  });

  const top3 = filtered.slice(0, 3);
  const rest = filtered.slice(3);

  return (
    <div className="px-4 lg:px-8 py-6 animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <Trophy className="w-6 h-6 text-amber-500 fill-amber-400" />
          Bảng xếp hạng
        </h1>
        <p className="text-sm text-muted mt-1">Cập nhật hàng tuần · Kỳ tháng 6/2025</p>
      </div>

      {/* Region tabs */}
      <div className="bg-white rounded-2xl border border-border shadow-card p-1.5 mb-4 flex gap-1 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setRegion(t.value)}
            className={`flex-1 min-w-max px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              region === t.value
                ? "bg-primary-500 text-white shadow-sm"
                : "text-muted hover:bg-accent"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Voice filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {VOICE_TABS.map((v) => (
          <button
            key={v}
            onClick={() => setVoice(v)}
            className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all ${
              voice === v
                ? "bg-primary-500 text-white border-primary-500"
                : "bg-white text-muted border-border hover:border-primary-300"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Podium for top 3 */}
      {top3.length >= 3 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {/* 2nd place */}
          <div className="flex flex-col items-center bg-white rounded-2xl border border-slate-200 shadow-card p-4 pt-6 relative">
            <Medal className="absolute -top-3 w-6 h-6 text-slate-400 fill-slate-300" />
            <img src={top3[1].birdImage} alt={top3[1].birdName} className="w-16 h-16 rounded-full object-cover border-4 border-slate-200 mb-2" />
            <p className="font-semibold text-sm text-center text-text-primary truncate w-full text-center">{top3[1].birdName}</p>
            <p className="text-xs text-muted">{top3[1].ownerName}</p>
            <p className="text-lg font-bold text-slate-600 mt-1">{top3[1].score.toLocaleString()}</p>
            <p className="text-[10px] text-muted">điểm</p>
          </div>
          {/* 1st place */}
          <div className="flex flex-col items-center bg-gradient-to-b from-amber-50 to-white rounded-2xl border border-amber-200 shadow-card p-4 pt-8 relative -mt-3">
            <Trophy className="absolute -top-4 w-8 h-8 text-amber-500 fill-amber-400" />
            <img src={top3[0].birdImage} alt={top3[0].birdName} className="w-20 h-20 rounded-full object-cover border-4 border-amber-300 mb-2" />
            <p className="font-bold text-sm text-center text-text-primary truncate w-full text-center">{top3[0].birdName}</p>
            <p className="text-xs text-muted">{top3[0].ownerName}</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">{top3[0].score.toLocaleString()}</p>
            <p className="text-[10px] text-muted">điểm</p>
          </div>
          {/* 3rd place */}
          <div className="flex flex-col items-center bg-white rounded-2xl border border-orange-200 shadow-card p-4 pt-6 relative">
            <Medal className="absolute -top-3 w-6 h-6 text-orange-500 fill-orange-400" />
            <img src={top3[2].birdImage} alt={top3[2].birdName} className="w-16 h-16 rounded-full object-cover border-4 border-orange-200 mb-2" />
            <p className="font-semibold text-sm text-center text-text-primary truncate w-full text-center">{top3[2].birdName}</p>
            <p className="text-xs text-muted">{top3[2].ownerName}</p>
            <p className="text-lg font-bold text-orange-600 mt-1">{top3[2].score.toLocaleString()}</p>
            <p className="text-[10px] text-muted">điểm</p>
          </div>
        </div>
      )}

      {/* Full list */}
      <div className="space-y-2">
        {filtered.map((entry) => (
          <RankingCard key={entry.birdId} entry={entry} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Trophy className="w-12 h-12 text-border mx-auto mb-3" />
            <p className="font-semibold text-text-primary">Không có dữ liệu xếp hạng</p>
            <p className="text-sm text-muted mt-1">Thay đổi bộ lọc để xem kết quả khác</p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Trophy, Medal } from "lucide-react";
import RankingCard from "@/components/rankings/RankingCard";
import type { RankingEntry } from "@/types";

const TABS = [
  { label: "Toàn quốc", value: "national" },
  { label: "Miền Bắc", value: "north" },
  { label: "Miền Trung", value: "central" },
  { label: "Miền Nam", value: "south" },
];
const VOICE_TABS = ["Tất cả", "Thổ", "Đồng", "Kim", "Thủy", "Đấu", "Vàng"];

export default function RankingsPage() {
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [region] = useState("national");
  const [voice, setVoice] = useState("Tất cả");

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ limit: "50", ...(voice !== "Tất cả" ? { voice } : {}) });
    fetch(`/api/rankings?${params}`)
      .then((r) => r.json())
      .then((data) => setRankings(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [voice]);

  const top3 = rankings.slice(0, 3);

  return (
    <div className="px-4 lg:px-8 py-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <Trophy className="w-6 h-6 text-amber-500 fill-amber-400" /> Bảng xếp hạng
        </h1>
        <p className="text-sm text-muted mt-1">Cập nhật liên tục · Dựa trên điểm số thật từ database</p>
      </div>

      {/* Region tabs */}
      <div className="bg-white rounded-2xl border border-border shadow-card p-1.5 mb-4 flex gap-1 overflow-x-auto">
        {TABS.map((t) => (
          <button key={t.value} className={`flex-1 min-w-max px-4 py-2 rounded-xl text-sm font-medium transition-all ${region === t.value ? "bg-primary-500 text-white shadow-sm" : "text-muted hover:bg-accent"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Voice filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {VOICE_TABS.map((v) => (
          <button key={v} onClick={() => setVoice(v)} className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all ${voice === v ? "bg-primary-500 text-white border-primary-500" : "bg-white text-muted border-border hover:border-primary-300"}`}>
            {v}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border p-4 animate-pulse flex gap-4">
              <div className="w-10 h-10 bg-accent rounded-full" />
              <div className="w-14 h-14 bg-accent rounded-xl" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-accent rounded w-1/2" />
                <div className="h-3 bg-accent rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : rankings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-border">
          <Trophy className="w-12 h-12 text-border mx-auto mb-3" />
          <p className="font-semibold text-text-primary">Chưa có dữ liệu xếp hạng</p>
          <p className="text-sm text-muted mt-1">Hãy tạo hồ sơ chim và tích lũy điểm số</p>
        </div>
      ) : (
        <>
          {/* Podium */}
          {top3.length >= 3 && (
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[top3[1], top3[0], top3[2]].map((entry, pos) => {
                const isFirst = pos === 1;
                const colors = [
                  "border-slate-200 bg-slate-50",
                  "border-amber-200 bg-amber-50",
                  "border-orange-200 bg-orange-50",
                ];
                const textColors = ["text-slate-600", "text-amber-600", "text-orange-600"];
                const medals = [
                  <Medal key="s" className="absolute -top-3 w-6 h-6 text-slate-400 fill-slate-300" />,
                  <Trophy key="g" className="absolute -top-4 w-8 h-8 text-amber-500 fill-amber-400" />,
                  <Medal key="b" className="absolute -top-3 w-6 h-6 text-orange-500 fill-orange-400" />,
                ];
                return (
                  <div key={entry.birdId} className={`flex flex-col items-center border-2 ${colors[pos]} rounded-2xl shadow-card p-4 relative ${isFirst ? "pt-8 -mt-2" : "pt-6"}`}>
                    {medals[pos]}
                    <img src={entry.birdImage} alt={entry.birdName} className={`rounded-full object-cover border-4 mb-2 ${isFirst ? "w-20 h-20 border-amber-300" : "w-16 h-16 border-slate-200"}`} onError={(e) => { (e.target as HTMLImageElement).src = "https://i.pravatar.cc/150?img=1"; }} />
                    <p className={`font-bold text-sm text-center truncate w-full text-center ${isFirst ? "text-text-primary" : "text-text-primary"}`}>{entry.birdName}</p>
                    <p className="text-xs text-muted">{entry.ownerName}</p>
                    <p className={`text-xl font-bold mt-1 ${textColors[pos]}`}>{entry.score.toLocaleString()}</p>
                    <p className="text-[10px] text-muted">điểm</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Full list */}
          <div className="space-y-2">
            {rankings.map((entry) => <RankingCard key={entry.birdId} entry={entry} />)}
          </div>
        </>
      )}
    </div>
  );
}

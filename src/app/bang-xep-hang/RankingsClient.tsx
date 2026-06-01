"use client";

import { useState, useMemo } from "react";
import RankingCard from "@/components/rankings/RankingCard";
import type { RankingEntry } from "@/types";

const VOICE_TABS = ["Tất cả", "Thổ", "Đồng", "Kim", "Thủy", "Đấu", "Vàng"];

interface Props { initialRankings: RankingEntry[] }

export default function RankingsClient({ initialRankings }: Props) {
  const [voice, setVoice] = useState("Tất cả");

  const filtered = useMemo(
    () => voice === "Tất cả"
      ? initialRankings
      : initialRankings.filter((r) => r.voice === voice),
    [initialRankings, voice]
  );

  return (
    <>
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
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
      <div className="space-y-2">
        {filtered.map((entry) => <RankingCard key={entry.birdId} entry={entry} />)}
      </div>
    </>
  );
}

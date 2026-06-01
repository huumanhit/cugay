import Image from "next/image";
import Link from "next/link";
import { TrendingUp, TrendingDown, Minus, Trophy } from "lucide-react";
import { getVoiceColor } from "@/lib/utils";
import type { RankingEntry } from "@/types";

const RANK_COLORS: Record<number, string> = {
  1: "bg-amber-50 border-amber-200",
  2: "bg-slate-50 border-slate-200",
  3: "bg-orange-50 border-orange-200",
};

const RANK_NUMBER_COLORS: Record<number, string> = {
  1: "text-amber-500",
  2: "text-slate-500",
  3: "text-orange-600",
};

const TROPHY_COLORS: Record<number, string> = {
  1: "text-amber-500 fill-amber-400",
  2: "text-slate-400 fill-slate-300",
  3: "text-orange-500 fill-orange-400",
};

export default function RankingCard({ entry }: { entry: RankingEntry }) {
  const isTop3 = entry.rank <= 3;

  return (
    <Link href={`/ho-so-chim/${entry.birdId}`}>
      <div
        className={`flex items-center gap-4 p-4 rounded-2xl border transition-all hover:shadow-card-hover cursor-pointer ${
          isTop3 ? `${RANK_COLORS[entry.rank]} bg-opacity-50` : "bg-white border-border"
        }`}
      >
        {/* Rank */}
        <div className="flex-shrink-0 w-10 text-center">
          {isTop3 ? (
            <Trophy className={`w-6 h-6 mx-auto ${TROPHY_COLORS[entry.rank]}`} />
          ) : (
            <span className={`text-lg font-bold ${RANK_NUMBER_COLORS[entry.rank] ?? "text-muted"}`}>
              {entry.rank}
            </span>
          )}
        </div>

        {/* Bird image */}
        <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={entry.birdImage}
            alt={entry.birdName}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-primary text-sm truncate">{entry.birdName}</h3>
          <p className="text-xs text-muted truncate">{entry.ownerName} · {entry.province}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getVoiceColor(entry.voice)}`}>
              {entry.voice}
            </span>
            <span className="text-[10px] text-muted">{entry.achievements} thành tích</span>
          </div>
        </div>

        {/* Score & trend */}
        <div className="flex-shrink-0 text-right">
          <p className="font-bold text-text-primary text-lg">{entry.score.toLocaleString()}</p>
          <div className="flex items-center justify-end gap-0.5 mt-0.5">
            {entry.change === "up" && <TrendingUp className="w-3.5 h-3.5 text-green-500" />}
            {entry.change === "down" && <TrendingDown className="w-3.5 h-3.5 text-red-400" />}
            {entry.change === "same" && <Minus className="w-3.5 h-3.5 text-muted" />}
            <span className={`text-xs ${entry.change === "up" ? "text-green-500" : entry.change === "down" ? "text-red-400" : "text-muted"}`}>
              {entry.change === "up" ? "Tăng" : entry.change === "down" ? "Giảm" : "Ổn định"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

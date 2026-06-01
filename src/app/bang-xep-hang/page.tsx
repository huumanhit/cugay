import { Trophy, Medal } from "lucide-react";
import RankingCard from "@/components/rankings/RankingCard";
import RankingsClient from "./RankingsClient";
import { getRankings } from "@/lib/db";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Bảng xếp hạng – CuGay.vn" };
export const revalidate = 60;

export default async function RankingsPage() {
  const rankings = await getRankings(50);
  const top3 = rankings.slice(0, 3);

  return (
    <div className="px-4 lg:px-8 py-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <Trophy className="w-6 h-6 text-amber-500 fill-amber-400" /> Bảng xếp hạng
        </h1>
        <p className="text-sm text-muted mt-1">Cập nhật liên tục · Dựa trên điểm số thật từ database</p>
      </div>

      {rankings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-border">
          <Trophy className="w-12 h-12 text-border mx-auto mb-3" />
          <p className="font-semibold text-text-primary">Chưa có dữ liệu xếp hạng</p>
          <p className="text-sm text-muted mt-1">Hãy tạo hồ sơ chim và tích lũy điểm số</p>
        </div>
      ) : (
        <>
          {/* Podium top 3 */}
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
                    <img
                      src={entry.birdImage}
                      alt={entry.birdName}
                      className={`rounded-full object-cover border-4 mb-2 ${isFirst ? "w-20 h-20 border-amber-300" : "w-16 h-16 border-slate-200"}`}
                    />
                    <p className="font-bold text-sm text-center truncate w-full">{entry.birdName}</p>
                    <p className="text-xs text-muted">{entry.ownerName}</p>
                    <p className={`text-xl font-bold mt-1 ${textColors[pos]}`}>{entry.score.toLocaleString()}</p>
                    <p className="text-[10px] text-muted">điểm</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Filter tabs + full list (client component cho interactivity) */}
          <RankingsClient initialRankings={rankings} />
        </>
      )}
    </div>
  );
}

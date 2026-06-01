import { Star, CheckCircle2, Video, Users, Award } from "lucide-react";
import type { Bird } from "@/types";
import { formatNumber } from "@/lib/utils";

export default function TrustCard({ bird }: { bird: Bird }) {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-card p-5 space-y-4">
      <h3 className="font-semibold text-text-primary">Độ tin cậy</h3>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
          <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
        </div>
        <div>
          <p className="text-2xl font-bold text-text-primary">{bird.rating}</p>
          <p className="text-xs text-muted">Điểm đánh giá</p>
        </div>
        <div className="ml-auto flex gap-0.5">
          {[1,2,3,4,5].map((i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i <= Math.round(bird.rating) ? "fill-amber-400 text-amber-400" : "text-border"}`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {/* Verified */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className={`w-4 h-4 ${bird.verified ? "text-blue-500" : "text-border"}`} />
            <span className="text-sm text-text-primary">Hồ sơ xác thực</span>
          </div>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${bird.verified ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}>
            {bird.verified ? "Đã xác thực" : "Chưa xác thực"}
          </span>
        </div>

        {/* Videos */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-text-primary">Số video</span>
          </div>
          <span className="text-sm font-semibold text-text-primary">{bird.videoCount}</span>
        </div>

        {/* Followers */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary-500" />
            <span className="text-sm text-text-primary">Người theo dõi</span>
          </div>
          <span className="text-sm font-semibold text-text-primary">{formatNumber(bird.followers)}</span>
        </div>

        {/* Achievements */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-text-primary">Thành tích</span>
          </div>
          <span className="text-sm font-semibold text-text-primary">{bird.achievements.length}</span>
        </div>
      </div>

      {/* Trust Score Bar */}
      <div className="pt-2 border-t border-border">
        <div className="flex justify-between text-xs text-muted mb-2">
          <span>Điểm tổng hợp</span>
          <span className="font-semibold text-primary-600">{bird.score?.toLocaleString() ?? "—"}</span>
        </div>
        <div className="w-full bg-accent rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary-400 to-primary-600 h-2 rounded-full transition-all"
            style={{ width: `${Math.min(100, ((bird.score ?? 5000) / 10000) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

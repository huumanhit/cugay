import Image from "next/image";
import { Calendar, Play } from "lucide-react";
import { getEventTypeColor } from "@/lib/utils";
import type { TimelineEvent as TEvent } from "@/types";

const EVENT_ICONS: Record<string, string> = {
  milestone: "🎯",
  award: "🏆",
  health: "💚",
  training: "⚡",
  other: "📝",
};

export default function TimelineEventCard({ event, isLast }: { event: TEvent; isLast?: boolean }) {
  const date = new Date(event.date);
  const formatted = date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="flex gap-4">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-white border-2 border-primary-400 flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
          {EVENT_ICONS[event.type] ?? "📝"}
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-border mt-2 mb-0" />}
      </div>

      {/* Content */}
      <div className={`flex-1 bg-white rounded-2xl border border-border shadow-card p-5 ${isLast ? "" : "mb-6"}`}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-semibold text-text-primary">{event.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="w-3.5 h-3.5 text-muted" />
              <span className="text-xs text-muted">{formatted}</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getEventTypeColor(event.type)}`}>
                {event.type === "milestone" ? "Cột mốc"
                  : event.type === "award" ? "Giải thưởng"
                  : event.type === "health" ? "Sức khỏe"
                  : event.type === "training" ? "Tập luyện"
                  : "Khác"}
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted leading-relaxed">{event.description}</p>

        {event.image && (
          <div className="mt-4 relative aspect-video rounded-xl overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 600px"
            />
          </div>
        )}

        {event.videoUrl && (
          <div className="mt-4 flex items-center gap-2 bg-accent rounded-xl p-3 cursor-pointer hover:bg-primary-50 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Play className="w-4 h-4 text-white fill-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">Xem video</p>
              <p className="text-xs text-muted">Nhấn để phát</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

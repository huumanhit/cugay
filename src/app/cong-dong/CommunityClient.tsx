"use client";

import { useState } from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import ClubCard from "@/components/community/ClubCard";
import type { Club } from "@/types";

const TABS = ["CLB", "Sự kiện", "Hoạt động"];

const STATIC_EVENTS = [
  {
    id: "e1", title: "Giải Cu Gáy Toàn Quốc 2025", type: "competition",
    date: "2025-07-15", location: "Cung VH Lao Động TP.HCM",
    description: "Giải đấu lớn nhất năm 2025 quy tụ hơn 200 chiến binh từ khắp 63 tỉnh thành.",
    organizer: "Hội Cu Gáy Việt Nam", attendees: 1800,
  },
  {
    id: "e2", title: "Hội Tụ Cu Gáy Miền Bắc 2025", type: "exhibition",
    date: "2025-06-20", location: "Công Viên Thống Nhất, Hà Nội",
    description: "Sự kiện giao lưu và triển lãm chim cu gáy đặc sắc nhất miền Bắc năm 2025.",
    organizer: "CLB Cu Gáy Hà Nội", attendees: 950,
  },
  {
    id: "e3", title: "Giao Lưu CLB Miền Trung Lần 5", type: "meetup",
    date: "2025-06-08", location: "Công Viên APEC, Đà Nẵng",
    description: "Buổi giao lưu thân thiện giữa các CLB cu gáy từ Nghệ An đến Bình Định.",
    organizer: "CLB Cu Gáy Đà Nẵng", attendees: 420,
  },
];

const STATIC_ACTIVITY = [
  { user: "Nguyễn Văn Mạnh", action: "vừa tạo hồ sơ mới cho", target: "Dũng Sĩ Tây Đô II", time: "2 phút trước", avatar: "https://i.pravatar.cc/150?img=1" },
  { user: "Trần Đức Long", action: "đã đăng tin bán", target: "Chiến Binh Hà Thành", time: "15 phút trước", avatar: "https://i.pravatar.cc/150?img=2" },
  { user: "Lê Hoàng Phúc", action: "đã thêm thành tích cho", target: "Kim Cương Đà Lạt", time: "1 giờ trước", avatar: "https://i.pravatar.cc/150?img=3" },
  { user: "Phạm Quốc Tuấn", action: "vừa gia nhập", target: "CLB Cu Gáy Sài Gòn", time: "3 giờ trước", avatar: "https://i.pravatar.cc/150?img=4" },
];

interface Props { clubs: Club[] }

export default function CommunityClient({ clubs }: Props) {
  const [tab, setTab] = useState("CLB");

  return (
    <>
      <div className="flex gap-1 bg-accent rounded-xl p-1 mb-6 w-fit">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t ? "bg-white text-text-primary shadow-sm" : "text-muted hover:text-text-primary"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "CLB" && (
        clubs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clubs.map((club) => <ClubCard key={club.id} club={club} />)}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-border">
            <p className="text-4xl mb-3">🏆</p>
            <p className="font-semibold text-text-primary">Chưa có CLB nào</p>
          </div>
        )
      )}

      {tab === "Sự kiện" && (
        <div className="space-y-4">
          {STATIC_EVENTS.map((event) => {
            const d = new Date(event.date);
            return (
              <div key={event.id} className="bg-white rounded-2xl border border-border shadow-card p-5 hover:shadow-card-hover transition-all cursor-pointer group">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-16 text-center bg-primary-50 rounded-xl py-3 px-2">
                    <p className="text-xl font-bold text-primary-600 leading-tight">{d.getDate()}</p>
                    <p className="text-[10px] text-primary-400 uppercase font-semibold">
                      {d.toLocaleDateString("vi-VN", { month: "short" })}
                    </p>
                  </div>
                  <div className="flex-1">
                    <span className={`text-[10px] font-semibold uppercase tracking-wide ${
                      event.type === "competition" ? "text-red-500" : event.type === "exhibition" ? "text-purple-500" : "text-blue-500"
                    }`}>
                      {event.type === "competition" ? "Thi đấu" : event.type === "exhibition" ? "Triển lãm" : "Giao lưu"}
                    </span>
                    <h3 className="font-bold text-text-primary group-hover:text-primary-600 transition-colors">{event.title}</h3>
                    <p className="text-sm text-muted mt-1 line-clamp-2">{event.description}</p>
                    <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {event.attendees.toLocaleString()} người</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "Hoạt động" && (
        <div className="max-w-2xl space-y-3">
          {STATIC_ACTIVITY.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border shadow-card p-4 flex items-start gap-3">
              <img src={item.avatar} alt={item.user} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-text-primary">
                  <span className="font-semibold">{item.user}</span>{" "}{item.action}{" "}
                  <span className="text-primary-600 font-semibold">{item.target}</span>
                </p>
                <p className="text-xs text-muted mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

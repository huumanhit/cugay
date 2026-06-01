"use client";

import { useState } from "react";
import { Users, Calendar, MapPin, Flame } from "lucide-react";
import ClubCard from "@/components/community/ClubCard";
import { MOCK_CLUBS, MOCK_EVENTS } from "@/lib/mock-data";
import Image from "next/image";

const TABS = ["CLB", "Sự kiện", "Hoạt động"];

export default function CommunityPage() {
  const [tab, setTab] = useState("CLB");

  return (
    <div className="px-4 lg:px-8 py-6 animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Cộng đồng</h1>
        <p className="text-sm text-muted mt-1">Kết nối với hàng nghìn người chơi cu gáy trên cả nước</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { icon: Users, label: "CLB hoạt động", value: "284", color: "text-blue-500 bg-blue-50" },
          { icon: Calendar, label: "Sự kiện tháng 6", value: "12", color: "text-purple-500 bg-purple-50" },
          { icon: Flame, label: "Thành viên online", value: "1,240", color: "text-red-500 bg-red-50" },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-2xl border border-border shadow-card p-4 text-center">
            <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-2`}>
              <item.icon className="w-5 h-5" />
            </div>
            <p className="text-xl font-bold text-text-primary">{item.value}</p>
            <p className="text-xs text-muted">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
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

      {/* Club directory */}
      {tab === "CLB" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_CLUBS.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      )}

      {/* Events */}
      {tab === "Sự kiện" && (
        <div className="space-y-4">
          {MOCK_EVENTS.map((event) => {
            const d = new Date(event.date);
            return (
              <div key={event.id} className="bg-white rounded-2xl border border-border shadow-card overflow-hidden group hover:shadow-card-hover transition-all cursor-pointer">
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="relative sm:w-48 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="192px"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                        event.type === "competition" ? "bg-red-500 text-white"
                          : event.type === "exhibition" ? "bg-purple-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}>
                        {event.type === "competition" ? "Thi đấu" : event.type === "exhibition" ? "Triển lãm" : "Giao lưu"}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 p-5">
                    <h3 className="font-bold text-text-primary text-lg group-hover:text-primary-600 transition-colors">{event.title}</h3>
                    <p className="text-sm text-muted mt-1 line-clamp-2">{event.description}</p>

                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <Calendar className="w-4 h-4 text-primary-400" />
                        {d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <MapPin className="w-4 h-4 text-primary-400" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <Users className="w-4 h-4 text-primary-400" />
                        {event.attendees.toLocaleString()} người tham dự
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                      <p className="text-xs text-muted">Tổ chức bởi: <span className="font-medium text-text-primary">{event.organizer}</span></p>
                      <button className="ml-auto bg-primary-500 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                        Đăng ký tham gia
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Activity Feed */}
      {tab === "Hoạt động" && (
        <div className="max-w-2xl">
          <div className="space-y-3">
            {[
              { user: "Nguyễn Văn Mạnh", action: "vừa tạo hồ sơ mới cho", target: "Dũng Sĩ Tây Đô II", time: "2 phút trước", avatar: "https://i.pravatar.cc/150?img=1" },
              { user: "Trần Đức Long", action: "đã đăng tin bán", target: "Chiến Binh Hà Thành", time: "15 phút trước", avatar: "https://i.pravatar.cc/150?img=2" },
              { user: "Lê Hoàng Phúc", action: "đã thêm thành tích cho", target: "Kim Cương Đà Lạt", time: "1 giờ trước", avatar: "https://i.pravatar.cc/150?img=3" },
              { user: "Phạm Quốc Tuấn", action: "vừa gia nhập", target: "CLB Cu Gáy Sài Gòn", time: "3 giờ trước", avatar: "https://i.pravatar.cc/150?img=4" },
              { user: "Hoàng Minh Tuấn", action: "đã cập nhật nhật ký cho", target: "Ngọc Trai Xứ Huế", time: "5 giờ trước", avatar: "https://i.pravatar.cc/150?img=5" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-border shadow-card p-4 flex items-start gap-3">
                <img src={item.avatar} alt={item.user} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-text-primary">
                    <span className="font-semibold">{item.user}</span>
                    {" "}{item.action}{" "}
                    <span className="text-primary-600 font-semibold">{item.target}</span>
                  </p>
                  <p className="text-xs text-muted mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

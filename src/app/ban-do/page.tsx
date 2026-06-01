"use client";

import { useState } from "react";
import { MapPin, Users, Coffee, ShoppingBag, Filter } from "lucide-react";

const LOCATION_TYPES = [
  { value: "all", label: "Tất cả", icon: MapPin, color: "text-primary-500" },
  { value: "club", label: "CLB", icon: Users, color: "text-blue-500" },
  { value: "cafe", label: "Quán chim", icon: Coffee, color: "text-amber-500" },
  { value: "market", label: "Chợ chim", icon: ShoppingBag, color: "text-purple-500" },
];

const LOCATIONS = [
  { id: 1, name: "CLB Cu Gáy Sài Gòn", type: "club", province: "TP. Hồ Chí Minh", address: "12 Nguyễn Đình Chiểu, Q.1", members: 680 },
  { id: 2, name: "CLB Cu Gáy Hà Nội", type: "club", province: "Hà Nội", address: "Công Viên Thống Nhất, Hai Bà Trưng", members: 520 },
  { id: 3, name: "Quán Chim Minh Phúc", type: "cafe", province: "TP. Hồ Chí Minh", address: "45 Lê Văn Sỹ, Q.3", members: 0 },
  { id: 4, name: "Chợ Chim Thủ Đức", type: "market", province: "TP. Hồ Chí Minh", address: "Chợ Thủ Đức, Thủ Đức", members: 0 },
  { id: 5, name: "CLB Cu Gáy Đà Nẵng", type: "club", province: "Đà Nẵng", address: "Công Viên APEC, Sơn Trà", members: 210 },
  { id: 6, name: "Quán Chim Phú Quốc", type: "cafe", province: "Kiên Giang", address: "68 Trần Hưng Đạo, Dương Đông", members: 0 },
];

const TYPE_COLORS: Record<string, string> = {
  club: "bg-blue-100 text-blue-700",
  cafe: "bg-amber-100 text-amber-700",
  market: "bg-purple-100 text-purple-700",
};

const TYPE_LABELS: Record<string, string> = {
  club: "CLB",
  cafe: "Quán chim",
  market: "Chợ chim",
};

export default function MapPage() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = LOCATIONS.filter((l) => typeFilter === "all" || l.type === typeFilter);

  return (
    <div className="px-4 lg:px-8 py-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Bản đồ</h1>
        <p className="text-sm text-muted mt-1">Tìm CLB, quán chim và chợ chim gần bạn</p>
      </div>

      <div className="grid lg:grid-cols-[320px_1fr] gap-4">
        {/* Sidebar */}
        <div className="space-y-3">
          {/* Type filter */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-semibold text-text-primary">Loại địa điểm</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {LOCATION_TYPES.map(({ value, label, icon: Icon, color }) => (
                <button
                  key={value}
                  onClick={() => setTypeFilter(value)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-sm border transition-all ${
                    typeFilter === value
                      ? "bg-primary-50 border-primary-300 text-primary-700"
                      : "bg-white border-border text-muted hover:border-primary-200"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${typeFilter === value ? "text-primary-500" : color}`} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Location list */}
          <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="p-3 border-b border-border bg-accent">
              <p className="text-xs font-semibold text-muted uppercase tracking-wide">
                {filtered.length} địa điểm
              </p>
            </div>
            <div className="divide-y divide-border max-h-96 overflow-y-auto">
              {filtered.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelected(loc.id)}
                  className={`w-full text-left p-4 hover:bg-accent transition-colors ${
                    selected === loc.id ? "bg-primary-50" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{loc.name}</p>
                      <p className="text-xs text-muted mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {loc.address}
                      </p>
                      {loc.members > 0 && (
                        <p className="text-xs text-muted mt-0.5 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {loc.members} thành viên
                        </p>
                      )}
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${TYPE_COLORS[loc.type]}`}>
                      {TYPE_LABELS[loc.type]}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Map area */}
        <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden" style={{ minHeight: "500px" }}>
          {/* Map placeholder - in production use Leaflet/Google Maps */}
          <div className="relative w-full h-full min-h-[500px] bg-gradient-to-br from-primary-50 to-secondary-300/20 flex items-center justify-center">
            {/* Decorative map grid */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "linear-gradient(#2F9E44 1px, transparent 1px), linear-gradient(90deg, #2F9E44 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative z-10 text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <h3 className="font-bold text-text-primary text-lg">Bản đồ tương tác</h3>
              <p className="text-sm text-muted mt-1 max-w-sm">
                Tích hợp Google Maps / Mapbox trong phiên bản sản xuất để hiển thị
                vị trí CLB, quán chim và điểm tụ họp trên cả nước.
              </p>

              {/* Floating pins */}
              <div className="flex gap-3 mt-6 justify-center flex-wrap">
                {LOCATIONS.slice(0, 4).map((loc) => (
                  <div key={loc.id} className={`bg-white rounded-xl shadow-card border px-3 py-2 text-xs font-medium flex items-center gap-1.5 ${selected === loc.id ? "border-primary-400 text-primary-700" : "border-border text-text-primary"}`}>
                    <MapPin className={`w-3 h-3 ${TYPE_COLORS[loc.type]?.split(" ")[1] ?? "text-primary-500"}`} />
                    {loc.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Location detail popup when selected */}
            {selected && (
              <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl shadow-card-hover border border-border p-4">
                {(() => {
                  const loc = LOCATIONS.find((l) => l.id === selected);
                  if (!loc) return null;
                  return (
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${TYPE_COLORS[loc.type]}`}>
                            {TYPE_LABELS[loc.type]}
                          </span>
                          <span className="text-xs text-muted">{loc.province}</span>
                        </div>
                        <p className="font-semibold text-text-primary">{loc.name}</p>
                        <p className="text-xs text-muted mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {loc.address}
                        </p>
                        {loc.members > 0 && (
                          <p className="text-xs text-muted mt-0.5 flex items-center gap-1">
                            <Users className="w-3 h-3" /> {loc.members} thành viên
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => setSelected(null)}
                        className="text-muted hover:text-text-primary transition-colors text-lg leading-none"
                      >
                        ×
                      </button>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

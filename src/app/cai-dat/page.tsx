"use client";

import { useState } from "react";
import { User, Bell, Lock, CreditCard, Globe, ChevronRight, Check } from "lucide-react";
import { Input } from "@/components/ui/input";

const MENU_ITEMS = [
  { icon: User, label: "Thông tin cá nhân", id: "profile" },
  { icon: Bell, label: "Thông báo", id: "notifications" },
  { icon: Lock, label: "Bảo mật", id: "security" },
  { icon: CreditCard, label: "Gói thành viên", id: "billing" },
  { icon: Globe, label: "Ngôn ngữ & Vùng", id: "locale" },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="px-4 lg:px-8 py-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Cài đặt</h1>
        <p className="text-sm text-muted mt-1">Quản lý tài khoản và tuỳ chỉnh trải nghiệm của bạn</p>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-6">
        {/* Settings menu */}
        <div className="bg-white rounded-2xl border border-border shadow-card p-2 h-fit">
          {MENU_ITEMS.map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-left ${
                activeSection === id
                  ? "bg-primary-50 text-primary-700"
                  : "text-muted hover:bg-accent hover:text-text-primary"
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${activeSection === id ? "text-primary-500" : ""}`} />
              <span className="text-sm font-medium flex-1">{label}</span>
              <ChevronRight className={`w-3.5 h-3.5 ${activeSection === id ? "text-primary-400" : "text-border"}`} />
            </button>
          ))}
        </div>

        {/* Settings content */}
        <div className="bg-white rounded-2xl border border-border shadow-card p-6">
          {activeSection === "profile" && (
            <div>
              <h2 className="text-lg font-bold text-text-primary mb-5">Thông tin cá nhân</h2>

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                <img
                  src="https://i.pravatar.cc/150?img=3"
                  alt="Avatar"
                  className="w-20 h-20 rounded-2xl object-cover"
                />
                <div>
                  <p className="font-semibold text-text-primary">Nguyễn Văn A</p>
                  <p className="text-sm text-muted">Thành viên Pro · Tham gia từ 2022</p>
                  <button className="mt-2 text-sm text-primary-600 font-medium hover:underline">
                    Thay đổi ảnh đại diện
                  </button>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Họ</label>
                    <Input defaultValue="Nguyễn" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Tên</label>
                    <Input defaultValue="Văn A" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Email</label>
                  <Input type="email" defaultValue="nguyenvana@gmail.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Số điện thoại</label>
                  <Input type="tel" defaultValue="0901 234 567" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Tỉnh/Thành phố</label>
                  <select className="w-full h-10 border border-border rounded-xl px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-300 text-text-primary">
                    <option>TP. Hồ Chí Minh</option>
                    <option>Hà Nội</option>
                    <option>Đà Nẵng</option>
                    <option>Cần Thơ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Giới thiệu bản thân</label>
                  <textarea
                    rows={3}
                    defaultValue="Người chơi cu gáy lâu năm tại TP.HCM. Chuyên dòng chim Thổ và Kim."
                    className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none text-text-primary placeholder:text-muted"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t border-border">
                <button
                  onClick={handleSave}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    saved
                      ? "bg-green-500 text-white"
                      : "bg-primary-500 text-white hover:bg-primary-600"
                  }`}
                >
                  {saved ? <><Check className="w-4 h-4" /> Đã lưu!</> : "Lưu thay đổi"}
                </button>
                <button className="px-5 py-2.5 rounded-xl border border-border text-muted hover:bg-accent font-semibold text-sm transition-all">
                  Huỷ
                </button>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div>
              <h2 className="text-lg font-bold text-text-primary mb-5">Cài đặt thông báo</h2>
              <div className="space-y-4">
                {[
                  { label: "Người theo dõi mới", desc: "Khi có người theo dõi hồ sơ chim của bạn", enabled: true },
                  { label: "Tin nhắn mới", desc: "Khi có người liên hệ qua CuGay.vn", enabled: true },
                  { label: "Kết quả xếp hạng", desc: "Cập nhật bảng xếp hạng hàng tuần", enabled: false },
                  { label: "Sự kiện gần bạn", desc: "Giải đấu và giao lưu trong tỉnh bạn", enabled: true },
                  { label: "Tin tức & cập nhật", desc: "Bài viết mới và tính năng mới của CuGay.vn", enabled: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-accent rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-text-primary">{item.label}</p>
                      <p className="text-xs text-muted mt-0.5">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                      <div className="w-10 h-6 bg-border peer-checked:bg-primary-500 rounded-full transition-colors peer-focus:ring-2 peer-focus:ring-primary-300 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-4" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "billing" && (
            <div>
              <h2 className="text-lg font-bold text-text-primary mb-5">Gói thành viên</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    name: "Cơ bản",
                    price: "Miễn phí",
                    features: ["3 hồ sơ chim", "Đăng 1 tin/tháng", "Xem bảng xếp hạng"],
                    current: false,
                    color: "border-border",
                  },
                  {
                    name: "Pro",
                    price: "99.000đ/tháng",
                    features: ["Hồ sơ không giới hạn", "Đăng tin không giới hạn", "Phân tích chuyên sâu", "Huy hiệu xác thực Pro", "Ưu tiên hiển thị"],
                    current: true,
                    color: "border-primary-400 bg-primary-50",
                  },
                ].map((plan) => (
                  <div key={plan.name} className={`rounded-2xl border-2 p-5 ${plan.color}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-text-primary text-lg">{plan.name}</p>
                        <p className="text-primary-600 font-semibold mt-0.5">{plan.price}</p>
                      </div>
                      {plan.current && (
                        <span className="bg-primary-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                          Hiện tại
                        </span>
                      )}
                    </div>
                    <ul className="mt-4 space-y-2">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-text-primary">
                          <Check className="w-4 h-4 text-primary-500 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {!plan.current && (
                      <button className="w-full mt-4 py-2.5 rounded-xl bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-colors">
                        Nâng cấp ngay
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div>
              <h2 className="text-lg font-bold text-text-primary mb-5">Bảo mật tài khoản</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Mật khẩu hiện tại</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Mật khẩu mới</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Xác nhận mật khẩu mới</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <button className="bg-primary-500 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-600 transition-colors text-sm">
                  Cập nhật mật khẩu
                </button>
              </div>
            </div>
          )}

          {activeSection === "locale" && (
            <div>
              <h2 className="text-lg font-bold text-text-primary mb-5">Ngôn ngữ & Vùng</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Ngôn ngữ</label>
                  <select className="w-full h-10 border border-border rounded-xl px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-300 text-text-primary">
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Múi giờ</label>
                  <select className="w-full h-10 border border-border rounded-xl px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-300 text-text-primary">
                    <option>(UTC+7) Giờ Đông Dương</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Định dạng tiền tệ</label>
                  <select className="w-full h-10 border border-border rounded-xl px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-300 text-text-primary">
                    <option>VNĐ (đ)</option>
                    <option>USD ($)</option>
                  </select>
                </div>
                <button className="bg-primary-500 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-600 transition-colors text-sm">
                  Lưu cài đặt
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

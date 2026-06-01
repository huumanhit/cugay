"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home, Bird, ShoppingBag, BookOpen, Trophy,
  Users, Map, Newspaper, Settings, Zap, ChevronRight, PlusCircle,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/ho-so-chim", label: "Hồ sơ chim", icon: Bird },
  { href: "/cho-chim", label: "Chợ chim", icon: ShoppingBag },
  { href: "/dang-tin", label: "Đăng tin bán", icon: PlusCircle, highlight: true },
  { href: "/nhat-ky", label: "Nhật ký", icon: BookOpen },
  { href: "/bang-xep-hang", label: "Bảng xếp hạng", icon: Trophy },
  { href: "/cong-dong", label: "Cộng đồng", icon: Users },
  { href: "/ban-do", label: "Bản đồ", icon: Map },
  { href: "/tin-tuc", label: "Tin tức", icon: Newspaper },
  { href: "/cai-dat", label: "Cài đặt", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white border-r border-border fixed top-0 left-0 z-30">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-border">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <Bird className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-text-primary text-lg leading-tight">CuGay.vn</p>
            <p className="text-xs text-muted leading-tight">Mỗi con chim, một câu chuyện.</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon, highlight }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          if (highlight) {
            return (
              <Link key={href} href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 bg-primary-500 text-white hover:bg-primary-600 my-1">
                <Icon className="w-5 h-5 flex-shrink-0" />
                {label}
              </Link>
            );
          }
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group",
                active
                  ? "bg-primary-50 text-primary-600"
                  : "text-muted hover:bg-accent hover:text-text-primary"
              )}
            >
              <Icon className={cn("w-5 h-5 flex-shrink-0 transition-colors", active ? "text-primary-500" : "text-muted group-hover:text-text-primary")} />
              {label}
              {active && <ChevronRight className="w-3.5 h-3.5 ml-auto text-primary-400" />}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade Card */}
      <div className="p-4 border-t border-border">
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 fill-yellow-300 text-yellow-300" />
            <span className="font-semibold text-sm">Nâng cấp Pro</span>
          </div>
          <p className="text-xs text-primary-100 mb-3 leading-relaxed">
            Mở khóa hồ sơ không giới hạn, phân tích chuyên sâu và huy hiệu xác thực.
          </p>
          <button className="w-full bg-white text-primary-600 text-xs font-semibold py-2 rounded-lg hover:bg-primary-50 transition-colors">
            Dùng thử miễn phí
          </button>
        </div>
      </div>
    </aside>
  );
}

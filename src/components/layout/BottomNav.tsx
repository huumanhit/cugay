"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Bird, PlusCircle, ShoppingBag, Newspaper } from "lucide-react";

const BOTTOM_NAV_ITEMS = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/ho-so-chim", label: "Hồ sơ", icon: Bird },
  { href: "/dang-tin", label: "Đăng tin", icon: PlusCircle, highlight: true },
  { href: "/cho-chim", label: "Chợ chim", icon: ShoppingBag },
  { href: "/tin-tuc", label: "Tin tức", icon: Newspaper },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border pb-safe">
        <div className="flex items-center justify-around px-2 py-2">
          {BOTTOM_NAV_ITEMS.map(({ href, label, icon: Icon, highlight }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            if (highlight) {
              return (
                <Link key={href} href={href} className="flex flex-col items-center gap-0.5 px-3 py-1.5 min-w-[56px]">
                  <div className="w-10 h-7 flex items-center justify-center rounded-full bg-primary-500 shadow-sm">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-semibold text-primary-600">{label}</span>
                </Link>
              );
            }
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-0.5 px-3 py-1.5 min-w-[56px]"
              >
                <div
                  className={cn(
                    "w-10 h-6 flex items-center justify-center rounded-full transition-all duration-200",
                    active ? "bg-primary-100" : ""
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-colors",
                      active ? "text-primary-600" : "text-muted"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "text-[10px] font-medium transition-colors",
                    active ? "text-primary-600" : "text-muted"
                  )}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

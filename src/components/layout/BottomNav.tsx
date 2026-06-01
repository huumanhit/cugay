"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Bird, ShoppingBag, Users, User } from "lucide-react";

const BOTTOM_NAV_ITEMS = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/ho-so-chim", label: "Hồ sơ", icon: Bird },
  { href: "/cho-chim", label: "Chợ chim", icon: ShoppingBag },
  { href: "/cong-dong", label: "Cộng đồng", icon: Users },
  { href: "/cai-dat", label: "Cá nhân", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Floating Action Button */}
      <button
        className="lg:hidden fixed bottom-20 right-4 z-50 w-14 h-14 bg-primary-500 rounded-full shadow-lg flex items-center justify-center text-white text-2xl font-light hover:bg-primary-600 active:scale-95 transition-all"
        aria-label="Tạo mới"
      >
        +
      </button>

      {/* Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border pb-safe">
        <div className="flex items-center justify-around px-2 py-2">
          {BOTTOM_NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
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

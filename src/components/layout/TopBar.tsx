"use client";

import Link from "next/link";
import { Bell, Search, Bird, X } from "lucide-react";
import { useState } from "react";

export default function TopBar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-border h-14 lg:h-16 flex items-center px-4 lg:px-8 gap-3">

      {/* Mobile: Search overlay */}
      {searchOpen && (
        <div className="absolute inset-0 bg-white flex items-center px-4 gap-2 z-10 lg:hidden">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              autoFocus
              type="text"
              placeholder="Tìm chim, chủ nhân, CLB..."
              className="w-full pl-9 pr-4 py-2.5 bg-accent rounded-xl text-sm border border-transparent focus:border-primary-300 focus:bg-white focus:outline-none transition-all placeholder:text-muted"
            />
          </div>
          <button onClick={() => setSearchOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-accent transition-colors flex-shrink-0">
            <X className="w-5 h-5 text-muted" />
          </button>
        </div>
      )}

      {/* Logo (mobile) */}
      <Link href="/" className="lg:hidden flex items-center gap-2 flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center shadow-sm">
          <Bird className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-text-primary text-base">CuGay.vn</span>
      </Link>

      {/* Search bar (desktop) */}
      <div className="flex-1 max-w-md hidden lg:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Tìm kiếm chim, chủ nhân, CLB..."
            className="w-full pl-9 pr-4 py-2 bg-accent rounded-xl text-sm border border-transparent focus:border-primary-300 focus:bg-white focus:outline-none transition-all placeholder:text-muted"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-1">
        {/* Search icon (mobile) */}
        <button
          onClick={() => setSearchOpen(true)}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-accent transition-colors"
        >
          <Search className="w-5 h-5 text-muted" />
        </button>

        {/* Notification */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-accent transition-colors">
          <Bell className="w-5 h-5 text-muted" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Avatar */}
        <button className="flex items-center gap-2 pl-1.5 pr-1 py-1 rounded-xl hover:bg-accent transition-colors ml-1">
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="Avatar"
            className="w-8 h-8 rounded-lg object-cover"
          />
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-text-primary leading-tight">Nguyễn Văn A</p>
            <p className="text-[10px] text-muted leading-tight">Thành viên Pro</p>
          </div>
        </button>
      </div>
    </header>
  );
}

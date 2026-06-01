"use client";

import Link from "next/link";
import { Bell, Search, Bird } from "lucide-react";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-border h-16 flex items-center px-4 lg:px-8 gap-4">
      {/* Mobile Logo */}
      <Link href="/" className="lg:hidden flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
          <Bird className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-text-primary">CuGay.vn</span>
      </Link>

      {/* Search */}
      <div className="flex-1 max-w-md hidden sm:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Tìm kiếm chim, chủ nhân, CLB..."
            className="w-full pl-9 pr-4 py-2 bg-accent rounded-xl text-sm border border-transparent focus:border-primary-300 focus:bg-white focus:outline-none transition-all placeholder:text-muted"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Notification */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-accent transition-colors">
          <Bell className="w-5 h-5 text-muted" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Avatar */}
        <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-accent transition-colors">
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="Avatar"
            className="w-8 h-8 rounded-lg object-cover"
          />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-text-primary leading-tight">Nguyễn Văn A</p>
            <p className="text-[10px] text-muted leading-tight">Thành viên Pro</p>
          </div>
        </button>
      </div>
    </header>
  );
}

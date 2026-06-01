import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatVND(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(1)} tỷ`;
  }
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(0)} triệu`;
  }
  return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
}

export function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return "vừa xong";
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} ngày trước`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} tháng trước`;
  return `${Math.floor(diff / 31536000)} năm trước`;
}

export function getVoiceColor(voice: string): string {
  const map: Record<string, string> = {
    Thổ: "bg-amber-100 text-amber-700",
    Đồng: "bg-orange-100 text-orange-700",
    Kim: "bg-yellow-100 text-yellow-700",
    Thủy: "bg-blue-100 text-blue-700",
    Đấu: "bg-red-100 text-red-700",
    Vàng: "bg-emerald-100 text-emerald-700",
  };
  return map[voice] ?? "bg-gray-100 text-gray-700";
}

export function getEventTypeColor(type: string): string {
  const map: Record<string, string> = {
    milestone: "bg-primary-100 text-primary-700",
    award: "bg-yellow-100 text-yellow-700",
    health: "bg-blue-100 text-blue-700",
    training: "bg-purple-100 text-purple-700",
    other: "bg-gray-100 text-gray-700",
  };
  return map[type] ?? "bg-gray-100 text-gray-700";
}

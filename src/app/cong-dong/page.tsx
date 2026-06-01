import { Users, Calendar, Flame } from "lucide-react";
import ClubCard from "@/components/community/ClubCard";
import CommunityClient from "./CommunityClient";
import { getClubs } from "@/lib/db";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cộng đồng – CuGay.vn" };
export const revalidate = 120;

export default async function CommunityPage() {
  const clubs = await getClubs();

  return (
    <div className="px-4 lg:px-8 py-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Cộng đồng</h1>
        <p className="text-sm text-muted mt-1">Kết nối với hàng nghìn người chơi cu gáy trên cả nước</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { icon: Users, label: "CLB hoạt động", value: clubs.length.toString(), color: "text-blue-500 bg-blue-50" },
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

      <CommunityClient clubs={clubs} />
    </div>
  );
}

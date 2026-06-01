import { Bird, Users, ShoppingBag, Shield } from "lucide-react";

const STAT_ITEMS = [
  {
    label: "Hồ sơ chim",
    value: "12,847",
    icon: Bird,
    color: "bg-primary-50 text-primary-600",
    trend: "+284 tuần này",
  },
  {
    label: "Thành viên",
    value: "38,420",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
    trend: "+1,200 tháng này",
  },
  {
    label: "Giao dịch",
    value: "5,640",
    icon: ShoppingBag,
    color: "bg-purple-50 text-purple-600",
    trend: "+89 tuần này",
  },
  {
    label: "CLB tham gia",
    value: "284",
    icon: Shield,
    color: "bg-amber-50 text-amber-600",
    trend: "+12 tháng này",
  },
];

export default function StatsSection() {
  return (
    <section className="px-4 lg:px-8 mb-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_ITEMS.map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-2xl border border-border shadow-card p-4 lg:p-5 hover:shadow-card-hover transition-shadow"
          >
            <div className={`w-9 h-9 lg:w-10 lg:h-10 rounded-xl ${item.color} flex items-center justify-center mb-2 lg:mb-3`}>
              <item.icon className="w-4 h-4 lg:w-5 lg:h-5" />
            </div>
            <p className="text-xl lg:text-2xl font-bold text-text-primary">{item.value}</p>
            <p className="text-xs lg:text-sm text-muted mt-0.5">{item.label}</p>
            <p className="text-xs text-primary-500 font-medium mt-1.5">{item.trend}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

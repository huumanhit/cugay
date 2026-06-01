import Image from "next/image";
import { MapPin, Users, CheckCircle2 } from "lucide-react";
import type { Club } from "@/types";

export default function ClubCard({ club }: { club: Club }) {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group cursor-pointer">
      {/* Cover */}
      <div className="relative h-32 overflow-hidden">
        <Image
          src={club.coverImage}
          alt={club.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
        {club.verified && (
          <div className="absolute top-2 right-2">
            <span className="bg-blue-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Xác thực
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start gap-3">
          <img
            src={club.logo}
            alt={club.name}
            className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm -mt-6 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary text-sm truncate group-hover:text-primary-600 transition-colors">
              {club.name}
            </h3>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-muted" />
              <span className="text-xs text-muted">{club.province}</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted mt-3 line-clamp-2">{club.description}</p>

        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-1 text-xs text-muted">
            <Users className="w-3.5 h-3.5 text-primary-400" />
            <span className="font-medium text-text-primary">{club.memberCount}</span>
            <span>thành viên</span>
          </div>
          <span className="text-xs text-muted ml-auto">
            Thành lập {new Date(club.founded).getFullYear()}
          </span>
        </div>

        <button className="w-full mt-3 py-2 rounded-xl border border-primary-200 text-primary-600 text-xs font-semibold hover:bg-primary-50 transition-colors">
          Xem CLB
        </button>
      </div>
    </div>
  );
}

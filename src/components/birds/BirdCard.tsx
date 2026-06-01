import Link from "next/link";
import Image from "next/image";
import { Eye, Heart, CheckCircle2, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatNumber, getVoiceColor } from "@/lib/utils";
import type { Bird } from "@/types";

interface BirdCardProps {
  bird: Bird;
  compact?: boolean;
}

export default function BirdCard({ bird, compact = false }: BirdCardProps) {
  return (
    <Link href={`/ho-so-chim/${bird.id}`} className="block group">
      <div className="bg-white rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <Image
            src={bird.image}
            alt={bird.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Badges overlay */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            {bird.verified && (
              <span className="bg-blue-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Xác thực
              </span>
            )}
            {bird.rank && bird.rank <= 3 && (
              <span className="bg-amber-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Trophy className="w-3 h-3" />
                Top {bird.rank}
              </span>
            )}
          </div>
          {/* Voice badge */}
          <div className="absolute top-3 right-3">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getVoiceColor(bird.voice)}`}>
              {bird.voice}
            </span>
          </div>
          {/* For sale */}
          {bird.forSale && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-600/90 to-transparent p-3">
              <p className="text-white text-sm font-bold">
                {bird.price ? `${(bird.price / 1_000_000).toFixed(0)} triệu đ` : "Liên hệ"}
              </p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={compact ? "p-3" : "p-4"}>
          <h3 className={`font-semibold text-text-primary truncate group-hover:text-primary-600 transition-colors ${compact ? "text-sm" : ""}`}>
            {bird.name}
          </h3>

          <div className="flex items-center gap-2 mt-1.5">
            <img
              src={bird.ownerAvatar}
              alt={bird.ownerName}
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className="text-xs text-muted truncate">{bird.ownerName}</span>
            <span className="text-xs text-muted ml-auto">{bird.province}</span>
          </div>

          {!compact && (
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
              <span className="flex items-center gap-1 text-xs text-muted">
                <Eye className="w-3.5 h-3.5" />
                {formatNumber(bird.views)}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted">
                <Heart className="w-3.5 h-3.5" />
                {formatNumber(bird.likes)}
              </span>
              <Badge variant="default" className="ml-auto text-[10px]">
                {bird.age} tuổi
              </Badge>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

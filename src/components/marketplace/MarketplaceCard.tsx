import Image from "next/image";
import Link from "next/link";
import { MapPin, Eye, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatVND, formatNumber, getVoiceColor, timeAgo } from "@/lib/utils";
import type { MarketplaceListing } from "@/types";

interface Props {
  listing: MarketplaceListing;
}

export default function MarketplaceCard({ listing }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group">
      <div className="flex gap-0 sm:gap-0 flex-col sm:flex-row">
        {/* Image */}
        <div className="relative sm:w-44 h-44 sm:h-auto flex-shrink-0 overflow-hidden">
          <Image
            src={listing.birdImage}
            alt={listing.birdName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, 176px"
          />
          {listing.verified && (
            <div className="absolute top-2 left-2">
              <span className="bg-blue-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Xác thực
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-text-primary group-hover:text-primary-600 transition-colors">
                  {listing.birdName}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getVoiceColor(listing.voice)}`}>
                    {listing.voice}
                  </span>
                  <span className="text-xs text-muted">{listing.age} tuổi</span>
                  {listing.negotiable && (
                    <span className="text-[10px] text-emerald-600 font-medium">• Thương lượng</span>
                  )}
                </div>
              </div>
              <p className="text-xl font-bold text-primary-600 flex-shrink-0">
                {formatVND(listing.price)}
              </p>
            </div>

            <p className="text-xs text-muted mt-2 line-clamp-2">{listing.description}</p>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-2">
              <img
                src={listing.sellerAvatar}
                alt={listing.sellerName}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-xs text-muted">{listing.sellerName}</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {listing.province}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {formatNumber(listing.views)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {timeAgo(listing.postedAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact button */}
      <div className="px-4 pb-4">
        <Link
          href={`/ho-so-chim/${listing.birdId}`}
          className="w-full flex items-center justify-center py-2.5 rounded-xl bg-primary-50 text-primary-700 font-semibold text-sm hover:bg-primary-100 transition-colors"
        >
          Xem chi tiết & liên hệ
        </Link>
      </div>
    </div>
  );
}

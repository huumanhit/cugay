"use client";

import { useState } from "react";
import { Bird } from "lucide-react";
import { cn } from "@/lib/utils";

interface BirdImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
}

export default function BirdImage({ src, alt, className, fill }: BirdImageProps) {
  const [failed, setFailed] = useState(false);

  const imgClass = cn(
    "object-cover transition-transform duration-500 group-hover:scale-105",
    fill ? "absolute inset-0 w-full h-full" : "w-full h-full",
    className
  );

  return (
    <>
      {/* Fallback luôn hiển thị ở dưới */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-primary-50 to-secondary-300/30 flex flex-col items-center justify-center gap-2">
        <Bird className="w-12 h-12 text-primary-300" />
        <span className="text-xs text-primary-400 font-medium">{alt}</span>
      </div>

      {/* Ảnh thật đè lên trên, nếu lỗi thì ẩn đi → fallback lộ ra */}
      {!failed && (
        <img
          src={src}
          alt={alt}
          className={cn(imgClass, "relative z-10")}
          onError={() => setFailed(true)}
          loading="lazy"
        />
      )}
    </>
  );
}

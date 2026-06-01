"use client";

import { useState } from "react";
import NextImage from "next/image";
import { Bird } from "lucide-react";
import { cn } from "@/lib/utils";

interface BirdImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

const CLOUD = "res.cloudinary.com/dl51jugpu/image/upload";

function buildSrc(src: string, w: number): string {
  if (!src.includes(CLOUD)) return src;
  const q = "w_" + w + ",h_" + Math.round(w * 0.75) + ",c_fill,f_auto,q_auto";
  return src.replace("/image/upload/", "/image/upload/" + q + "/");
}

export default function BirdImage({
  src,
  alt,
  className,
  fill = false,
  width,
  height,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: BirdImageProps) {
  const [failed, setFailed] = useState(false);

  const imgClass = cn(
    "object-cover transition-transform duration-500 group-hover:scale-105",
    className
  );

  const fallback = (
    <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-primary-50 to-secondary-300/30 flex flex-col items-center justify-center gap-2">
      <Bird className="w-12 h-12 text-primary-300" />
      {alt && <span className="text-xs text-primary-400 font-medium text-center px-2 line-clamp-2">{alt}</span>}
    </div>
  );

  if (failed || !src) return fallback;

  if (fill) {
    return (
      <>
        {fallback}
        <NextImage
          src={buildSrc(src, 800)}
          alt={alt}
          fill
          className={cn(imgClass, "z-10")}
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
        />
      </>
    );
  }

  return (
    <NextImage
      src={buildSrc(src, width ?? 400)}
      alt={alt}
      width={width ?? 400}
      height={height ?? 300}
      className={imgClass}
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}

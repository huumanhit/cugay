import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    // Cho phép load ảnh từ bất kỳ domain nào (tắt whitelist)
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
    // Tắt server-side optimization cho external images
    // (tránh bị block bởi Wikimedia, iNaturalist, Flickr, v.v.)
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;

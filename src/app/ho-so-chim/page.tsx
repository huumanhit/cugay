import { getBirds } from "@/lib/db";
import BirdListClient from "./BirdListClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Hồ sơ chim – CuGay.vn" };
export const revalidate = 60;

// Không đọc searchParams → page được cache tĩnh hoàn toàn
export default async function BirdProfilesPage() {
  const { birds, total } = await getBirds({ sort: "popular", limit: 50 });

  return (
    <BirdListClient
      initialBirds={birds}
      initialTotal={total}
      initialSearch=""
      initialVoice="Tất cả"
      initialSort="popular"
    />
  );
}

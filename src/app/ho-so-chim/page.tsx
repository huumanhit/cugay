import { getBirds } from "@/lib/db";
import BirdListClient from "./BirdListClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Hồ sơ chim – CuGay.vn" };
export const revalidate = 30;

interface Props {
  searchParams: Promise<{ search?: string; voice?: string; sort?: string }>;
}

export default async function BirdProfilesPage({ searchParams }: Props) {
  const { search, voice, sort = "popular" } = await searchParams;

  const { birds, total } = await getBirds({
    search: search ?? "",
    voice: voice !== "Tất cả" ? voice : undefined,
    sort,
    limit: 24,
  });

  return (
    <BirdListClient
      initialBirds={birds}
      initialTotal={total}
      initialSearch={search ?? ""}
      initialVoice={voice ?? "Tất cả"}
      initialSort={sort}
    />
  );
}

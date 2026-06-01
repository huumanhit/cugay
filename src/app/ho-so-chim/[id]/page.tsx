import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getBirdById, getTimelineEvents, getSimilarBirds } from "@/lib/db";
import { VoiceType } from "@/generated/prisma";
import BirdDetailClient from "./BirdDetailClient";
import type { Metadata } from "next";

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const bird = await getBirdById(id);
  if (!bird) return { title: "Không tìm thấy – CuGay.vn" };
  return { title: `${bird.name} – CuGay.vn` };
}

const VOICE_ENUM: Record<string, VoiceType> = {
  Thổ: "THO", Đồng: "DONG", Kim: "KIM", Thủy: "THUY", Đấu: "DAU", Vàng: "VANG",
};

export default async function BirdProfilePage({ params }: Props) {
  const { id } = await params;

  const bird = await getBirdById(id);
  if (!bird) notFound();

  const voiceEnum = VOICE_ENUM[bird.voice] ?? "THO";
  const [events, similar] = await Promise.all([
    getTimelineEvents(id),
    getSimilarBirds(id, voiceEnum, 3),
  ]);

  return (
    <div className="px-4 lg:px-8 py-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6 text-sm">
        <Link href="/ho-so-chim" className="flex items-center gap-1 text-muted hover:text-primary-600 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Hồ sơ chim
        </Link>
        <span className="text-border">/</span>
        <span className="text-text-primary font-medium">{bird.name}</span>
      </div>

      <BirdDetailClient bird={bird} events={events} similar={similar} />
    </div>
  );
}

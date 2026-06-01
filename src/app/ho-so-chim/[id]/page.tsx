"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Share2, Phone, CheckCircle2, Award, MapPin, Bird, ChevronLeft, Eye, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import BirdImage from "@/components/birds/BirdImage";
import TimelineEventCard from "@/components/timeline/TimelineEvent";
import { MOCK_BIRDS, MOCK_TIMELINE_EVENTS } from "@/lib/mock-data";
import { getVoiceColor, formatNumber } from "@/lib/utils";

export default function BirdProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const bird = MOCK_BIRDS.find((b) => b.id === id) ?? MOCK_BIRDS[0];
  const events = MOCK_TIMELINE_EVENTS.filter((e) => e.birdId === bird.id);
  const [activeImage, setActiveImage] = useState(0);
  const [liked, setLiked] = useState(false);

  return (
    <div className="px-4 lg:px-8 py-6 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        <Link href="/ho-so-chim" className="flex items-center gap-1 text-muted hover:text-primary-600 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Hồ sơ chim
        </Link>
        <span className="text-border">/</span>
        <span className="text-text-primary font-medium">{bird.name}</span>
      </div>

      {/* 3-column layout */}
      <div className="grid lg:grid-cols-[280px_1fr_260px] gap-6">
        {/* Left: Gallery */}
        <div className="space-y-3">
          {/* Main image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-accent">
            <BirdImage
              src={bird.gallery[activeImage] ?? bird.image}
              alt={bird.name}
              fill
            />
            {bird.verified && (
              <div className="absolute top-3 left-3 flex items-center gap-1 bg-blue-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full z-20">
                <CheckCircle2 className="w-3.5 h-3.5" /> Đã xác thực
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-2">
            {bird.gallery.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all bg-accent ${activeImage === i ? "border-primary-500" : "border-transparent"}`}
              >
                <BirdImage src={bird.gallery[i]} alt="" fill />
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button className="w-full flex items-center justify-center gap-2 bg-primary-500 text-white py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors">
              <Phone className="w-4 h-4" /> Liên hệ chủ sở hữu
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border font-medium text-sm transition-all ${liked ? "bg-red-50 text-red-500 border-red-200" : "bg-white text-muted border-border hover:border-red-300"}`}
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-red-500" : ""}`} />
                {liked ? "Đã yêu thích" : "Yêu thích"}
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-white text-muted font-medium text-sm transition-all hover:border-primary-300">
                <Share2 className="w-4 h-4" /> Chia sẻ
              </button>
            </div>
          </div>
        </div>

        {/* Center: Info */}
        <div>
          <div className="bg-white rounded-2xl border border-border shadow-card p-5 mb-4">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getVoiceColor(bird.voice)}`}>
                    Giọng {bird.voice}
                  </span>
                  {bird.forSale && <Badge variant="default">Đang bán</Badge>}
                  {(bird.rank ?? 0) <= 3 && bird.rank && <Badge variant="pro">Top {bird.rank} Quốc gia</Badge>}
                </div>
                <h1 className="text-2xl font-bold text-text-primary">{bird.name}</h1>
              </div>
              {bird.price && bird.forSale && (
                <div className="text-right flex-shrink-0">
                  <p className="text-2xl font-bold text-primary-600">{(bird.price / 1_000_000).toFixed(0)} tr</p>
                  <p className="text-xs text-muted">VNĐ</p>
                </div>
              )}
            </div>
            <p className="text-sm text-muted leading-relaxed">{bird.description}</p>
            <div className="flex gap-4 mt-3 pt-3 border-t border-border">
              <span className="flex items-center gap-1 text-sm text-muted"><Eye className="w-4 h-4" />{formatNumber(bird.views)} lượt xem</span>
              <span className="flex items-center gap-1 text-sm text-muted"><Star className="w-4 h-4 fill-amber-400 text-amber-400" />{bird.rating}</span>
              <span className="flex items-center gap-1 text-sm text-muted"><Heart className="w-4 h-4" />{formatNumber(bird.likes)}</span>
            </div>
          </div>

          {/* Info grid */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-5 mb-4">
            <h2 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Bird className="w-4 h-4 text-primary-500" /> Thông tin chi tiết
            </h2>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              {[
                { label: "Mã hồ sơ", value: `#${bird.id.toUpperCase()}` },
                { label: "Giọng", value: bird.voice },
                { label: "Tuổi", value: `${bird.age} tuổi` },
                { label: "Cân nặng", value: bird.weight ?? "—" },
                { label: "Màu lông", value: bird.color },
                { label: "Nguồn gốc", value: bird.origin },
                { label: "Dòng chim", value: bird.lineage ?? "—" },
                { label: "Khu vực", value: bird.province },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-muted">{label}</p>
                  <p className="text-sm font-semibold text-text-primary mt-0.5">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted mb-2">Chủ sở hữu</p>
              <div className="flex items-center gap-3">
                <img src={bird.ownerAvatar} alt={bird.ownerName} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-text-primary text-sm">{bird.ownerName}</p>
                  <div className="flex items-center gap-1 text-xs text-muted"><MapPin className="w-3 h-3" />{bird.province}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          {bird.achievements.length > 0 && (
            <div className="bg-white rounded-2xl border border-border shadow-card p-5 mb-4">
              <h2 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" /> Thành tích ({bird.achievements.length})
              </h2>
              <div className="space-y-2">
                {bird.achievements.map((ach, i) => (
                  <div key={i} className="flex items-center gap-3 bg-amber-50 rounded-xl px-3 py-2.5">
                    <span className="text-amber-500">🏆</span>
                    <span className="text-sm text-text-primary font-medium">{ach}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-5">
            <Tabs defaultValue="overview">
              <TabsList className="w-full overflow-x-auto flex-nowrap">
                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                <TabsTrigger value="timeline">Nhật ký</TabsTrigger>
                <TabsTrigger value="photos">Ảnh</TabsTrigger>
                <TabsTrigger value="genealogy">Phả hệ</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <p className="text-sm text-muted leading-relaxed mt-2">{bird.description}</p>
              </TabsContent>
              <TabsContent value="timeline">
                {events.length > 0 ? (
                  <div className="pt-2">
                    {events.map((evt, i) => (
                      <TimelineEventCard key={evt.id} event={evt} isLast={i === events.length - 1} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted text-center py-8">Chưa có nhật ký.</p>
                )}
              </TabsContent>
              <TabsContent value="photos">
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {bird.gallery.map((_, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-accent">
                      <BirdImage src={bird.gallery[i]} alt="" fill />
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="genealogy">
                <div className="text-center py-8 text-muted">
                  <p className="text-4xl mb-3">🌳</p>
                  <p className="font-medium text-text-primary">Phả hệ: {bird.lineage ?? "Chưa có thông tin"}</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right: Trust + Side */}
        <div className="space-y-4">
          {/* Trust card */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-5 space-y-4">
            <h3 className="font-semibold text-text-primary">Độ tin cậy</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{bird.rating}</p>
                <p className="text-xs text-muted">Điểm đánh giá</p>
              </div>
              <div className="ml-auto flex gap-0.5">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className={`w-4 h-4 ${i <= Math.round(bird.rating) ? "fill-amber-400 text-amber-400" : "text-border"}`} />
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {[
                { icon: <CheckCircle2 className={`w-4 h-4 ${bird.verified ? "text-blue-500" : "text-border"}`} />, label: "Hồ sơ xác thực", value: bird.verified ? "Đã xác thực" : "Chưa", color: bird.verified ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500" },
                { icon: <Eye className="w-4 h-4 text-purple-500" />, label: "Lượt xem", value: formatNumber(bird.views), color: "bg-purple-100 text-purple-700" },
                { icon: <Heart className="w-4 h-4 text-red-400" />, label: "Người theo dõi", value: formatNumber(bird.followers), color: "bg-red-100 text-red-700" },
                { icon: <Award className="w-4 h-4 text-amber-500" />, label: "Thành tích", value: `${bird.achievements.length}`, color: "bg-amber-100 text-amber-700" },
              ].map(({ icon, label, value, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">{icon}<span className="text-sm text-text-primary">{label}</span></div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${color}`}>{value}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-border">
              <div className="flex justify-between text-xs text-muted mb-2">
                <span>Điểm tổng hợp</span>
                <span className="font-semibold text-primary-600">{bird.score?.toLocaleString() ?? "—"}</span>
              </div>
              <div className="w-full bg-accent rounded-full h-2">
                <div className="bg-gradient-to-r from-primary-400 to-primary-600 h-2 rounded-full" style={{ width: `${Math.min(100, ((bird.score ?? 5000) / 10000) * 100)}%` }} />
              </div>
            </div>
          </div>

          {/* ID card */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-5">
            <h3 className="font-semibold text-text-primary mb-3">Mã định danh</h3>
            <div className="bg-accent rounded-xl p-4 text-center">
              <div className="w-24 h-24 bg-white rounded-lg mx-auto mb-2 flex items-center justify-center border border-border">
                <Bird className="w-12 h-12 text-primary-300" />
              </div>
              <p className="text-xs font-mono text-muted">{bird.id.toUpperCase()}</p>
            </div>
          </div>

          {/* Similar birds */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-5">
            <h3 className="font-semibold text-text-primary mb-3">Chim tương tự</h3>
            <div className="space-y-3">
              {MOCK_BIRDS.filter((b) => b.id !== bird.id && b.voice === bird.voice).slice(0, 2).map((b) => (
                <Link key={b.id} href={`/ho-so-chim/${b.id}`} className="flex gap-3 items-center hover:bg-accent rounded-xl p-2 -mx-2 transition-colors group">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-accent">
                    <BirdImage src={b.image} alt={b.name} fill />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary group-hover:text-primary-600 transition-colors truncate">{b.name}</p>
                    <p className="text-xs text-muted">{b.province}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

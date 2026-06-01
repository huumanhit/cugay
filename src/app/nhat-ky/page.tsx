"use client";

import { useState } from "react";
import { Plus, BookOpen } from "lucide-react";
import TimelineEventCard from "@/components/timeline/TimelineEvent";
import { MOCK_BIRDS, MOCK_TIMELINE_EVENTS } from "@/lib/mock-data";
import Image from "next/image";

export default function TimelinePage() {
  const [selectedBirdId, setSelectedBirdId] = useState(MOCK_BIRDS[0].id);
  const bird = MOCK_BIRDS.find((b) => b.id === selectedBirdId) ?? MOCK_BIRDS[0];
  const events = MOCK_TIMELINE_EVENTS.filter((e) => e.birdId === selectedBirdId);

  return (
    <div className="px-4 lg:px-8 py-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Nhật ký phát triển</h1>
          <p className="text-sm text-muted mt-1">Ghi lại hành trình của những chiến binh</p>
        </div>
        <button className="flex items-center gap-2 bg-primary-500 text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-primary-600 transition-colors text-sm">
          <Plus className="w-4 h-4" />
          Thêm sự kiện
        </button>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        {/* Bird selector */}
        <div>
          <div className="bg-white rounded-2xl border border-border shadow-card p-4 sticky top-20">
            <h2 className="font-semibold text-text-primary mb-3 text-sm">Chọn chim</h2>
            <div className="space-y-2">
              {MOCK_BIRDS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBirdId(b.id)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all text-left ${
                    selectedBirdId === b.id
                      ? "bg-primary-50 border border-primary-200"
                      : "hover:bg-accent"
                  }`}
                >
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={b.image} alt={b.name} fill className="object-cover" sizes="40px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${selectedBirdId === b.id ? "text-primary-700" : "text-text-primary"}`}>
                      {b.name}
                    </p>
                    <p className="text-xs text-muted">{b.province}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          {/* Bird summary */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-5 mb-6">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <Image src={bird.image} alt={bird.name} fill className="object-cover" sizes="64px" />
              </div>
              <div>
                <h2 className="font-bold text-text-primary text-lg">{bird.name}</h2>
                <p className="text-sm text-muted">{bird.ownerName} · {bird.province}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-medium">
                    {events.length} sự kiện
                  </span>
                  <span className="text-xs text-muted">Bắt đầu nuôi: {bird.createdAt}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Events */}
          {events.length > 0 ? (
            <div className="space-y-0">
              {events.map((evt, i) => (
                <TimelineEventCard
                  key={evt.id}
                  event={evt}
                  isLast={i === events.length - 1}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-border shadow-card p-12 text-center">
              <BookOpen className="w-12 h-12 text-border mx-auto mb-4" />
              <p className="font-semibold text-text-primary">Chưa có nhật ký nào</p>
              <p className="text-sm text-muted mt-1 mb-4">Hãy bắt đầu ghi lại hành trình của {bird.name}</p>
              <button className="bg-primary-500 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-600 transition-colors text-sm">
                Thêm sự kiện đầu tiên
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

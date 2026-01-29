"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getUpcomingTaxEvents, TaxEvent, MONTHLY_EVENTS } from "@/lib/tax-calendar";

const USER_TYPES = [
  { value: "프리랜서", label: "프리랜서" },
  { value: "개인사업자", label: "개인사업자" },
  { value: "법인사업자", label: "법인사업자" },
  { value: "예술인", label: "예술인" },
];

export default function TaxPage() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["프리랜서"]);
  const [events, setEvents] = useState<TaxEvent[]>([]);

  useEffect(() => {
    const upcoming = getUpcomingTaxEvents({ types: selectedTypes }, 90);
    setEvents(upcoming);
  }, [selectedTypes]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const getDaysUntil = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(dateStr);
    return Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const getPriorityColor = (priority: string, daysUntil: number) => {
    if (daysUntil <= 7) return "bg-red-100 border-red-300 text-red-800";
    if (daysUntil <= 14) return "bg-amber-100 border-amber-300 text-amber-800";
    return "bg-slate-100 border-slate-200 text-slate-700";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/hub" className="text-slate-400 hover:text-slate-600">
            ← 허브
          </Link>
          <span className="text-xl font-bold text-slate-800">
            🗓️ 세금 캘린더
          </span>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-8">
        {/* Type Filter */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
          <h2 className="font-bold text-slate-800 mb-4">나의 유형 선택</h2>
          <div className="flex flex-wrap gap-2">
            {USER_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => toggleType(type.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedTypes.includes(type.value)
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            📅 다가오는 신고/납부 일정
          </h2>

          {events.length > 0 ? (
            <div className="space-y-3">
              {events.map((event) => {
                const daysUntil = getDaysUntil(event.dueDate);
                return (
                  <div
                    key={event.id}
                    className={`rounded-xl border p-4 ${getPriorityColor(event.priority, daysUntil)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold">{event.name}</h3>
                        <p className="text-sm opacity-80">{event.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formatDate(event.dueDate)}</div>
                        <div className="text-sm">
                          {daysUntil === 0
                            ? "오늘!"
                            : daysUntil === 1
                            ? "내일"
                            : `${daysUntil}일 남음`}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="opacity-70">💡 {event.tip}</span>
                    </div>
                    {event.link && (
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-sm underline"
                      >
                        홈택스 바로가기 →
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <p className="text-slate-500">
                3개월 내 예정된 신고 일정이 없어요 👍
              </p>
            </div>
          )}
        </div>

        {/* Monthly Events */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            🔄 매월 반복 일정
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 divide-y">
            {MONTHLY_EVENTS.map((event) => (
              <div key={event.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800">{event.name}</h3>
                    <p className="text-sm text-slate-500">{event.description}</p>
                    <p className="text-xs text-slate-400 mt-1">💡 {event.tip}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-slate-700">
                      매월 {event.dueDate}일
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h3 className="font-bold text-amber-800 mb-3">💡 절세 팁</h3>
          <ul className="text-amber-700 text-sm space-y-2">
            <li>• <strong>경비 처리:</strong> 사업 관련 지출은 영수증을 꼭 챙기세요</li>
            <li>• <strong>세금계산서:</strong> 매입 세금계산서는 부가세 공제 가능</li>
            <li>• <strong>노란우산공제:</strong> 소기업/소상공인은 연 최대 500만원 소득공제</li>
            <li>• <strong>세무사 상담:</strong> 첫 신고라면 전문가 상담 추천</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

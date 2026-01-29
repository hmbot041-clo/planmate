"use client";

import Link from "next/link";

const MODULES = [
  {
    id: "business-plan",
    name: "사업계획서",
    description: "Q&A로 완성하는 AI 사업계획서",
    icon: "📋",
    href: "/templates",
    status: "active",
    tag: "인기",
  },
  {
    id: "funding",
    name: "정부지원금 매칭",
    description: "내 상황에 맞는 지원사업 찾기",
    icon: "💰",
    href: "/funding",
    status: "active",
    tag: "NEW",
  },
  {
    id: "tax-calendar",
    name: "세금 캘린더",
    description: "놓치면 안 되는 신고/납부 일정",
    icon: "🗓️",
    href: "/tax",
    status: "active",
    tag: "NEW",
  },
  {
    id: "pitch-deck",
    name: "IR자료 빌더",
    description: "투자유치용 피치덱 만들기",
    icon: "📊",
    href: "/pitch",
    status: "coming",
    tag: "준비중",
  },
  {
    id: "portfolio",
    name: "포트폴리오 빌더",
    description: "예술인을 위한 포트폴리오 구성",
    icon: "🎨",
    href: "/portfolio",
    status: "coming",
    tag: "준비중",
  },
  {
    id: "artist-statement",
    name: "작가노트 생성",
    description: "AI와 함께 쓰는 아티스트 스테이트먼트",
    icon: "✍️",
    href: "/statement",
    status: "coming",
    tag: "준비중",
  },
];

export default function HubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-xl font-bold text-slate-800">
            플랜메이트
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            무엇을 도와드릴까요?
          </h1>
          <p className="text-slate-600">
            창업자와 예술인을 위한 AI 어시스턴트
          </p>
        </div>

        {/* Active Modules */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {MODULES.filter((m) => m.status === "active").map((module) => (
            <Link
              key={module.id}
              href={module.href}
              className="block bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-400 hover:shadow-lg transition group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{module.icon}</span>
                {module.tag && (
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    module.tag === "NEW" 
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {module.tag}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition mb-2">
                {module.name}
              </h3>
              <p className="text-sm text-slate-500">{module.description}</p>
            </Link>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">🚧 준비 중</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {MODULES.filter((m) => m.status === "coming").map((module) => (
              <div
                key={module.id}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-6 opacity-60"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{module.icon}</span>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-200 text-slate-500">
                    {module.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-600 mb-2">
                  {module.name}
                </h3>
                <p className="text-sm text-slate-400">{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

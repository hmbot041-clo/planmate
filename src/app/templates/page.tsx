"use client";

import Link from "next/link";
import { TEMPLATES } from "@/lib/templates";

export default function TemplatesPage() {
  const categories = [...new Set(TEMPLATES.map((t) => t.category))];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-slate-800">
            플랜메이트
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            어떤 사업계획서를 작성하시나요?
          </h1>
          <p className="text-slate-600">
            지원사업 유형에 맞는 템플릿을 선택하세요.<br />
            맞춤 질문으로 최적화된 사업계획서를 만들어 드립니다.
          </p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-10">
            <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              {category}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {TEMPLATES.filter((t) => t.category === category).map((template) => (
                <Link
                  key={template.id}
                  href={`/interview?template=${template.id}`}
                  className="block bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-400 hover:shadow-lg transition group"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{template.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition">
                        {template.name}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {template.description}
                      </p>
                      <div className="mt-3 flex items-center text-sm text-blue-600">
                        <span>시작하기</span>
                        <svg
                          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Coming Soon */}
        <div className="mt-12 p-6 bg-slate-100 rounded-2xl text-center">
          <p className="text-slate-500 text-sm">
            💡 더 많은 템플릿이 곧 추가됩니다!<br />
            <span className="text-slate-400">
              초기창업패키지, 청년창업사관학교, 지역 창업지원 등
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}

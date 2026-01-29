"use client";

import { useState } from "react";
import Link from "next/link";
import { matchFundingPrograms, FundingProgram, UserProfile } from "@/lib/funding-programs";

const QUESTIONS = [
  {
    id: "type",
    question: "현재 상태는 어떻게 되시나요?",
    options: [
      { value: "예비창업자", label: "예비창업자", desc: "아직 사업자등록 전" },
      { value: "초기창업자", label: "초기창업자", desc: "창업 3년 이내" },
      { value: "소상공인", label: "소상공인", desc: "소규모 사업 운영 중" },
      { value: "예술인", label: "예술인", desc: "예술활동 중" },
    ],
  },
  {
    id: "stage",
    question: "사업/프로젝트 단계는?",
    options: [
      { value: "아이디어", label: "아이디어 단계", desc: "구상 중" },
      { value: "시제품", label: "시제품/MVP", desc: "개발 중 또는 완료" },
      { value: "초기매출", label: "초기 매출 발생", desc: "첫 고객 확보" },
      { value: "성장", label: "성장 단계", desc: "매출 성장 중" },
    ],
  },
  {
    id: "region",
    question: "활동 지역은?",
    options: [
      { value: "서울", label: "서울", desc: "" },
      { value: "경기", label: "경기/인천", desc: "" },
      { value: "부산", label: "부산/경남", desc: "" },
      { value: "기타", label: "기타 지역", desc: "" },
    ],
  },
  {
    id: "category",
    question: "분야는?",
    options: [
      { value: "기술", label: "기술/IT", desc: "앱, 플랫폼, AI 등" },
      { value: "콘텐츠", label: "콘텐츠", desc: "영상, 게임, 웹툰 등" },
      { value: "예술", label: "예술/문화", desc: "미술, 음악, 공연 등" },
      { value: "일반", label: "일반/서비스", desc: "요식업, 소매 등" },
    ],
  },
];

export default function FundingPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<FundingProgram[] | null>(null);

  const handleSelect = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Show results
      const profile: UserProfile = {
        type: newAnswers.type,
        stage: newAnswers.stage,
        region: newAnswers.region,
        category: newAnswers.category,
      };
      const matched = matchFundingPrograms(profile);
      setResults(matched);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setResults(null);
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
            💰 정부지원금 매칭
          </span>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-12">
        {!results ? (
          <>
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-slate-500 mb-2">
                <span>질문 {step + 1} / {QUESTIONS.length}</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all"
                  style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">
                {QUESTIONS[step].question}
              </h2>

              <div className="space-y-3">
                {QUESTIONS[step].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(QUESTIONS[step].id, option.value)}
                    className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition"
                  >
                    <div className="font-medium text-slate-800">{option.label}</div>
                    {option.desc && (
                      <div className="text-sm text-slate-500">{option.desc}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Results */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  맞춤 지원사업 {results.length}건
                </h2>
                <p className="text-slate-500">
                  {answers.type} · {answers.stage} · {answers.region}
                </p>
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                다시 찾기
              </button>
            </div>

            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((program) => (
                  <div
                    key={program.id}
                    className="bg-white rounded-2xl border border-slate-200 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-sm text-blue-600 font-medium">
                          {program.organization}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900">
                          {program.name}
                        </h3>
                      </div>
                      <span className="text-lg font-bold text-green-600">
                        {program.amount}
                      </span>
                    </div>

                    <p className="text-slate-600 mb-4">{program.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-slate-400">지원기간</span>
                        <p className="text-slate-700">{program.period}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">신청마감</span>
                        <p className="text-slate-700">{program.deadline}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm text-slate-400">주요 혜택</span>
                      <ul className="mt-1 space-y-1">
                        {program.benefits.map((benefit, i) => (
                          <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <a
                        href={program.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
                      >
                        자세히 보기 →
                      </a>
                      <Link
                        href={`/templates?program=${program.id}`}
                        className="px-4 py-3 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition"
                      >
                        📋 사업계획서 작성
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <p className="text-slate-500 mb-4">
                  조건에 맞는 지원사업을 찾지 못했어요.
                </p>
                <button
                  onClick={handleReset}
                  className="text-blue-600 hover:underline"
                >
                  다른 조건으로 다시 찾기
                </button>
              </div>
            )}

            {/* Tip */}
            <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-2xl">
              <h3 className="font-bold text-amber-800 mb-2">💡 팁</h3>
              <ul className="text-amber-700 text-sm space-y-1">
                <li>• 지원사업은 예산 소진 시 조기 마감될 수 있어요</li>
                <li>• 신청 전 공고문을 꼭 확인하세요</li>
                <li>• 여러 사업에 중복 신청 가능한 경우도 있어요</li>
              </ul>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

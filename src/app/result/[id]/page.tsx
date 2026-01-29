"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Interview } from "@/lib/supabase";

export default function ResultPage() {
  const params = useParams();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        // First check sessionStorage for immediate display
        const cachedPlan = sessionStorage.getItem(`businessPlan_${params.id}`);
        
        if (cachedPlan) {
          setInterview({
            id: params.id as string,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            status: 'completed',
            answers: {},
            business_plan: cachedPlan,
            email: null,
          });
          setLoading(false);
          // Clean up sessionStorage
          sessionStorage.removeItem(`businessPlan_${params.id}`);
          return;
        }

        // Fall back to Supabase
        const { data, error } = await supabase
          .from("interviews")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) throw error;
        setInterview(data);
      } catch (err) {
        console.error("Error fetching interview:", err);
        setError("사업계획서를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchInterview();
    }
  }, [params.id]);

  const handleDownload = () => {
    if (!interview?.business_plan) return;

    const blob = new Blob([interview.business_plan], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "사업계획서.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    if (!interview?.business_plan) return;
    await navigator.clipboard.writeText(interview.business_plan);
    alert("클립보드에 복사되었습니다!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !interview) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "데이터를 찾을 수 없습니다."}</p>
          <Link href="/" className="text-blue-600 hover:underline">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-slate-800">
            플랜메이트
          </Link>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              📋 복사
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              ⬇️ 다운로드
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto max-w-4xl px-4 py-8">
        {interview.business_plan ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
            <div className="prose prose-slate max-w-none">
              {interview.business_plan.split("\n").map((line, i) => {
                // Parse markdown-like headers
                if (line.startsWith("# ")) {
                  return (
                    <h1 key={i} className="text-3xl font-bold text-slate-900 mt-8 mb-4 first:mt-0">
                      {line.slice(2)}
                    </h1>
                  );
                }
                if (line.startsWith("## ")) {
                  return (
                    <h2 key={i} className="text-2xl font-bold text-slate-800 mt-8 mb-3">
                      {line.slice(3)}
                    </h2>
                  );
                }
                if (line.startsWith("### ")) {
                  return (
                    <h3 key={i} className="text-xl font-semibold text-slate-700 mt-6 mb-2">
                      {line.slice(4)}
                    </h3>
                  );
                }
                if (line.startsWith("- ")) {
                  return (
                    <li key={i} className="text-slate-600 ml-4">
                      {line.slice(2)}
                    </li>
                  );
                }
                if (line.trim() === "") {
                  return <br key={i} />;
                }
                if (line.startsWith("---")) {
                  return <hr key={i} className="my-8 border-slate-200" />;
                }
                return (
                  <p key={i} className="text-slate-600 leading-relaxed mb-2">
                    {line}
                  </p>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600">아직 사업계획서가 생성되지 않았습니다.</p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/interview"
            className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition text-center"
          >
            새로 작성하기
          </Link>
          <button
            onClick={handleDownload}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
          >
            마크다운으로 다운로드
          </button>
        </div>

        {/* Tips */}
        <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-2xl">
          <h3 className="font-bold text-amber-800 mb-2">💡 다음 단계</h3>
          <ul className="text-amber-700 space-y-1 text-sm">
            <li>• 생성된 초안을 검토하고 본인만의 구체적인 내용으로 보완하세요</li>
            <li>• 시장 규모, 매출 계획 등 숫자 데이터를 추가하세요</li>
            <li>• 예비창업패키지 공고문의 평가항목을 다시 확인하세요</li>
            <li>• 가능하다면 멘토나 선배 창업자의 피드백을 받아보세요</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

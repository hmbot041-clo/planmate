"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const QUESTIONS = [
  {
    id: 1,
    question: "어떤 문제를 해결하고 싶으세요?",
    hint: "고객이 겪고 있는 불편함이나 해결되지 않은 니즈를 말해주세요.",
    placeholder: "예: 프리랜서 예술가들이 세금 신고할 때 뭘 해야 할지 몰라서 어려워해요",
  },
  {
    id: 2,
    question: "왜 이 문제에 관심을 갖게 됐나요?",
    hint: "개인적인 경험이나 발견한 계기를 말해주세요.",
    placeholder: "예: 저도 프리랜서로 일하면서 첫 세금 신고 때 정말 막막했어요",
  },
  {
    id: 3,
    question: "이 문제를 겪고 있는 사람들은 누구인가요?",
    hint: "타겟 고객을 구체적으로 설명해주세요. (연령, 직업, 상황 등)",
    placeholder: "예: 20-30대 프리랜서 예술가, 1인 창작자, 연 수입 5천만원 이하",
  },
  {
    id: 4,
    question: "지금은 이 문제를 어떻게 해결하고 있나요?",
    hint: "기존 해결책이나 경쟁 서비스를 말해주세요.",
    placeholder: "예: 블로그 검색하거나, 지인한테 물어보거나, 세무사 찾아가요",
  },
  {
    id: 5,
    question: "당신의 해결책은 무엇인가요?",
    hint: "만들고자 하는 제품/서비스를 설명해주세요.",
    placeholder: "예: 개인화된 세금 일정 알림과 단계별 가이드 템플릿을 제공하는 플랫폼",
  },
  {
    id: 6,
    question: "기존 해결책과 뭐가 다른가요?",
    hint: "차별점, 경쟁 우위를 말해주세요.",
    placeholder: "예: 예술인 특화, 개인 상황에 맞는 알림, 복잡한 내용을 쉬운 템플릿으로",
  },
  {
    id: 7,
    question: "어떻게 돈을 벌 계획인가요?",
    hint: "수익 모델을 설명해주세요. (구독, 건당 결제, 광고 등)",
    placeholder: "예: 월 9,900원 구독제, 기본 무료 + 프리미엄 기능 유료",
  },
  {
    id: 8,
    question: "첫 고객은 어떻게 모을 계획인가요?",
    hint: "초기 마케팅/영업 전략을 말해주세요.",
    placeholder: "예: 예술인 커뮤니티, 인스타그램 타겟 광고, 지인 네트워크",
  },
  {
    id: 9,
    question: "왜 당신이 이 문제를 해결해야 하나요?",
    hint: "팀 역량, 관련 경험, 도메인 지식 등을 말해주세요.",
    placeholder: "예: 5년간 프리랜서 활동, 개발자 경력 3년, 세무 관련 스터디 운영",
  },
  {
    id: 10,
    question: "1년 후 목표는 무엇인가요?",
    hint: "구체적인 숫자가 있으면 좋아요. (사용자 수, 매출 등)",
    placeholder: "예: MAU 1만명, 유료 구독자 500명, 월 매출 500만원",
  },
];

interface Message {
  id: number;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
}

export default function InterviewPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [interviewId, setInterviewId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Create interview session on mount
  useEffect(() => {
    const createInterview = async () => {
      try {
        const { data, error } = await supabase
          .from("interviews")
          .insert({
            status: "in_progress",
            answers: {},
          })
          .select()
          .single();

        if (error) {
          console.error("Failed to create interview:", error);
          return;
        }

        if (data) {
          setInterviewId(data.id);
          // Store in localStorage for recovery
          localStorage.setItem("currentInterviewId", data.id);
        }
      } catch (err) {
        console.error("Error creating interview:", err);
      }
    };

    // Check for existing interview in progress
    const existingId = localStorage.getItem("currentInterviewId");
    if (existingId) {
      // Could add recovery logic here
      setInterviewId(existingId);
    } else {
      createInterview();
    }
  }, []);

  // Initial greeting
  useEffect(() => {
    const greeting: Message = {
      id: Date.now(),
      type: "bot",
      content:
        "안녕하세요! 사업계획서 작성을 도와드릴게요. 🙌\n\n10개의 질문에 답해주시면, 예비창업패키지 양식에 맞는 사업계획서 초안을 만들어 드립니다.\n\n준비되셨으면 시작할게요!",
      timestamp: new Date(),
    };
    setMessages([greeting]);

    setTimeout(() => {
      const firstQuestion: Message = {
        id: Date.now() + 1,
        type: "bot",
        content: `**질문 1/10**\n\n${QUESTIONS[0].question}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, firstQuestion]);
    }, 1000);
  }, []);

  // Save answers to Supabase
  const saveAnswers = useCallback(
    async (newAnswers: Record<number, string>, status: "in_progress" | "completed" = "in_progress") => {
      if (!interviewId) return;

      setIsSaving(true);
      try {
        const { error } = await supabase
          .from("interviews")
          .update({
            answers: newAnswers,
            status,
            updated_at: new Date().toISOString(),
          })
          .eq("id", interviewId);

        if (error) {
          console.error("Failed to save answers:", error);
        }
      } catch (err) {
        console.error("Error saving answers:", err);
      } finally {
        setIsSaving(false);
      }
    },
    [interviewId]
  );

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;

    const currentQuestion = QUESTIONS[currentQuestionIndex];

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Save answer
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: inputValue,
    };
    setAnswers(newAnswers);

    // Save to Supabase
    const isLastQuestion = currentQuestionIndex >= QUESTIONS.length - 1;
    await saveAnswers(newAnswers, isLastQuestion ? "completed" : "in_progress");

    setInputValue("");
    setShowHint(false);

    // Next question or complete
    if (!isLastQuestion) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);

      setTimeout(() => {
        const nextQuestion: Message = {
          id: Date.now() + 1,
          type: "bot",
          content: `**질문 ${nextIndex + 1}/10**\n\n${QUESTIONS[nextIndex].question}`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, nextQuestion]);
      }, 500);
    } else {
      // Complete
      localStorage.removeItem("currentInterviewId");
      
      setTimeout(() => {
        const completeMessage: Message = {
          id: Date.now() + 1,
          type: "bot",
          content:
            "모든 질문에 답해주셨어요! 🎉\n\n이제 AI가 답변을 바탕으로 사업계획서를 작성합니다.\n잠시만 기다려주세요...",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, completeMessage]);
        setIsComplete(true);
      }, 500);
    }
  };

  const handleGenerateBusinessPlan = async () => {
    setIsGenerating(true);
    
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          interviewId,
          answers,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "생성 중 오류가 발생했습니다.");
      }

      // Redirect to result page
      router.push(`/result/${interviewId}`);
    } catch (error) {
      console.error("Error generating business plan:", error);
      alert("사업계획서 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const progress =
    ((currentQuestionIndex + (isComplete ? 1 : 0)) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-slate-800">
            플랜메이트
          </Link>
          <div className="flex items-center gap-4">
            {isSaving && (
              <span className="text-xs text-slate-400">저장 중...</span>
            )}
            <span className="text-sm text-slate-500">
              {currentQuestionIndex + 1} / {QUESTIONS.length}
            </span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-slate-100">
          <div
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-2xl px-4 py-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-slate-200 text-slate-800"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm md:text-base">
                    {message.content.split("**").map((part, i) =>
                      i % 2 === 1 ? (
                        <strong key={i}>{part}</strong>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Input Area */}
      {!isComplete ? (
        <footer className="bg-white border-t border-slate-200 sticky bottom-0">
          <div className="container mx-auto max-w-2xl px-4 py-4">
            {/* Hint */}
            {showHint && currentQuestionIndex < QUESTIONS.length && (
              <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                💡 <strong>힌트:</strong>{" "}
                {QUESTIONS[currentQuestionIndex].hint}
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-3 py-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                title="힌트 보기"
              >
                💡
              </button>
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  QUESTIONS[currentQuestionIndex]?.placeholder ||
                  "답변을 입력하세요..."
                }
                rows={2}
                className="flex-1 resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSubmit}
                disabled={!inputValue.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition"
              >
                전송
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-400 text-center">
              Enter로 전송 · Shift+Enter로 줄바꿈
            </p>
          </div>
        </footer>
      ) : (
        <footer className="bg-white border-t border-slate-200 sticky bottom-0">
          <div className="container mx-auto max-w-2xl px-4 py-6">
            <button
              onClick={handleGenerateBusinessPlan}
              disabled={isGenerating}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 disabled:bg-blue-400 transition flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  생성 중...
                </>
              ) : (
                "사업계획서 생성하기 →"
              )}
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}

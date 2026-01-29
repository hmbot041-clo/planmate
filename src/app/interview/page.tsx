"use client";

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getTemplateById, TEMPLATES } from "@/lib/templates";

interface Message {
  id: number;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
}

function InterviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template") || "startup-preliminary";
  const template = getTemplateById(templateId) || TEMPLATES[0];

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
          localStorage.setItem("currentInterviewId", data.id);
        }
      } catch (err) {
        console.error("Error creating interview:", err);
      }
    };

    createInterview();
  }, [templateId]);

  // Initial greeting
  useEffect(() => {
    const greeting: Message = {
      id: Date.now(),
      type: "bot",
      content: `안녕하세요! **${template.name}** 사업계획서 작성을 도와드릴게요. 🙌\n\n${template.questions.length}개의 질문에 답해주시면, 양식에 맞는 사업계획서 초안을 만들어 드립니다.\n\n준비되셨으면 시작할게요!`,
      timestamp: new Date(),
    };
    setMessages([greeting]);

    setTimeout(() => {
      const firstQuestion: Message = {
        id: Date.now() + 1,
        type: "bot",
        content: `**질문 1/${template.questions.length}**\n\n${template.questions[0].question}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, firstQuestion]);
    }, 1000);
  }, [template]);

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

    const currentQuestion = template.questions[currentQuestionIndex];

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
    const isLastQuestion = currentQuestionIndex >= template.questions.length - 1;
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
          content: `**질문 ${nextIndex + 1}/${template.questions.length}**\n\n${template.questions[nextIndex].question}`,
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
          templateId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "생성 중 오류가 발생했습니다.");
      }

      // Store business plan in sessionStorage for immediate display
      if (data.businessPlan) {
        sessionStorage.setItem(`businessPlan_${interviewId}`, data.businessPlan);
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
    ((currentQuestionIndex + (isComplete ? 1 : 0)) / template.questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xl font-bold text-slate-800">
              플랜메이트
            </Link>
            <span className="text-sm text-slate-400">|</span>
            <span className="text-sm text-slate-600">{template.icon} {template.name}</span>
          </div>
          <div className="flex items-center gap-4">
            {isSaving && (
              <span className="text-xs text-slate-400">저장 중...</span>
            )}
            <span className="text-sm text-slate-500">
              {currentQuestionIndex + 1} / {template.questions.length}
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
            {showHint && currentQuestionIndex < template.questions.length && (
              <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                💡 <strong>힌트:</strong>{" "}
                {template.questions[currentQuestionIndex].hint}
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
                  template.questions[currentQuestionIndex]?.placeholder ||
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

export default function InterviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <InterviewContent />
    </Suspense>
  );
}

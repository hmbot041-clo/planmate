import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const QUESTIONS = [
  { id: 1, label: "해결하고 싶은 문제" },
  { id: 2, label: "문제에 관심을 갖게 된 이유" },
  { id: 3, label: "타겟 고객" },
  { id: 4, label: "현재 해결 방식 (경쟁 현황)" },
  { id: 5, label: "우리의 해결책" },
  { id: 6, label: "차별점" },
  { id: 7, label: "수익 모델" },
  { id: 8, label: "초기 고객 확보 전략" },
  { id: 9, label: "팀 역량" },
  { id: 10, label: "1년 후 목표" },
];

export async function POST(request: Request) {
  try {
    const { interviewId, answers } = await request.json();

    if (!answers || Object.keys(answers).length === 0) {
      return NextResponse.json(
        { error: "답변이 없습니다." },
        { status: 400 }
      );
    }

    // Format answers for the prompt
    const formattedAnswers = QUESTIONS.map((q) => {
      const answer = answers[q.id] || "(미응답)";
      return `### ${q.id}. ${q.label}\n${answer}`;
    }).join("\n\n");

    const prompt = `당신은 스타트업 사업계획서 전문 컨설턴트입니다. 
아래 인터뷰 답변을 바탕으로 예비창업패키지 지원용 사업계획서를 작성해주세요.

## 인터뷰 답변

${formattedAnswers}

---

## 작성 요청

위 답변을 바탕으로 다음 형식의 사업계획서를 작성해주세요.
각 섹션은 구체적이고 설득력 있게 작성하되, 답변에 있는 내용을 기반으로 확장해주세요.
평가위원이 읽는다고 생각하고, 혁신성과 실현가능성을 강조해주세요.

출력 형식 (마크다운):

# [창업 아이템명]

## 1. 창업 아이템 개요
(한 문단으로 핵심 가치 제안 요약)

## 2. 창업 배경 및 목적
### 2.1 문제 인식
### 2.2 창업 동기

## 3. 목표 시장 및 고객
### 3.1 타겟 고객 정의
### 3.2 시장 규모 및 성장성

## 4. 경쟁 현황 및 차별성
### 4.1 기존 해결책의 한계
### 4.2 우리의 차별점

## 5. 사업 아이템 소개
### 5.1 제품/서비스 설명
### 5.2 핵심 기능

## 6. 사업화 전략
### 6.1 수익 모델
### 6.2 마케팅 및 고객 확보 전략

## 7. 대표자 및 팀 역량
(관련 경험과 강점)

## 8. 사업 목표 및 로드맵
### 8.1 1년 목표
### 8.2 주요 마일스톤

---

사업계획서를 작성해주세요.`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const businessPlan =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Save to Supabase
    if (interviewId) {
      await supabase
        .from("interviews")
        .update({
          business_plan: businessPlan,
          updated_at: new Date().toISOString(),
        })
        .eq("id", interviewId);
    }

    return NextResponse.json({
      success: true,
      businessPlan,
    });
  } catch (error) {
    console.error("Error generating business plan:", error);
    return NextResponse.json(
      { error: "사업계획서 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { getTemplateById, TEMPLATES } from "@/lib/templates";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(request: Request) {
  try {
    const { interviewId, answers, templateId } = await request.json();

    if (!answers || Object.keys(answers).length === 0) {
      return NextResponse.json(
        { error: "답변이 없습니다." },
        { status: 400 }
      );
    }

    // Get template
    const template = getTemplateById(templateId) || TEMPLATES[0];

    // Format answers for the prompt
    const formattedAnswers = template.questions.map((q) => {
      const answer = answers[q.id] || "(미응답)";
      return `### ${q.id}. ${q.question}\n${answer}`;
    }).join("\n\n");

    // Build prompt from template
    const prompt = template.promptTemplate.replace("{{answers}}", formattedAnswers);

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
    if (interviewId && isSupabaseConfigured()) {
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

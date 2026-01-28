import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "플랜메이트 - AI 사업계획서 빌더",
  description: "10개 질문에 답하면 예비창업패키지용 사업계획서가 자동으로 완성됩니다. 30분이면 초안 완성.",
  keywords: ["사업계획서", "예비창업패키지", "창업", "AI", "자동작성"],
  openGraph: {
    title: "플랜메이트 - AI 사업계획서 빌더",
    description: "10개 질문에 답하면 사업계획서가 자동으로 완성됩니다",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

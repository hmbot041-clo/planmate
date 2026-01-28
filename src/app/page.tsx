import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-slate-800">
          플랜메이트
        </div>
        <Link
          href="#pricing"
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition"
        >
          시작하기
        </Link>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
          사업계획서,<br />
          질문에 답하다 보면 완성됩니다
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          10개 질문에 대화하듯 답하세요.<br />
          예비창업패키지 양식에 맞는 사업계획서가 자동으로 만들어집니다.
        </p>
        <Link
          href="#pricing"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30"
        >
          무료로 시작하기 →
        </Link>
        <p className="mt-4 text-sm text-slate-500">
          ✓ 가입 후 3분이면 시작 &nbsp; ✓ 신용카드 필요 없음
        </p>
      </section>

      {/* Problem Section */}
      <section className="bg-slate-100 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            사업계획서, 이런 경험 있으시죠?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-4xl mb-4">😵</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">"뭘 써야 하지?"</h3>
              <p className="text-slate-600">
                창업 아이디어는 있는데<br />
                막상 문서로 쓰려니 막막함
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">"양식이 왜 이래..."</h3>
              <p className="text-slate-600">
                정부지원사업마다 양식이 다르고<br />
                뭘 원하는 건지 모르겠음
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">"시간이 없어"</h3>
              <p className="text-slate-600">
                마감은 다가오는데<br />
                계획서에 일주일을 쓸 수 없음
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            그냥 대화하세요. 계획서는 저희가 씁니다.
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            복잡한 양식 채우기 대신, 10개 질문에 편하게 답하세요.<br />
            당신의 답변이 자동으로 사업계획서가 됩니다.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            3단계면 끝
          </h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                💬
              </div>
              <h3 className="text-xl font-bold mb-4">Step 1. 질문에 답하기</h3>
              <p className="text-blue-100">
                "어떤 문제를 해결하고 싶어요?"<br />
                대화하듯 자연스럽게 답변하세요.<br />
                어려운 용어 몰라도 괜찮아요.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                🔄
              </div>
              <h3 className="text-xl font-bold mb-4">Step 2. AI가 구조화</h3>
              <p className="text-blue-100">
                당신의 답변을<br />
                사업계획서 양식에 맞게 정리합니다.<br />
                예창패 평가항목 기준으로.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                📄
              </div>
              <h3 className="text-xl font-bold mb-4">Step 3. 다운로드 & 수정</h3>
              <p className="text-blue-100">
                완성된 초안을 PDF/Word로 받고<br />
                필요한 부분만 다듬으세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            왜 플랜메이트인가요?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: "🎯", title: "정부지원사업 특화", desc: "예비창업패키지, 초기창업패키지 등 실제 평가항목에 맞춰 가이드" },
              { icon: "💬", title: "인터뷰 방식", desc: "빈칸 채우기 NO. 막히면 AI가 힌트도 줍니다" },
              { icon: "⚡", title: "30분이면 초안 완성", desc: "일주일 고민 → 30분 대화로 단축" },
              { icon: "✏️", title: "자유롭게 수정", desc: "생성된 초안을 바로 편집 가능" },
              { icon: "📊", title: "평가항목 체크", desc: "'혁신성 어필 부족' 같은 피드백 제공 (coming soon)" },
              { icon: "🔄", title: "무제한 재생성", desc: "마음에 들 때까지 다시 만들기" },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-100 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            먼저 써본 창업자들의 후기
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { quote: "진짜 30분만에 초안 나왔어요. 그동안 왜 혼자 끙끙댔나 싶네요.", author: "김OO", role: "푸드테크 창업 준비 중" },
              { quote: "예창패 서류 처음 쓰는 건데 뭘 써야 하는지 감이 잡혔어요.", author: "이OO", role: "에듀테크 예비창업자" },
              { quote: "계획서 대행 맡기려다가 발견했는데 50만원 아꼈습니다 ㅋㅋ", author: "박OO", role: "1인 커머스 창업자" },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm">
                <p className="text-slate-700 mb-6">"{testimonial.quote}"</p>
                <div className="text-sm">
                  <span className="font-bold text-slate-800">{testimonial.author}</span>
                  <span className="text-slate-500"> · {testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            가격
          </h2>
          <div className="max-w-md mx-auto bg-white border-2 border-blue-600 rounded-3xl p-8 shadow-xl shadow-blue-600/10">
            <div className="text-center mb-6">
              <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1 rounded-full">
                🚀 얼리버드 특가
              </span>
            </div>
            <div className="text-center mb-6">
              <span className="text-5xl font-bold text-slate-900">₩9,900</span>
              <span className="text-slate-500"> /회</span>
              <p className="text-sm text-slate-400 mt-2 line-through">정가 ₩19,900</p>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "10개 질문 인터뷰",
                "사업계획서 초안 생성",
                "PDF/Word 다운로드",
                "1회 재생성 포함",
              ].map((item, i) => (
                <li key={i} className="flex items-center text-slate-700">
                  <span className="text-green-500 mr-3">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <button className="w-full bg-blue-600 text-white py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition">
              지금 시작하기 →
            </button>
            <p className="text-center text-sm text-slate-500 mt-4">
              * 첫 3개 질문은 무료로 체험 가능<br />
              * 마음에 안 들면 100% 환불
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-100 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            자주 묻는 질문
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { q: "정말 30분이면 되나요?", a: "네, 평균 25~35분 소요됩니다. 답변이 준비되어 있다면 더 빨라요." },
              { q: "AI가 쓴 티 안 나나요?", a: "당신의 답변을 기반으로 작성해서 당신만의 스토리가 담깁니다. 물론 수정은 필수예요." },
              { q: "예비창업패키지 말고 다른 것도 되나요?", a: "현재는 예창패 중심이고, 초기창업패키지, 소상공인 지원 등 순차적으로 추가 예정입니다." },
              { q: "계획서 써주는 거랑 뭐가 달라요?", a: "대행은 50~200만원, 1~2주 소요. 저희는 1만원, 30분. 그리고 과정에서 본인 생각이 정리되는 건 덤." },
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl">
                <h3 className="font-bold text-slate-800 mb-2">Q: {faq.q}</h3>
                <p className="text-slate-600">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            사업계획서, 더 이상 미루지 마세요
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            지금 시작하면 오늘 초안을 손에 쥘 수 있습니다.
          </p>
          <button className="bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30">
            무료로 시작하기 →
          </button>
          <p className="mt-4 text-sm text-slate-500">
            가입 후 바로 시작 • 카드 등록 없음 • 첫 3개 질문 무료
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8">
        <div className="container mx-auto px-6 text-center text-slate-500">
          © 2026 플랜메이트 · 창업자를 위한 AI 사업계획서 빌더
        </div>
      </footer>
    </div>
  );
}

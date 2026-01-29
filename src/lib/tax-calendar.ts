export interface TaxEvent {
  id: string;
  name: string;
  description: string;
  dueDate: string; // MM-DD format
  targets: string[];
  category: string;
  priority: "high" | "medium" | "low";
  tip: string;
  link?: string;
}

export const TAX_EVENTS: TaxEvent[] = [
  // 1월
  {
    id: "vat-q4",
    name: "부가가치세 확정신고 (2기)",
    description: "7~12월 매출/매입에 대한 부가세 신고·납부",
    dueDate: "01-25",
    targets: ["일반과세자", "법인사업자"],
    category: "부가가치세",
    priority: "high",
    tip: "매입세액공제를 위해 세금계산서를 꼭 챙기세요",
    link: "https://www.hometax.go.kr",
  },
  {
    id: "local-income",
    name: "지방소득세 특별징수 신고",
    description: "전월 원천징수한 지방소득세 신고·납부",
    dueDate: "01-10",
    targets: ["원천징수의무자"],
    category: "지방세",
    priority: "medium",
    tip: "매월 10일까지 신고해야 해요",
  },
  // 3월
  {
    id: "corporate-tax",
    name: "법인세 신고",
    description: "12월 결산법인 법인세 신고·납부",
    dueDate: "03-31",
    targets: ["법인사업자"],
    category: "법인세",
    priority: "high",
    tip: "결산 준비를 미리 해두세요",
    link: "https://www.hometax.go.kr",
  },
  // 4월
  {
    id: "vat-q1",
    name: "부가가치세 예정신고 (1기)",
    description: "1~3월 매출/매입에 대한 부가세 예정신고",
    dueDate: "04-25",
    targets: ["일반과세자", "법인사업자"],
    category: "부가가치세",
    priority: "high",
    tip: "예정신고 대상자인지 확인하세요",
  },
  // 5월
  {
    id: "income-tax",
    name: "종합소득세 신고",
    description: "전년도 소득에 대한 종합소득세 신고·납부",
    dueDate: "05-31",
    targets: ["개인사업자", "프리랜서", "예술인"],
    category: "종합소득세",
    priority: "high",
    tip: "경비처리 가능한 영수증을 미리 정리하세요",
    link: "https://www.hometax.go.kr",
  },
  // 7월
  {
    id: "vat-h1",
    name: "부가가치세 확정신고 (1기)",
    description: "1~6월 매출/매입에 대한 부가세 신고·납부",
    dueDate: "07-25",
    targets: ["일반과세자", "법인사업자"],
    category: "부가가치세",
    priority: "high",
    tip: "상반기 매입세금계산서를 정리하세요",
  },
  {
    id: "property-tax-1",
    name: "재산세 (1기분)",
    description: "건물, 토지에 대한 재산세",
    dueDate: "07-31",
    targets: ["부동산 소유자"],
    category: "지방세",
    priority: "medium",
    tip: "사업장 임차인은 해당 없어요",
  },
  // 8월
  {
    id: "income-tax-interim",
    name: "종합소득세 중간예납",
    description: "상반기 소득에 대한 중간예납",
    dueDate: "08-31",
    targets: ["개인사업자", "프리랜서"],
    category: "종합소득세",
    priority: "medium",
    tip: "전년 세액의 50%가 고지되면 납부",
  },
  // 9월
  {
    id: "property-tax-2",
    name: "재산세 (2기분)",
    description: "토지에 대한 재산세",
    dueDate: "09-30",
    targets: ["부동산 소유자"],
    category: "지방세",
    priority: "medium",
    tip: "7월에 납부한 건물분과 별도예요",
  },
  // 10월
  {
    id: "vat-q3",
    name: "부가가치세 예정신고 (2기)",
    description: "7~9월 매출/매입에 대한 부가세 예정신고",
    dueDate: "10-25",
    targets: ["일반과세자", "법인사업자"],
    category: "부가가치세",
    priority: "high",
    tip: "예정신고 대상자인지 확인하세요",
  },
  // 11월
  {
    id: "income-tax-interim-2",
    name: "종합소득세 중간예납 납부",
    description: "중간예납세액 납부 기한",
    dueDate: "11-30",
    targets: ["개인사업자", "프리랜서"],
    category: "종합소득세",
    priority: "high",
    tip: "분납 가능 여부 확인하세요",
  },
];

// 매월 반복 이벤트
export const MONTHLY_EVENTS: TaxEvent[] = [
  {
    id: "withholding",
    name: "원천세 신고·납부",
    description: "전월 원천징수한 세금 신고·납부",
    dueDate: "10", // 매월 10일
    targets: ["원천징수의무자"],
    category: "원천세",
    priority: "high",
    tip: "급여, 용역비 등을 지급한 경우",
    link: "https://www.hometax.go.kr",
  },
  {
    id: "four-insurance",
    name: "4대보험 납부",
    description: "국민연금, 건강보험, 고용보험, 산재보험",
    dueDate: "10", // 매월 10일
    targets: ["사업자", "고용주"],
    category: "4대보험",
    priority: "high",
    tip: "자동이체 설정하면 편해요",
  },
];

export interface UserTaxProfile {
  types: string[]; // 개인사업자, 프리랜서, 법인사업자, etc.
}

export function getUpcomingTaxEvents(profile: UserTaxProfile, daysAhead: number = 60): TaxEvent[] {
  const today = new Date();
  const currentYear = today.getFullYear();
  const upcoming: TaxEvent[] = [];

  TAX_EVENTS.forEach((event) => {
    const [month, day] = event.dueDate.split("-").map(Number);
    let eventDate = new Date(currentYear, month - 1, day);
    
    // If the event has passed this year, check next year
    if (eventDate < today) {
      eventDate = new Date(currentYear + 1, month - 1, day);
    }

    const daysUntil = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    // Check if user is target
    const isTarget = event.targets.some((t) => 
      profile.types.includes(t) || 
      (t === "개인사업자" && profile.types.includes("프리랜서")) ||
      (t === "일반과세자" && (profile.types.includes("개인사업자") || profile.types.includes("프리랜서")))
    );

    if (isTarget && daysUntil >= 0 && daysUntil <= daysAhead) {
      upcoming.push({
        ...event,
        dueDate: eventDate.toISOString().split("T")[0],
      });
    }
  });

  return upcoming.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
}

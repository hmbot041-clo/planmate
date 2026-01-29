export interface FundingProgram {
  id: string;
  name: string;
  organization: string;
  category: string;
  target: string[];
  stage: string[];
  region: string[];
  amount: string;
  period: string;
  deadline: string;
  description: string;
  benefits: string[];
  requirements: string[];
  link: string;
}

export const FUNDING_PROGRAMS: FundingProgram[] = [
  {
    id: "preliminary-startup",
    name: "예비창업패키지",
    organization: "창업진흥원",
    category: "창업지원",
    target: ["예비창업자", "초기창업자"],
    stage: ["아이디어", "시제품"],
    region: ["전국"],
    amount: "최대 1억원",
    period: "약 10개월",
    deadline: "상반기 3월, 하반기 8월 (매년 변동)",
    description: "혁신적인 기술 아이디어를 보유한 예비창업자의 원활한 창업사업화를 지원",
    benefits: [
      "사업화 자금 최대 1억원",
      "창업교육 및 멘토링",
      "사업공간 제공",
    ],
    requirements: [
      "신청일 기준 사업자등록 전 또는 1년 미만",
      "대표자 39세 이하 우대",
      "혁신성장 분야 아이템",
    ],
    link: "https://www.k-startup.go.kr",
  },
  {
    id: "initial-startup",
    name: "초기창업패키지",
    organization: "창업진흥원",
    category: "창업지원",
    target: ["초기창업자"],
    stage: ["시제품", "초기매출"],
    region: ["전국"],
    amount: "최대 1억원",
    period: "약 10개월",
    deadline: "2월~3월 (매년 변동)",
    description: "창업 3년 이내 초기창업자의 성장을 위한 사업화 지원",
    benefits: [
      "사업화 자금 최대 1억원",
      "전담 멘토링",
      "후속 투자 연계",
    ],
    requirements: [
      "창업 3년 이내 기업",
      "혁신 기술/아이디어 보유",
    ],
    link: "https://www.k-startup.go.kr",
  },
  {
    id: "seoul-youth",
    name: "서울시 청년창업지원",
    organization: "서울시",
    category: "창업지원",
    target: ["예비창업자", "초기창업자"],
    stage: ["아이디어", "시제품"],
    region: ["서울"],
    amount: "최대 5천만원",
    period: "6개월",
    deadline: "상시",
    description: "서울 거주 청년 창업자를 위한 맞춤형 지원",
    benefits: [
      "사업화 자금",
      "공유오피스 제공",
      "네트워킹 기회",
    ],
    requirements: [
      "만 39세 이하 청년",
      "서울시 거주 또는 서울 소재 창업",
    ],
    link: "https://seoulsba.kr",
  },
  {
    id: "small-biz-policy",
    name: "소상공인 정책자금",
    organization: "소상공인시장진흥공단",
    category: "소상공인",
    target: ["소상공인", "예비창업자"],
    stage: ["아이디어", "시제품", "초기매출", "성장"],
    region: ["전국"],
    amount: "최대 1억원 (대출)",
    period: "5년 (2년 거치)",
    deadline: "상시 (예산 소진 시 마감)",
    description: "소상공인의 경영안정 및 성장을 위한 저금리 정책자금",
    benefits: [
      "연 2~3% 저금리 대출",
      "2년 거치 후 3년 상환",
      "신용등급 무관",
    ],
    requirements: [
      "소상공인 기준 충족",
      "사업자등록 보유",
    ],
    link: "https://www.semas.or.kr",
  },
  {
    id: "artist-welfare",
    name: "예술인 창작지원금",
    organization: "예술인복지재단",
    category: "예술인",
    target: ["예술인"],
    stage: ["아이디어", "시제품", "초기매출"],
    region: ["전국"],
    amount: "300~500만원",
    period: "6개월",
    deadline: "상반기 4월, 하반기 9월",
    description: "예술인의 창작활동 지원을 위한 지원금",
    benefits: [
      "창작지원금 지급",
      "창작 공간 연계",
      "전시/공연 기회 제공",
    ],
    requirements: [
      "예술활동증명 완료",
      "프로젝트 계획서 제출",
    ],
    link: "https://www.kawf.kr",
  },
  {
    id: "seoul-culture",
    name: "서울문화재단 통합공모",
    organization: "서울문화재단",
    category: "예술인",
    target: ["예술인"],
    stage: ["아이디어", "시제품"],
    region: ["서울"],
    amount: "1천만원~5천만원",
    period: "6~12개월",
    deadline: "1차 2월, 2차 7월",
    description: "서울 기반 예술인의 창작/기획/리서치 활동 지원",
    benefits: [
      "프로젝트 지원금",
      "공간 지원",
      "홍보 지원",
    ],
    requirements: [
      "서울 거주 또는 활동 예술인",
      "프로젝트 기획안 제출",
    ],
    link: "https://www.sfac.or.kr",
  },
  {
    id: "content-korea",
    name: "콘텐츠 창의인재 동반사업",
    organization: "한국콘텐츠진흥원",
    category: "콘텐츠",
    target: ["예비창업자", "초기창업자", "예술인"],
    stage: ["아이디어", "시제품"],
    region: ["전국"],
    amount: "최대 3천만원",
    period: "8개월",
    deadline: "3월~4월",
    description: "콘텐츠 분야 창작자/창업자 지원",
    benefits: [
      "제작지원금",
      "멘토링",
      "유통/판로 연계",
    ],
    requirements: [
      "콘텐츠 분야 프로젝트",
      "창작 역량 보유",
    ],
    link: "https://www.kocca.kr",
  },
  {
    id: "tech-startup",
    name: "팁스(TIPS)",
    organization: "중소벤처기업부",
    category: "창업지원",
    target: ["초기창업자"],
    stage: ["시제품", "초기매출"],
    region: ["전국"],
    amount: "최대 5억원 (R&D)",
    period: "2년",
    deadline: "상시",
    description: "민간 주도형 기술창업 지원 프로그램",
    benefits: [
      "R&D 자금 최대 5억원",
      "엔젤투자 연계",
      "해외진출 지원",
    ],
    requirements: [
      "TIPS 운영사 추천 필수",
      "기술 기반 스타트업",
      "창업 7년 이내",
    ],
    link: "https://www.jointips.or.kr",
  },
];

export interface UserProfile {
  type: string; // 예비창업자, 초기창업자, 소상공인, 예술인
  stage: string; // 아이디어, 시제품, 초기매출, 성장
  region: string;
  category: string; // 기술, 콘텐츠, 일반, 예술
  age?: number;
}

export function matchFundingPrograms(profile: UserProfile): FundingProgram[] {
  return FUNDING_PROGRAMS.filter((program) => {
    const matchTarget = program.target.some(
      (t) => t === profile.type || t === "예비창업자" && profile.type === "초기창업자"
    );
    const matchStage = program.stage.includes(profile.stage);
    const matchRegion = program.region.includes("전국") || program.region.includes(profile.region);
    
    return matchTarget && matchStage && matchRegion;
  }).sort((a, b) => {
    // Prioritize exact matches
    const aScore = (a.target.includes(profile.type) ? 2 : 0) + 
                   (a.region.includes(profile.region) ? 1 : 0);
    const bScore = (b.target.includes(profile.type) ? 2 : 0) + 
                   (b.region.includes(profile.region) ? 1 : 0);
    return bScore - aScore;
  });
}

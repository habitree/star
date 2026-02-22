# 별자리 서비스 개발 계획서

> **버전**: 1.0
> **작성일**: 2026년 1월 31일
> **목적**: MVP 개발 로드맵 및 기술 명세

---

## 1. 기술 스택

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React Context + Zustand
- **i18n**: next-intl (다국어)

### Backend (API Routes)
- **Runtime**: Next.js API Routes
- **Database**: JSON 파일 (MVP) → PostgreSQL (Phase 2)
- **Astrology Engine**: astronomia 라이브러리

### 배포
- **Platform**: Cloudflare (Workers/Pages, OpenNext + Wrangler)
- **Domain**: TBD

---

## 2. MVP 개발 순서 (Phase 1)

### Step 1: 프로젝트 기본 구조
```
/star
├── /src
│   ├── /app                    # Next.js App Router
│   │   ├── /[locale]           # 다국어 라우팅
│   │   │   ├── page.tsx        # 홈페이지
│   │   │   ├── /horoscope      # 운세 페이지
│   │   │   ├── /zodiac         # 별자리 상세
│   │   │   ├── /compatibility  # 궁합
│   │   │   └── /birth-chart    # 출생 차트
│   │   └── /api                # API Routes
│   ├── /components             # 공통 컴포넌트
│   ├── /data                   # 정적 데이터 (JSON)
│   ├── /lib                    # 유틸리티
│   ├── /hooks                  # Custom Hooks
│   ├── /types                  # TypeScript 타입
│   └── /i18n                   # 다국어 설정
├── /public                     # 정적 파일
├── /docs                       # 기획 문서
└── /research                   # 리서치 자료
```

### Step 2: 12별자리 데이터 모델
- 12별자리 기본 정보 (다국어)
- 성격 특성, 원소, 행성 등
- 별자리 이미지/아이콘

### Step 3: 운세 시스템
- 일일/주간/월간 운세 데이터 구조
- 카테고리별 운세 (종합, 연애, 금전, 건강, 직장)
- 운세 생성 로직

### Step 4: 별자리 상세 페이지
- 각 별자리별 상세 정보
- SEO 최적화 메타태그

### Step 5: 궁합 기능
- 144개 조합 데이터
- 궁합 점수 계산 로직

### Step 6: 출생 차트
- 날짜/시간/장소 입력
- 태양/달/상승궁 계산

---

## 3. 파일별 개발 명세

### 3.1 데이터 파일

#### `/src/data/zodiac-signs.ts`
```typescript
interface ZodiacSign {
  id: string;
  names: { ko: string; en: string; zh: string; ja: string; es: string };
  symbol: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  modality: 'cardinal' | 'fixed' | 'mutable';
  rulingPlanet: string;
  dateRange: { start: string; end: string };
  traits: { positive: string[]; negative: string[] };
  compatibility: { best: string[]; worst: string[] };
}
```

#### `/src/data/horoscopes/daily/[date].json`
```typescript
interface DailyHoroscope {
  date: string;
  signs: {
    [signId: string]: {
      overall: { score: number; text: Record<string, string> };
      love: { score: number; text: Record<string, string> };
      career: { score: number; text: Record<string, string> };
      health: { score: number; text: Record<string, string> };
      money: { score: number; text: Record<string, string> };
      luckyNumber: number;
      luckyColor: string;
    }
  }
}
```

### 3.2 API Routes

| Endpoint | Method | 설명 |
|----------|--------|------|
| `/api/horoscope/daily/[sign]` | GET | 일일 운세 |
| `/api/horoscope/weekly/[sign]` | GET | 주간 운세 |
| `/api/horoscope/monthly/[sign]` | GET | 월간 운세 |
| `/api/zodiac/[sign]` | GET | 별자리 상세 |
| `/api/compatibility` | POST | 궁합 분석 |
| `/api/birth-chart` | POST | 출생 차트 계산 |

### 3.3 페이지 컴포넌트

| 페이지 | 경로 | 설명 |
|--------|------|------|
| 홈 | `/[locale]` | 오늘의 운세 요약, 별자리 선택 |
| 일일 운세 | `/[locale]/horoscope/daily` | 12별자리 일일 운세 |
| 별자리 상세 | `/[locale]/zodiac/[sign]` | 별자리 상세 정보 |
| 궁합 | `/[locale]/compatibility` | 두 별자리 궁합 |
| 출생 차트 | `/[locale]/birth-chart` | 차트 계산기 |

---

## 4. 서브에이전트 작업 분배

### Agent 1: 프로젝트 구조 및 설정
- Next.js 프로젝트 초기화
- TypeScript, Tailwind 설정
- 다국어(i18n) 설정
- 기본 레이아웃

### Agent 2: 데이터 모델 및 콘텐츠
- 12별자리 데이터 (5개 언어)
- 운세 템플릿 데이터
- 궁합 데이터 (144조합)

### Agent 3: 운세 시스템
- 운세 API Routes
- 운세 페이지 컴포넌트
- 운세 생성 유틸리티

### Agent 4: 별자리 & 궁합
- 별자리 상세 페이지
- 궁합 계산 로직
- 궁합 페이지

### Agent 5: 출생 차트
- 천문학적 계산 로직
- 차트 입력 폼
- 차트 결과 표시

---

## 5. 진행 상황 추적

### 완료된 작업
- [ ] 프로젝트 초기화
- [ ] 기본 레이아웃
- [ ] 12별자리 데이터
- [ ] 일일 운세
- [ ] 별자리 상세
- [ ] 궁합 기능
- [ ] 출생 차트

### 진행 중인 작업
(서브에이전트 실행 시 업데이트)

---

## 6. 개발 컨벤션

### 파일 명명 규칙
- 컴포넌트: `PascalCase.tsx`
- 유틸리티: `camelCase.ts`
- 타입: `types.ts` 또는 `*.types.ts`
- 데이터: `kebab-case.ts`

### 코드 스타일
- ESLint + Prettier
- 함수형 컴포넌트 + Hooks
- Server Components 우선

---

*문서 끝*

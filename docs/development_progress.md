# 개발 진행 상황

> **최종 업데이트**: 2026-02-07
> **상태**: Phase 1 완료, Phase 2 확장 진행 중 (로드맵 반영)

---

## 완료 요약

| 항목 | 상태 | 비고 |
|------|------|------|
| Phase 1 MVP | ✅ 완료 | 운세·별자리·궁합·출생차트·즐겨찾기·다국어 |
| Phase 2 인증(목업) | ✅ 완료 | 로그인/회원가입/프로필, auth-store (추후 실인증 연동) |
| Phase 2 소셜 공유 | ✅ 완료 | ShareButton, 일일 운세·별자리 상세 페이지 적용 |
| 푸시 알림 / 결제·구독 / AI 개인화 | 🔜 예정 | 로드맵 M4–M6 순 |

---

## Phase 1: 기본 구조 ✅

### 프로젝트 설정
```
✅ package.json
✅ tsconfig.json
✅ tailwind.config.ts
✅ postcss.config.js
✅ next.config.js
```

### 타입 정의 (`/src/types/`)
```
✅ zodiac.ts        - ZodiacSign, Element, Modality
✅ horoscope.ts     - DailyHoroscope, WeeklyHoroscope, MonthlyHoroscope
✅ compatibility.ts - CompatibilityResult, CompatibilityData
✅ birth-chart.ts   - BirthChartInput, BirthChartResult
✅ index.ts         - 모든 타입 re-export
```

### 유틸리티 (`/src/lib/`)
```
✅ utils.ts              - cn(), formatDate()
✅ zodiac-utils.ts       - getZodiacSignByDate(), calculateCompatibilityScore()
✅ horoscope-generator.ts - generateDailyHoroscope(), generateWeeklyHoroscope()
✅ astro-calculator.ts   - calculateSunSign(), calculateMoonSign(), calculateRisingSign()
```

### 데이터 (`/src/data/`)
```
✅ zodiac-signs.ts       - 12별자리 완전 데이터 (5개 언어)
✅ horoscope-templates.ts - 운세 템플릿 (카테고리별, 레벨별)
✅ compatibility-data.ts  - 144개 궁합 조합 데이터
✅ cities.ts              - 26개 주요 도시 위도/경도
```

### 다국어 설정 (`/src/i18n/`)
```
✅ config.ts             - locales, defaultLocale
✅ request.ts            - getRequestConfig
✅ messages/ko.json      - 한국어
✅ messages/en.json      - 영어
✅ messages/zh.json      - 중국어
✅ messages/ja.json      - 일본어
✅ messages/es.json      - 스페인어
```

---

## Phase 2: 핵심 기능 ✅

### API Routes (`/src/app/api/`)
```
✅ horoscope/daily/[sign]/route.ts   - 일일 운세 API
✅ horoscope/weekly/[sign]/route.ts  - 주간 운세 API
✅ horoscope/monthly/[sign]/route.ts - 월간 운세 API
✅ compatibility/route.ts            - 궁합 계산 API
✅ birth-chart/route.ts              - 출생 차트 API
```

### 페이지 (`/src/app/`)
```
✅ page.tsx                          - 홈페이지
✅ layout.tsx                        - 루트 레이아웃
✅ horoscope/page.tsx                - 운세 메인
✅ horoscope/daily/page.tsx          - 일일 운세
✅ horoscope/daily/[sign]/page.tsx   - 별자리별 일일 운세 (공유 버튼 포함)
✅ zodiac/page.tsx                   - 별자리 목록
✅ zodiac/[sign]/page.tsx            - 별자리 상세 (공유 버튼 포함)
✅ compatibility/page.tsx            - 궁합 메인
✅ birth-chart/page.tsx              - 출생 차트
✅ login/page.tsx                    - 로그인 (Phase 2 목업)
✅ signup/page.tsx                   - 회원가입 (Phase 2 목업)
✅ profile/page.tsx                  - 프로필 (Phase 2, 즐겨찾기 연동)
```

### 컴포넌트 (`/src/components/`)

#### Layout
```
✅ layout/Header.tsx        - 헤더 (네비게이션, 언어 선택)
✅ layout/Footer.tsx        - 푸터
```

#### UI
```
✅ ui/ZodiacCard.tsx        - 별자리 카드
✅ ui/ScoreBar.tsx          - 점수 표시 바
✅ ui/ShareButton.tsx        - 소셜 공유 (Web Share API / 링크 복사)
✅ ui/FavoriteButton.tsx    - 즐겨찾기 버튼
✅ ui/FavoritesSection.tsx  - 즐겨찾기 섹션
```

#### Zodiac
```
✅ zodiac/ZodiacHeader.tsx       - 별자리 헤더
✅ zodiac/TraitsSection.tsx      - 성격 특성 섹션
✅ zodiac/CompatibilityPreview.tsx - 궁합 미리보기
```

#### Compatibility
```
✅ compatibility/CompatibilityForm.tsx   - 궁합 입력 폼
✅ compatibility/CompatibilityResult.tsx - 궁합 결과 표시
✅ compatibility/ScoreGauge.tsx          - 원형 점수 게이지
✅ compatibility/index.ts                - 내보내기
```

#### Birth Chart
```
✅ birth-chart/BirthChartForm.tsx   - 입력 폼
✅ birth-chart/BirthChartResult.tsx - 결과 표시
✅ birth-chart/BigThreeCard.tsx     - Big Three 카드
✅ birth-chart/ChartWheel.tsx       - 차트 휠 시각화
✅ birth-chart/index.ts             - 내보내기
```

---

## 기능 상세

### 1. 운세 시스템
- **일일 운세**: 12별자리 × 5개 카테고리 (종합, 연애, 금전, 건강, 직장)
- **주간 운세**: 7일 요약, 최고의 날/주의할 날
- **월간 운세**: 4주 요약, 월간 하이라이트
- **시드 기반 생성**: 같은 날짜+별자리 = 같은 운세 (일관성)

### 2. 별자리 상세
- **기본 정보**: 이름, 심볼, 기간, 원소, 모달리티, 지배 행성
- **성격 특성**: 긍정적 3개, 부정적 3개 (다국어)
- **궁합 미리보기**: Best 3, Worst 2

### 3. 궁합 기능
- **144개 조합**: 모든 별자리 쌍에 대한 데이터
- **점수 계산**: 원소(60%) + 모달리티(40%) 기반
- **카테고리별 점수**: 연애, 친구, 업무
- **상세 조언**: 주요 20개 조합 다국어 조언

### 4. 출생 차트
- **Big Three**: 태양 별자리, 달 별자리, 상승궁
- **차트 휠**: SVG 기반 12칸 원형 시각화
- **도시 검색**: 26개 주요 도시 자동완성
- **해석 텍스트**: 각 별자리별 다국어 해석

---

## 기술 스택

```
Framework:  Next.js 15 (App Router)
Language:   TypeScript
Styling:    Tailwind CSS
State:      Zustand (user-store, auth-store) + localStorage persist
배포:       Cloudflare (OpenNext + Wrangler)
```

---

## 프로젝트 구조

```
/star
├── /docs                   # 기획 문서
│   ├── zodiac_service_prd.md
│   ├── marketing_psychology_strategy.md
│   ├── multilingual_keyword_strategy.md
│   ├── competitor_analysis.md
│   ├── development_plan.md
│   └── development_progress.md
├── /research               # 리서치 자료
├── /src
│   ├── /app               # 페이지 (locale 없음: /, /horoscope, /login 등)
│   │   ├── /api           # API Routes (5개)
│   │   └── globals.css
│   ├── /components        # 레이아웃·UI·별자리·궁합·출생차트
│   ├── /data              # 정적 데이터
│   ├── /lib               # 유틸리티·테스트
│   ├── /stores            # user-store (즐겨찾기/설정), auth-store (인증 목업)
│   └── /types             # 타입 정의
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

---

## Phase 2 확장 (로드맵 반영)

| 순서 | 항목 | 상태 | 비고 |
|------|------|------|------|
| 1 | 사용자 인증/프로필 | ✅ 목업 완료 | auth-store, /login, /signup, /profile, Header 연동 |
| 2 | 소셜 공유 | ✅ 완료 | ShareButton, 일일 운세·별자리 상세 적용 |
| 3 | 푸시 알림 | 🔜 | 인증 선행 완료 후 |
| 4 | 결제/구독 | 🔜 | 인증·PG 연동 |
| 5 | AI 개인화 분석 | 🔜 | 인증·출생차트 데이터 활용 |

*상세 로드맵: docs/service_advancement_plan.md Part B.3*

---

## 다음 단계

1. **실인증 연동**: Supabase Auth 또는 NextAuth 등으로 auth-store/API 교체 → [next_steps_guide.md](./next_steps_guide.md#1-실인증-연동)
2. **푸시 알림**: 구독·권한·백엔드 연동 → [next_steps_guide.md](./next_steps_guide.md#2-푸시-알림)
3. **결제/구독**: PG·빌링 선정 및 연동 → [next_steps_guide.md](./next_steps_guide.md#3-결제구독)
4. **테스트**: `npm run test:run` (Vitest). auth-store·user-store·horoscope-generator·errors 테스트 포함.
5. **배포**: `npm run cf:build` / `cf:deploy`

---

*문서 끝*

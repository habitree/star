# 별자리 운세 서비스 - 프로젝트 지침

## 1. 프로젝트 개요

**서비스**: 별자리 운세 서비스 (12별자리 × 5카테고리 × 5언어)
**핵심 가치**: "사용자가 매일 돌아오는 별자리 서비스"
**기술 스택**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Zustand, Cloudflare Workers (OpenNext)
**수익 모델**: Google AdSense (현재) → Freemium 구독 (계획)

---

## 2. CTO 페르소나 - "별의 설계자"

> 모든 기술 결정의 판단 기준: **"이 변경이 사용자를 내일 다시 돌아오게 만드는가?"**

### 아키텍처 원칙

- **시드 기반 결정론적 콘텐츠 생성은 핵심 자산이다.** `content-pipeline.ts`의 `seededRandom`, `generateContentSeed`, `selectRandom` 패턴은 LLM API 비용 없이 무한 스케일을 가능하게 한다. 이 패턴을 절대 훼손하지 않는다.
- **단일 상태 소스를 유지한다.** 모든 사용자 상태(스트릭, 배지, 히스토리, 즐겨찾기, 설정)는 `user-store.ts` (Zustand + localStorage)에서 관리한다. localStorage에 직접 접근하지 않는다.
- **타입 안전성을 선행한다.** 새로운 engagement 기능을 추가할 때는 반드시 `types/engagement.ts`에 타입 정의를 먼저 한다.
- **오케스트레이터 패턴을 준수한다.** 모든 engagement 컴포넌트는 `HoroscopeClientApp.tsx`에서 조합한다. 이 패턴을 벗어나 독립적으로 engagement 로직을 추가하지 않는다.

### 코딩 규칙

- 사용자 행동 추적: `engagement-tracker.ts`의 `trackEvent()` 사용. 새 이벤트 타입은 `EngagementEventType`에 먼저 정의
- 콘텐츠 생성: `content-pipeline.ts`의 시드 패턴 재사용 (API 비용 0 유지)
- 새 engagement 컴포넌트: `src/components/horoscope/` 하위
- UI 컴포넌트: `src/components/ui/` 하위
- 데이터/템플릿: `src/data/` 하위 TypeScript 파일
- 별자리별 콘텐츠: `src/data/sign-templates/` (12개 파일)
- 다국어 데이터 구조: `{ ko, en, zh, ja, es }` 객체 패턴 준수

---

## 3. 기획자 페르소나 - "별의 여행 설계사"

> 모든 기획 결정의 판단 기준: **"사용자 심리 여정의 매 단계에 심리적 보상이 존재하는가?"**

### 심리학 프레임워크

**Nir Eyal Hook Model** - 새 기능은 이 루프가 완성되는지 점검:
1. **트리거** (외부: 알림/시즌이벤트, 내부: 호기심/불안) → 서비스 접속
2. **행동** (생년월일 입력, 운세 확인, 체크인) → 최소 노력으로 실행 가능
3. **가변 보상** (매일 다른 운세, 랜덤 타로, 감정별 응답) → 예측 불가능한 보상
4. **투자** (스트릭 축적, 배지 수집, 즐겨찾기 등록) → 떠나기 어렵게 만듦

**BJ Fogg Behavior Model** - 행동 = 동기 × 능력 × 트리거:
- 동기: 미래 불안 해소, 자기 이해 욕구, 재미
- 능력: 생년월일만으로 시작, 3초 내 결과
- 트리거: 매일 바뀌는 운세, 시즌 이벤트, 스트릭 끊김 불안

### 5단계 심리 여정 매핑

| 단계 | 기간 | 사용자 심리 | 핵심 메커니즘 | 심리 원칙 |
|------|------|------------|-------------|----------|
| 호기심 | Day 0 | "한번 해볼까?" | 온보딩 → 10초 내 첫 결과 | 바넘 효과 |
| 탐색 | Day 1-3 | "더 볼까" | 궁합, 다른 별자리, 3일 배지 해금 | 가변 보상 |
| 몰입 | Day 4-14 | "나랑 맞는듯" | 출생 차트, 프리미엄 타로 해금 | 확증 편향 |
| 신뢰 | Day 15-30 | "믿을 수 있어" | 적중 리마인드, 월간 리딩 해금 | 자기실현적 예언 |
| 습관화 | Day 30+ | "매일 확인해야지" | 루틴화, 100일 히든 콘텐츠 | 매몰 비용 |

### 활용할 심리학 원칙 (주요 기능 개발 시 최소 2개 권장)

| 원칙 | 설명 | 현재 적용 |
|------|------|----------|
| 바넘 효과 (Barnum Effect) | 일반적 묘사를 개인화로 인식 | 운세 문구, 성격 분석 |
| 자이가르닉 효과 (Zeigarnik Effect) | 미완성 과제에 대한 호기심 | 내일 티저, 잠긴 콘텐츠 |
| 손실 회피 (Loss Aversion) | 잃는 것에 대한 두려움 | 스트릭 끊김, 배지 유지 |
| 가변 보상 (Variable Rewards) | 예측 불가 보상이 더 강력 | 매일 다른 운세, 랜덤 타로 |
| 매몰 비용 (Sunk Cost) | 투자한 것에 계속 투자 | 축적된 스트릭/배지/히스토리 |
| 사회적 증거 (Social Proof) | 타인 행동을 참고 | 즐겨찾기 공유, 랭킹 |
| 확증 편향 (Confirmation Bias) | 맞는 정보만 선별 수용 | "맞아!" 반응 유도 문구 |
| 자기실현적 예언 (Self-fulfilling Prophecy) | 예측이 행동을 유도 | 행동 제안형 운세 |

---

## 4. STAR 의사결정 프레임워크 (가이드)

주요 기능 추가/변경 시 참조. 버그 수정이나 단순 변경에서는 생략 가능.

각 항목 1-5점, 합산 12점 이상이면 우선 구현 권장:

- **S**tickiness (중독성): 이 기능 때문에 사용자가 다시 돌아오는가?
- **T**rigger (트리거): 사용자에게 이 기능을 떠올리게 하는 외부/내부 트리거가 있는가?
- **A**ccessibility (접근성): 3초 내에 핵심 가치를 전달하는가? 진입 장벽은 낮은가?
- **R**etention loop (리텐션 루프): 트리거→행동→보상→투자의 완결된 루프가 있는가?

---

## 5. 핵심 파일 참조 맵

### 상태 & 데이터

| 파일 | 역할 |
|------|------|
| `src/stores/user-store.ts` | Zustand + localStorage. 모든 사용자 상태의 Single Source of Truth |
| `src/types/engagement.ts` | Badge, StreakReward, UnlockCondition, ChatMessage 등 전체 타입 |
| `src/types/horoscope.ts` | 운세 데이터 타입 |
| `src/types/zodiac.ts` | 별자리 데이터 타입 |

### 핵심 엔진

| 파일 | 역할 |
|------|------|
| `src/lib/content-pipeline.ts` | 시드 기반 결정론적 콘텐츠 생성 (핵심 자산) |
| `src/lib/horoscope-generator.ts` | 운세 생성 로직 |
| `src/lib/streak-rewards.ts` | 5단계 마일스톤 배지 시스템 (3/7/14/30/100일) |
| `src/lib/content-unlock.ts` | 8단계 점진적 콘텐츠 게이트 |
| `src/lib/engagement-tracker.ts` | 10종 이벤트 로컬 분석 |

### 심리 & 참여

| 파일 | 역할 |
|------|------|
| `src/lib/chat-fortune.ts` | "별의 도사" 감정 인식 대화형 운세 엔진 |
| `src/lib/emotion-response.ts` | 감정 상태(긍정/중립/부정)별 메시징 |
| `src/lib/micro-story.ts` | 별자리 신화 마이크로 스토리 + 내일 티저 (자이가르닉) |
| `src/lib/seasonal-scheduler.ts` | 수성역행, 달 위상, 절기, 공휴일 이벤트 |
| `src/lib/biorhythm.ts` | 바이오리듬 계산 |

### 컴포넌트 (참여 시스템)

| 파일 | 역할 |
|------|------|
| `src/components/horoscope/HoroscopeClientApp.tsx` | 전체 컴포넌트 오케스트레이터 |
| `src/components/horoscope/DailyCheckIn.tsx` | 일일 체크인 UI + 축하 애니메이션 |
| `src/components/horoscope/StreakDashboard.tsx` | 스트릭 진행률 시각화 |
| `src/components/horoscope/FortuneChatBot.tsx` | 챗봇 UI |
| `src/components/horoscope/OnboardingFlow.tsx` | 3단계 온보딩 퍼널 |
| `src/components/horoscope/WelcomeBack.tsx` | 재방문 인사 |
| `src/components/horoscope/LockedContent.tsx` | 잠긴 콘텐츠 티저 |
| `src/components/horoscope/PersonalizedResult.tsx` | 메인 운세 결과 대시보드 |

### 데이터

| 파일 | 역할 |
|------|------|
| `src/data/zodiac-signs.ts` | 12별자리 기본 정보 (다국어) |
| `src/data/sign-templates/*.ts` | 별자리별 운세 템플릿 (12파일) |
| `src/data/horoscope-templates.ts` | 공통 운세 텍스트 템플릿 |
| `src/data/compatibility-data.ts` | 144 궁합 조합 데이터 |
| `src/data/tarot-data.ts` | 타로 카드 데이터 |
| `src/data/affirmation-templates.ts` | 확언 템플릿 |

---

## 6. KPI 목표 & 구현 매핑

| KPI | 목표 | 담당 구현 |
|-----|------|----------|
| D1 리텐션 | 30%+ | 온보딩 → 첫 운세 → 내일 티저 (자이가르닉) |
| D7 리텐션 | 35%+ | 스트릭 배지 해금 (3일 → 7일 주간리포트) |
| D30 리텐션 | 20%+ | 14일 프리미엄 타로 → 30일 월간 리딩 해금 |
| 세션 시간 | 4분+ | 5영역 운세 + 챗봇 + 바이오리듬 + 타로 |
| 세션/DAU | 2.0+ | 시간대별 운세 (아침/오후/저녁) |
| 유료 전환율 | 3% (12개월) | 콘텐츠 게이트 → 프리미엄 해금 → 구독 유도 |

---

## 7. 기존 문서 참조

새 기능 기획이나 아키텍처 결정 시 아래 문서를 참조:

| 문서 | 경로 | 내용 |
|------|------|------|
| PRD | `docs/zodiac_service_prd.md` | 시장, 수익 모델, KPI, 리스크 |
| 서비스 고도화 계획 | `docs/service_advancement_plan.md` | Part A-D 통합 로드맵 |
| 심리학 마케팅 전략 | `docs/marketing_psychology_strategy.md` | 심리 원칙, CTA, 시즌 캘린더 |
| 경쟁사 분석 | `docs/competitor_analysis.md` | 경쟁 포지셔닝, 차별화 전략 |
| 개발 진행 상황 | `docs/development_progress.md` | 완료/미완료 기능 목록 |
| 다국어 키워드 | `docs/multilingual_keyword_strategy.md` | SEO 키워드 전략 |
| 고도화 파트별 상세 | `docs/advancement/` | 파트 A-D 분리본 |

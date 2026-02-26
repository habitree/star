# 별자리 운세 서비스 고도화 스프린트 플랜 (2026 Q1)

> **작성일**: 2026-02-26
> **기간**: 2026 Q1 (Sprint 1-4) + Q2 M5-M6
> **목적**: 사용자 유입 극대화 + 쉬운 접근 → 수익화로 이어지는 성장 엔진 구축

---

## 현황 요약

| 항목 | 상태 |
|------|------|
| Phase 1 MVP | ✅ 100% 완성 |
| 심리학 기반 리텐션 시스템 | ✅ 완성 |
| 다국어 라우팅 (i18n) | ❌ 비활성화 (글로벌 트래픽 70% 차단) |
| 실인증 (Supabase Auth) | ❌ 목업 상태 |
| 구독 결제 (Stripe) | ❌ 미구현 |
| SEO 콘텐츠 클러스터 | ❌ 미구현 |

**핵심 제약**:
- `content-pipeline.ts` 시드 패턴 보존 필수
- `user-store.ts` 단일 상태 소스 유지
- `HoroscopeClientApp.tsx` 오케스트레이터 패턴 준수

---

## Sprint 1 (Week 1): 다국어 복원 + SEO 기초

**목표**: 글로벌 유입 70% 복원

### 변경 파일 목록

| 파일 | 작업 | 상태 |
|------|------|------|
| `src/i18n/config.ts` | backup에서 복사 | ✅ |
| `src/i18n/request.ts` | backup에서 복사 | ✅ |
| `src/i18n/messages/*.json` | backup에서 복사 (5개 언어) | ✅ |
| `next.config.js` | withNextIntl 플러그인 추가 | ✅ |
| `src/middleware.ts` | 신규 생성 (locale 감지 + redirect) | ✅ |
| `src/app/[locale]/layout.tsx` | 신규 생성 (html lang 동적화) | ✅ |
| `src/app/[locale]/page.tsx` | 신규 생성 (홈페이지 locale 버전) | ✅ |
| `src/app/[locale]/horoscope/` | 기존 horoscope 페이지 이동 | ✅ |
| `src/app/[locale]/zodiac/` | 기존 zodiac 페이지 이동 | ✅ |
| `src/app/[locale]/compatibility/` | 기존 compatibility 페이지 이동 | ✅ |
| `src/app/[locale]/birth-chart/` | 기존 birth-chart 페이지 이동 | ✅ |
| `src/app/page.tsx` | redirect('/ko') 처리 | ✅ |
| `src/components/ui/LanguageSelector.tsx` | backup에서 복사 | ✅ |
| `src/components/layout/Header.tsx` | LanguageSelector 통합 | ✅ |
| `src/app/sitemap.ts` | 5개 언어 × 전체 URL 확장 | ✅ |

### 완료 기준

- [ ] `/en/zodiac/aries` → 영어 렌더링
- [ ] `/zh/horoscope/daily/leo` → 중국어 렌더링
- [ ] sitemap.xml에 5개 언어 hreflang 포함
- [ ] `npm run cf:build` 빌드 성공

### 위험 대응

기존 `/horoscope/*` URL → 301 redirect → `/ko/horoscope/*` (SEO 보존)

---

## Sprint 2 (Week 2): 홈페이지 다국어 + 온보딩 강화

**목표**: D1 리텐션 30%+

### 변경 파일 목록

| 파일 | 작업 |
|------|------|
| `src/app/[locale]/page.tsx` | 서버 컴포넌트 전환, OnboardingPrompt 분리 |
| `src/components/horoscope/OnboardingPrompt.tsx` | 신규 생성 (클라이언트 컴포넌트) |
| `src/components/horoscope/OnboardingFlow.tsx` | useTranslations 적용 |
| `src/i18n/messages/*.json` | onboarding, home 네임스페이스 완성 |

### 완료 기준

- [ ] 영어 사용자 홈페이지 전체 UI 영어 표시
- [ ] 언어 전환 시 user-store.preferences.locale 동기화

---

## Sprint 3 (Week 3): 실인증 (Supabase Auth)

**목표**: 데이터 영속성 + 구독 기반 마련

### 신규/수정 파일

| 파일 | 역할 |
|------|------|
| `src/lib/supabase.ts` | Supabase 클라이언트 |
| `src/app/api/auth/callback/route.ts` | OAuth 콜백 |
| `src/hooks/useSupabaseSync.ts` | localStorage ↔ Supabase 동기화 |
| `src/stores/auth-store.ts` | 실인증으로 교체 |
| `src/app/[locale]/auth/login/page.tsx` | Google 로그인 버튼 추가 |

### Supabase DB 스키마

```sql
profiles (
  id UUID PK,
  display_name TEXT,
  birth_date DATE,
  birth_sign TEXT,
  locale TEXT,
  created_at TIMESTAMPTZ
)

user_streaks (
  user_id UUID FK REFERENCES profiles(id),
  visit_streak INTEGER,
  longest_streak INTEGER,
  last_check_in DATE,
  earned_badges JSONB
)
```

### 환경 변수

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

### 완료 기준

- [ ] Google 로그인 → Supabase UUID 생성 → profiles 저장
- [ ] 재로그인 시 생년월일/스트릭 복원
- [ ] user-store.ts 아키텍처 보존 (localStorage 직접 접근 없음)

---

## Sprint 4 (Week 4): 콘텐츠 클러스터 SEO

**목표**: 오가닉 트래픽 월 10K+

### 신규 파일

| 파일 | 역할 |
|------|------|
| `src/app/[locale]/guide/page.tsx` | 가이드 허브 (Pillar Page) |
| `src/app/[locale]/guide/[topic]/page.tsx` | 개별 가이드 (Cluster Pages) |
| `src/data/guide-topics.ts` | 가이드 주제 데이터 |

### 타겟 키워드

- `/en/guide/aries-personality`
- `/en/guide/mercury-retrograde`
- `/en/guide/rising-sign`
- `/ko/guide/상승궁-이해하기`
- 12별자리 × 영어/한국어 페이지 인덱싱

### 완료 기준

- [ ] FAQ + BreadcrumbList Schema 적용
- [ ] Google Rich Results Test 통과
- [ ] Google Search Console 인덱싱 확인

---

## M5-M6 (Month 2): 구독 결제

**목표**: 유료 전환율 1%, 월 수익 $5K+

### 신규/수정 파일

| 파일 | 작업 |
|------|------|
| `src/lib/stripe.ts` | Stripe 클라이언트 |
| `src/app/api/subscription/create-checkout/route.ts` | 결제 세션 생성 |
| `src/app/api/subscription/webhook/route.ts` | Stripe 웹훅 처리 |
| `src/app/[locale]/premium/page.tsx` | 프리미엄 랜딩 페이지 |
| `src/types/engagement.ts` | `subscriptionRequired?: boolean` 추가 |
| `src/lib/content-unlock.ts` | 프리미엄 게이트 확장 |
| `src/components/horoscope/LockedContent.tsx` | 구독 유도 CTA 추가 |

### Freemium 경계

| 구분 | 무료 | 프리미엄 ($4.99/월) |
|------|------|---------------------|
| 일일 운세 | 5카테고리 | 무제한 + 심층 분석 |
| 궁합 | 1회/일 | 무제한 |
| 출생 차트 | Big Three | 전체 행성 분석 |
| 타로 | 기본 1장 | 프리미엄 덱 |
| 광고 | O | X |

---

## KPI 추적 목표

| 마일스톤 | 목표 지표 | 측정 방법 |
|---------|---------|---------|
| Sprint 1 완료 + 2주 | 글로벌 트래픽 +50% | Google Search Console |
| Sprint 2 완료 | D1 리텐션 30%+ | engagement-tracker.ts |
| Sprint 3 완료 | 사용자 계정 생성률 20%+ | Supabase Dashboard |
| Sprint 4 완료 | 신규 URL 인덱싱 | Google Search Console |
| M5-M6 완료 | 유료 전환 1%, 월 수익 $5K+ | Stripe Dashboard |

---

## 검증 커맨드

```bash
# Sprint 1 검증
npm run dev
# → /en/zodiac/aries 영어 렌더링 확인
# → /ko/horoscope/daily/aries 한국어 렌더링 확인

# i18n 빌드 검증
npm run cf:build

# Sprint 3 검증
# → Google OAuth 플로우 실행
# → Supabase Dashboard에서 profiles 테이블 레코드 확인

# 전체 테스트
npm run test:run

# 배포
npm run cf:deploy
```

# 바이브 코딩 에이전트 팀 전체 구성 개요

> **목적**: 별자리 운세 서비스 고도화를 위한 전문 에이전트 팀 분업 구조
> **운영 원칙**: 각 에이전트는 독립적 판단 기준을 가지되, CLAUDE.md 핵심 제약(content-pipeline.ts, user-store.ts, HoroscopeClientApp.tsx)을 공유함

---

## 팀 구성표

| # | 에이전트 ID | 페르소나 | 핵심 판단 기준 | 문서 |
|---|------------|---------|-------------|------|
| 1 | `seo-agent` | 별빛 탐정 | "Google 크롤러 + 사용자 모두에게 명확한 가치?" | [01_seo_agent.md](./01_seo_agent.md) |
| 2 | `retention-agent` | 별의 심리학자 | "Hook Model의 어느 링크를 강화?" | [02_retention_agent.md](./02_retention_agent.md) |
| 3 | `i18n-agent` | 별자리 번역가 | "번역이 아닌 현지화인가?" | [03_i18n_agent.md](./03_i18n_agent.md) |
| 4 | `monetization-agent` | 별의 경제학자 | "UX 파괴 없이 지속 가능한 수익?" | [04_monetization_agent.md](./04_monetization_agent.md) |
| 5 | `infra-agent` | 별의 건축가 | "Cloudflare Workers 제약(Edge 30ms) 준수?" | [05_infra_agent.md](./05_infra_agent.md) |

---

## 공통 제약 (전 에이전트)

1. **시드 패턴 보존**: `content-pipeline.ts`의 `seededRandom`, `generateContentSeed`, `selectRandom` 절대 훼손 금지
2. **단일 상태 소스**: `user-store.ts` 외 localStorage 직접 접근 금지
3. **오케스트레이터 패턴**: `HoroscopeClientApp.tsx` 외부에 독립적 engagement 로직 추가 금지
4. **타입 선행**: 새 타입은 반드시 `types/` 하위에 먼저 정의
5. **Cloudflare Edge 호환**: Node.js 전용 API(fs, crypto 등) 사용 금지

---

## 에이전트 협업 워크플로우

```
사용자 요청
    ↓
[해당 에이전트 선택]
    ↓
공통 제약 체크 → 위반 시 즉시 중단
    ↓
STAR 프레임워크 평가 (12점 이상 → 구현)
    ↓
구현 → 검증 → 문서 업데이트
```

---

## 에이전트별 주요 도메인 매핑

```
SEO-Agent          Retention-Agent     i18n-Agent
   ↓                    ↓                 ↓
sitemap.ts        streak-rewards.ts   next-intl
generateMetadata  engagement-tracker  [locale] routes
Schema.org        HoroscopeClientApp  messages/*.json
hreflang          user-store.ts       middleware.ts

Monetization-Agent    Infra-Agent
      ↓                   ↓
   Stripe           wrangler.toml
content-unlock.ts   rate-limiter.ts
LockedContent.tsx   error-tracking
adsense-config.ts   CF Workers
```

---

## 스프린트별 에이전트 주도권

| Sprint | 주도 에이전트 | 지원 에이전트 |
|--------|-------------|-------------|
| Sprint 1 | i18n-agent | seo-agent (hreflang) |
| Sprint 2 | i18n-agent | retention-agent (온보딩) |
| Sprint 3 | infra-agent | retention-agent (스트릭 동기화) |
| Sprint 4 | seo-agent | i18n-agent (다국어 가이드) |
| M5-M6 | monetization-agent | infra-agent (결제 API) |

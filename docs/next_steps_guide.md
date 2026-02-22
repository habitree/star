# 다음 진행 가이드

> **대상**: Phase 2 확장(인증 목업·소셜 공유) 완료 후 실인증·푸시·결제 연동 시 참고  
> **관련**: [development_progress.md](./development_progress.md), [service_advancement_plan.md](./service_advancement_plan.md)

---

## 0. 실제 연동 방향 (Google + Supabase + GitHub)

**Google 계정 로그인 + Supabase(인증·DB) + GitHub 배포**로 진행할 경우, 아래 문서를 우선 참고하세요.

→ **[integration_direction.md](./integration_direction.md)**  
- 아키텍처( Supabase = Auth·DB / 페이지 = Vercel 또는 Cloudflare )  
- Google OAuth(Supabase Auth) 설정·Next.js 연동 순서  
- GitHub 연동 배포(Vercel vs Cloudflare Pages)  
- DB·푸시·결제는 “다음 단계”로 이어지는 흐름

---

## 1. 실인증 연동

현재 `src/stores/auth-store.ts`는 **목업**입니다. 아래 중 하나로 교체할 때 참고하세요.

### 옵션 A: Supabase Auth

| 단계 | 작업 |
|------|------|
| 1 | `npm install @supabase/supabase-js` |
| 2 | `.env.local`에 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 추가 |
| 3 | `src/lib/supabase/client.ts` 생성 (createBrowserClient) |
| 4 | 로그인/회원가입: `supabase.auth.signInWithOtp` 또는 `signInWithPassword` 호출 후 세션 저장 |
| 5 | 프로필: `supabase.auth.getUser()` / `onAuthStateChange`로 auth-store 동기화 |
| 6 | `/login`, `/signup`, `/profile`에서 기존 목업 대신 Supabase 호출 사용 |
| 7 | (선택) API Routes에서 `supabase.auth.getUser(cookie)`로 서버 측 세션 검증 |

### 옵션 B: NextAuth.js

| 단계 | 작업 |
|------|------|
| 1 | `npm install next-auth` |
| 2 | `src/app/api/auth/[...nextauth]/route.ts` 추가, Providers(Credentials/Google 등) 설정 |
| 3 | `.env`에 `NEXTAUTH_SECRET`, `NEXTAUTH_URL` 및 Provider 클라이언트 시크릿 |
| 4 | 로그인/회원가입 페이지에서 `signIn()` / `signOut()` 호출 |
| 5 | Header·프로필에서 `useSession()` 사용 (auth-store 대신 또는 세션과 동기화) |
| 6 | 서버 컴포넌트·API에서 `getServerSession()`로 보호된 라우트 처리 |

### 공통 체크리스트

- [ ] 환경 변수 문서화 (`.env.example`에 필요한 키 목록)
- [ ] 로그아웃 시 auth-store `logout()` 호출로 클라이언트 상태 정리
- [ ] 프로필 페이지: 비로그인 시 `/login` 리다이렉트 유지

---

## 2. 푸시 알림

로드맵: 인증 선행 후 M4.

| 단계 | 작업 |
|------|------|
| 1 | **권한 요청**: 브라우저 `Notification.requestPermission()`, 설정 페이지에 “알림 켜기” 버튼 |
| 2 | **Service Worker**: `public/sw.js` 또는 Next.js PWA 플러그인으로 푸시 이벤트 수신 |
| 3 | **VAPID 키**: Web Push용 키 생성, 백엔드에 저장 |
| 4 | **백엔드**: 구독 엔드포인트 저장 (DB), 일일/주간 운세 발송 시점에 푸시 발송 (예: Cloudflare Worker, Supabase Edge Function) |
| 5 | **프론트**: `user-store`의 `preferences.notifications`(daily/weekly/monthly)와 서버 구독 상태 연동 |

참고: Cloudflare Workers에서는 [Push API](https://developers.cloudflare.com/workers/runtime-apis/push-notifications/) 제한이 있을 수 있음. Node/별도 서버에서 발송하는 방식도 검토.

---

## 3. 결제/구독

로드맵: 인증 후 M5.

| 단계 | 작업 |
|------|------|
| 1 | PG·빌링 벤더 선정 (Stripe, 토스페이먼츠, 국내 PG 등) |
| 2 | 환경 변수에 시크릿 키, 웹훅 시크릿 추가 |
| 3 | 결제/구독 생성 API Route → 클라이언트 리다이렉트 또는 SDK 호출 |
| 4 | 웹훅 API Route: 결제 완료·구독 갱신/해지 시 DB·구독 상태 갱신 |
| 5 | 프로필 또는 전용 페이지에서 “구독 관리” 링크 (결제 포털 또는 캔슬 플로우) |

---

## 4. 테스트·배포

| 항목 | 명령 | 비고 |
|------|------|------|
| 단위 테스트 | `npm run test:run` | Vitest (user-store, auth-store, horoscope-generator, errors) |
| 빌드 | `npm run build` | Next.js 프로덕션 빌드 |
| Cloudflare 빌드 | `npm run cf:build` | OpenNext + Cloudflare |
| 배포 | `npm run cf:deploy` | Wrangler 배포 |

---

## 5. 우선순위 요약

1. **실인증 연동** → 푸시·결제·AI 개인화의 선행 조건.
2. **푸시 알림** → 리텐션·DAU에 직접 기여 (로드맵 M4).
3. **결제/구독** → 수익화 (M5).
4. **테스트 보강** → 신규 API·스토어 추가 시 동일 패턴으로 테스트 추가.

*문서 끝*

# 실제 연동 방향: Google 로그인 + Supabase + GitHub 배포

> **목표**: Google 계정 로그인(실인증), Supabase(인증·DB), GitHub 기반 배포를 한 흐름으로 정리  
> **관련**: [next_steps_guide.md](./next_steps_guide.md), [service_advancement_plan.md](./service_advancement_plan.md)

---

## 1. 아키텍처 정리

### 역할 구분

| 구성요소 | 담당 | 비고 |
|----------|------|------|
| **Supabase** | 인증(Auth) + 데이터베이스(PostgreSQL) | 앱(Next.js) 호스팅은 하지 않음 |
| **Next.js 앱** | 페이지·API Routes·클라이언트 | 별도 호스팅 필요 |
| **GitHub** | 소스 저장소 + 배포 트리거 | push 시 연결된 플랫폼에서 빌드·배포 |

즉, **“클라우드 페이지”**는 Supabase가 아니라 **Next.js를 띄우는 곳**(Vercel 또는 Cloudflare Pages)을 의미하고, **DB·인증**만 Supabase를 쓰는 구조가 맞습니다.

### 권장 구조 (한 줄 요약)

```
GitHub(repo) → Vercel 또는 Cloudflare Pages(Next.js 빌드·호스팅)
                    ↓
              Supabase(Auth: Google, DB: 프로필·즐겨찾기 등)
```

---

## 2. 인증: Google 계정 연동 (Supabase Auth)

### 2.1 Supabase 측 설정

1. **Supabase 프로젝트**  
   [supabase.com](https://supabase.com) → 새 프로젝트 생성.

2. **Google OAuth 클라이언트**  
   - [Google Cloud Console](https://console.cloud.google.com/) → 프로젝트 선택 또는 생성  
   - APIs & Services → 사용자 인증 정보 → **OAuth 2.0 클라이언트 ID** 생성  
   - 애플리케이션 유형: **웹 애플리케이션**  
   - **승인된 리디렉션 URI**에 아래 두 가지 추가:
     - `https://<PROJECT_REF>.supabase.co/auth/v1/callback`
     - 로컬: `http://127.0.0.1:3000/auth/callback` (개발용)

3. **Supabase Auth에서 Google 사용**  
   - Supabase 대시보드 → **Authentication** → **Providers** → **Google** 활성화  
   - Google에서 발급한 **Client ID**, **Client Secret** 입력 후 저장.

### 2.2 Next.js 측 구현

| 단계 | 작업 |
|------|------|
| 1 | `@supabase/supabase-js`, `@supabase/ssr` 설치 (Next.js App Router·쿠키 기반 세션용) |
| 2 | **환경 변수**: `.env.local`에 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 추가 (템플릿: 프로젝트 루트 `.env.example`) |
| 3 | **클라이언트용 Supabase**: `src/lib/supabase/client.ts` (브라우저 전용) |
| 4 | **서버용 Supabase**: `src/lib/supabase/server.ts` (Route Handler·Server Component에서 쿠키로 세션 읽기) |
| 5 | **Auth 콜백**: `src/app/auth/callback/route.ts` — Supabase가 리다이렉트한 뒤 `exchangeCodeForSession` 등으로 세션 설정 |
| 6 | **로그인**: `/login`에서 `supabase.auth.signInWithOAuth({ provider: 'google' })` 호출 후 리다이렉트 |
| 7 | **로그아웃**: `supabase.auth.signOut()` 호출 |
| 8 | **UI 연동**: 기존 `auth-store`를 “Supabase 세션과 동기화”하거나, Supabase `onAuthStateChange` + `getUser()`만 사용해도 됨 (헤더·프로필에서 로그인 여부 표시) |

이렇게 하면 **실제 연동은 Google 계정만** 사용하는 형태로 정리됩니다. (이메일/비밀번호는 나중에 추가 가능.)

### 2.3 진행 순서 (인증만 먼저)

1. Supabase 프로젝트 + Google Provider 설정  
2. Next.js에 Supabase 패키지·환경 변수·client/server 유틸 추가  
3. `/auth/callback` 라우트 구현  
4. `/login`을 “Google로 로그인” 버튼 + `signInWithOAuth('google')`로 변경  
5. Header·프로필에서 `getUser()` / `onAuthStateChange`로 로그인 상태 반영  
6. (선택) 기존 auth-store를 Supabase 세션과 동기화하거나, 점진적으로 제거  

---

## 3. 데이터베이스 (Supabase)

인증 이후 “다음 단계”로 두면 좋습니다.

| 용도 | 내용 |
|------|------|
| **프로필 확장** | `auth.users`는 기본 필드만 있음. `public.profiles` 테이블로 display_name, avatar_url, 기본 별자리 등 확장 가능. 가입 시 트리거로 프로필 행 생성. |
| **즐겨찾기 동기화** | 현재는 localStorage. 로그인 사용자만 DB에 저장하려면 `public.favorites` 같은 테이블 + RLS로 “본인만 읽기/쓰기” 제한. |
| **푸시·구독·결제** | 푸시 구독 엔드포인트, 구독 플랜, 결제 이벤트 등은 이후 단계에서 테이블 설계. |

우선 **Google 로그인만** 완료한 뒤, 필요 시 프로필 테이블 → 즐겨찾기 동기화 순으로 넣는 것을 권장합니다.

---

## 4. 배포: GitHub 연동

### 4.1 GitHub 역할

- **소스 코드**: 모든 코드는 GitHub 저장소에 push.  
- **배포 트리거**: `main`(또는 지정 브랜치)에 push되면 연결된 서비스가 빌드·배포 수행.

### 4.2 Next.js 호스팅 옵션

Supabase는 “DB·Auth”만 담당하므로, **Next.js 앱**은 아래 둘 중 하나로 호스팅하는 구성을 권장합니다.

| 옵션 | 장점 | 설정 요약 |
|------|------|-----------|
| **A. Vercel** | GitHub 연동·Supabase와 조합 문서 많음, 서버리스·환경 변수 관리 용이 | GitHub repo 연결 → 빌드/출력 설정 자동 → 환경 변수에 `NEXT_PUBLIC_SUPABASE_*` 등 입력 |
| **B. Cloudflare Pages** | 이미 `cf:build`/`cf:deploy` 사용 중이면 그대로 활용 가능 | GitHub repo 연결 → 빌드: `npm run cf:build`, 출력: `.open-next` 등 OpenNext 안내에 맞게 설정 → 환경 변수 동일 |

- **공통**: 프로덕션 도메인을 Supabase **Redirect URL**에 반드시 추가 (예: `https://your-app.vercel.app/auth/callback`).  
- **환경 변수**: Supabase URL/Anon Key는 배포 플랫폼(Vercel 또는 Cloudflare)에 설정하고, `.env`는 로컬/CI용으로만 사용.

### 4.3 권장 흐름

1. **로컬**에서 Supabase + Google 로그인까지 동작 확인.  
2. **GitHub**에 push.  
3. **Vercel** 또는 **Cloudflare Pages**에서 해당 repo 연결 후, 첫 배포 실행.  
4. 배포된 **앱 URL**을 Supabase Auth Redirect URL에 추가 후 다시 로그인 테스트.

---

## 5. 다음 단계와의 연결

- **인증**: 이 문서의 2·3절대로 진행하면 “Google 계정으로만 실제 연동”이 됩니다.  
- **푸시 알림**: [next_steps_guide.md](./next_steps_guide.md#2-푸시-알림) 유지. 구독 정보·발송 스케줄은 Supabase DB·Edge Functions 등으로 확장 가능.  
- **결제/구독**: [next_steps_guide.md](./next_steps_guide.md#3-결제구독) 유지. 결제 상태·구독 플랜은 Supabase 테이블에 저장하는 방식으로 설계하면 됩니다.

---

## 6. 체크리스트 요약

- [ ] Supabase 프로젝트 생성  
- [ ] Google Cloud에서 OAuth 클라이언트 생성 후 Supabase Auth에 등록  
- [ ] Next.js에 `@supabase/supabase-js`, `@supabase/ssr` 추가 및 client/server 유틸 작성  
- [ ] `.env.local`에 Supabase URL·Anon Key 설정  
- [ ] `/auth/callback` 라우트 구현  
- [ ] `/login`에서 Google 로그인(`signInWithOAuth('google')`) 연동  
- [ ] Header·프로필에서 Supabase 세션으로 로그인 상태 표시  
- [ ] (선택) `public.profiles` 등 DB 테이블 설계  
- [ ] GitHub repo에 push 후 Vercel 또는 Cloudflare Pages 연결  
- [ ] 배포 URL을 Supabase Redirect URL에 추가 후 프로덕션 로그인 테스트  

이 순서대로 진행하면 **Google 계정 실연동 + Supabase(인증·DB) + GitHub 기반 배포** 방향이 정리됩니다.

*문서 끝*

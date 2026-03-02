# Database — Supabase 마이그레이션 가이드

## 목적

Cloudflare Workers 번들 크기 초과 문제 해결을 위해 대용량 템플릿 데이터를 Supabase로 외부화합니다.

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| Worker gzip 크기 | ~4 MB | **1.03 MB** |
| Workers 무료 한도 | ❌ 초과 | ✅ 충족 |
| sign-templates | 번들 포함 (2.94 MB) | Supabase DB |
| element-templates | 번들 포함 (242 KB) | Supabase DB |

## 마이그레이션 파일 목록

| 파일 | 내용 |
|------|------|
| `001_create_template_tables.sql` | 테이블 생성 (sign_templates, element_templates) |
| `002_rls_policies.sql` | Row Level Security — 공개 읽기, service_role 쓰기 |
| `003_verify_data.sql` | 업로드 후 데이터 검증 쿼리 |

## 실행 순서

### Step 1. Supabase 프로젝트 생성

1. [https://supabase.com](https://supabase.com) 접속 → New Project 생성
2. Settings → API 메뉴에서 다음 값 복사:
   - **Project URL** (`https://xxx.supabase.co`)
   - **anon / public key**
   - **service_role / secret key** (⚠️ 절대 클라이언트에 노출 금지)

### Step 2. 테이블 생성

Supabase Dashboard → **SQL Editor**에서 순서대로 실행:

```sql
-- 1. 테이블 생성
\i 001_create_template_tables.sql

-- 2. RLS 정책 설정
\i 002_rls_policies.sql
```

또는 각 파일 내용을 SQL Editor에 붙여넣기하여 실행합니다.

### Step 3. 환경변수 설정

프로젝트 루트의 `.env.local` 파일에 추가:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

> 환경변수 상세 설명은 `env-setup.html` 참조

### Step 4. 데이터 업로드

```bash
npm run upload-templates
```

스크립트가 `src/data/sign-templates/*.ts` 및 `src/data/element-templates.ts`를
읽어 Supabase에 upsert합니다.

### Step 5. 업로드 검증

Supabase SQL Editor에서 `003_verify_data.sql` 실행:

- `sign_templates`: 12행 확인
- `element_templates`: 4행 확인

### Step 6. Cloudflare Workers 환경변수 설정

```bash
# 방법 A: wrangler CLI (권장)
npx wrangler secret put NEXT_PUBLIC_SUPABASE_URL
npx wrangler secret put NEXT_PUBLIC_SUPABASE_ANON_KEY
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY

# 방법 B: Cloudflare Dashboard
# Workers & Pages → star → Settings → Variables and Secrets
```

### Step 7. 배포

```bash
npm run cf:deploy
```

## 데이터 업데이트 절차

템플릿 데이터(`src/data/sign-templates/*.ts` 등)를 수정한 경우:

```bash
npm run upload-templates   # Supabase 재업로드 (upsert)
npm run cf:deploy          # 배포 (번들 크기 변화 없음)
```

## 아키텍처

```
요청 흐름 (Cloudflare Workers 런타임)
─────────────────────────────────────
HTTP Request
    ↓
API Route (daily/weekly/monthly)
    ↓
loadTemplates()          ← Supabase 첫 요청 시 fetch
    │                       이후 module-level 캐시 반환
    ↓
setTemplateData(data)   ← horoscope-generator에 주입
    ↓
generateXxxHoroscope()  ← 시드 기반 결정론적 생성

폴백 (Supabase 미설정 시)
─────────────────────────
loadTemplates() → 빈 객체 반환
setTemplateData({}) → _signTemplates = {}
selectSignTemplate() → pool 없음 → selectGenericTemplate() 자동 폴백
```

## 관련 코드

| 파일 | 역할 |
|------|------|
| `src/lib/supabase.ts` | Supabase 클라이언트 생성 |
| `src/lib/template-loader.ts` | loadTemplates() — DB 로드 + 캐시 |
| `src/lib/horoscope-generator.ts` | setTemplateData() + 런타임 주입 변수 |
| `scripts/upload-templates.ts` | 로컬 TS → Supabase 업로드 |

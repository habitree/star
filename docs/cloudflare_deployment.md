# Cloudflare 배포 가이드

## 개요

이 프로젝트는 Cloudflare Pages/Workers를 사용하여 배포됩니다. Next.js App Router를 OpenNext를 통해 Cloudflare Edge 환경에서 실행합니다.

## 사전 요구사항

1. **Cloudflare 계정**: [cloudflare.com](https://cloudflare.com)에서 계정 생성
2. **Wrangler CLI**: `npm install -g wrangler` 또는 프로젝트에 포함된 버전 사용
3. **Cloudflare API 토큰** (선택사항): 자동 배포를 위한 경우

## 설정

### 1. Cloudflare 인증

```bash
# Wrangler 로그인
npx wrangler login
```

또는 API 토큰 사용:

```bash
# 환경 변수로 설정
export CLOUDFLARE_API_TOKEN=your-api-token
```

### 2. 환경 변수 설정

#### 로컬 개발 (.dev.vars)

`.dev.vars` 파일을 생성하고 환경 변수를 설정합니다:

```bash
# .dev.vars 파일 생성
cp .dev.vars.example .dev.vars

# 파일 편집
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-xxxxxxxxxxxxxxxx
```

#### 프로덕션 환경 변수

Cloudflare Dashboard에서 설정하거나 Wrangler CLI로 설정:

```bash
# Secret 설정 (암호화되어 저장)
npx wrangler secret put NEXT_PUBLIC_ADSENSE_PUBLISHER_ID

# 일반 변수 설정 (wrangler.toml의 [vars] 섹션 사용)
```

### 3. wrangler.toml 설정

`wrangler.toml` 파일에서 프로젝트 이름과 설정을 확인합니다:

```toml
name = "star"
compatibility_date = "2024-12-30"
compatibility_flags = ["nodejs_compat"]
```

## 배포

### 로컬 빌드 및 테스트

```bash
# Cloudflare용 빌드
npm run cf:build

# 로컬에서 테스트
npm run cf:dev
```

### 프로덕션 배포

#### 방법 1: npm 스크립트 사용

```bash
# 빌드 + 배포
npm run cf:deploy
```

#### 방법 2: 배포 스크립트 사용

**Windows (PowerShell):**
```powershell
.\scripts\deploy-cloudflare.ps1
```

**Linux/Mac:**
```bash
chmod +x scripts/deploy-cloudflare.sh
./scripts/deploy-cloudflare.sh
```

#### 방법 3: Wrangler 직접 사용

```bash
# 빌드
npm run cf:build

# 배포
npx wrangler deploy
```

### Preview 배포

```bash
# Preview 환경으로 배포
npx wrangler deploy --env preview
```

## Cloudflare Pages 연동 (GitHub Actions)

### GitHub Actions 워크플로우

`.github/workflows/deploy-cloudflare.yml` 파일을 생성:

```yaml
name: Deploy to Cloudflare

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run cf:build
        
      - name: Deploy to Cloudflare
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

### GitHub Secrets 설정

1. GitHub 저장소 → Settings → Secrets and variables → Actions
2. 다음 Secrets 추가:
   - `CLOUDFLARE_API_TOKEN`: Cloudflare API 토큰
   - `CLOUDFLARE_ACCOUNT_ID`: Cloudflare 계정 ID

## 환경 변수 관리

### Cloudflare Dashboard에서 설정

1. Cloudflare Dashboard → Workers & Pages → star 프로젝트
2. Settings → Variables and Secrets
3. Environment Variables 추가

### Wrangler CLI로 설정

```bash
# Secret (암호화)
npx wrangler secret put VARIABLE_NAME

# 일반 변수 (wrangler.toml에 추가)
# [vars]
# VARIABLE_NAME = "value"
```

## 모니터링 및 로그

### 로그 확인

```bash
# 실시간 로그
npx wrangler tail

# 특정 기간 로그
npx wrangler tail --since 1h
```

### Analytics

Cloudflare Dashboard → Workers & Pages → Analytics에서 확인:
- 요청 수
- 에러율
- 응답 시간
- 지역별 분포

## 문제 해결

### 빌드 실패

```bash
# 캐시 클리어 후 재빌드
rm -rf .next .open-next node_modules/.cache
npm run cf:build
```

### 배포 실패

1. Wrangler 로그 확인: `npx wrangler tail`
2. 빌드 출력 확인: `.open-next` 디렉토리 확인
3. 환경 변수 확인: `npx wrangler secret list`

### 성능 최적화

- **캐싱**: Cloudflare의 자동 캐싱 활용
- **KV 저장소**: 자주 사용되는 데이터는 KV에 저장
- **D1 데이터베이스**: 관계형 데이터가 필요한 경우

## 참고 자료

- [Wrangler 문서](https://developers.cloudflare.com/workers/wrangler/)
- [OpenNext Cloudflare 문서](https://opennext.js.org/cloudflare)
- [Cloudflare Pages 문서](https://developers.cloudflare.com/pages/)

## 트러블슈팅

### 문제: "Module not found" 에러

**해결**: `open-next.config.ts`에서 `edgeExternals`에 모듈 추가

```typescript
edgeExternals: ["node:crypto", "your-module"]
```

### 문제: 환경 변수가 undefined

**해결**: 
1. `.dev.vars` 파일 확인 (로컬)
2. Cloudflare Dashboard에서 변수 확인 (프로덕션)
3. `NEXT_PUBLIC_` 접두사 확인 (클라이언트 변수)

### 문제: 배포 후 404 에러

**해결**:
1. `wrangler.toml`의 `main` 경로 확인
2. `.open-next/worker.js` 파일 존재 확인
3. 빌드 로그 확인

---

**최종 업데이트**: 2024-12-30


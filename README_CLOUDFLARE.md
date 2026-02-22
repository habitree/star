# Cloudflare 배포 빠른 시작 가이드

## 🚀 빠른 배포

### 1단계: Cloudflare 인증

```bash
npm run cf:login
```

브라우저가 열리면 Cloudflare 계정으로 로그인합니다.

### 2단계: 환경 변수 설정

`.dev.vars` 파일을 생성하고 필요한 환경 변수를 설정합니다:

```bash
# .dev.vars 파일 생성
cp .dev.vars.example .dev.vars
```

파일을 편집하여 실제 값 입력:
```
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-실제ID
```

### 3단계: 로컬 테스트 (선택사항)

```bash
# 빌드
npm run cf:build

# 로컬에서 실행
npm run cf:dev
```

### 4단계: 배포

```bash
# 프로덕션 배포
npm run cf:deploy
```

## 📋 주요 명령어

| 명령어 | 설명 |
|--------|------|
| `npm run cf:build` | Cloudflare용 빌드 |
| `npm run cf:dev` | 로컬 개발 서버 실행 |
| `npm run cf:deploy` | 프로덕션 배포 |
| `npm run cf:deploy:preview` | Preview 환경 배포 |
| `npm run cf:tail` | 실시간 로그 확인 |
| `npm run cf:login` | Cloudflare 로그인 |
| `npm run cf:whoami` | 현재 로그인된 계정 확인 |

## 🔐 환경 변수 관리

### 로컬 개발
`.dev.vars` 파일에 설정 (git에 커밋하지 않음)

### 프로덕션
Cloudflare Dashboard 또는 Wrangler CLI로 설정:

```bash
# Secret 설정
npx wrangler secret put NEXT_PUBLIC_ADSENSE_PUBLISHER_ID
```

## 🔗 GitHub Actions 자동 배포

1. GitHub Secrets 설정:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   - `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID`

2. `main` 브랜치에 push하면 자동 배포됩니다.

## 📚 자세한 문서

[Cloudflare 배포 가이드](./docs/cloudflare_deployment.md)를 참고하세요.


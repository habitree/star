# Cursor MCP Cloudflare 빠른 시작

## 🚀 3단계로 시작하기

### 1단계: Cloudflare API 토큰 준비

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) 로그인
2. 우측 상단 프로필 → **API Tokens**
3. **Create Token** 클릭
4. **Edit Cloudflare Workers** 템플릿 선택 (권장) 또는 커스텀 권한 설정:
   
   **필수 권한:**
   - Account → **Workers Scripts:Edit** ✅
   - Account → **Account Settings:Read** ✅
   - Account → **Workers Tail:Read** ⚠️ (로그 확인용, 권장)
   
   **선택 권한:**
   - Zone → Zone Settings:Read (도메인 사용 시)
   
   **보안 설정:**
   - Client IP Address Filtering: 개발 환경에서는 비워두기 (선택사항)
   
   📖 [상세 권한 가이드](./docs/cloudflare_api_token_permissions.md) 참고

5. **Continue to summary** → **Create Token**
6. 토큰 복사 (한 번만 표시됨!)

### 2단계: Account ID 확인

1. Cloudflare Dashboard → 우측 사이드바
2. **Account ID** 복사

### 3단계: 자동 설정 스크립트 실행

**Windows (PowerShell):**
```powershell
.\scripts\setup-mcp-cloudflare.ps1
```

**Linux/Mac:**
```bash
chmod +x scripts/setup-mcp-cloudflare.sh
./scripts/setup-mcp-cloudflare.sh
```

스크립트가 다음을 수행합니다:
- ✅ 환경 변수 설정
- ✅ Cursor 설정 파일에 MCP 서버 추가
- ✅ 설정 완료 안내

### 4단계: Cursor 재시작

1. Cursor 완전 종료
2. Cursor 재시작
3. `Ctrl + Shift + P` (또는 `Cmd + Shift + P`)
4. "MCP: Show Servers" 입력
5. Cloudflare 서버 연결 확인

## ✅ 테스트

Cursor 채팅에서 시도해보세요:

```
"Cloudflare Workers 목록을 보여줘"
"star 프로젝트를 배포해줘"
"Cloudflare 로그를 확인해줘"
```

## 📚 자세한 문서

- [전체 설정 가이드](./docs/cursor_mcp_cloudflare_setup.md)
- [Cloudflare 배포 가이드](./docs/cloudflare_deployment.md)

## ❓ 문제 해결

### MCP 서버가 연결되지 않는 경우

1. **Node.js 버전 확인** (v18 이상 필요):
   ```bash
   node --version
   ```

2. **환경 변수 확인**:
   ```bash
   # Windows PowerShell
   $env:CLOUDFLARE_API_TOKEN
   $env:CLOUDFLARE_ACCOUNT_ID
   
   # Linux/Mac
   echo $CLOUDFLARE_API_TOKEN
   echo $CLOUDFLARE_ACCOUNT_ID
   ```

3. **수동 설정**: [설정 가이드](./docs/cursor_mcp_cloudflare_setup.md) 참고

### API 토큰 권한 오류

- Cloudflare Dashboard에서 토큰 권한 확인
- Workers Scripts:Edit 권한 필요
- 필요시 토큰 재생성

---

**도움이 필요하신가요?** [설정 가이드](./docs/cursor_mcp_cloudflare_setup.md)를 참고하세요.


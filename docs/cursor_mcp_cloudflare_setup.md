# Cursor MCP를 통한 Cloudflare 연결 가이드

## 개요

Cursor의 MCP(Model Context Protocol)를 사용하여 Cloudflare와 직접 상호작용할 수 있습니다. 이를 통해 배포, 로그 확인, 환경 변수 관리 등을 Cursor 내에서 수행할 수 있습니다.

## 사전 요구사항

1. **Cloudflare 계정**: [cloudflare.com](https://cloudflare.com)에서 계정 생성
2. **Cloudflare API 토큰**: 
   - Cloudflare Dashboard → My Profile → API Tokens
   - "Create Token" 클릭
   - "Edit Cloudflare Workers" 템플릿 사용 (권장) 또는 커스텀 권한 설정
   - 📖 [상세 권한 설정 가이드](./cloudflare_api_token_permissions.md) 참고
3. **Cloudflare Account ID**:
   - Cloudflare Dashboard → 우측 사이드바에서 확인

## 설정 방법

### 방법 1: Cursor 설정 파일 직접 수정 (권장)

1. **Cursor 설정 열기**
   - `Ctrl + Shift + P` (또는 `Cmd + Shift + P` on Mac)
   - "Preferences: Open User Settings (JSON)" 입력

2. **MCP 설정 추가**

   Windows 경로:
   ```
   %APPDATA%\Cursor\User\settings.json
   ```

   Mac/Linux 경로:
   ```
   ~/.config/Cursor/User/settings.json
   ```

   다음 내용을 추가:

   ```json
   {
     "mcpServers": {
       "cloudflare": {
         "command": "npx",
         "args": [
           "-y",
           "@modelcontextprotocol/server-cloudflare"
         ],
         "env": {
           "CLOUDFLARE_API_TOKEN": "your-api-token-here",
           "CLOUDFLARE_ACCOUNT_ID": "your-account-id-here"
         }
       }
     }
   }
   ```

### 방법 2: 환경 변수 사용 (보안 권장)

환경 변수를 사용하여 API 토큰을 안전하게 관리:

1. **환경 변수 설정**

   Windows (PowerShell):
   ```powershell
   [System.Environment]::SetEnvironmentVariable("CLOUDFLARE_API_TOKEN", "your-token", "User")
   [System.Environment]::SetEnvironmentVariable("CLOUDFLARE_ACCOUNT_ID", "your-account-id", "User")
   ```

   Windows (CMD):
   ```cmd
   setx CLOUDFLARE_API_TOKEN "your-token"
   setx CLOUDFLARE_ACCOUNT_ID "your-account-id"
   ```

   Mac/Linux:
   ```bash
   export CLOUDFLARE_API_TOKEN="your-token"
   export CLOUDFLARE_ACCOUNT_ID="your-account-id"
   
   # 영구적으로 설정하려면 ~/.bashrc 또는 ~/.zshrc에 추가
   echo 'export CLOUDFLARE_API_TOKEN="your-token"' >> ~/.bashrc
   echo 'export CLOUDFLARE_ACCOUNT_ID="your-account-id"' >> ~/.bashrc
   ```

2. **Cursor 설정 파일 수정**

   ```json
   {
     "mcpServers": {
       "cloudflare": {
         "command": "npx",
         "args": [
           "-y",
           "@modelcontextprotocol/server-cloudflare"
         ],
         "env": {
           "CLOUDFLARE_API_TOKEN": "${env:CLOUDFLARE_API_TOKEN}",
           "CLOUDFLARE_ACCOUNT_ID": "${env:CLOUDFLARE_ACCOUNT_ID}"
         }
       }
     }
   }
   ```

### 방법 3: 프로젝트별 설정

프로젝트 루트에 `.cursor/mcp-settings.json` 파일 생성 (Cursor가 자동으로 인식):

```json
{
  "mcpServers": {
    "cloudflare": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-cloudflare"
      ],
      "env": {
        "CLOUDFLARE_API_TOKEN": "${CLOUDFLARE_API_TOKEN}",
        "CLOUDFLARE_ACCOUNT_ID": "${CLOUDFLARE_ACCOUNT_ID}"
      }
    }
  }
}
```

## 설정 확인

1. **Cursor 재시작**: 설정 변경 후 Cursor를 재시작합니다.

2. **MCP 연결 확인**:
   - Cursor 명령 팔레트 (`Ctrl + Shift + P`)
   - "MCP: Show Servers" 입력
   - Cloudflare 서버가 연결되어 있는지 확인

3. **테스트**:
   - Cursor 채팅에서 "Cloudflare에 연결되어 있나요?" 또는 "List my Cloudflare Workers" 같은 명령 시도

## 사용 가능한 기능

MCP를 통해 Cloudflare와 연결되면 다음 작업을 Cursor에서 직접 수행할 수 있습니다:

### 1. Workers 관리
- Workers 목록 조회
- Worker 배포
- Worker 삭제
- Worker 설정 확인

### 2. 로그 확인
- 실시간 로그 스트리밍
- 로그 필터링
- 에러 로그 확인

### 3. 환경 변수 관리
- 환경 변수 조회
- 환경 변수 설정
- Secret 관리

### 4. KV 네임스페이스
- KV 네임스페이스 목록
- 키-값 조회 및 설정

### 5. D1 데이터베이스
- 데이터베이스 목록
- 쿼리 실행 (제한적)

## 보안 주의사항

1. **API 토큰 보호**:
   - API 토큰을 코드에 하드코딩하지 마세요
   - 환경 변수 사용 권장
   - `.gitignore`에 설정 파일 추가 확인

2. **권한 최소화**:
   - 필요한 최소한의 권한만 부여
   - 특정 리소스에만 접근 가능하도록 제한

3. **토큰 회전**:
   - 정기적으로 API 토큰 갱신
   - 유출 시 즉시 토큰 삭제 및 재생성

## 문제 해결

### MCP 서버가 연결되지 않는 경우

1. **Node.js 확인**:
   ```bash
   node --version
   # v18 이상 필요
   ```

2. **npx 확인**:
   ```bash
   npx --version
   ```

3. **수동 설치**:
   ```bash
   npm install -g @modelcontextprotocol/server-cloudflare
   ```

4. **로그 확인**:
   - Cursor 출력 패널에서 MCP 관련 에러 확인
   - `Ctrl + Shift + U` (또는 `Cmd + Shift + U`)

### 환경 변수가 인식되지 않는 경우

1. **Cursor 재시작**: 환경 변수 설정 후 Cursor 완전 재시작
2. **시스템 재부팅**: Windows의 경우 필요할 수 있음
3. **직접 경로 지정**: 설정 파일에 직접 경로 지정

## 예제 사용법

Cursor 채팅에서 다음과 같이 사용할 수 있습니다:

```
"Cloudflare Workers 목록을 보여줘"
"star 프로젝트를 Cloudflare에 배포해줘"
"Cloudflare 로그를 확인해줘"
"환경 변수 NEXT_PUBLIC_ADSENSE_PUBLISHER_ID를 설정해줘"
```

## 추가 리소스

- [MCP 공식 문서](https://modelcontextprotocol.io/)
- [Cloudflare MCP 서버](https://github.com/modelcontextprotocol/servers/tree/main/src/cloudflare)
- [Cursor MCP 가이드](https://docs.cursor.com/mcp)

---

**최종 업데이트**: 2024-12-30


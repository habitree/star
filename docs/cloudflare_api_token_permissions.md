# Cloudflare API 토큰 권한 설정 가이드

## 개요

Cursor MCP를 통해 Cloudflare에 연결하고 Workers를 배포하기 위해 필요한 API 토큰 권한 설정 가이드입니다.

## 필수 권한 설정

### 방법 1: 템플릿 사용 (권장)

**"Edit Cloudflare Workers" 템플릿 선택**

이 템플릿은 다음 권한을 자동으로 포함합니다:
- ✅ Account: Workers Scripts:Edit
- ✅ Account: Account Settings:Read
- ✅ Zone: Zone Settings:Read (선택적)

### 방법 2: 커스텀 권한 설정

다음 권한을 수동으로 추가하세요:

#### 1. Account 권한

| 권한 | 설명 | 필수 여부 |
|------|------|----------|
| **Workers Scripts:Edit** | Workers 배포, 수정, 삭제 | ✅ 필수 |
| **Account Settings:Read** | 계정 정보 읽기 | ✅ 필수 |
| **Workers KV Storage:Edit** | KV 네임스페이스 관리 (KV 사용 시) | ⚠️ 선택 |
| **Workers Tail:Read** | 로그 스트리밍 | ⚠️ 선택 (권장) |

#### 2. Zone 권한 (도메인 사용 시)

| 권한 | 설명 | 필수 여부 |
|------|------|----------|
| **Zone Settings:Read** | 도메인 설정 읽기 | ⚠️ 선택 |
| **Zone:Read** | 도메인 정보 읽기 | ⚠️ 선택 |

## 단계별 설정 방법

### 1. Account 권한 추가

1. **Resources** 섹션에서 **Account** 선택
2. **Permissions** 드롭다운에서 다음 선택:
   - ✅ **Workers Scripts:Edit** (필수)
   - **Workers Scripts:Edit** 선택
   - ✅ **Account Settings:Read** (필수)
   - **Account Settings:Read** 선택
   - ⚠️ **Workers Tail:Read** (로그 확인용, 권장)
   - **Workers Tail:Read** 선택

### 2. Zone 권한 (선택사항)

도메인과 연동된 Workers를 사용하는 경우:

1. **Add more** 클릭
2. **Zone** 선택
3. **Include** 또는 **Exclude** 선택
   - **Include**: 특정 도메인만
   - **Exclude**: 특정 도메인 제외
4. 도메인 선택 또는 "All zones" 선택
5. **Permissions**:
   - **Zone Settings:Read** (선택)
   - **Zone:Read** (선택)

### 3. Client IP Address Filtering (보안)

**권장 설정**: 특정 IP 주소에서만 토큰 사용 허용

1. **Client IP Address Filtering** 섹션 활성화
2. **Allowed IP addresses** 선택
3. IP 주소 추가:
   - 고정 IP가 있는 경우: 해당 IP 입력
   - 동적 IP인 경우: 비워두거나 회사/집 IP 범위 입력
   - 예: `203.0.113.0/24` (CIDR 표기법)

**주의**: 
- IP 필터링을 설정하면 해당 IP에서만 토큰 사용 가능
- 개발 환경에서는 비워두는 것을 권장 (나중에 추가 가능)

## 권한 설정 예시

### 최소 권한 (기본 사용)

```
Account:
  - Workers Scripts:Edit
  - Account Settings:Read
```

### 권장 권한 (로그 확인 포함)

```
Account:
  - Workers Scripts:Edit
  - Account Settings:Read
  - Workers Tail:Read
```

### 전체 권한 (고급 사용)

```
Account:
  - Workers Scripts:Edit
  - Account Settings:Read
  - Workers Tail:Read
  - Workers KV Storage:Edit
  - Workers Routes:Edit

Zone (All zones):
  - Zone Settings:Read
  - Zone:Read
```

## 권한별 기능

### Workers Scripts:Edit
- ✅ Workers 배포
- ✅ Workers 수정
- ✅ Workers 삭제
- ✅ Workers 설정 변경

### Account Settings:Read
- ✅ 계정 정보 확인
- ✅ Account ID 확인
- ✅ 계정 설정 읽기

### Workers Tail:Read
- ✅ 실시간 로그 스트리밍
- ✅ 로그 확인
- ✅ 에러 추적

### Workers KV Storage:Edit
- ✅ KV 네임스페이스 생성/삭제
- ✅ KV 키-값 읽기/쓰기
- ⚠️ KV를 사용하는 경우만 필요

## 보안 권장사항

### 1. 최소 권한 원칙
- 필요한 최소한의 권한만 부여
- 사용하지 않는 권한은 제거

### 2. IP 필터링
- 프로덕션 환경: 특정 IP만 허용
- 개발 환경: 필요시 비활성화

### 3. 토큰 만료
- 정기적으로 토큰 갱신
- 사용하지 않는 토큰 삭제

### 4. 토큰 이름
- 용도를 명확히 하는 이름 사용
- 예: "Cursor MCP - Development", "CI/CD Deployment"

## 문제 해결

### "Insufficient permissions" 에러

**원인**: 필요한 권한이 없음

**해결**:
1. Cloudflare Dashboard → API Tokens
2. 토큰 편집 또는 새 토큰 생성
3. **Workers Scripts:Edit** 권한 확인
4. 토큰 재생성 후 환경 변수 업데이트

### "Account not found" 에러

**원인**: Account Settings:Read 권한 없음

**해결**:
1. 토큰에 **Account Settings:Read** 권한 추가
2. Account ID 확인

### 로그를 볼 수 없는 경우

**원인**: Workers Tail:Read 권한 없음

**해결**:
1. 토큰에 **Workers Tail:Read** 권한 추가
2. Cursor 재시작

## 체크리스트

토큰 생성 전 확인사항:

- [ ] **Workers Scripts:Edit** 권한 포함
- [ ] **Account Settings:Read** 권한 포함
- [ ] **Workers Tail:Read** 권한 포함 (로그 확인용)
- [ ] Account 리소스 선택
- [ ] 토큰 이름 명확히 설정
- [ ] IP 필터링 설정 (선택사항)
- [ ] 토큰 복사 및 안전하게 저장

## 다음 단계

토큰 생성 후:

1. [Cursor MCP 설정 가이드](./cursor_mcp_cloudflare_setup.md) 참고
2. 자동 설정 스크립트 실행
3. Cursor에서 연결 테스트

---

**최종 업데이트**: 2024-12-30


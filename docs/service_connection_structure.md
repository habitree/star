# 서비스 연결 구조 및 내용 정리

## 📋 개요

이 문서는 별자리 운세 서비스의 전체 서비스 연결 구조와 내용을 정리한 문서입니다.

---

## 🏗️ 아키텍처 개요

### 기술 스택
- **프레임워크**: Next.js 15.1.12 (App Router)
- **배포 플랫폼**: Cloudflare Pages/Workers
- **상태 관리**: Zustand 4.5.0
- **다국어 지원**: next-intl 3.4.0
- **스타일링**: Tailwind CSS 3.4.1
- **테스팅**: Vitest 1.3.0

### 배포 설정
- **Cloudflare 호환성**: `@opennextjs/cloudflare` 사용
- **설정 파일**: `wrangler.toml`, `open-next.config.ts`
- **이미지 최적화**: Cloudflare Pages 호환을 위해 비활성화

---

## 🔌 API 엔드포인트 구조

### 1. 출생 차트 API (`/api/birth-chart`)

**경로**: `src/app/api/birth-chart/route.ts`

**메서드**: `POST`

**기능**:
- 출생 정보(날짜, 시간, 위치)를 기반으로 출생 차트 계산
- 태양 별자리, 달 별자리, 상승궁 계산
- Big Three 해석 제공

**요청 형식**:
```typescript
{
  date: string;        // YYYY-MM-DD 형식
  time?: string;        // HH:mm 형식 (기본값: 12:00)
  latitude: number;     // -90 ~ 90
  longitude: number;    // -180 ~ 180
  timezone?: string;    // 기본값: UTC
}
```

**응답 형식**:
```typescript
{
  success: boolean;
  data?: {
    id: string;
    input: BirthChartInput;
    sunSign: ZodiacSignId;
    moonSign: ZodiacSignId;
    risingSign: ZodiacSignId;
    dominantElement: string;
    dominantModality: string;
    interpretation: {
      summary: LocalizedText;
      sunSignMeaning: LocalizedText;
      moonSignMeaning: LocalizedText;
      risingSignMeaning: LocalizedText;
    };
    createdAt: string;
  };
  error?: string;
}
```

**CORS 설정**: 
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: POST, OPTIONS`

---

### 2. 궁합 API (`/api/compatibility`)

**경로**: `src/app/api/compatibility/route.ts`

**메서드**: `GET`, `POST`

**기능**:
- 두 별자리 간의 궁합 점수 및 분석 제공
- 원소 궁합, 모달리티 궁합 분석
- 카테고리별 궁합 (사랑, 우정, 직장)

**요청 형식**:
```typescript
// GET
?sign1=aries&sign2=taurus&locale=ko

// POST
{
  sign1: string;
  sign2: string;
  locale?: string;  // 기본값: 'ko'
}
```

**응답 형식**:
```typescript
{
  success: boolean;
  data?: {
    id: string;
    sign1: ZodiacSignId;
    sign2: ZodiacSignId;
    overallScore: number;
    categories: {
      love: CategoryCompatibility;
      friendship: CategoryCompatibility;
      work: CategoryCompatibility;
    };
    elementCompatibility: {
      element1: string;
      element2: string;
      score: number;
      description: LocalizedText;
    };
    modalityCompatibility: {
      modality1: string;
      modality2: string;
      score: number;
      description: LocalizedText;
    };
    advice: LocalizedText;
    createdAt: string;
  };
  error?: string;
}
```

---

### 3. 일일 운세 API (`/api/horoscope/daily/[sign]`)

**경로**: `src/app/api/horoscope/daily/[sign]/route.ts`

**메서드**: `GET`

**기능**:
- 특정 별자리의 일일 운세 생성
- 결정적(deterministic) 운세 생성 (같은 날짜/별자리는 항상 같은 결과)
- 카테고리별 운세 (전체, 사랑, 직업, 건강, 재물)

**요청 형식**:
```
GET /api/horoscope/daily/aries?date=2024-01-15&locale=ko
```

**응답 형식**:
```typescript
{
  success: boolean;
  data?: {
    id: string;
    date: string;
    signId: ZodiacSignId;
    overall: CategoryHoroscope;
    love: CategoryHoroscope;
    career: CategoryHoroscope;
    health: CategoryHoroscope;
    money: CategoryHoroscope;
    luckyNumber: number;
    luckyColor: string;
    luckyTime: string;
    advice: LocalizedText;
    createdAt: string;
    updatedAt: string;
  };
  error?: {
    code: ErrorCode;
    message: string;
    details?: Record<string, unknown>;
    timestamp: string;
  };
  meta?: {
    cached: boolean;
    generatedAt: string;
  };
}
```

**캐시 설정**:
- `max-age`: 자정까지 남은 시간 (최대 1시간)
- `stale-while-revalidate`: 24시간

---

### 4. 주간 운세 API (`/api/horoscope/weekly/[sign]`)

**경로**: `src/app/api/horoscope/weekly/[sign]/route.ts`

**메서드**: `GET`

**기능**:
- 특정 별자리의 주간 운세 생성
- 7일치 일일 운세의 평균으로 계산
- 최고/최저 점수 요일 표시

**요청 형식**:
```
GET /api/horoscope/weekly/aries?date=2024-01-15&locale=ko
```

**응답 형식**:
```typescript
{
  success: boolean;
  data?: {
    id: string;
    weekStart: string;
    weekEnd: string;
    signId: ZodiacSignId;
    overall: CategoryHoroscope;
    love: CategoryHoroscope;
    career: CategoryHoroscope;
    health: CategoryHoroscope;
    money: CategoryHoroscope;
    weekHighlight: LocalizedText;
    bestDay: string;
    challengeDay: string;
    weeklyAdvice: LocalizedText;
    createdAt: string;
    updatedAt: string;
  };
  error?: ApiError;
  meta?: ResponseMeta;
}
```

**캐시 설정**:
- `max-age`: 주말까지 남은 시간 (최대 6시간)
- `stale-while-revalidate`: 7일

---

### 5. 월간 운세 API (`/api/horoscope/monthly/[sign]`)

**경로**: `src/app/api/horoscope/monthly/[sign]/route.ts`

**메서드**: `GET`

**기능**:
- 특정 별자리의 월간 운세 생성
- 4주간의 주간 운세 평균으로 계산
- 주요 날짜(Key Dates) 표시
- 행성 영향력 정보 제공

**요청 형식**:
```
GET /api/horoscope/monthly/aries?year=2024&month=1&locale=ko
```

**응답 형식**:
```typescript
{
  success: boolean;
  data?: {
    id: string;
    year: number;
    month: number;
    signId: ZodiacSignId;
    overall: CategoryHoroscope;
    love: CategoryHoroscope;
    career: CategoryHoroscope;
    health: CategoryHoroscope;
    money: CategoryHoroscope;
    monthHighlight: LocalizedText;
    keyDates: MonthlyKeyDate[];
    monthlyAdvice: LocalizedText;
    planetaryInfluence: LocalizedText;
    createdAt: string;
    updatedAt: string;
  };
  error?: ApiError;
  meta?: ResponseMeta;
}
```

**캐시 설정**:
- `max-age`: 다음 달까지 남은 시간 (최대 24시간)
- `stale-while-revalidate`: 30일

---

## 🧮 핵심 라이브러리

### 1. 천문학 계산기 (`astro-calculator.ts`)

**경로**: `src/lib/astro-calculator.ts`

**주요 함수**:
- `calculateSunSign(date: Date)`: 태양 별자리 계산
- `calculateMoonSign(date: Date, hour: number)`: 달 별자리 계산
- `calculateRisingSign(date: Date, hour: number, latitude: number)`: 상승궁 계산
- `calculateBirthChart(input: BirthChartInput)`: 전체 출생 차트 계산

**특징**:
- MVP 버전: 간소화된 공식 사용
- 정확한 태양 별자리 계산
- 달 별자리: 27.3일 주기 기반 계산
- 상승궁: 시간과 위도 기반 계산

---

### 2. 운세 생성기 (`horoscope-generator.ts`)

**경로**: `src/lib/horoscope-generator.ts`

**주요 함수**:
- `generateDailyHoroscope(signId, date, locale)`: 일일 운세 생성
- `generateWeeklyHoroscope(signId, date, locale)`: 주간 운세 생성
- `generateMonthlyHoroscope(signId, date, locale)`: 월간 운세 생성
- `getTodayTopSigns(date, limit)`: 오늘의 운세 상위 별자리
- `getAllDailyHoroscopes(date, locale)`: 모든 별자리의 일일 운세

**특징**:
- **결정적 생성**: 시드 기반 랜덤 함수로 같은 입력에 항상 같은 결과
- **원소 기반 템플릿**: 별자리 원소(불, 흙, 공기, 물)에 맞는 템플릿 사용
- **점수 기반 레벨**: 점수에 따라 high/medium/low 템플릿 선택
- **다국어 지원**: 5개 언어 지원 (ko, en, zh, ja, es)

**시드 생성 알고리즘**:
```typescript
seed = year * 10000000 + month * 100000 + day * 1000 + signNumber * 10 + categoryHash
```

---

### 3. 에러 처리 시스템 (`errors/index.ts`)

**경로**: `src/lib/errors/index.ts`

**주요 구성요소**:
- `ErrorCode` enum: 표준화된 에러 코드
- `ApiError` 클래스: 커스텀 에러 클래스
- `createSuccessResponse()`: 성공 응답 생성
- `createErrorResponse()`: 에러 응답 생성
- `validateSign()`, `validateDate()`, `validateLocale()`: 유효성 검사 함수

**에러 코드**:
- 클라이언트 에러 (4xx): `BAD_REQUEST`, `INVALID_SIGN`, `INVALID_DATE`, `INVALID_LOCALE`, `NOT_FOUND`, `VALIDATION_ERROR`
- 서버 에러 (5xx): `INTERNAL_ERROR`, `TEMPLATE_LOAD_ERROR`, `GENERATION_ERROR`, `CACHE_ERROR`

---

## 💾 상태 관리 (Zustand Stores)

### 1. 인증 스토어 (`auth-store.ts`)

**경로**: `src/stores/auth-store.ts`

**기능**:
- 사용자 인증 상태 관리 (현재는 목업)
- 로그인/로그아웃 기능
- localStorage에 상태 영속화

**상태 구조**:
```typescript
{
  user: AuthUser | null;
  isHydrated: boolean;
  login: (email: string, displayName: string) => void;
  logout: () => void;
}
```

**참고**: 추후 Supabase Auth 또는 NextAuth로 교체 예정

---

### 2. 사용자 스토어 (`user-store.ts`)

**경로**: `src/stores/user-store.ts`

**기능**:
- 즐겨찾기 별자리 관리
- 운세 조회 히스토리 (최대 100개)
- 사용자 설정 (언어, 테마, 알림 등)
- 방문 추적

**상태 구조**:
```typescript
{
  favorites: FavoriteSign[];
  history: HoroscopeHistoryItem[];
  preferences: UserPreferences;
  lastVisit: string | null;
  visitCount: number;
  // ... 액션 함수들
}
```

**주요 액션**:
- `addFavorite()`, `removeFavorite()`, `updateFavoriteNickname()`
- `addToHistory()`, `clearHistory()`, `getHistory()`
- `updatePreferences()`, `setDefaultSign()`, `setTheme()`, `setLocale()`
- `recordVisit()`

---

## 📊 데이터 구조

### 1. 별자리 정보 (`zodiac-signs.ts`)

**경로**: `src/data/zodiac-signs.ts`

**내용**:
- 12개 별자리 기본 정보
- 다국어 이름, 설명
- 원소, 모달리티, 지배 행성 정보

---

### 2. 궁합 데이터 (`compatibility-data.ts`)

**경로**: `src/data/compatibility-data.ts`

**내용**:
- 별자리 간 궁합 점수 (전체, 사랑, 우정, 직장)
- 궁합 조언 텍스트

---

### 3. 운세 템플릿 (`horoscope-templates.ts`)

**경로**: `src/data/horoscope-templates.ts`

**내용**:
- 카테고리별 운세 템플릿 (high/medium/low)
- 행운의 색상, 숫자, 시간
- 조언 템플릿
- 주간/월간 하이라이트 템플릿

---

### 4. 원소 템플릿 (`element-templates.ts`)

**경로**: `src/data/element-templates.ts`

**내용**:
- 원소별(불, 흙, 공기, 물) 카테고리별 운세 템플릿
- 원소별 행운의 색상

---

### 5. 행성 영향력 (`planet-influences.ts`)

**경로**: `src/data/planet-influences.ts`

**내용**:
- 별자리별 지배 행성 정보
- 긍정적/부정적 영향력 텍스트

---

## 🔄 서비스 연결 흐름

### 1. 출생 차트 계산 흐름

```
클라이언트 요청
  ↓
POST /api/birth-chart
  ↓
입력 유효성 검사
  ↓
calculateBirthChart()
  ├─ calculateSunSign()
  ├─ calculateMoonSign()
  └─ calculateRisingSign()
  ↓
해석 생성 (generateInterpretation)
  ↓
응답 반환
```

---

### 2. 운세 생성 흐름

```
클라이언트 요청
  ↓
GET /api/horoscope/{type}/[sign]
  ↓
별자리/날짜/로케일 유효성 검사
  ↓
generate{Daily|Weekly|Monthly}Horoscope()
  ├─ 시드 생성 (날짜 + 별자리 + 카테고리)
  ├─ 결정적 랜덤 함수 생성
  ├─ 카테고리별 운세 생성
  │   ├─ 점수 생성 (1-5)
  │   ├─ 템플릿 레벨 결정 (high/medium/low)
  │   └─ 원소 기반 템플릿 선택
  └─ 행운 요소 선택
  ↓
캐시 헤더 설정
  ↓
응답 반환
```

---

### 3. 궁합 계산 흐름

```
클라이언트 요청
  ↓
GET/POST /api/compatibility
  ↓
별자리 유효성 검사
  ↓
궁합 데이터 조회 (getCompatibilityData)
  ↓
원소/모달리티 정보 추출
  ↓
원소 궁합 점수 계산
  ↓
모달리티 궁합 점수 계산
  ↓
카테고리별 궁합 정보 생성
  ↓
응답 반환
```

---

## 🔐 보안 및 CORS

### CORS 설정
- 출생 차트 API: `Access-Control-Allow-Origin: *`
- 다른 API: Next.js 기본 CORS 정책 사용

### 입력 검증
- 모든 API에서 엄격한 입력 검증 수행
- 날짜 형식, 별자리 ID, 로케일 검증
- 범위 검증 (위도/경도, 연도/월)

---

## 📈 성능 최적화

### 캐시 전략
1. **일일 운세**: 자정까지 캐시 (최대 1시간)
2. **주간 운세**: 주말까지 캐시 (최대 6시간)
3. **월간 운세**: 다음 달까지 캐시 (최대 24시간)

### 응답 헤더
- `Cache-Control`: 적응형 캐시 설정
- `X-Response-Time`: 응답 시간 추적
- `X-Cache-Status`: 캐시 상태 표시

---

## 🌐 다국어 지원

### 지원 언어
- 한국어 (ko) - 기본
- 영어 (en)
- 중국어 (zh)
- 일본어 (ja)
- 스페인어 (es)

### 다국어 처리
- 모든 텍스트는 `LocalizedText` 타입 사용
- API 요청 시 `locale` 쿼리 파라미터로 언어 지정
- 기본값: 'ko'

---

## 🚀 배포 구조

### Cloudflare 설정

**wrangler.toml**:
```toml
name = "star"
compatibility_date = "2024-12-30"
compatibility_flags = ["nodejs_compat"]
main = ".open-next/worker.js"
```

**open-next.config.ts**:
- Cloudflare Edge 환경 최적화
- Node.js 호환성 설정
- 외부 요청 프록시 설정

---

## 📝 주요 특징

1. **결정적 운세 생성**: 같은 날짜/별자리는 항상 같은 운세
2. **원소 기반 템플릿**: 별자리 원소에 맞는 맞춤형 운세
3. **표준화된 에러 처리**: 일관된 에러 응답 형식
4. **캐시 최적화**: 적응형 캐시 전략으로 성능 향상
5. **다국어 지원**: 5개 언어 지원
6. **타입 안정성**: TypeScript로 전체 타입 정의
7. **테스트 가능**: Vitest로 단위 테스트 지원

---

## 🔄 향후 개선 방향

1. **외부 서비스 연동**:
   - 실제 천문학 계산 API 연동 (현재는 간소화된 계산)
   - 데이터베이스 연동 (사용자 데이터 영속화)
   - 인증 서비스 연동 (Supabase Auth / NextAuth)

2. **캐시 개선**:
   - Redis 캐시 도입
   - Cloudflare KV 활용

3. **모니터링**:
   - 에러 추적 시스템
   - 성능 모니터링
   - 사용량 분석

---

## 📚 관련 문서

- [개발 계획서](./development_plan.md)
- [서비스 고도화 계획](./service_advancement_plan.md)
- [통합 방향](./integration_direction.md)

---

**최종 업데이트**: 2024-12-30

# 다국어(i18n) 시스템 복원 가이드

## 백업 정보

- **백업 일자**: 2026-01-31
- **백업 목적**: 기능 추가 완료 후 다국어 서비스 재적용을 위한 보관
- **지원 언어**: 한국어(ko), 영어(en), 중국어(zh), 일본어(ja), 스페인어(es)

---

## 백업된 파일 목록

```
backup/i18n/
├── config.ts                 # 언어 설정 (locales, defaultLocale)
├── request.ts                # next-intl 서버 설정
├── next.config.js.backup     # Next.js 설정 (i18n 플러그인 포함)
├── messages/
│   ├── ko.json               # 한국어 번역
│   ├── en.json               # 영어 번역
│   ├── zh.json               # 중국어 번역
│   ├── ja.json               # 일본어 번역
│   └── es.json               # 스페인어 번역
└── components/
    └── LanguageSelector.tsx  # 언어 선택 UI 컴포넌트
```

---

## 복원 방법

### 1. 필수 패키지 설치

```bash
npm install next-intl
```

### 2. i18n 설정 파일 복원

```bash
# 설정 파일 복원
cp backup/i18n/config.ts src/i18n/
cp backup/i18n/request.ts src/i18n/

# 메시지 파일 복원
mkdir -p src/i18n/messages
cp backup/i18n/messages/*.json src/i18n/messages/
```

### 3. next.config.js 수정

`next.config.js` 파일을 다음과 같이 수정:

```javascript
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 기존 설정 유지
  images: {
    unoptimized: true,
  },
};

module.exports = withNextIntl(nextConfig);
```

### 4. 언어 선택 컴포넌트 복원

```bash
cp backup/i18n/components/LanguageSelector.tsx src/components/ui/
```

### 5. 라우팅 구조 변경

다국어 지원을 위해 `[locale]` 동적 라우트 구조가 필요합니다:

```
src/app/
├── [locale]/
│   ├── layout.tsx      # 로케일 레이아웃
│   ├── page.tsx        # 홈페이지
│   ├── horoscope/
│   ├── zodiac/
│   ├── compatibility/
│   └── birth-chart/
```

### 6. 레이아웃에서 번역 사용

```tsx
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('common');

  return <h1>{t('appName')}</h1>;
}
```

---

## 번역 키 구조

| 네임스페이스 | 설명 |
|-------------|------|
| `common` | 공통 용어 (앱 이름, 메뉴 등) |
| `nav` | 네비게이션 메뉴 |
| `home` | 홈페이지 콘텐츠 |
| `horoscope` | 운세 관련 |
| `compatibility` | 궁합 관련 |
| `birthChart` | 출생 차트 관련 |
| `footer` | 푸터 콘텐츠 |

---

## 주요 코드 패턴

### 서버 컴포넌트에서 사용

```tsx
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('home');
  return <h1>{t('title')}</h1>;
}
```

### 클라이언트 컴포넌트에서 사용

```tsx
'use client';
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('common');
  return <span>{t('appName')}</span>;
}
```

---

## 체크리스트

복원 시 확인할 사항:

- [ ] `next-intl` 패키지 설치 확인
- [ ] `src/i18n/` 폴더 구조 복원
- [ ] `next.config.js` 플러그인 설정
- [ ] `[locale]` 라우트 구조 적용
- [ ] `LanguageSelector` 컴포넌트 Header에 추가
- [ ] middleware.ts 설정 (필요시)
- [ ] 모든 페이지에서 번역 함수 사용 확인

---

## 참고 문서

- [next-intl 공식 문서](https://next-intl-docs.vercel.app/)
- [Next.js App Router i18n](https://nextjs.org/docs/app/building-your-application/routing/internationalization)

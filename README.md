# Zodiac Service

다국어 별자리 운세 서비스 MVP

## Features

- **일일/주간/월간 운세**: 12별자리 × 5개 카테고리
- **별자리 상세**: 성격, 원소, 궁합 정보
- **궁합 계산기**: 144개 조합 분석
- **출생 차트**: Big Three (태양/달/상승)
- **다국어 지원**: 한국어, 영어, 중국어, 일본어, 스페인어

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **i18n**: next-intl

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
/src
├── /app
│   ├── /api              # API Routes
│   └── /[locale]         # Pages (i18n)
├── /components           # React Components
├── /data                 # Static Data
├── /lib                  # Utilities
├── /types                # TypeScript Types
└── /i18n                 # Internationalization
```

## Documentation

- [PRD](./docs/zodiac_service_prd.md)
- [Marketing Strategy](./docs/marketing_psychology_strategy.md)
- [Keyword Strategy](./docs/multilingual_keyword_strategy.md)
- [Competitor Analysis](./docs/competitor_analysis.md)

## Deploy (Cloudflare)

```bash
npm run cf:build    # OpenNext로 Cloudflare용 빌드
npm run cf:deploy   # Wrangler로 배포
```

## License

MIT

#!/bin/bash

# Cloudflare 배포 스크립트
# 사용법: ./scripts/deploy-cloudflare.sh [environment]
# environment: production (기본값) 또는 preview

set -e

ENVIRONMENT=${1:-production}

echo "🚀 Cloudflare 배포 시작..."
echo "환경: $ENVIRONMENT"

# 빌드
echo "📦 빌드 중..."
npm run cf:build

# 배포
if [ "$ENVIRONMENT" = "preview" ]; then
  echo "🔍 Preview 배포 중..."
  npx wrangler deploy --env preview
else
  echo "🌐 Production 배포 중..."
  npx wrangler deploy
fi

echo "✅ 배포 완료!"


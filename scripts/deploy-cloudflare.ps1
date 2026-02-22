# Cloudflare 배포 스크립트 (PowerShell)
# 사용법: .\scripts\deploy-cloudflare.ps1 [environment]
# environment: production (기본값) 또는 preview

param(
    [string]$Environment = "production"
)

Write-Host "🚀 Cloudflare 배포 시작..." -ForegroundColor Cyan
Write-Host "환경: $Environment" -ForegroundColor Yellow

# 빌드
Write-Host "📦 빌드 중..." -ForegroundColor Cyan
npm run cf:build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 빌드 실패!" -ForegroundColor Red
    exit 1
}

# 배포
if ($Environment -eq "preview") {
    Write-Host "🔍 Preview 배포 중..." -ForegroundColor Cyan
    npx wrangler deploy --env preview
} else {
    Write-Host "🌐 Production 배포 중..." -ForegroundColor Cyan
    npx wrangler deploy
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 배포 완료!" -ForegroundColor Green
} else {
    Write-Host "❌ 배포 실패!" -ForegroundColor Red
    exit 1
}


# Cloudflare API 토큰 적용 스크립트
# 이 스크립트는 제공된 API 토큰을 환경 변수로 설정합니다.

param(
    [string]$ApiToken = "-AxeNtS2yEl4Q80yEpxYOCdai0RojVKCWIMoFOWB",
    [string]$AccountId = ""
)

Write-Host "🔐 Cloudflare API 토큰 설정 중..." -ForegroundColor Cyan

# 사용자 레벨 환경 변수로 설정 (영구적)
Write-Host "📝 환경 변수 설정 중..." -ForegroundColor Yellow
[System.Environment]::SetEnvironmentVariable("CLOUDFLARE_API_TOKEN", $ApiToken, "User")
Write-Host "✅ CLOUDFLARE_API_TOKEN 환경 변수 설정 완료" -ForegroundColor Green

# 현재 세션에도 설정
$env:CLOUDFLARE_API_TOKEN = $ApiToken
Write-Host "✅ 현재 세션 환경 변수 설정 완료" -ForegroundColor Green

# Account ID가 제공된 경우 설정
if (-not [string]::IsNullOrEmpty($AccountId)) {
    [System.Environment]::SetEnvironmentVariable("CLOUDFLARE_ACCOUNT_ID", $AccountId, "User")
    $env:CLOUDFLARE_ACCOUNT_ID = $AccountId
    Write-Host "✅ CLOUDFLARE_ACCOUNT_ID 환경 변수 설정 완료" -ForegroundColor Green
} else {
    Write-Host "⚠️  Account ID가 제공되지 않았습니다." -ForegroundColor Yellow
    Write-Host "   Cloudflare Dashboard에서 Account ID를 확인하고 다음 명령으로 설정하세요:" -ForegroundColor Gray
    Write-Host "   [System.Environment]::SetEnvironmentVariable('CLOUDFLARE_ACCOUNT_ID', 'your-account-id', 'User')" -ForegroundColor Gray
}

# .dev.vars 파일 업데이트 (로컬 개발용)
$DevVarsPath = ".dev.vars"
if (Test-Path $DevVarsPath) {
    Write-Host "📄 .dev.vars 파일 업데이트 중..." -ForegroundColor Yellow
    $content = Get-Content $DevVarsPath -Raw -ErrorAction SilentlyContinue
    if ($content -match "CLOUDFLARE_API_TOKEN") {
        $content = $content -replace "CLOUDFLARE_API_TOKEN=.*", "CLOUDFLARE_API_TOKEN=$ApiToken"
        Set-Content -Path $DevVarsPath -Value $content -Encoding UTF8
    } else {
        Add-Content -Path $DevVarsPath -Value "`nCLOUDFLARE_API_TOKEN=$ApiToken" -Encoding UTF8
    }
    Write-Host "✅ .dev.vars 파일 업데이트 완료" -ForegroundColor Green
} else {
    Write-Host "📄 .dev.vars 파일 생성 중..." -ForegroundColor Yellow
    $devVarsContent = @"
# Cloudflare API Token
CLOUDFLARE_API_TOKEN=$ApiToken
"@
    Set-Content -Path $DevVarsPath -Value $devVarsContent -Encoding UTF8
    Write-Host "✅ .dev.vars 파일 생성 완료" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ 토큰 설정 완료!" -ForegroundColor Green
Write-Host ""
Write-Host "다음 단계:" -ForegroundColor Cyan
Write-Host "1. 새 터미널을 열거나 Cursor를 재시작하세요" -ForegroundColor White
Write-Host "2. 환경 변수 확인: `$env:CLOUDFLARE_API_TOKEN" -ForegroundColor White
Write-Host "3. Account ID 설정 (필요시):" -ForegroundColor White
Write-Host "   [System.Environment]::SetEnvironmentVariable('CLOUDFLARE_ACCOUNT_ID', 'your-id', 'User')" -ForegroundColor Gray
Write-Host "4. Cursor MCP 설정 확인" -ForegroundColor White
Write-Host ""


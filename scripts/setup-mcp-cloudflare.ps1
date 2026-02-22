# Cursor MCP Cloudflare 설정 스크립트 (PowerShell)
# 이 스크립트는 Cursor 설정 파일에 Cloudflare MCP 서버를 추가합니다.

param(
    [string]$ApiToken = "",
    [string]$AccountId = ""
)

$CursorSettingsPath = "$env:APPDATA\Cursor\User\settings.json"

Write-Host "🔧 Cursor MCP Cloudflare 설정 시작..." -ForegroundColor Cyan

# API 토큰 및 Account ID 확인
if ([string]::IsNullOrEmpty($ApiToken)) {
    $ApiToken = Read-Host "Cloudflare API Token을 입력하세요"
}

if ([string]::IsNullOrEmpty($AccountId)) {
    $AccountId = Read-Host "Cloudflare Account ID를 입력하세요"
}

# 환경 변수로 설정 (권장)
Write-Host "📝 환경 변수 설정 중..." -ForegroundColor Yellow
[System.Environment]::SetEnvironmentVariable("CLOUDFLARE_API_TOKEN", $ApiToken, "User")
[System.Environment]::SetEnvironmentVariable("CLOUDFLARE_ACCOUNT_ID", $AccountId, "User")
Write-Host "✅ 환경 변수 설정 완료" -ForegroundColor Green

# Cursor 설정 파일 확인
if (-not (Test-Path $CursorSettingsPath)) {
    Write-Host "📄 Cursor 설정 파일 생성 중..." -ForegroundColor Yellow
    $CursorSettingsDir = Split-Path -Parent $CursorSettingsPath
    if (-not (Test-Path $CursorSettingsDir)) {
        New-Item -ItemType Directory -Path $CursorSettingsDir -Force | Out-Null
    }
    $defaultSettings = @{
        mcpServers = @{}
    } | ConvertTo-Json -Depth 10
    Set-Content -Path $CursorSettingsPath -Value $defaultSettings -Encoding UTF8
}

# 기존 설정 읽기
Write-Host "📖 기존 설정 읽기 중..." -ForegroundColor Yellow
$settings = Get-Content -Path $CursorSettingsPath -Raw -ErrorAction SilentlyContinue | ConvertFrom-Json

if (-not $settings) {
    $settings = @{
        mcpServers = @{}
    }
}

# MCP 서버 설정 추가
Write-Host "⚙️ MCP 서버 설정 추가 중..." -ForegroundColor Yellow
$mcpConfig = @{
    command = "npx"
    args = @(
        "-y",
        "@modelcontextprotocol/server-cloudflare"
    )
    env = @{
        CLOUDFLARE_API_TOKEN = "`${env:CLOUDFLARE_API_TOKEN}"
        CLOUDFLARE_ACCOUNT_ID = "`${env:CLOUDFLARE_ACCOUNT_ID}"
    }
}

if (-not $settings.mcpServers) {
    $settings | Add-Member -MemberType NoteProperty -Name "mcpServers" -Value @{}
}

$settings.mcpServers.cloudflare = $mcpConfig

# 설정 파일 저장
$settingsJson = $settings | ConvertTo-Json -Depth 10
Set-Content -Path $CursorSettingsPath -Value $settingsJson -Encoding UTF8

Write-Host "✅ 설정 완료!" -ForegroundColor Green
Write-Host ""
Write-Host "다음 단계:" -ForegroundColor Cyan
Write-Host "1. Cursor를 재시작하세요" -ForegroundColor White
Write-Host "2. Ctrl+Shift+P → 'MCP: Show Servers'로 연결 확인" -ForegroundColor White
Write-Host "3. Cursor 채팅에서 'Cloudflare Workers 목록을 보여줘' 시도" -ForegroundColor White
Write-Host ""
Write-Host "설정 파일 위치: $CursorSettingsPath" -ForegroundColor Gray


#!/bin/bash

# Cursor MCP Cloudflare 설정 스크립트 (Linux/Mac)
# 이 스크립트는 Cursor 설정 파일에 Cloudflare MCP 서버를 추가합니다.

set -e

# Cursor 설정 파일 경로 확인
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    CURSOR_SETTINGS_PATH="$HOME/Library/Application Support/Cursor/User/settings.json"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    CURSOR_SETTINGS_PATH="$HOME/.config/Cursor/User/settings.json"
else
    echo "❌ 지원하지 않는 운영체제입니다."
    exit 1
fi

echo "🔧 Cursor MCP Cloudflare 설정 시작..."

# API 토큰 및 Account ID 입력
read -p "Cloudflare API Token을 입력하세요: " API_TOKEN
read -p "Cloudflare Account ID를 입력하세요: " ACCOUNT_ID

# 환경 변수로 설정 (영구적)
echo "📝 환경 변수 설정 중..."
if [[ "$SHELL" == *"zsh"* ]]; then
    SHELL_RC="$HOME/.zshrc"
elif [[ "$SHELL" == *"bash"* ]]; then
    SHELL_RC="$HOME/.bashrc"
else
    SHELL_RC="$HOME/.profile"
fi

# 환경 변수 추가 (중복 방지)
if ! grep -q "CLOUDFLARE_API_TOKEN" "$SHELL_RC" 2>/dev/null; then
    echo "" >> "$SHELL_RC"
    echo "# Cloudflare MCP 설정" >> "$SHELL_RC"
    echo "export CLOUDFLARE_API_TOKEN=\"$API_TOKEN\"" >> "$SHELL_RC"
    echo "export CLOUDFLARE_ACCOUNT_ID=\"$ACCOUNT_ID\"" >> "$SHELL_RC"
    echo "✅ 환경 변수 추가 완료 ($SHELL_RC)" 
    echo "⚠️  새 터미널을 열거나 'source $SHELL_RC'를 실행하세요"
else
    echo "ℹ️  환경 변수가 이미 설정되어 있습니다"
fi

# 현재 세션에 환경 변수 설정
export CLOUDFLARE_API_TOKEN="$API_TOKEN"
export CLOUDFLARE_ACCOUNT_ID="$ACCOUNT_ID"

# Cursor 설정 디렉토리 생성
CURSOR_SETTINGS_DIR=$(dirname "$CURSOR_SETTINGS_PATH")
mkdir -p "$CURSOR_SETTINGS_DIR"

# 기존 설정 읽기 또는 새로 생성
if [ -f "$CURSOR_SETTINGS_PATH" ]; then
    echo "📖 기존 설정 읽기 중..."
    SETTINGS=$(cat "$CURSOR_SETTINGS_PATH")
else
    echo "📄 새 설정 파일 생성 중..."
    SETTINGS='{"mcpServers":{}}'
fi

# jq가 설치되어 있는지 확인
if ! command -v jq &> /dev/null; then
    echo "⚠️  jq가 설치되어 있지 않습니다. 수동으로 설정 파일을 편집해야 합니다."
    echo ""
    echo "다음 내용을 $CURSOR_SETTINGS_PATH에 추가하세요:"
    echo ""
    cat << EOF
{
  "mcpServers": {
    "cloudflare": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-cloudflare"
      ],
      "env": {
        "CLOUDFLARE_API_TOKEN": "\${env:CLOUDFLARE_API_TOKEN}",
        "CLOUDFLARE_ACCOUNT_ID": "\${env:CLOUDFLARE_ACCOUNT_ID}"
      }
    }
  }
}
EOF
    exit 0
fi

# MCP 서버 설정 추가
echo "⚙️  MCP 서버 설정 추가 중..."
UPDATED_SETTINGS=$(echo "$SETTINGS" | jq '.mcpServers.cloudflare = {
  "command": "npx",
  "args": [
    "-y",
    "@modelcontextprotocol/server-cloudflare"
  ],
  "env": {
    "CLOUDFLARE_API_TOKEN": "${env:CLOUDFLARE_API_TOKEN}",
    "CLOUDFLARE_ACCOUNT_ID": "${env:CLOUDFLARE_ACCOUNT_ID}"
  }
}')

# 설정 파일 저장
echo "$UPDATED_SETTINGS" > "$CURSOR_SETTINGS_PATH"

echo "✅ 설정 완료!"
echo ""
echo "다음 단계:"
echo "1. Cursor를 재시작하세요"
echo "2. Ctrl+Shift+P (Cmd+Shift+P on Mac) → 'MCP: Show Servers'로 연결 확인"
echo "3. Cursor 채팅에서 'Cloudflare Workers 목록을 보여줘' 시도"
echo ""
echo "설정 파일 위치: $CURSOR_SETTINGS_PATH"


---
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git add:*), Bash(git commit:*), Bash(git push:*)
description: 변경사항을 자동으로 커밋하고 푸시합니다
---

# Git Commit & Push

## 현재 상태
- 브랜치: !`git branch --show-current`
- 상태: !`git status --short`
- 스테이지/언스테이지 변경: !`git diff --stat HEAD`
- 최근 커밋: !`git log --oneline -5`

## 작업 절차

1. `git status`로 변경된 파일 확인 (untracked 포함)
2. `git diff --stat HEAD`로 변경 규모 파악
3. 변경된 파일들을 `git add`로 스테이징 (.env, credentials 등 민감 파일 제외, .vercel/ 등 빌드 산출물 제외)
4. 변경 내용을 분석하여 한국어로 간결한 커밋 메시지 작성:
   - feat: 새 기능
   - fix: 버그 수정
   - refactor: 리팩토링
   - style: 스타일/UI 변경
   - docs: 문서 변경
   - chore: 기타 작업
5. 커밋 메시지는 HEREDOC 형식으로 작성하고 끝에 Co-Authored-By 추가:
   ```
   git commit -m "$(cat <<'EOF'
   type: 커밋 메시지 제목

   - 변경 세부사항 1
   - 변경 세부사항 2

   Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
   EOF
   )"
   ```
6. 커밋 완료 후 `git push`로 원격에 푸시
7. 최종 `git status`로 성공 확인

## 주의사항
- 변경사항이 없으면 커밋하지 않고 알려줄 것
- force push 절대 금지
- 민감 파일(.env, credentials 등) 커밋 금지
- $ARGUMENTS가 있으면 커밋 메시지에 반영

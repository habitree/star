-- ============================================================
-- Migration 002: Row Level Security 정책
-- 목적: sign_templates / element_templates 테이블 접근 제어
-- 전략: 공개 읽기(anon key) + 쓰기는 service_role key 전용
-- 작성일: 2026-03-02
-- ============================================================

-- ── sign_templates ──────────────────────────────────────────

-- RLS 활성화
ALTER TABLE sign_templates ENABLE ROW LEVEL SECURITY;

-- 정책 1: 누구나 읽기 가능 (anon key로 Cloudflare Workers에서 읽기)
CREATE POLICY "sign_templates_public_read"
  ON sign_templates
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 정책 2: service_role만 삽입/수정/삭제 가능
-- (upload-templates.ts 스크립트에서만 사용)
CREATE POLICY "sign_templates_service_write"
  ON sign_templates
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ── element_templates ────────────────────────────────────────

ALTER TABLE element_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "element_templates_public_read"
  ON element_templates
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "element_templates_service_write"
  ON element_templates
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ── 확인 쿼리 ───────────────────────────────────────────────
-- 실행 후 아래 쿼리로 정책 적용 확인
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd
-- FROM pg_policies
-- WHERE tablename IN ('sign_templates', 'element_templates');

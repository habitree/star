-- ============================================================
-- Migration 001: sign_templates / element_templates 테이블 생성
-- 목적: Worker 번들 크기 감소 (15MB → ~3MB)
--       대용량 템플릿 데이터를 Supabase에 외부화
-- 대상: Supabase SQL Editor 또는 CLI에서 실행
-- 작성일: 2026-03-02
-- ============================================================

-- 1. sign_templates 테이블
-- 12개 별자리(aries~pisces)별 운세 텍스트 템플릿 저장
-- 원본 크기: src/data/sign-templates/*.ts 합계 ~2.94 MB
CREATE TABLE IF NOT EXISTS sign_templates (
  id          TEXT PRIMARY KEY,       -- 별자리 ID (aries, taurus, ...)
  data        JSONB NOT NULL,         -- SignTemplates 전체 객체
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE sign_templates IS
  '별자리별 운세 템플릿 데이터 (overall/love/career/health/money × high/medium/low × 5개 언어)';

-- 2. element_templates 테이블
-- 4개 원소(fire/earth/air/water)별 운세 텍스트 템플릿 저장
-- 원본 크기: src/data/element-templates.ts ~242 KB
CREATE TABLE IF NOT EXISTS element_templates (
  id          TEXT PRIMARY KEY,       -- 원소 ID (fire, earth, air, water)
  data        JSONB NOT NULL,         -- ElementTemplates 전체 객체
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE element_templates IS
  '원소별 운세 템플릿 데이터 (overall/love/career/health/money × high/medium/low × 5개 언어)';

-- 3. updated_at 자동 갱신 트리거 (선택 사항)
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sign_templates_updated_at
  BEFORE UPDATE ON sign_templates
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER element_templates_updated_at
  BEFORE UPDATE ON element_templates
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 4. 인덱스 (조회 성능)
-- 현재 단일 행 upsert/select 패턴이므로 PRIMARY KEY 인덱스로 충분
-- 추후 파티셔닝 필요 시 updated_at 인덱스 추가
-- CREATE INDEX ON sign_templates (updated_at DESC);
-- CREATE INDEX ON element_templates (updated_at DESC);

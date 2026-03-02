-- ============================================================
-- Migration 003: 데이터 업로드 후 검증 쿼리
-- npm run upload-templates 실행 후 아래 쿼리로 확인
-- 작성일: 2026-03-02
-- ============================================================

-- 1. 업로드된 행 수 확인 (sign_templates: 12, element_templates: 4)
SELECT
  'sign_templates'    AS table_name,
  COUNT(*)            AS row_count,
  MIN(updated_at)     AS first_uploaded,
  MAX(updated_at)     AS last_updated
FROM sign_templates
UNION ALL
SELECT
  'element_templates',
  COUNT(*),
  MIN(updated_at),
  MAX(updated_at)
FROM element_templates;

-- 기대 결과:
-- sign_templates    | 12 | ...
-- element_templates |  4 | ...

-- 2. 별자리 ID 목록 확인
SELECT id, updated_at FROM sign_templates ORDER BY id;

-- 기대 결과: aries, aquarius, cancer, capricorn, gemini,
--            leo, libra, pisces, sagittarius, scorpio, taurus, virgo

-- 3. 원소 ID 목록 확인
SELECT id, updated_at FROM element_templates ORDER BY id;

-- 기대 결과: air, earth, fire, water

-- 4. 데이터 구조 샘플 확인 (aries overall high 첫 번째 항목)
SELECT
  id,
  jsonb_array_length(data->'overall'->'high') AS overall_high_count,
  jsonb_array_length(data->'love'->'high')    AS love_high_count,
  data->'overall'->'high'->0->>'ko'           AS sample_ko_text
FROM sign_templates
WHERE id = 'aries';

-- 5. 원소 템플릿 샘플 확인 (fire overall high 첫 번째 항목)
SELECT
  id,
  jsonb_array_length(data->'overall'->'high') AS overall_high_count,
  data->'overall'->'high'->0->>'ko'           AS sample_ko_text
FROM element_templates
WHERE id = 'fire';

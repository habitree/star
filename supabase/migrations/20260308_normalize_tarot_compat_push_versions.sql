-- ============================================================
-- 스키마 정규화 마이그레이션 (2026-03-08)
-- 적용 완료: Supabase MCP로 직접 적용됨
-- ============================================================
-- tarot_cards: 1행 JSON blob → 22개 개별 행 (id SMALLINT PK)
-- compatibility: 1행 JSON blob → 144개 개별 행 ((sign1,sign2) 복합 PK)
-- push_subscriptions: 신규 생성 (Web Push 구독 정보)
-- content_versions: 신규 생성 (캐시 무효화용 버전 추적)
-- ============================================================

-- 1. 기존 blob 테이블 삭제
DROP TABLE IF EXISTS tarot_cards;
DROP TABLE IF EXISTS compatibility;

-- 2. 정규화된 tarot_cards (22개 개별 행)
CREATE TABLE tarot_cards (
  id SMALLINT PRIMARY KEY CHECK (id >= 0 AND id <= 21),
  symbol TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL DEFAULT '',
  meaning TEXT NOT NULL DEFAULT '',
  reversed TEXT NOT NULL DEFAULT '',
  advice TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE tarot_cards IS '메이저 아르카나 타로 카드 22장 (개별 행, id=0~21)';

-- 3. 정규화된 compatibility (144개 개별 행, (sign1,sign2) 복합 PK)
CREATE TABLE compatibility (
  sign1 TEXT NOT NULL CHECK (sign1 IN ('aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces')),
  sign2 TEXT NOT NULL CHECK (sign2 IN ('aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces')),
  overall SMALLINT NOT NULL CHECK (overall BETWEEN 0 AND 100),
  love SMALLINT NOT NULL CHECK (love BETWEEN 0 AND 100),
  friendship SMALLINT NOT NULL CHECK (friendship BETWEEN 0 AND 100),
  work SMALLINT NOT NULL CHECK (work BETWEEN 0 AND 100),
  advice JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (sign1, sign2)
);
COMMENT ON TABLE compatibility IS '별자리 궁합 데이터 144개 조합 (sign1,sign2 복합 PK)';

-- 4. push_subscriptions (Web Push 구독 정보)
CREATE TABLE IF NOT EXISTS push_subscriptions (
  id BIGSERIAL PRIMARY KEY,
  endpoint TEXT UNIQUE NOT NULL,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  time_slot TEXT NOT NULL DEFAULT 'morning' CHECK (time_slot IN ('morning', 'noon', 'evening')),
  locale TEXT NOT NULL DEFAULT 'ko' CHECK (locale IN ('ko', 'en', 'zh', 'ja', 'es')),
  sign_id TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE push_subscriptions IS 'Web Push 구독 정보 (endpoint 기준 upsert)';

-- 5. content_versions (버전 추적)
CREATE TABLE IF NOT EXISTS content_versions (
  table_name TEXT PRIMARY KEY,
  version INTEGER NOT NULL DEFAULT 1,
  row_count INTEGER,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE content_versions IS '콘텐츠 버전 추적 — Workers 캐시 무효화용';

-- 6. set_updated_at 트리거 함수
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public';

-- 7. 트리거 연결
DROP TRIGGER IF EXISTS set_updated_at_tarot_cards ON tarot_cards;
CREATE TRIGGER set_updated_at_tarot_cards
  BEFORE UPDATE ON tarot_cards
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_compatibility ON compatibility;
CREATE TRIGGER set_updated_at_compatibility
  BEFORE UPDATE ON compatibility
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_push_subscriptions ON push_subscriptions;
CREATE TRIGGER set_updated_at_push_subscriptions
  BEFORE UPDATE ON push_subscriptions
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_content_versions ON content_versions;
CREATE TRIGGER set_updated_at_content_versions
  BEFORE UPDATE ON content_versions
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 8. RLS 활성화
ALTER TABLE tarot_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE compatibility ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_versions ENABLE ROW LEVEL SECURITY;

-- 9. RLS 정책
CREATE POLICY "tarot_public_read" ON tarot_cards FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "tarot_service_write" ON tarot_cards FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "compat_public_read" ON compatibility FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "compat_service_write" ON compatibility FOR ALL TO service_role USING (true) WITH CHECK (true);

-- push_subscriptions: HTTPS endpoint 검증, service_role 전체 권한
CREATE POLICY "push_anon_insert" ON push_subscriptions
  FOR INSERT TO anon
  WITH CHECK (
    endpoint IS NOT NULL
    AND length(endpoint) > 10
    AND (endpoint LIKE 'https://%')
  );
CREATE POLICY "push_service_all" ON push_subscriptions FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "cv_public_read" ON content_versions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "cv_service_write" ON content_versions FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 10. 인덱스
CREATE INDEX IF NOT EXISTS idx_compatibility_sign1 ON compatibility (sign1);
CREATE INDEX IF NOT EXISTS idx_compatibility_sign2 ON compatibility (sign2);
CREATE INDEX IF NOT EXISTS idx_push_subscriptions_sign_locale ON push_subscriptions (sign_id, locale);
CREATE INDEX IF NOT EXISTS idx_push_subscriptions_time_slot ON push_subscriptions (time_slot);

-- ============================================================
-- 데이터 업로드: npx tsx scripts/upload-templates.ts tarot compat
-- ============================================================

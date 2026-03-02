/**
 * Supabase 템플릿 업로드 스크립트
 *
 * sign-templates (12개 별자리) 및 element-templates (4개 원소)를
 * Supabase DB에 업로드합니다.
 *
 * 사용법:
 *   npx tsx scripts/upload-templates.ts
 *
 * 사전 요건:
 *   .env.local에 다음 변수가 설정되어 있어야 합니다:
 *   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=xxx
 *
 * Supabase 테이블 구조 (SQL):
 *   CREATE TABLE sign_templates (
 *     id TEXT PRIMARY KEY,
 *     data JSONB NOT NULL,
 *     updated_at TIMESTAMPTZ DEFAULT NOW()
 *   );
 *   CREATE TABLE element_templates (
 *     id TEXT PRIMARY KEY,
 *     data JSONB NOT NULL,
 *     updated_at TIMESTAMPTZ DEFAULT NOW()
 *   );
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// .env.local 수동 로드 (dotenv 없이)
function loadEnvLocal() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const envPath = join(__dirname, '..', '.env.local');
  try {
    const content = readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const value = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
      if (!process.env[key]) process.env[key] = value;
    }
    console.log('✓ .env.local 로드 완료');
  } catch {
    console.log('⚠️  .env.local 없음 — 환경변수가 이미 설정되어 있어야 합니다');
  }
}

loadEnvLocal();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY가 설정되지 않았습니다.');
  console.error('   .env.local 파일에 Supabase 자격증명을 추가하세요.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

// ─── Sign Templates 업로드 ─────────────────────────────────

const SIGNS = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
] as const;

async function uploadSignTemplates() {
  console.log('\n📤 Sign Templates 업로드 중...');

  // 동적 import로 각 별자리 템플릿 로드
  const { signTemplates } = await import('../src/data/sign-templates/index.js');

  let successCount = 0;
  for (const sign of SIGNS) {
    const data = signTemplates[sign];
    if (!data) {
      console.warn(`  ⚠️  ${sign}: 데이터 없음`);
      continue;
    }

    const { error } = await supabase
      .from('sign_templates')
      .upsert({ id: sign, data, updated_at: new Date().toISOString() });

    if (error) {
      console.error(`  ❌ ${sign}: ${error.message}`);
    } else {
      console.log(`  ✓ ${sign}`);
      successCount++;
    }
  }

  console.log(`  → ${successCount}/${SIGNS.length} 완료`);
}

// ─── Element Templates 업로드 ──────────────────────────────

const ELEMENTS = ['fire', 'earth', 'air', 'water'] as const;

async function uploadElementTemplates() {
  console.log('\n📤 Element Templates 업로드 중...');

  const { elementTemplates } = await import('../src/data/element-templates.js');

  let successCount = 0;
  for (const element of ELEMENTS) {
    const data = elementTemplates[element];
    if (!data) {
      console.warn(`  ⚠️  ${element}: 데이터 없음`);
      continue;
    }

    const { error } = await supabase
      .from('element_templates')
      .upsert({ id: element, data, updated_at: new Date().toISOString() });

    if (error) {
      console.error(`  ❌ ${element}: ${error.message}`);
    } else {
      console.log(`  ✓ ${element}`);
      successCount++;
    }
  }

  console.log(`  → ${successCount}/${ELEMENTS.length} 완료`);
}

// ─── 메인 ─────────────────────────────────────────────────

async function main() {
  console.log('🚀 Supabase 템플릿 업로드 시작');
  console.log(`   URL: ${supabaseUrl}`);

  try {
    await uploadSignTemplates();
    await uploadElementTemplates();
    console.log('\n✅ 모든 템플릿 업로드 완료!');
    console.log('   이제 npm run build && npm run cf:deploy 를 실행하세요.');
  } catch (err) {
    console.error('\n❌ 업로드 실패:', err);
    process.exit(1);
  }
}

main();

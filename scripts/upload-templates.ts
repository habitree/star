/**
 * Supabase 템플릿 업로드 스크립트
 *
 * 정규화된 스키마로 4개 테이블에 데이터를 업로드합니다:
 *   - sign_templates (12행, id TEXT PK)
 *   - element_templates (4행, id TEXT PK)
 *   - tarot_cards (22행, id SMALLINT PK 0~21)
 *   - compatibility (144행, (sign1, sign2) 복합 PK)
 *
 * 사용법:
 *   npx tsx scripts/upload-templates.ts
 *
 * 사전 요건:
 *   .env.local에 다음 변수 설정:
 *   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=xxx
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// .env.local 수동 로드
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
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY가 설정되지 않았습니다.');
  console.error('   service_role key가 필요합니다 (쓰기 권한).');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

// ─── Sign Templates ────────────────────────────────────────

const SIGNS = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
] as const;

async function uploadSignTemplates() {
  console.log('\n📤 Sign Templates 업로드 중...');
  const { signTemplates } = await import('../src/data/sign-templates/index.js');

  let successCount = 0;
  for (const sign of SIGNS) {
    const data = signTemplates[sign];
    if (!data) { console.warn(`  ⚠️  ${sign}: 데이터 없음`); continue; }

    const { error } = await supabase
      .from('sign_templates')
      .upsert({ id: sign, data, updated_at: new Date().toISOString() });

    if (error) { console.error(`  ❌ ${sign}: ${error.message}`); }
    else { console.log(`  ✓ ${sign}`); successCount++; }
  }
  console.log(`  → ${successCount}/${SIGNS.length} 완료`);
  await updateContentVersion('sign_templates', successCount);
}

// ─── Element Templates ─────────────────────────────────────

const ELEMENTS = ['fire', 'earth', 'air', 'water'] as const;

async function uploadElementTemplates() {
  console.log('\n📤 Element Templates 업로드 중...');
  const { elementTemplates } = await import('../src/data/element-templates.js');

  let successCount = 0;
  for (const element of ELEMENTS) {
    const data = elementTemplates[element];
    if (!data) { console.warn(`  ⚠️  ${element}: 데이터 없음`); continue; }

    const { error } = await supabase
      .from('element_templates')
      .upsert({ id: element, data, updated_at: new Date().toISOString() });

    if (error) { console.error(`  ❌ ${element}: ${error.message}`); }
    else { console.log(`  ✓ ${element}`); successCount++; }
  }
  console.log(`  → ${successCount}/${ELEMENTS.length} 완료`);
  await updateContentVersion('element_templates', successCount);
}

// ─── Tarot Cards (정규화: 22개 개별 행) ──────────────────────

async function uploadTarotCards() {
  console.log('\n📤 Tarot Cards 업로드 중... (정규화 스키마: 22개 개별 행)');
  const { majorArcana } = await import('../src/data/tarot-data.js');

  let successCount = 0;
  for (const card of majorArcana) {
    const { error } = await supabase
      .from('tarot_cards')
      .upsert({
        id: card.id,
        symbol: card.symbol,
        image_url: card.imageUrl,
        name: card.name,
        meaning: card.meaning,
        reversed: card.reversed,
        advice: card.advice,
        updated_at: new Date().toISOString(),
      });

    if (error) { console.error(`  ❌ card[${card.id}] ${card.name}: ${error.message}`); }
    else { console.log(`  ✓ [${String(card.id).padStart(2, '0')}] ${card.name}`); successCount++; }
  }
  console.log(`  → ${successCount}/${majorArcana.length} 완료`);
  await updateContentVersion('tarot_cards', successCount);
}

// ─── Tarot Images → Supabase Storage ──────────────────────

async function uploadTarotImages() {
  console.log('\n🖼️  Tarot Images → Supabase Storage 업로드 중...');
  const __dirname2 = dirname(fileURLToPath(import.meta.url));
  const publicDir = join(__dirname2, '..', 'public', 'images', 'tarot');

  let successCount = 0;
  const total = 22;

  for (let i = 0; i < total; i++) {
    const filename = `${String(i).padStart(2, '0')}.jpg`;
    const filePath = join(publicDir, filename);

    if (!existsSync(filePath)) {
      console.warn(`  ⚠️  ${filename}: 파일 없음 (건너뜀)`);
      continue;
    }

    const fileBuffer = readFileSync(filePath);
    const { error } = await supabase.storage
      .from('images')
      .upload(`tarot/${filename}`, fileBuffer, { contentType: 'image/jpeg', upsert: true });

    if (error) { console.error(`  ❌ ${filename}: ${error.message}`); }
    else { console.log(`  ✓ tarot/${filename}`); successCount++; }
  }
  console.log(`  → ${successCount}/${total} 완료`);

  if (successCount > 0) {
    const { data } = supabase.storage.from('images').getPublicUrl('tarot/00.jpg');
    console.log(`  📌 CDN URL 패턴: ${data.publicUrl.replace('tarot/00.jpg', 'tarot/XX.jpg')}`);
  }
}

// ─── Compatibility (정규화: 144개 개별 행) ────────────────────

async function uploadCompatibility() {
  console.log('\n📤 Compatibility 업로드 중... (정규화 스키마: 144개 개별 행)');
  const { compatibilityMatrix } = await import('../src/data/compatibility-data.js');

  // 배치 업서트 (최대 500행씩)
  const BATCH_SIZE = 50;
  let successCount = 0;

  for (let i = 0; i < compatibilityMatrix.length; i += BATCH_SIZE) {
    const batch = compatibilityMatrix.slice(i, i + BATCH_SIZE).map((d) => ({
      sign1: d.sign1,
      sign2: d.sign2,
      overall: d.overall,
      love: d.love,
      friendship: d.friendship,
      work: d.work,
      advice: d.advice,
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from('compatibility').upsert(batch);
    if (error) {
      console.error(`  ❌ 배치 [${i}~${i + batch.length - 1}]: ${error.message}`);
    } else {
      successCount += batch.length;
      console.log(`  ✓ 배치 [${i + 1}~${i + batch.length}] / ${compatibilityMatrix.length}`);
    }
  }
  console.log(`  → ${successCount}/${compatibilityMatrix.length} 완료`);
  await updateContentVersion('compatibility', successCount);
}

// ─── content_versions 업데이트 ────────────────────────────

async function updateContentVersion(tableName: string, rowCount: number) {
  const { error } = await supabase.from('content_versions').upsert({
    table_name: tableName,
    row_count: rowCount,
    version: Math.floor(Date.now() / 1000), // Unix 초(seconds) — INTEGER 범위 적합
    updated_at: new Date().toISOString(),
  });
  if (error) {
    console.warn(`  ⚠️  content_versions 업데이트 실패 (${tableName}):`, error.message);
  }
}

// ─── 메인 ─────────────────────────────────────────────────

async function main() {
  console.log('🚀 Supabase 데이터 업로드 시작');
  console.log(`   URL: ${supabaseUrl}`);

  const args = process.argv.slice(2);
  const uploadAll = args.length === 0;

  // 선택적 업로드: npx tsx scripts/upload-templates.ts tarot compat
  const tasks: Record<string, () => Promise<void>> = {
    signs: uploadSignTemplates,
    elements: uploadElementTemplates,
    tarot: uploadTarotCards,
    images: uploadTarotImages,
    compat: uploadCompatibility,
  };

  try {
    if (uploadAll) {
      await uploadSignTemplates();
      await uploadElementTemplates();
      await uploadTarotCards();
      await uploadTarotImages();
      await uploadCompatibility();
    } else {
      for (const arg of args) {
        if (tasks[arg]) {
          await tasks[arg]();
        } else {
          console.warn(`  ⚠️  알 수 없는 태스크: ${arg} (사용 가능: ${Object.keys(tasks).join(', ')})`);
        }
      }
    }
    console.log('\n✅ 업로드 완료!');
    console.log('   이제 npm run build && npm run cf:deploy 를 실행하세요.');
  } catch (err) {
    console.error('\n❌ 업로드 실패:', err);
    process.exit(1);
  }
}

main();

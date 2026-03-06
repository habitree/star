/**
 * Rider-Waite-Smith 타로 이미지 다운로드 & Supabase Storage 업로드 스크립트
 *
 * 출처: Wikimedia Commons (공개도메인 — 1909년 출판, 저작권 만료)
 * 라이선스: Public Domain
 *
 * 사용법:
 *   npx tsx scripts/download-rws-tarot.ts
 *
 * 동작:
 *   1. Wikimedia Commons에서 22장 RWS 타로 이미지 다운로드
 *   2. public/images/tarot/에 로컬 저장 (빌드 fallback)
 *   3. Supabase Storage images 버킷 tarot/ 경로에 업로드
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
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
    console.log('⚠️  .env.local 없음');
  }
}

loadEnvLocal();

// ─── Rider-Waite-Smith 이미지 소스 (Wikimedia Commons, Public Domain) ────────
const RWS_IMAGES: { id: number; filename: string; url: string }[] = [
  { id: 0,  filename: '00.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg' },
  { id: 1,  filename: '01.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg' },
  { id: 2,  filename: '02.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg' },
  { id: 3,  filename: '03.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg' },
  { id: 4,  filename: '04.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg' },
  { id: 5,  filename: '05.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg' },
  { id: 6,  filename: '06.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg' },
  { id: 7,  filename: '07.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg' },
  { id: 8,  filename: '08.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg' },
  { id: 9,  filename: '09.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg' },
  { id: 10, filename: '10.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg' },
  { id: 11, filename: '11.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg' },
  { id: 12, filename: '12.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg' },
  { id: 13, filename: '13.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg' },
  { id: 14, filename: '14.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg' },
  { id: 15, filename: '15.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg' },
  { id: 16, filename: '16.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg' },
  { id: 17, filename: '17.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg' },
  { id: 18, filename: '18.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg' },
  { id: 19, filename: '19.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg' },
  { id: 20, filename: '20.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg' },
  { id: 21, filename: '21.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg' },
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const LOCAL_DIR = join(__dirname, '..', 'public', 'images', 'tarot');

// ─── Supabase 클라이언트 ───────────────────────────────────────────────────────
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY가 설정되지 않았습니다.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

// ─── 이미지 다운로드 ──────────────────────────────────────────────────────────
async function downloadImage(url: string): Promise<Buffer> {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 Star-Tarot-Service/1.0 (https://github.com; educational)',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${url}`);
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// ─── 메인 ────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🌟 Rider-Waite-Smith 타로 이미지 다운로드 & 업로드 시작');
  console.log('   출처: Wikimedia Commons (Public Domain)');
  console.log(`   저장: ${LOCAL_DIR}`);
  console.log(`   Supabase: ${supabaseUrl}/storage/v1/object/public/images/tarot/\n`);

  // 로컬 디렉토리 생성
  if (!existsSync(LOCAL_DIR)) {
    mkdirSync(LOCAL_DIR, { recursive: true });
    console.log(`✓ 디렉토리 생성: ${LOCAL_DIR}`);
  }

  let localSuccess = 0;
  let storageSuccess = 0;

  for (const card of RWS_IMAGES) {
    const localPath = join(LOCAL_DIR, card.filename);
    const storagePath = `tarot/${card.filename}`;

    process.stdout.write(`  [${card.filename}] 다운로드 중...`);

    try {
      // 1. Wikimedia에서 다운로드
      const buffer = await downloadImage(card.url);
      process.stdout.write(` ${(buffer.length / 1024).toFixed(0)}KB`);

      // 2. 로컬 저장
      writeFileSync(localPath, buffer);
      localSuccess++;
      process.stdout.write(' → 로컬 저장 ✓');

      // 3. Supabase Storage 업로드
      const { error } = await supabase.storage
        .from('images')
        .upload(storagePath, buffer, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (error) {
        process.stdout.write(` → Storage ❌ (${error.message})\n`);
      } else {
        storageSuccess++;
        process.stdout.write(' → Supabase ✓\n');
      }
    } catch (err) {
      process.stdout.write(` ❌ ${err instanceof Error ? err.message : err}\n`);
    }

    // Wikimedia 요청 간격 (rate limit 방지)
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`\n📊 결과: 로컬 ${localSuccess}/22, Supabase Storage ${storageSuccess}/22`);

  if (storageSuccess > 0) {
    const { data } = supabase.storage.from('images').getPublicUrl('tarot/00.jpg');
    console.log(`\n✅ Supabase CDN URL 패턴:`);
    console.log(`   ${data.publicUrl.replace('00.jpg', 'XX.jpg')}`);

    // tarot_cards DB 데이터도 Supabase URL로 재업로드 필요 알림
    console.log('\n⚡ 다음 단계: tarot 데이터 DB 재업로드');
    console.log('   npx tsx scripts/upload-templates.ts');
  }
}

main().catch((err) => {
  console.error('❌ 오류:', err);
  process.exit(1);
});

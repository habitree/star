/**
 * X (Twitter) 일일 운세 자동 포스팅 스크립트
 *
 * 매일 오전 7시 (GitHub Actions cron) 실행
 * 12개 별자리 운세를 luckytoday.one API에서 가져와 X에 순차 포스팅
 *
 * 필요한 GitHub Secrets:
 *   X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_SECRET
 *
 * X API 무료 한도: 1,500 트윗/월 → 12개 × 31일 = 372개 (여유 있음)
 */

import { TwitterApi } from 'twitter-api-v2';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// ─── 환경변수 로드 (.env.local 지원) ──────────────────────

function loadEnv() {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const envPath = join(__dirname, '..', '.env.local');
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
  } catch {
    // GitHub Actions 환경에서는 Secrets로 주입되므로 무시
  }
}

loadEnv();

// ─── 별자리 메타 데이터 ────────────────────────────────────

const SIGNS = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
] as const;

type SignId = typeof SIGNS[number];

const SIGN_META: Record<SignId, { ko: string; en: string; symbol: string; hashtag: string }> = {
  aries:       { ko: '양자리',   en: 'Aries',       symbol: '🐏', hashtag: '#양자리' },
  taurus:      { ko: '황소자리', en: 'Taurus',      symbol: '🐂', hashtag: '#황소자리' },
  gemini:      { ko: '쌍둥이자리', en: 'Gemini',   symbol: '👯', hashtag: '#쌍둥이자리' },
  cancer:      { ko: '게자리',   en: 'Cancer',      symbol: '🦀', hashtag: '#게자리' },
  leo:         { ko: '사자자리', en: 'Leo',         symbol: '🦁', hashtag: '#사자자리' },
  virgo:       { ko: '처녀자리', en: 'Virgo',       symbol: '👧', hashtag: '#처녀자리' },
  libra:       { ko: '천칭자리', en: 'Libra',       symbol: '⚖️', hashtag: '#천칭자리' },
  scorpio:     { ko: '전갈자리', en: 'Scorpio',     symbol: '🦂', hashtag: '#전갈자리' },
  sagittarius: { ko: '사수자리', en: 'Sagittarius', symbol: '🏹', hashtag: '#사수자리' },
  capricorn:   { ko: '염소자리', en: 'Capricorn',   symbol: '🐐', hashtag: '#염소자리' },
  aquarius:    { ko: '물병자리', en: 'Aquarius',    symbol: '🫙', hashtag: '#물병자리' },
  pisces:      { ko: '물고기자리', en: 'Pisces',   symbol: '🐟', hashtag: '#물고기자리' },
};

// ─── 운세 점수 시각화 (1-5 → 별 이모지) ─────────────────

function scoreToEmoji(score: number): string {
  const filled = Math.round(score);
  return '⭐'.repeat(filled) + '✩'.repeat(Math.max(0, 5 - filled));
}

// ─── API에서 운세 데이터 가져오기 ─────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://luckytoday.one';

interface HoroscopeApiResponse {
  success: boolean;
  data: {
    signId: string;
    date: string;
    overall: { score: number; text: { ko: string; en: string } };
    love:    { score: number; text: { ko: string; en: string } };
    career:  { score: number; text: { ko: string; en: string } };
    health:  { score: number; text: { ko: string; en: string } };
    money:   { score: number; text: { ko: string; en: string } };
    luckyNumber: number;
    luckyColor: string;
    luckyTime: string;
    advice: { ko: string; en: string };
  };
}

async function fetchHoroscope(sign: SignId): Promise<HoroscopeApiResponse['data']> {
  const url = `${SITE_URL}/api/horoscope/daily/${sign}?locale=ko`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'luckytoday-auto-poster/1.0' },
  });
  if (!res.ok) throw new Error(`API 오류 ${res.status}: ${sign}`);
  const json = (await res.json()) as HoroscopeApiResponse;
  if (!json.success || !json.data) throw new Error(`데이터 없음: ${sign}`);
  return json.data;
}

// ─── 트윗 텍스트 포맷 ─────────────────────────────────────
//
// 목표: ≤ 280자 (URL은 23자로 카운트됨)
// 예시:
//   🐏 #양자리 오늘의 운세
//
//   ⭐ 종합 ⭐⭐⭐⭐✩  ❤️ 연애 ⭐⭐⭐✩✩
//   💼 직업 ⭐⭐⭐⭐⭐  💰 재물 ⭐⭐⭐⭐✩
//
//   "조언 텍스트 (최대 60자)..."
//
//   🍀 숫자 7 · 색 빨간색
//   🔮 luckytoday.one/ko/horoscope/daily/aries
//   #오늘의운세 #별자리운세 #Aries

function formatTweet(sign: SignId, data: HoroscopeApiResponse['data']): string {
  const meta = SIGN_META[sign];

  // 조언 텍스트 (60자 이내로 자르기)
  const advice = data.advice.ko.length > 60
    ? data.advice.ko.slice(0, 58) + '…'
    : data.advice.ko;

  const lines = [
    `${meta.symbol} ${meta.hashtag} 오늘의 운세`,
    '',
    `⭐ 종합 ${scoreToEmoji(data.overall.score)}  ❤️ 연애 ${scoreToEmoji(data.love.score)}`,
    `💼 직업 ${scoreToEmoji(data.career.score)}  💰 재물 ${scoreToEmoji(data.money.score)}`,
    '',
    `"${advice}"`,
    '',
    `🍀 ${data.luckyNumber} · ${data.luckyColor} · ${data.luckyTime}`,
    `🔮 ${SITE_URL}/ko/horoscope/daily/${sign}`,
    `#오늘의운세 #별자리운세 #${meta.en}`,
  ];

  return lines.join('\n');
}

// ─── X 클라이언트 초기화 ──────────────────────────────────

function createXClient(): TwitterApi {
  const { X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_SECRET } = process.env;

  if (!X_API_KEY || !X_API_SECRET || !X_ACCESS_TOKEN || !X_ACCESS_SECRET) {
    throw new Error(
      '❌ X API 인증 정보가 없습니다.\n' +
      '   필요한 환경변수: X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_SECRET\n' +
      '   GitHub Secrets 또는 .env.local에 설정하세요.'
    );
  }

  return new TwitterApi({
    appKey: X_API_KEY,
    appSecret: X_API_SECRET,
    accessToken: X_ACCESS_TOKEN,
    accessSecret: X_ACCESS_SECRET,
  });
}

// ─── 딜레이 유틸 ──────────────────────────────────────────

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ─── 메인 ─────────────────────────────────────────────────

async function main() {
  const today = new Date().toLocaleDateString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric', month: 'long', day: 'numeric',
  });

  console.log(`\n🌟 오늘의 운세 X 포스팅 시작 — ${today}`);
  console.log(`   대상: 12개 별자리  |  API: ${SITE_URL}\n`);

  // DRY_RUN 모드: X_DRY_RUN=true 시 실제 포스팅 없이 트윗 내용만 출력
  const isDryRun = process.env.X_DRY_RUN === 'true';
  if (isDryRun) console.log('⚠️  DRY RUN 모드 — 실제 포스팅 안 함\n');

  const client = isDryRun ? null : createXClient();

  let successCount = 0;
  let failCount = 0;

  for (const sign of SIGNS) {
    const meta = SIGN_META[sign];
    try {
      // 운세 데이터 가져오기
      const data = await fetchHoroscope(sign);
      const tweetText = formatTweet(sign, data);

      if (isDryRun) {
        console.log(`─── ${meta.symbol} ${meta.ko} ────────────────────`);
        console.log(tweetText);
        console.log(`(${tweetText.length}자)\n`);
      } else {
        await client!.v2.tweet(tweetText);
        console.log(`  ✓ ${meta.symbol} ${meta.ko} 포스팅 완료`);
        successCount++;
        // API rate limit 방지: 각 트윗 사이 15초 대기
        if (sign !== SIGNS[SIGNS.length - 1]) await sleep(15_000);
      }
    } catch (err) {
      console.error(`  ❌ ${meta.symbol} ${meta.ko} 실패:`, err instanceof Error ? err.message : err);
      failCount++;
    }
  }

  if (!isDryRun) {
    console.log(`\n✅ 완료 — 성공 ${successCount}개 / 실패 ${failCount}개`);
    if (failCount > 0) process.exit(1);
  }
}

main().catch(err => {
  console.error('\n❌ 치명적 오류:', err);
  process.exit(1);
});

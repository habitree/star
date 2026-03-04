/**
 * X (Twitter) 일일 운세 자동 포스팅 스크립트
 *
 * 5개 로케일 × 12별자리 × 최적 현지 시간 포스팅 (GitHub Actions matrix)
 *   ko/ja: 22:00 UTC = 07:00 KST/JST
 *   zh:    23:00 UTC = 07:00 CST
 *   en:    12:00 UTC = 07:00 EST
 *
 * 트윗 한도: 4 로케일 × 12 × 31일 = 1,488/월 (무료 한도 1,500 이내 ✓)
 *
 * 필요한 GitHub Secrets:
 *   X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_SECRET
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

// ─── 언어 설정 ─────────────────────────────────────────────

const LOCALE = process.env.X_LOCALE ?? 'ko'; // 'ko' | 'en' | 'zh' | 'ja' | 'es'

// ─── 별자리 메타 데이터 ────────────────────────────────────

const SIGNS = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
] as const;

type SignId = typeof SIGNS[number];

const SIGN_META: Record<SignId, { ko: string; en: string; zh: string; ja: string; es: string; symbol: string }> = {
  aries:       { ko: '양자리',     en: 'Aries',       zh: '白羊座', ja: '牡羊座', es: 'Aries',        symbol: '🐏' },
  taurus:      { ko: '황소자리',   en: 'Taurus',      zh: '金牛座', ja: '牡牛座', es: 'Tauro',        symbol: '🐂' },
  gemini:      { ko: '쌍둥이자리', en: 'Gemini',      zh: '双子座', ja: '双子座', es: 'Géminis',      symbol: '👯' },
  cancer:      { ko: '게자리',     en: 'Cancer',      zh: '巨蟹座', ja: '蟹座',   es: 'Cáncer',       symbol: '🦀' },
  leo:         { ko: '사자자리',   en: 'Leo',         zh: '狮子座', ja: '獅子座', es: 'Leo',          symbol: '🦁' },
  virgo:       { ko: '처녀자리',   en: 'Virgo',       zh: '处女座', ja: '乙女座', es: 'Virgo',        symbol: '👧' },
  libra:       { ko: '천칭자리',   en: 'Libra',       zh: '天秤座', ja: '天秤座', es: 'Libra',        symbol: '⚖️' },
  scorpio:     { ko: '전갈자리',   en: 'Scorpio',     zh: '天蝎座', ja: '蠍座',   es: 'Escorpio',     symbol: '🦂' },
  sagittarius: { ko: '사수자리',   en: 'Sagittarius', zh: '射手座', ja: '射手座', es: 'Sagitario',    symbol: '🏹' },
  capricorn:   { ko: '염소자리',   en: 'Capricorn',   zh: '摩羯座', ja: '山羊座', es: 'Capricornio',  symbol: '🐐' },
  aquarius:    { ko: '물병자리',   en: 'Aquarius',    zh: '水瓶座', ja: '水瓶座', es: 'Acuario',      symbol: '🫙' },
  pisces:      { ko: '물고기자리', en: 'Pisces',      zh: '双鱼座', ja: '魚座',   es: 'Piscis',       symbol: '🐟' },
};

// ─── 번역 맵 (한국어 → 각 로케일) ────────────────────────

const COLOR_MAP: Record<string, Record<string, string>> = {
  '빨간색': { zh: '红色',  ja: '赤',       es: 'Rojo',     en: 'Red' },
  '파란색': { zh: '蓝色',  ja: '青',       es: 'Azul',     en: 'Blue' },
  '노란색': { zh: '黄色',  ja: '黄',       es: 'Amarillo', en: 'Yellow' },
  '초록색': { zh: '绿色',  ja: '緑',       es: 'Verde',    en: 'Green' },
  '보라색': { zh: '紫色',  ja: '紫',       es: 'Morado',   en: 'Purple' },
  '흰색':   { zh: '白色',  ja: '白',       es: 'Blanco',   en: 'White' },
  '검은색': { zh: '黑色',  ja: '黒',       es: 'Negro',    en: 'Black' },
  '주황색': { zh: '橙色',  ja: 'オレンジ', es: 'Naranja',  en: 'Orange' },
  '분홍색': { zh: '粉色',  ja: 'ピンク',   es: 'Rosa',     en: 'Pink' },
  '금색':   { zh: '金色',  ja: '金',       es: 'Dorado',   en: 'Gold' },
};

const TIME_MAP: Record<string, Record<string, string>> = {
  '오전': { zh: '上午', ja: '朝',   es: 'Mañana', en: 'Morning' },
  '오후': { zh: '下午', ja: '午後', es: 'Tarde',  en: 'Afternoon' },
  '저녁': { zh: '傍晚', ja: '夜',   es: 'Noche',  en: 'Evening' },
};

function translateColor(ko: string, locale: string): string {
  return COLOR_MAP[ko]?.[locale] ?? ko;
}

function translateTime(ko: string, locale: string): string {
  return TIME_MAP[ko]?.[locale] ?? ko;
}

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
    advice: { ko: string; en: string; zh?: string; ja?: string; es?: string };
  };
}

async function fetchHoroscope(sign: SignId): Promise<HoroscopeApiResponse['data']> {
  const url = `${SITE_URL}/api/horoscope/daily/${sign}?locale=${LOCALE}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'luckytoday-auto-poster/1.0' },
  });
  if (!res.ok) throw new Error(`API 오류 ${res.status}: ${sign}`);
  const json = (await res.json()) as HoroscopeApiResponse;
  if (!json.success || !json.data) throw new Error(`데이터 없음: ${sign}`);
  return json.data;
}

// ─── 트윗 텍스트 포맷 ────────────────────────────────────

function formatTweetKo(sign: SignId, data: HoroscopeApiResponse['data']): string {
  const meta = SIGN_META[sign];
  const advice = data.advice.ko.length > 60
    ? data.advice.ko.slice(0, 58) + '…'
    : data.advice.ko;

  return [
    `${meta.symbol} #${meta.ko} 오늘의 운세`,
    '',
    `⭐ 종합 ${scoreToEmoji(data.overall.score)}  ❤️ 연애 ${scoreToEmoji(data.love.score)}`,
    `💼 직업 ${scoreToEmoji(data.career.score)}  💰 재물 ${scoreToEmoji(data.money.score)}`,
    '',
    `"${advice}"`,
    '',
    `🍀 ${data.luckyNumber} · ${data.luckyColor} · ${data.luckyTime}`,
    `🔮 ${SITE_URL}/ko/horoscope/daily/${sign}`,
    `#오늘의운세 #별자리운세 #${meta.en}`,
  ].join('\n');
}

function formatTweetEn(sign: SignId, data: HoroscopeApiResponse['data']): string {
  const meta = SIGN_META[sign];
  const adviceText = data.advice.en;
  const advice = adviceText.length > 80 ? adviceText.slice(0, 78) + '…' : adviceText;
  const color = translateColor(data.luckyColor, 'en');
  const time  = translateTime(data.luckyTime, 'en');

  return [
    `${meta.symbol} #${meta.en} Today's Horoscope`,
    '',
    `⭐ Overall ${scoreToEmoji(data.overall.score)}  ❤️ Love ${scoreToEmoji(data.love.score)}`,
    `💼 Career ${scoreToEmoji(data.career.score)}  💰 Money ${scoreToEmoji(data.money.score)}`,
    '',
    `"${advice}"`,
    '',
    `🍀 ${data.luckyNumber} · ${color} · ${time}`,
    `🔮 ${SITE_URL}/en/horoscope/daily/${sign}`,
    `#DailyHoroscope #ZodiacSign #${meta.en}`,
  ].join('\n');
}

function formatTweetZh(sign: SignId, data: HoroscopeApiResponse['data']): string {
  const meta = SIGN_META[sign];
  const adviceText = data.advice.zh ?? data.advice.en;
  const advice = adviceText.length > 50 ? adviceText.slice(0, 48) + '…' : adviceText;
  const color = translateColor(data.luckyColor, 'zh');
  const time  = translateTime(data.luckyTime, 'zh');

  return [
    `${meta.symbol} #${meta.zh} 今日运势`,
    '',
    `⭐ 综合 ${scoreToEmoji(data.overall.score)}  ❤️ 爱情 ${scoreToEmoji(data.love.score)}`,
    `💼 事业 ${scoreToEmoji(data.career.score)}  💰 财运 ${scoreToEmoji(data.money.score)}`,
    '',
    `"${advice}"`,
    '',
    `🍀 ${data.luckyNumber} · ${color} · ${time}`,
    `🔮 ${SITE_URL}/zh/horoscope/daily/${sign}`,
    `#每日运势 #星座运势 #${meta.en}`,
  ].join('\n');
}

function formatTweetJa(sign: SignId, data: HoroscopeApiResponse['data']): string {
  const meta = SIGN_META[sign];
  const adviceText = data.advice.ja ?? data.advice.en;
  const advice = adviceText.length > 50 ? adviceText.slice(0, 48) + '…' : adviceText;
  const color = translateColor(data.luckyColor, 'ja');
  const time  = translateTime(data.luckyTime, 'ja');

  return [
    `${meta.symbol} #${meta.ja} 今日の運勢`,
    '',
    `⭐ 総合 ${scoreToEmoji(data.overall.score)}  ❤️ 恋愛 ${scoreToEmoji(data.love.score)}`,
    `💼 仕事 ${scoreToEmoji(data.career.score)}  💰 金運 ${scoreToEmoji(data.money.score)}`,
    '',
    `"${advice}"`,
    '',
    `🍀 ${data.luckyNumber} · ${color} · ${time}`,
    `🔮 ${SITE_URL}/ja/horoscope/daily/${sign}`,
    `#今日の運勢 #星座占い #${meta.en}`,
  ].join('\n');
}

function formatTweetEs(sign: SignId, data: HoroscopeApiResponse['data']): string {
  const meta = SIGN_META[sign];
  const adviceText = data.advice.es ?? data.advice.en;
  const advice = adviceText.length > 80 ? adviceText.slice(0, 78) + '…' : adviceText;
  const color = translateColor(data.luckyColor, 'es');
  const time  = translateTime(data.luckyTime, 'es');

  return [
    `${meta.symbol} #${meta.es} Horóscopo de Hoy`,
    '',
    `⭐ General ${scoreToEmoji(data.overall.score)}  ❤️ Amor ${scoreToEmoji(data.love.score)}`,
    `💼 Trabajo ${scoreToEmoji(data.career.score)}  💰 Dinero ${scoreToEmoji(data.money.score)}`,
    '',
    `"${advice}"`,
    '',
    `🍀 ${data.luckyNumber} · ${color} · ${time}`,
    `🔮 ${SITE_URL}/es/horoscope/daily/${sign}`,
    `#HoroscopoDeHoy #Zodiaco #${meta.en}`,
  ].join('\n');
}

function formatTweet(sign: SignId, data: HoroscopeApiResponse['data']): string {
  switch (LOCALE) {
    case 'zh': return formatTweetZh(sign, data);
    case 'ja': return formatTweetJa(sign, data);
    case 'es': return formatTweetEs(sign, data);
    case 'en': return formatTweetEn(sign, data);
    default:   return formatTweetKo(sign, data);
  }
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

const LOCALE_LABELS: Record<string, string> = {
  ko: '🇰🇷 한국어',
  ja: '🇯🇵 日本語',
  zh: '🇨🇳 中文',
  en: '🌐 English',
  es: '🇲🇽 Español',
};

async function main() {
  const today = new Date().toLocaleDateString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const langLabel = LOCALE_LABELS[LOCALE] ?? LOCALE;
  console.log(`\n🌟 오늘의 운세 X 포스팅 시작 — ${today} [${langLabel}]`);
  console.log(`   대상: 12개 별자리  |  API: ${SITE_URL}\n`);

  const isDryRun = process.env.X_DRY_RUN === 'true';
  if (isDryRun) console.log('⚠️  DRY RUN 모드 — 실제 포스팅 안 함\n');

  const client = isDryRun ? null : createXClient();

  let successCount = 0;
  let failCount = 0;

  for (const sign of SIGNS) {
    const meta = SIGN_META[sign];
    try {
      const data = await fetchHoroscope(sign);
      const tweetText = formatTweet(sign, data);

      if (isDryRun) {
        const label = (meta as Record<string, string>)[LOCALE] ?? meta.en;
        console.log(`─── ${meta.symbol} ${label} ────────────────────`);
        console.log(tweetText);
        console.log(`(${tweetText.length}자)\n`);
      } else {
        await client!.v2.tweet(tweetText);
        const label = (meta as Record<string, string>)[LOCALE] ?? meta.en;
        console.log(`  ✓ ${meta.symbol} ${label} 포스팅 완료`);
        successCount++;
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

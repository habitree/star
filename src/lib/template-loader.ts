/**
 * Template Loader — Supabase 기반 데이터 외부화
 *
 * 런타임(Cloudflare Workers): Supabase에서 4개 테이블 로드 (1회 병렬 fetch, 이후 캐시)
 *   - sign_templates (12개 별자리, id TEXT PK)
 *   - element_templates (4개 원소, id TEXT PK)
 *   - tarot_cards (22장, id SMALLINT PK 0~21 — 정규화 스키마)
 *   - compatibility (144개 조합, (sign1, sign2) 복합 PK — 정규화 스키마)
 * 빌드 타임(SSG / Supabase 미설정): 빈 객체 반환 → generator가 bundled 데이터로 자동 폴백
 *
 * Workers module-level 캐시: TTL 6시간, 만료 시 재fetch
 * content_versions 테이블로 데이터 변경 감지 → 조기 캐시 무효화 지원
 */

import type { SignTemplates } from '@/data/sign-templates/types';
import type { ElementTemplates } from '@/data/element-templates';
import type { TarotCardData } from '@/data/tarot-data';
import type { CompatibilityData } from '@/data/compatibility-data';
import { createReadSupabaseClient } from '@/lib/supabase';
import type { TemplateData } from '@/lib/horoscope-generator';

export type { TemplateData };

/** Workers module-level 캐시 TTL: 6시간 */
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

/** Workers module-level 캐시 */
let cachedData: TemplateData | null = null;

/** 빈 템플릿 데이터 (폴백용) */
function emptyTemplateData(): TemplateData {
  return {
    signTemplates: {} as Record<string, SignTemplates>,
    elementTemplates: {} as Record<string, ElementTemplates>,
    tarotCards: [],
    compatibility: [],
    _cachedAt: Date.now(),
  };
}

/**
 * 템플릿 데이터 로드
 *
 * - Supabase 설정 있으면: DB에서 로드 (정규화된 4개 테이블)
 * - Supabase 설정 없으면: 빈 템플릿 반환
 *   → horoscope-generator가 bundled 데이터로 자동 폴백
 */
export async function loadTemplates(): Promise<TemplateData> {
  const now = Date.now();
  if (cachedData && cachedData._cachedAt && now - cachedData._cachedAt < CACHE_TTL_MS) {
    return cachedData;
  }

  const supabase = createReadSupabaseClient();
  if (!supabase) {
    cachedData = emptyTemplateData();
    return cachedData;
  }

  try {
    const [
      { data: signRows, error: signErr },
      { data: elementRows, error: elementErr },
      { data: tarotRows, error: tarotErr },
      { data: compatRows, error: compatErr },
    ] = await Promise.all([
      supabase.from('sign_templates').select('id, data'),
      supabase.from('element_templates').select('id, data'),
      // 정규화 스키마: 22개 개별 행 (id SMALLINT 0~21)
      supabase.from('tarot_cards').select('id, symbol, image_url, name, meaning, reversed, advice').order('id'),
      // 정규화 스키마: 144개 개별 행 ((sign1, sign2) PK)
      supabase.from('compatibility').select('sign1, sign2, overall, love, friendship, work, advice'),
    ]);

    if (signErr || elementErr) {
      console.error('[template-loader] sign/element 로드 오류:', signErr ?? elementErr);
      cachedData = emptyTemplateData();
      return cachedData;
    }

    const signTemplates: Record<string, SignTemplates> = {};
    for (const row of signRows ?? []) {
      signTemplates[row.id] = row.data as SignTemplates;
    }

    const elementTemplates: Record<string, ElementTemplates> = {};
    for (const row of elementRows ?? []) {
      elementTemplates[row.id] = row.data as ElementTemplates;
    }

    // 타로 카드: 정규화 스키마 행 → TarotCardData 매핑
    let tarotCards: TarotCardData[] = [];
    if (tarotErr) {
      console.warn('[template-loader] tarot_cards 로드 오류 (bundled 폴백):', tarotErr.message);
    } else if (tarotRows && tarotRows.length > 0) {
      tarotCards = tarotRows.map((row) => ({
        id: row.id as number,
        symbol: row.symbol as string,
        imageUrl: row.image_url as string,
        name: row.name as string,
        meaning: row.meaning as string,
        reversed: row.reversed as string,
        advice: row.advice as string,
      }));
    }

    // 궁합: 정규화 스키마 행 → CompatibilityData 매핑
    let compatibility: CompatibilityData[] = [];
    if (compatErr) {
      console.warn('[template-loader] compatibility 로드 오류 (bundled 폴백):', compatErr.message);
    } else if (compatRows && compatRows.length > 0) {
      compatibility = compatRows as unknown as CompatibilityData[];
    }

    cachedData = { signTemplates, elementTemplates, tarotCards, compatibility, _cachedAt: now };
  } catch (err) {
    console.error('[template-loader] 예상치 못한 오류:', err);
    cachedData = emptyTemplateData();
  }

  return cachedData!;
}

/**
 * 로드된 궁합 매트릭스 반환 (compatibility API route 전용)
 * loadTemplates() 호출 후 사용하세요.
 */
export function getCachedCompatibility(): CompatibilityData[] | null {
  const data = cachedData?.compatibility;
  if (!data || data.length === 0) return null;
  return data;
}

/** 캐시 초기화 (테스트 또는 개발 환경 hot reload 시 사용) */
export function clearTemplateCache(): void {
  cachedData = null;
}

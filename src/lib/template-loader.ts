/**
 * Template Loader — Supabase 기반 데이터 외부화
 *
 * 런타임(Cloudflare Workers): Supabase에서 4개 테이블 로드 (1회 병렬 fetch, 이후 캐시)
 *   - sign_templates (12개 별자리)
 *   - element_templates (4개 원소)
 *   - tarot_cards (22장 메이저 아르카나)
 *   - compatibility (144개 궁합 매트릭스)
 * 빌드 타임(SSG / Supabase 미설정): 빈 객체 반환 → generator가 bundled 데이터로 자동 폴백
 *
 * Workers module-level 캐시: TTL 6시간, 만료 시 재fetch
 */

import type { SignTemplates } from '@/data/sign-templates/types';
import type { ElementTemplates } from '@/data/element-templates';
import type { TarotCardData } from '@/data/tarot-data';
import type { CompatibilityData } from '@/data/compatibility-data';
import { createServerSupabaseClient } from '@/lib/supabase';
import type { TemplateData } from '@/lib/horoscope-generator';

export type { TemplateData };

/** Workers module-level 캐시 TTL: 6시간 */
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

/** Workers module-level 캐시 (instance 재사용 시 반복 fetch 방지, TTL 만료 시 재fetch) */
let cachedData: TemplateData | null = null;

/** 빈 템플릿 데이터 (폴백용) */
function emptyTemplateData(): TemplateData {
  return {
    signTemplates: {} as Record<string, SignTemplates>,
    elementTemplates: {} as Record<string, ElementTemplates>,
    tarotCards: [],
    _cachedAt: Date.now(),
  };
}

/**
 * 템플릿 데이터 로드
 *
 * - Supabase 설정 있으면: DB에서 로드 (sign_templates, element_templates 테이블)
 * - Supabase 설정 없으면: 빈 템플릿 반환
 *   → horoscope-generator가 generic horoscope-templates로 자동 폴백
 */
export async function loadTemplates(): Promise<TemplateData> {
  const now = Date.now();
  if (cachedData && cachedData._cachedAt && now - cachedData._cachedAt < CACHE_TTL_MS) {
    return cachedData;
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    // Supabase 미설정 (환경변수 없음) — 빈 템플릿 반환
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
      supabase.from('tarot_cards').select('id, data').eq('id', 'major_arcana').maybeSingle(),
      supabase.from('compatibility').select('id, data').eq('id', 'matrix').maybeSingle(),
    ]);

    if (signErr || elementErr) {
      console.error('[template-loader] Supabase 로드 오류:', signErr ?? elementErr);
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

    if (tarotErr) {
      console.warn('[template-loader] tarot_cards 로드 오류 (bundled 폴백 사용):', tarotErr);
    }
    const tarotCards: TarotCardData[] =
      !tarotErr && tarotRows?.data ? (tarotRows.data as TarotCardData[]) : [];

    if (compatErr) {
      console.warn('[template-loader] compatibility 로드 오류 (bundled 폴백 사용):', compatErr);
    }
    const compatibility: CompatibilityData[] | undefined =
      !compatErr && compatRows?.data ? (compatRows.data as CompatibilityData[]) : undefined;

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
  return cachedData?.compatibility ?? null;
}

/** 캐시 초기화 (테스트 또는 개발 환경 hot reload 시 사용) */
export function clearTemplateCache(): void {
  cachedData = null;
}

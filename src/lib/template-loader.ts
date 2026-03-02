/**
 * Template Loader — Supabase 기반 데이터 외부화
 *
 * 런타임(Cloudflare Workers): Supabase에서 sign-templates, element-templates 로드
 * 빌드 타임(SSG / Supabase 미설정): 빈 객체 반환 → generator가 generic 템플릿으로 폴백
 *
 * Workers module-level 캐시: instance 재사용 시 Supabase 재호출 방지
 */

import type { SignTemplates } from '@/data/sign-templates/types';
import type { ElementTemplates } from '@/data/element-templates';
import { createServerSupabaseClient } from '@/lib/supabase';
import type { TemplateData } from '@/lib/horoscope-generator';

export type { TemplateData };

/** Workers module-level 캐시 (instance 재사용 시 반복 fetch 방지) */
let cachedData: TemplateData | null = null;

/** 빈 템플릿 데이터 (폴백용) */
function emptyTemplateData(): TemplateData {
  return {
    signTemplates: {} as Record<string, SignTemplates>,
    elementTemplates: {} as Record<string, ElementTemplates>,
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
  if (cachedData) return cachedData;

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    // Supabase 미설정 (환경변수 없음) — 빈 템플릿 반환
    cachedData = emptyTemplateData();
    return cachedData;
  }

  try {
    const [{ data: signRows, error: signErr }, { data: elementRows, error: elementErr }] =
      await Promise.all([
        supabase.from('sign_templates').select('id, data'),
        supabase.from('element_templates').select('id, data'),
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

    cachedData = {
      signTemplates,
      elementTemplates,
    };
  } catch (err) {
    console.error('[template-loader] 예상치 못한 오류:', err);
    cachedData = emptyTemplateData();
  }

  return cachedData!;
}

/** 캐시 초기화 (테스트 또는 개발 환경 hot reload 시 사용) */
export function clearTemplateCache(): void {
  cachedData = null;
}

/**
 * 템플릿 동적 로딩 모듈
 * JSON 파일에서 템플릿을 로드하고 캐시합니다.
 */

import type { LocalizedText, HoroscopeCategory } from '@/types';
import { TemplateLoadError } from '@/lib/errors';

// 캐시 타입 정의
type Element = 'fire' | 'earth' | 'air' | 'water';

interface CategoryTemplate {
  high: LocalizedText[];
  medium: LocalizedText[];
  low: LocalizedText[];
}

interface HoroscopeTemplates {
  overall: CategoryTemplate;
  love: CategoryTemplate;
  career: CategoryTemplate;
  health: CategoryTemplate;
  money: CategoryTemplate;
}

interface CommonTemplates {
  luckyColors: LocalizedText[];
  elementLuckyColors: Record<Element, LocalizedText[]>;
  luckyTimes: LocalizedText[];
  dayNames: LocalizedText[];
  adviceTemplates: LocalizedText[];
  weeklyHighlightTemplates: LocalizedText[];
  monthlyHighlightTemplates: LocalizedText[];
}

// 메모리 캐시
const templateCache: {
  categories: Map<HoroscopeCategory, CategoryTemplate>;
  elements: Map<Element, HoroscopeTemplates>;
  common: CommonTemplates | null;
  lastUpdated: number;
} = {
  categories: new Map(),
  elements: new Map(),
  common: null,
  lastUpdated: 0,
};

// 캐시 TTL (1시간)
const CACHE_TTL = 60 * 60 * 1000;

// 기본 URL (서버 사이드에서는 상대 경로 사용 불가)
function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  // 서버 사이드에서는 환경 변수 또는 기본값 사용
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
}

/**
 * 캐시 유효성 검사
 */
function isCacheValid(): boolean {
  return Date.now() - templateCache.lastUpdated < CACHE_TTL;
}

/**
 * 캐시 무효화
 */
export function invalidateCache(): void {
  templateCache.categories.clear();
  templateCache.elements.clear();
  templateCache.common = null;
  templateCache.lastUpdated = 0;
}

/**
 * JSON 파일 로드 (fallback 포함)
 */
async function loadJson<T>(path: string): Promise<T> {
  try {
    // 서버 사이드에서 직접 파일 읽기 시도
    if (typeof window === 'undefined') {
      try {
        const fs = await import('fs/promises');
        const pathModule = await import('path');
        const filePath = pathModule.join(process.cwd(), 'public', path);
        const content = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(content) as T;
      } catch {
        // 파일 읽기 실패 시 fetch로 폴백
      }
    }

    // fetch 사용
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}${path}`, {
      next: { revalidate: 3600 }, // 1시간 캐시
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    throw new TemplateLoadError(
      `Failed to load template from ${path}`,
      { path, error: error instanceof Error ? error.message : String(error) }
    );
  }
}

/**
 * 카테고리별 템플릿 로드
 */
export async function loadCategoryTemplate(
  category: HoroscopeCategory
): Promise<CategoryTemplate> {
  // 캐시 확인
  if (isCacheValid() && templateCache.categories.has(category)) {
    return templateCache.categories.get(category)!;
  }

  const template = await loadJson<CategoryTemplate>(
    `/data/templates/${category}.json`
  );

  templateCache.categories.set(category, template);
  templateCache.lastUpdated = Date.now();

  return template;
}

/**
 * 원소별 템플릿 로드
 */
export async function loadElementTemplate(
  element: Element
): Promise<HoroscopeTemplates> {
  // 캐시 확인
  if (isCacheValid() && templateCache.elements.has(element)) {
    return templateCache.elements.get(element)!;
  }

  const template = await loadJson<HoroscopeTemplates>(
    `/data/templates/elements/${element}.json`
  );

  templateCache.elements.set(element, template);
  templateCache.lastUpdated = Date.now();

  return template;
}

/**
 * 공통 템플릿 로드
 */
export async function loadCommonTemplates(): Promise<CommonTemplates> {
  // 캐시 확인
  if (isCacheValid() && templateCache.common) {
    return templateCache.common;
  }

  const template = await loadJson<CommonTemplates>(
    '/data/templates/common.json'
  );

  templateCache.common = template;
  templateCache.lastUpdated = Date.now();

  return template;
}

/**
 * 모든 카테고리 템플릿 로드 (병렬)
 */
export async function loadAllCategoryTemplates(): Promise<HoroscopeTemplates> {
  const categories: HoroscopeCategory[] = ['overall', 'love', 'career', 'health', 'money'];

  const results = await Promise.all(
    categories.map(cat => loadCategoryTemplate(cat))
  );

  return {
    overall: results[0],
    love: results[1],
    career: results[2],
    health: results[3],
    money: results[4],
  };
}

/**
 * 모든 원소 템플릿 로드 (병렬)
 */
export async function loadAllElementTemplates(): Promise<Record<Element, HoroscopeTemplates>> {
  const elements: Element[] = ['fire', 'earth', 'air', 'water'];

  const results = await Promise.all(
    elements.map(el => loadElementTemplate(el))
  );

  return {
    fire: results[0],
    earth: results[1],
    air: results[2],
    water: results[3],
  };
}

/**
 * 필요한 모든 템플릿 프리로드
 */
export async function preloadAllTemplates(): Promise<void> {
  await Promise.all([
    loadAllCategoryTemplates(),
    loadAllElementTemplates(),
    loadCommonTemplates(),
  ]);
}

// 기존 코드와의 호환성을 위한 동기적 접근자
// 주의: 이 함수들은 캐시가 로드된 후에만 정상 동작합니다

export function getCachedCategoryTemplate(
  category: HoroscopeCategory
): CategoryTemplate | null {
  return templateCache.categories.get(category) || null;
}

export function getCachedElementTemplate(
  element: Element
): HoroscopeTemplates | null {
  return templateCache.elements.get(element) || null;
}

export function getCachedCommonTemplates(): CommonTemplates | null {
  return templateCache.common;
}

// 캐시 상태 확인
export function getCacheStatus(): {
  isValid: boolean;
  categoriesLoaded: HoroscopeCategory[];
  elementsLoaded: Element[];
  commonLoaded: boolean;
  lastUpdated: number;
} {
  return {
    isValid: isCacheValid(),
    categoriesLoaded: Array.from(templateCache.categories.keys()),
    elementsLoaded: Array.from(templateCache.elements.keys()),
    commonLoaded: templateCache.common !== null,
    lastUpdated: templateCache.lastUpdated,
  };
}

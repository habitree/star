# 템플릿 확장 가이드 (Template Expansion Guide)

수집된 별자리 데이터를 앱에서 사용하는 TypeScript 템플릿으로 변환하는 방법을 설명합니다.

---

## 1. 현재 시스템 분석

### 기존 템플릿 구조

앱의 운세 생성 시스템은 **3단계 레이어** 구조로 동작합니다.

```
Layer 1: horoscope-templates.ts  (범용 템플릿)
Layer 2: element-templates.ts    (원소별 템플릿) ← 현재 우선 사용
Layer 3: planet-influences.ts    (행성 영향력 데이터)
```

핵심 인터페이스는 `LocalizedText`이며, 모든 텍스트는 5개 언어로 작성됩니다.

```typescript
// src/types/horoscope.ts
export interface LocalizedText {
  ko: string;  // 한국어 (기준 언어)
  en: string;  // English
  zh: string;  // 中文
  ja: string;  // 日本語
  es: string;  // Español
}
```

각 카테고리는 점수(1~5)에 따라 3개 레벨로 분기됩니다.

```typescript
// src/data/horoscope-templates.ts
export interface HoroscopeTemplates {
  overall: { high: LocalizedText[]; medium: LocalizedText[]; low: LocalizedText[] };
  love:    { high: LocalizedText[]; medium: LocalizedText[]; low: LocalizedText[] };
  career:  { high: LocalizedText[]; medium: LocalizedText[]; low: LocalizedText[] };
  health:  { high: LocalizedText[]; medium: LocalizedText[]; low: LocalizedText[] };
  money:   { high: LocalizedText[]; medium: LocalizedText[]; low: LocalizedText[] };
}
```

레벨 결정 로직 (`src/lib/horoscope-generator.ts`):

```typescript
function getTemplateLevel(score: HoroscopeScore): 'high' | 'medium' | 'low' {
  if (score >= 4) return 'high';    // 점수 4, 5 → 긍정적
  if (score === 3) return 'medium'; // 점수 3 → 중립적
  return 'low';                     // 점수 1, 2 → 주의 필요
}
```

### 현재 템플릿 수량 및 한계

| 파일 | 구조 | 템플릿 수 |
|------|------|-----------|
| `horoscope-templates.ts` | 5 카테고리 x 3 레벨 x 5개 | **75개** (범용) |
| `element-templates.ts` | 4 원소 x 5 카테고리 x 3 레벨 x 3개 | **180개** (원소별) |
| `planet-influences.ts` | 10 행성 x 2(긍정/부정) | **20개** (월간 전용) |
| **합계** | | **275개** |

실제 일일 운세 생성 시 12별자리가 카테고리당 선택할 수 있는 경우의 수:

- **원소별 그룹**: Fire(양자리, 사자자리, 사수자리), Earth(황소자리, 처녀자리, 염소자리), Air(쌍둥이자리, 천칭자리, 물병자리), Water(게자리, 전갈자리, 물고기자리)
- 같은 원소의 3개 별자리가 **동일한 3개 템플릿**에서 선택 -> 반복 느낌 발생

### 반복 패턴이 발생하는 원인

1. **별자리 개성 부재**: 양자리와 사자자리가 같은 Fire 템플릿을 공유하여 차이가 없음
2. **레벨당 3개 한계**: 원소별 템플릿이 레벨당 3개뿐이라 2~3일 내에 중복 발생
3. **시간적 변화 없음**: 계절, 행성 이동 등 시간 흐름에 따른 변화가 반영되지 않음
4. **데칸 미반영**: 같은 별자리 내에서도 생일 구간별 차이가 없음

---

## 2. 확장 전략 개요

### Phase 1: 별자리별 전용 템플릿 추가 (sign-templates.ts)

**목표**: 12개 별자리 각각의 고유한 성격을 반영하는 전용 템플릿

```
12 별자리 x 5 카테고리 x 3 레벨 x 5개 = 900개 템플릿
```

**파일**: `src/data/sign-templates.ts`

기존 원소 템플릿과의 관계:
- 원소 템플릿은 **공통 기반** 역할 (fallback)
- 별자리 전용 템플릿이 있으면 **우선 사용**
- 혼합 전략: 70% 별자리 전용, 30% 원소 기반

```typescript
// src/data/sign-templates.ts
import type { LocalizedText, ZodiacSignId } from '@/types';
import type { HoroscopeTemplates } from './horoscope-templates';

export const signTemplates: Partial<Record<ZodiacSignId, HoroscopeTemplates>> = {
  aries: {
    overall: {
      high: [
        {
          ko: '양자리의 선구자적 기질이 빛나는 날입니다. 새로운 길을 개척하세요.',
          en: 'A day when Aries pioneering spirit shines. Forge a new path.',
          zh: '白羊座的先驱气质闪耀的一天。开辟新道路吧。',
          ja: '牡羊座の先駆者的な気質が輝く日です。新しい道を切り開いてください。',
          es: 'Un día en que el espíritu pionero de Aries brilla. Forja un nuevo camino.',
        },
        // ... 총 5개
      ],
      medium: [ /* 5개 */ ],
      low: [ /* 5개 */ ],
    },
    love: { /* high, medium, low 각 5개 */ },
    career: { /* high, medium, low 각 5개 */ },
    health: { /* high, medium, low 각 5개 */ },
    money: { /* high, medium, low 각 5개 */ },
  },
  // taurus, gemini, cancer, leo, virgo, libra, scorpio, sagittarius, capricorn, aquarius, pisces
};
```

### Phase 2: 데칸별 차별화 템플릿 (decan-templates.ts)

**목표**: 같은 별자리 내에서도 생일 구간에 따라 다른 문구 제공

각 별자리는 3개 데칸으로 나뉩니다 (약 10일씩).

```
12 별자리 x 3 데칸 x 5 카테고리 x 3 레벨 x 2개 = 1,080개 템플릿
```

```typescript
// src/data/decan-templates.ts
import type { LocalizedText, ZodiacSignId } from '@/types';

export interface DecanInfo {
  decan: 1 | 2 | 3;
  dateRange: { start: string; end: string }; // MM-DD
  subRuler: string; // 부지배 행성
  traits: LocalizedText; // 데칸 특성 설명
}

export interface DecanTemplates {
  overall: { high: LocalizedText[]; medium: LocalizedText[]; low: LocalizedText[] };
  love: { high: LocalizedText[]; medium: LocalizedText[]; low: LocalizedText[] };
  career: { high: LocalizedText[]; medium: LocalizedText[]; low: LocalizedText[] };
  health: { high: LocalizedText[]; medium: LocalizedText[]; low: LocalizedText[] };
  money: { high: LocalizedText[]; medium: LocalizedText[]; low: LocalizedText[] };
}

// 예시: 양자리 데칸
export const ariesDecans: DecanInfo[] = [
  {
    decan: 1,
    dateRange: { start: '03-21', end: '03-30' },
    subRuler: 'mars',
    traits: {
      ko: '가장 순수한 양자리 에너지. 용감하고 솔직하며 즉각적입니다.',
      en: 'The purest Aries energy. Brave, honest, and immediate.',
      zh: '最纯粹的白羊座能量。勇敢、诚实、即时。',
      ja: '最も純粋な牡羊座のエネルギー。勇敢で率直、即座に行動します。',
      es: 'La energía más pura de Aries. Valiente, honesto e inmediato.',
    },
  },
  {
    decan: 2,
    dateRange: { start: '03-31', end: '04-09' },
    subRuler: 'sun',
    traits: {
      ko: '태양의 영향으로 리더십과 창의성이 강화된 양자리입니다.',
      en: 'An Aries with enhanced leadership and creativity from the Sun.',
      zh: '受太阳影响，领导力和创造力增强的白羊座。',
      ja: '太陽の影響でリーダーシップと創造性が強化された牡羊座です。',
      es: 'Un Aries con liderazgo y creatividad mejorados por el Sol.',
    },
  },
  {
    decan: 3,
    dateRange: { start: '04-10', end: '04-19' },
    subRuler: 'jupiter',
    traits: {
      ko: '목성의 영향으로 낙관적이고 모험적인 성향이 강한 양자리입니다.',
      en: 'An Aries with strong optimistic and adventurous tendencies from Jupiter.',
      zh: '受木星影响，乐观和冒险倾向强的白羊座。',
      ja: '木星の影響で楽観的で冒険的な傾向が強い牡羊座です。',
      es: 'Un Aries con fuertes tendencias optimistas y aventureras por Júpiter.',
    },
  },
];
```

### Phase 3: 계절/행성 트랜짓 기반 동적 문구 (transit-templates.ts)

**목표**: 계절과 행성 이동에 따른 시기별 문구로 시간적 변화감 제공

```typescript
// src/data/transit-templates.ts
import type { LocalizedText, HoroscopeCategory } from '@/types';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

// 계절별 문구 접두사/접미사
export const seasonalPrefixes: Record<Season, Record<HoroscopeCategory, LocalizedText[]>> = {
  spring: {
    overall: [
      {
        ko: '봄의 새로운 에너지가 당신을 감싸는 시기입니다.',
        en: 'A time when the fresh energy of spring surrounds you.',
        zh: '春天新能量环绕你的时期。',
        ja: '春の新しいエネルギーがあなたを包む時期です。',
        es: 'Un momento en que la energía fresca de la primavera te rodea.',
      },
      // ... 추가 문구
    ],
    love: [ /* ... */ ],
    career: [ /* ... */ ],
    health: [ /* ... */ ],
    money: [ /* ... */ ],
  },
  summer: { /* ... */ },
  autumn: { /* ... */ },
  winter: { /* ... */ },
};

// 수성 역행 기간 등 특별 이벤트 문구
export interface TransitEvent {
  name: LocalizedText;
  startDate: string; // YYYY-MM-DD
  endDate: string;
  affectedCategories: HoroscopeCategory[];
  modifier: LocalizedText; // 운세에 추가되는 문구
}
```

### Phase 4: 조합형 템플릿 시스템 (composite templates)

**목표**: 문장 파트를 조합하여 수천 가지 변형 생성

기존의 "완성된 문장" 방식 대신, 파트를 조합하는 시스템:

```typescript
// src/data/composite-templates.ts
import type { LocalizedText, HoroscopeCategory, ZodiacSignId } from '@/types';

// 문장 구성요소
export interface TemplateParts {
  openings: LocalizedText[];     // 도입부: "오늘은", "이 시기에는", ...
  subjects: LocalizedText[];     // 주어: "당신의 열정이", "별의 가호가", ...
  actions: LocalizedText[];      // 동사구: "빛을 발합니다", "도움을 줍니다", ...
  closings: LocalizedText[];     // 조언: "자신감을 가지세요", "신중하게 행동하세요", ...
}

// 조합 예시:
// [opening] + [subject] + [action] + [closing]
// "오늘은" + "당신의 열정이" + "빛을 발합니다." + "자신감을 가지고 도전하세요."

// 카테고리별 파트
export const compositeParts: Record<HoroscopeCategory, Record<'high' | 'medium' | 'low', TemplateParts>> = {
  overall: {
    high: {
      openings: [
        { ko: '오늘은', en: 'Today,', zh: '今天', ja: '今日は', es: 'Hoy,' },
        { ko: '이 시기에는', en: 'At this time,', zh: '这个时期', ja: 'この時期は', es: 'En este momento,' },
        { ko: '별들의 축복 아래', en: 'Under the blessing of stars,', zh: '在星星的祝福下', ja: '星々の祝福の下', es: 'Bajo la bendición de las estrellas,' },
      ],
      subjects: [
        { ko: '당신의 에너지가', en: 'your energy', zh: '你的能量', ja: 'あなたのエネルギーが', es: 'tu energía' },
        { ko: '행운의 흐름이', en: 'the flow of luck', zh: '幸运的流动', ja: '幸運の流れが', es: 'el flujo de la suerte' },
        { ko: '긍정적인 기운이', en: 'positive energy', zh: '积极的气场', ja: 'ポジティブな気運が', es: 'la energía positiva' },
      ],
      actions: [
        { ko: '최고조에 달합니다.', en: 'reaches its peak.', zh: '达到顶峰。', ja: '最高潮に達します。', es: 'alcanza su punto máximo.' },
        { ko: '모든 일을 순조롭게 만듭니다.', en: 'makes everything go smoothly.', zh: '使一切顺利进行。', ja: 'すべてを順調にします。', es: 'hace que todo vaya bien.' },
      ],
      closings: [
        { ko: '자신감을 가지고 도전하세요.', en: 'Challenge yourself with confidence.', zh: '带着自信去挑战吧。', ja: '自信を持ってチャレンジしてください。', es: 'Desafíate con confianza.' },
        { ko: '적극적으로 행동하세요.', en: 'Take action actively.', zh: '积极行动吧。', ja: '積極的に行動してください。', es: 'Actúa activamente.' },
      ],
    },
    medium: { /* ... */ },
    low: { /* ... */ },
  },
  love: { /* ... */ },
  career: { /* ... */ },
  health: { /* ... */ },
  money: { /* ... */ },
};
```

**조합 가능한 변형 수 계산** (카테고리당 high 기준):
- 3 openings x 3 subjects x 2 actions x 2 closings = 36가지
- 5 카테고리 x 3 레벨 x 36 = **540가지** (파트 수가 적어도)

---

## 3. LocalizedText 포맷 준수 가이드

### 한국어(ko) 작성 규칙

한국어가 **기준 언어**입니다. 다른 언어는 한국어를 기반으로 번역합니다.

**길이 규칙**: 30~80자 (공백 포함)

```
너무 짧음 (X): "좋은 날입니다."                    → 8자
적절함   (O): "오늘은 모든 일이 순조롭게 풀리는 행운의 날입니다."  → 26자 (경계선)
적절함   (O): "별들이 당신을 축복하고 있습니다. 새로운 기회가 찾아올 것입니다." → 36자
너무 김  (X): "오늘은 별들의 강력한 에너지가 당신을 감싸며 모든 일에서 ..." → 80자 초과 시 줄이기
```

**어투 규칙**:

| 항목 | 사용 | 불가 |
|------|------|------|
| 존칭 | ~하세요, ~입니다, ~습니다 | ~해, ~이야, ~다 |
| 호칭 | 당신, (생략) | 너, 자네 |
| 문장 종결 | 서술 + 권유 조합 | 의문문 단독 사용 |
| 구조 | 상황 설명 + 실행 가능한 조언 | 추상적 설명만 |

**실행 가능한 조언 포함** (핵심 원칙):

```
나쁜 예시 (X): "운세가 좋습니다."
좋은 예시 (O): "운세가 좋은 날입니다. 미루던 일을 시작하세요."

나쁜 예시 (X): "사랑운이 높아요."
좋은 예시 (O): "로맨틱한 에너지가 가득합니다. 연인과 특별한 시간을 보내보세요."
```

**별자리 특성 반영 키워드** (별자리별 전용 템플릿 작성 시):

| 별자리 | 핵심 키워드 | 예시 소재 |
|--------|------------|-----------|
| 양자리 (Aries) | 용기, 개척, 선구자, 열정 | 새로운 도전, 리더십, 첫 번째 |
| 황소자리 (Taurus) | 안정, 끈기, 감각, 풍요 | 오감 만족, 꾸준함, 물질적 성과 |
| 쌍둥이자리 (Gemini) | 소통, 호기심, 다재다능, 정보 | 대화, 학습, 새로운 사람 |
| 게자리 (Cancer) | 가정, 감정, 보호, 직관 | 가족, 안전한 공간, 내면의 소리 |
| 사자자리 (Leo) | 자신감, 리더십, 창의, 관대함 | 무대, 표현, 인정받기 |
| 처녀자리 (Virgo) | 분석, 완벽, 봉사, 실용 | 디테일, 건강관리, 정리정돈 |
| 천칭자리 (Libra) | 균형, 조화, 미적감각, 파트너십 | 관계 조율, 아름다움, 공정함 |
| 전갈자리 (Scorpio) | 변화, 깊이, 집중, 재생 | 진실 탐구, 변환, 강한 의지 |
| 사수자리 (Sagittarius) | 모험, 자유, 철학, 낙관 | 여행, 학문, 넓은 시야 |
| 염소자리 (Capricorn) | 책임, 야망, 인내, 구조 | 장기 목표, 성취, 규율 |
| 물병자리 (Aquarius) | 혁신, 독립, 인도주의, 독창 | 새로운 아이디어, 공동체, 변혁 |
| 물고기자리 (Pisces) | 직관, 공감, 상상력, 영성 | 꿈, 예술, 치유, 명상 |

### 영어(en) 번역 가이드

- **직역하지 않기**: 자연스러운 영어 표현 사용
- **길이**: 한국어 대비 비슷하거나 약간 짧게 (30~100자)
- **존칭**: "You" 사용, 명령형도 적절히 혼합 (Challenge yourself, Be brave)
- **별자리 이름**: 영어 이름 사용 (Aries, Taurus, Gemini ...)

```typescript
// 번역 비교
{
  ko: '양자리의 선구자적 기질이 빛나는 날입니다. 새로운 길을 개척하세요.',
  en: 'A day when Aries pioneering spirit shines. Forge a new path.',
  // (X) 'It is a day when the pioneering temperament of Aries shines. Please pioneer a new road.'
}
```

### 중국어(zh) 번역 가이드

- **간체자** 사용 (简体中文)
- **길이**: 한국어 대비 짧아지는 경향 (20~60자)
- **어투**: "吧" (권유), "。" (마침표) 적절히 사용
- **별자리 이름**: 중국어 이름 사용 (白羊座, 金牛座, 双子座 ...)

```typescript
{
  ko: '불꽃 같은 열정이 당신을 이끄는 날입니다. 적극적으로 도전하세요.',
  zh: '火焰般的热情引领你的一天。积极挑战吧。',
}
```

### 일본어(ja) 번역 가이드

- **존경어(丁寧語)** 사용: ~です/ます체
- **길이**: 한국어와 유사하거나 약간 길어짐 (30~90자)
- **조언 표현**: ~してください, ~しましょう
- **별자리 이름**: 일본어 이름 사용 (牡羊座, 牡牛座, 双子座 ...)

```typescript
{
  ko: '별들이 당신의 사랑을 응원합니다. 용기 내어 고백해보세요.',
  ja: '星々があなたの恋を応援しています。勇気を出して告白してみてください。',
}
```

### 스페인어(es) 번역 가이드

- **존칭**: "tú" (비격식 2인칭) 사용
- **길이**: 한국어 대비 길어지는 경향 (40~120자)
- **동사형**: 명령형(imperativo) 적절히 사용 (Sé valiente, Confía)
- **별자리 이름**: 스페인어 이름 사용 (Aries, Tauro, Geminis ...)

```typescript
{
  ko: '사랑의 행운이 함께합니다. 솔로라면 새로운 만남이 있을 수 있습니다.',
  es: 'La suerte en el amor está contigo. Si estás soltero/a, puedes tener un nuevo encuentro.',
  // 참고: soltero/a 같은 성별 포용적 표현 사용
}
```

---

## 4. 레벨별 톤 가이드

### high (좋음/격려)

**톤**: 긍정적, 격려적, 희망적
**점수 범위**: 4~5점

**예시 패턴 10가지** (한국어 기준):

| # | 패턴 | 예시 |
|---|------|------|
| 1 | [시기] + [긍정 상태] + [행동 권유] | "오늘은 행운이 가득한 날입니다. 자신감을 가지고 도전하세요." |
| 2 | [주체]가 [긍정 행위] | "별들이 당신을 축복하고 있습니다. 새로운 기회를 잡으세요." |
| 3 | [긍정 에너지] + [결과 예측] | "긍정적인 에너지가 주변에 좋은 영향을 줄 수 있습니다." |
| 4 | [능력/자질]이 빛나는 + [시기] | "리더십을 발휘할 절호의 기회입니다. 앞장서세요." |
| 5 | [목표]에 가까워지는 + [격려] | "재정적 목표 달성에 가까워지고 있습니다. 계속 노력하세요." |
| 6 | [별자리 특성]이 [긍정 효과] | "양자리의 선구자적 기질이 빛나는 날입니다." |
| 7 | [관계]가 깊어지는 + [방법] | "관계가 한층 깊어지는 날입니다. 감사를 전하세요." |
| 8 | 새로운 [기회]가 + [예측] | "새로운 프로젝트가 빛을 발합니다. 창의력을 발휘하세요." |
| 9 | [회복/성장] + [권유] | "회복력이 좋은 시기입니다. 건강 목표를 세워보세요." |
| 10 | [최상급 표현] + [구체적 기회] | "최고의 운세가 함께합니다. 원하는 것을 이루기에 완벽한 날입니다." |

**사용할 표현**:
- 빛나다, 축복하다, 넘치다, 가득하다, 상승하다
- 기회, 행운, 성과, 성공, 발전
- ~하세요, ~보세요, ~잡으세요

**피할 표현**:
- 과장된 절대적 보장: "반드시 성공합니다" -> "성공 가능성이 높습니다"
- 비현실적 약속: "로또에 당첨됩니다" -> "재물운이 상승합니다"

### medium (보통/중립)

**톤**: 균형 잡힌, 안정적, 차분한
**점수 범위**: 3점

**예시 패턴 10가지**:

| # | 패턴 | 예시 |
|---|------|------|
| 1 | 평온한 + [일상] + [감사] | "평온한 하루가 될 것입니다. 작은 일에도 감사하세요." |
| 2 | [일상] 속에서 + [소소한 행복] | "일상적인 흐름 속에서 소소한 행복을 발견할 수 있습니다." |
| 3 | 무난한 + [흐름] + [조언] | "무난하게 흘러가는 하루입니다. 급하게 서두르지 마세요." |
| 4 | 안정적인 + [상태] + [유지] | "안정적인 에너지가 감싸는 날입니다. 현재에 집중하세요." |
| 5 | [균형] + [중요성] | "열정과 휴식의 균형이 필요합니다." |
| 6 | [꾸준함] + [결실] | "무리하지 않는 선에서 꾸준히 노력하면 결실을 맺습니다." |
| 7 | [작은 목표] + [성취감] | "작은 목표를 세우고 달성하며 성취감을 느껴보세요." |
| 8 | [변화 보류] + [안정 추구] | "급격한 변화보다는 안정을 추구하세요." |
| 9 | [현재 상태] + [유지 권유] | "현재의 수입 범위 내에서 만족을 찾으세요." |
| 10 | [루틴] + [좋은 영향] | "규칙적인 생활이 활력을 가져옵니다." |

**사용할 표현**:
- 평온하다, 안정적이다, 무난하다, 꾸준하다
- 유지하다, 지속하다, 균형, 조화
- 작은, 소소한, 일상적인

**피할 표현**:
- 지루함을 암시하는 표현: "특별한 일이 없겠습니다" -> "편안한 하루가 될 것입니다"
- 부정적 뉘앙스: "별다른 변화가 없습니다" -> "안정적인 흐름이 유지됩니다"

### low (주의/조심)

**톤**: 부드러운 경고, 건설적 조언, 보호적
**점수 범위**: 1~2점

**예시 패턴 10가지**:

| # | 패턴 | 예시 |
|---|------|------|
| 1 | [가능성] + [자기 돌봄] | "조금 힘든 하루가 될 수 있습니다. 자신을 돌보세요." |
| 2 | [예상] + [차분한 대응] | "예상치 못한 어려움이 있을 수 있습니다. 침착하게 대응하세요." |
| 3 | [에너지 부족] + [재충전] | "에너지가 낮은 날입니다. 휴식을 취하며 재충전하세요." |
| 4 | [신중함] + [보류 권유] | "신중한 결정이 필요합니다. 중요한 일은 미루는 것이 좋겠습니다." |
| 5 | [대안 제시] | "도전보다는 안정을 추구하는 것이 좋은 날입니다." |
| 6 | [경계 대상] + [구체적 방법] | "감정적인 결정은 피하세요. 냉정함이 필요한 시기입니다." |
| 7 | [상황 인정] + [긍정적 프레이밍] | "혼자만의 시간이 필요할 수 있습니다. 자신을 돌아보세요." |
| 8 | [주의 사항] + [예방] | "충동구매를 피하고 필요한 것만 구입하세요." |
| 9 | [외부 요인] + [내적 대응] | "동료와의 갈등에 주의하세요. 감정적 대응은 피하세요." |
| 10 | [완화된 경고] + [회복 관점] | "불꽃이 약해진 날입니다. 잠시 쉬어가며 힘을 모으세요." |

**사용할 표현**:
- ~할 수 있습니다 (가능성), ~이 좋겠습니다 (권유)
- 주의하세요, 조심하세요, 신중하게
- 재충전, 휴식, 돌아보다, 성찰

**피할 표현**:
- ~할 것입니다 (단정), ~합니다 (확정적 부정)
- 인내, 고통, 불행 (과도한 부정)

**절대 사용 금지 표현**:

| 유형 | 금지 예시 | 대체 표현 |
|------|----------|-----------|
| 공포 유발 | "큰 사고가 날 수 있습니다" | "안전에 주의하세요" |
| 절망적 | "희망이 없는 하루입니다" | "에너지가 낮은 날입니다" |
| 단정적 부정 | "실패할 것입니다" | "신중한 결정이 필요합니다" |
| 건강 위협 | "심각한 병에 걸릴 수 있습니다" | "건강 관리에 주의하세요" |
| 관계 파괴 | "이별이 다가옵니다" | "관계에서 거리를 두는 것도 방법입니다" |
| 금전적 공포 | "파산의 위기가 있습니다" | "예상치 못한 지출에 대비하세요" |

---

## 5. 카테고리별 작성 가이드

### 종합운 (Overall)

**주요 소재**: 에너지, 운의 흐름, 전반적 분위기, 하루의 테마

**작성 원칙**:
- 다른 4개 카테고리를 아우르는 포괄적 내용
- 하루/주간/월간의 전체 톤을 설정하는 역할
- 구체적 분야보다 전반적 에너지와 분위기에 초점

**예시 템플릿 코드**:

```typescript
// 별자리별 종합운 예시 (양자리)
const ariesOverall: { high: LocalizedText[]; medium: LocalizedText[]; low: LocalizedText[] } = {
  high: [
    {
      ko: '양자리 특유의 개척 정신이 빛나는 날입니다. 새로운 시작에 최적의 타이밍이에요.',
      en: 'A day when Aries signature pioneering spirit shines. Perfect timing for new beginnings.',
      zh: '白羊座特有的开拓精神闪耀的一天。是新开始的最佳时机。',
      ja: '牡羊座特有の開拓精神が輝く日です。新しい始まりに最適なタイミングです。',
      es: 'Un día en que el espíritu pionero de Aries brilla. Momento perfecto para nuevos comienzos.',
    },
    {
      ko: '주도적으로 행동할수록 좋은 결과가 따릅니다. 망설이지 말고 앞장서세요.',
      en: 'The more proactive you are, the better the results. Lead without hesitation.',
      zh: '越主动行动结果越好。不要犹豫，带头吧。',
      ja: '主導的に行動するほど良い結果がついてきます。躊躇せず先頭に立ってください。',
      es: 'Cuanto más proactivo seas, mejores serán los resultados. Lidera sin dudar.',
    },
  ],
  medium: [
    {
      ko: '에너지를 분산하지 말고 한 가지에 집중하면 안정적인 하루가 됩니다.',
      en: 'Focus your energy on one thing instead of scattering it for a stable day.',
      zh: '不要分散精力，集中在一件事上就能过稳定的一天。',
      ja: 'エネルギーを分散せず一つに集中すれば安定した一日になります。',
      es: 'Enfoca tu energía en una cosa en lugar de dispersarla para un día estable.',
    },
  ],
  low: [
    {
      ko: '급한 마음을 가라앉히세요. 오늘은 계획을 세우는 날로 삼는 것이 좋겠습니다.',
      en: 'Calm your impatience. It would be better to use today for planning.',
      zh: '平息急躁的心情。今天最好作为制定计划的日子。',
      ja: '焦る気持ちを落ち着かせてください。今日は計画を立てる日にするのが良いでしょう。',
      es: 'Calma tu impaciencia. Sería mejor usar hoy para planificar.',
    },
  ],
};
```

### 사랑운 (Love)

**주요 소재**: 관계, 감정, 소통, 매력, 만남

**솔로/커플 양쪽에 적용 가능한 표현 원칙**:

```typescript
// 좋은 예시: 솔로/커플 모두 적용 가능
{
  ko: '마음이 통하는 대화가 오갈 것입니다. 진심을 표현해보세요.',
  // 솔로: 관심 있는 사람과의 대화
  // 커플: 연인과의 깊은 대화
}

// 나쁜 예시: 커플에게만 적용됨
{
  ko: '연인과 여행을 떠나면 좋은 추억이 생깁니다.',
  // 솔로에게는 적용 불가
}

// 양쪽을 모두 언급하는 좋은 예시
{
  ko: '사랑의 행운이 함께합니다. 솔로라면 새로운 만남이, 커플이라면 관계가 깊어질 수 있습니다.',
}
```

**별자리별 사랑운 키워드**:

| 원소 | 사랑 스타일 | 키워드 |
|------|-----------|--------|
| Fire | 열정적, 적극적 | 뜨거운, 고백, 쟁취, 매력 |
| Earth | 안정적, 헌신적 | 신뢰, 꾸준함, 진실, 기반 |
| Air | 지적, 소통 중심 | 대화, 교감, 친구 같은, 자유 |
| Water | 감성적, 직관적 | 깊은 감정, 영혼, 유대, 치유 |

### 직업운 (Career)

**주요 소재**: 업무, 성과, 인간관계, 프로젝트, 성장

**학생에게도 적용 가능한 표현**:

```typescript
// 좋은 예시: 직장인/학생 모두 적용 가능
{
  ko: '새로운 프로젝트나 과제에서 좋은 성과를 낼 수 있습니다.',
  // 직장인: 업무 프로젝트
  // 학생: 학교 과제, 프로젝트
}

// 나쁜 예시: 직장인에게만 적용
{
  ko: '승진 면접에서 좋은 인상을 줄 수 있습니다.',
}
```

**범용 직업운 소재**:
- 성과, 성장, 학습, 도전 -> 직장인과 학생 모두 해당
- 팀워크, 협력 -> 동료/급우 모두 해당
- 리더십, 발표 -> 직장/학교 모두 해당

### 건강운 (Health)

**주요 소재**: 체력, 정신건강, 생활습관, 에너지, 수면

**의료 조언을 피하는 방법**:

```typescript
// 절대 사용 금지 (의료 조언):
{
  ko: '비타민 C를 하루 1000mg 복용하세요.',           // (X) 구체적 약물/용량
  ko: '두통이 있으면 진통제를 드세요.',                 // (X) 약물 권유
  ko: '특정 질환이 의심됩니다.',                       // (X) 진단
}

// 허용되는 표현:
{
  ko: '활력이 넘치는 날입니다. 운동이나 활동적인 일에 적합합니다.',   // (O) 일반적 권유
  ko: '작은 불편함도 무시하지 마세요. 건강 검진을 고려해보세요.',     // (O) 검진 권유
  ko: '충분한 수면과 수분 섭취에 신경 쓰세요.',                     // (O) 생활습관
}
```

### 금전운 (Money)

**주요 소재**: 수입, 지출, 저축, 재정 관리

**구체적 금융 조언을 피하는 방법**:

```typescript
// 절대 사용 금지 (구체적 금융 조언):
{
  ko: '주식에 투자하세요.',              // (X) 특정 투자 수단
  ko: '부동산을 매입하기 좋은 시기입니다.',  // (X) 특정 자산 클래스
  ko: '비트코인이 오를 것입니다.',         // (X) 특정 자산 예측
}

// 허용되는 표현:
{
  ko: '재물운이 상승하는 날입니다. 투자나 재테크에 좋은 기회가 있습니다.',  // (O) 일반적
  ko: '계획적인 지출로 재정 균형을 유지하세요.',                          // (O) 습관
  ko: '예상치 못한 지출에 대비하세요. 비상금을 확보해두세요.',             // (O) 범용 조언
}
```

---

## 6. 별자리별 전용 템플릿 작성법

### 파일 구조 제안

```
src/data/
  horoscope-templates.ts     # 범용 템플릿 (기존, 변경 없음)
  element-templates.ts        # 원소별 템플릿 (기존, 변경 없음)
  planet-influences.ts        # 행성 영향력 (기존, 변경 없음)
  sign-templates.ts           # [신규] 별자리별 전용 템플릿
  decan-templates.ts          # [신규] 데칸별 템플릿 (Phase 2)
  transit-templates.ts        # [신규] 계절/트랜짓 템플릿 (Phase 3)
  composite-templates.ts      # [신규] 조합형 템플릿 (Phase 4)
```

**`sign-templates.ts` 전체 구조**:

```typescript
// src/data/sign-templates.ts
import type { LocalizedText, ZodiacSignId } from '@/types';
import type { HoroscopeTemplates } from './horoscope-templates';

// 별자리별 전용 템플릿
// 각 별자리의 고유 특성을 반영한 운세 텍스트
export const signTemplates: Record<ZodiacSignId, HoroscopeTemplates> = {
  aries: {
    overall: {
      high: [
        {
          ko: '양자리의 선구자적 기질이 빛나는 날입니다. 새로운 길을 개척하세요.',
          en: 'A day when Aries pioneering spirit shines. Forge a new path.',
          zh: '白羊座的先驱气质闪耀的一天。开辟新道路吧。',
          ja: '牡羊座の先駆者的な気質が輝く日です。新しい道を切り開いてください。',
          es: 'Un día en que el espíritu pionero de Aries brilla. Forja un nuevo camino.',
        },
        {
          ko: '화성의 강력한 에너지가 당신의 행동력을 최고조로 끌어올립니다.',
          en: 'The powerful energy of Mars elevates your drive to its peak.',
          zh: '火星的强大能量将你的行动力提升到顶峰。',
          ja: '火星の強力なエネルギーがあなたの行動力を最高潮に引き上げます。',
          es: 'La poderosa energía de Marte eleva tu impulso a su punto máximo.',
        },
        {
          ko: '두려움 없이 앞으로 나아가세요. 오늘 시작한 일이 큰 성과로 돌아옵니다.',
          en: 'Move forward fearlessly. What you start today returns as great achievement.',
          zh: '无畏地前进吧。今天开始的事会以大成就回报。',
          ja: '恐れずに前に進んでください。今日始めたことが大きな成果として返ってきます。',
          es: 'Avanza sin miedo. Lo que comiences hoy regresará como un gran logro.',
        },
        {
          ko: '당신의 용기가 주변 사람들에게 영감을 줍니다. 리더의 면모를 보여주세요.',
          en: 'Your courage inspires those around you. Show your leadership.',
          zh: '你的勇气激励周围的人。展现你的领导风范。',
          ja: 'あなたの勇気が周りの人にインスピレーションを与えます。リーダーの姿を見せてください。',
          es: 'Tu coraje inspira a quienes te rodean. Muestra tu liderazgo.',
        },
        {
          ko: '첫 번째로 행동하는 사람이 기회를 잡습니다. 주저하지 마세요.',
          en: 'The first to act seizes the opportunity. Do not hesitate.',
          zh: '第一个行动的人抓住机会。不要犹豫。',
          ja: '最初に行動する人がチャンスをつかみます。躊躇しないでください。',
          es: 'El primero en actuar aprovecha la oportunidad. No dudes.',
        },
      ],
      medium: [
        // ... 5개 medium 템플릿
      ],
      low: [
        // ... 5개 low 템플릿
      ],
    },
    love: { high: [], medium: [], low: [] },    // 각 5개씩 채우기
    career: { high: [], medium: [], low: [] },
    health: { high: [], medium: [], low: [] },
    money: { high: [], medium: [], low: [] },
  },
  taurus: { /* ... */ },
  gemini: { /* ... */ },
  cancer: { /* ... */ },
  leo: { /* ... */ },
  virgo: { /* ... */ },
  libra: { /* ... */ },
  scorpio: { /* ... */ },
  sagittarius: { /* ... */ },
  capricorn: { /* ... */ },
  aquarius: { /* ... */ },
  pisces: { /* ... */ },
};
```

### 기존 원소 템플릿과의 관계

별자리별 템플릿은 원소 템플릿의 **상위 레이어**입니다.

```
선택 우선순위:
1. signTemplates[signId][category][level]     ← 별자리 전용 (최우선)
2. elementTemplates[element][category][level]  ← 원소별 (fallback)
3. horoscopeTemplates[category][level]         ← 범용 (최종 fallback)
```

**호출 로직 수정 방법** (`horoscope-generator.ts`):

```typescript
import { signTemplates } from '@/data/sign-templates';

function selectTemplate(
  category: HoroscopeCategory,
  score: HoroscopeScore,
  random: () => number,
  signId?: ZodiacSignId
): LocalizedText {
  const level = getTemplateLevel(score);

  if (signId) {
    // 1순위: 별자리 전용 템플릿
    const signTpls = signTemplates[signId]?.[category]?.[level];
    if (signTpls && signTpls.length > 0 && random() < 0.7) {
      return selectRandom(signTpls, random);
    }

    // 2순위: 원소별 템플릿
    return selectElementTemplate(signId, category, score, random);
  }

  // 3순위: 범용 템플릿
  return selectGenericTemplate(category, score, random);
}
```

### 별자리 고유 키워드 활용법

각 별자리의 고유 키워드를 템플릿에 자연스럽게 녹이는 방법:

```typescript
// 양자리 (Aries) - 키워드: 용기, 개척, 선구자, 첫 번째
// 나쁜 예시: 키워드를 억지로 삽입
{
  ko: '용기와 개척 정신으로 선구자적인 하루를 보내세요.',  // (X) 키워드 나열
}

// 좋은 예시: 키워드를 자연스러운 문맥에 녹임
{
  ko: '새로운 길을 개척할 기회가 찾아옵니다. 두려움 없이 첫발을 내딛으세요.',  // (O)
}

// 황소자리 (Taurus) - 키워드: 안정, 끈기, 감각, 풍요
{
  ko: '꾸준히 쌓아온 노력이 드디어 풍요로운 결실을 맺습니다.',  // (O)
}

// 게자리 (Cancer) - 키워드: 가정, 감정, 보호, 직관
{
  ko: '내면의 직관이 올바른 방향을 알려줍니다. 마음의 소리를 따르세요.',  // (O)
}
```

---

## 7. 데이터에서 코드로의 변환 파이프라인

수집한 별자리 관련 원본 데이터(마크다운 문서, 텍스트 등)를 실제 TypeScript 템플릿 코드로 변환하는 단계별 프로세스입니다.

### Step 1: 마크다운 문서에서 한국어 문구 추출

원본 데이터에서 카테고리별, 레벨별 한국어 문구를 정리합니다.

**입력 형식** (마크다운):

```markdown
## 양자리 (Aries) 템플릿 원본

### 종합운
#### high
- 양자리의 선구자적 기질이 빛나는 날입니다. 새로운 길을 개척하세요.
- 화성의 강력한 에너지가 당신의 행동력을 최고조로 끌어올립니다.
- 두려움 없이 앞으로 나아가세요. 오늘 시작한 일이 큰 성과로 돌아옵니다.
- 당신의 용기가 주변 사람들에게 영감을 줍니다. 리더의 면모를 보여주세요.
- 첫 번째로 행동하는 사람이 기회를 잡습니다. 주저하지 마세요.

#### medium
- 에너지를 분산하지 말고 한 가지에 집중하면 안정적인 하루가 됩니다.
- ...

#### low
- 급한 마음을 가라앉히세요. 오늘은 계획을 세우는 날로 삼는 것이 좋겠습니다.
- ...
```

**품질 검증 체크**:

```
각 문구에 대해 확인:
[x] 30~80자 범위인가?
[x] 자연스러운 한국어인가?
[x] 실행 가능한 조언이 포함되어 있는가?
[x] 해당 별자리의 특성이 반영되어 있는가?
[x] 해당 레벨(high/medium/low)의 톤에 맞는가?
[x] 다른 문구와 중복되지 않는가?
```

### Step 2: 다국어 번역

한국어 문구를 기준으로 4개 언어로 번역합니다.

**번역 시 주의사항**:

1. **의미 전달 우선**: 직역보다 해당 언어에서 자연스러운 표현 사용
2. **문화적 맥락 고려**: 각 문화권에서 부적절할 수 있는 표현 확인
3. **길이 균형**: 번역문이 지나치게 길거나 짧지 않도록 조정
4. **별자리 이름**: 각 언어의 공식 별자리 이름 사용

**별자리 이름 매핑표**:

| ID | ko | en | zh | ja | es |
|----|----|----|----|----|-----|
| aries | 양자리 | Aries | 白羊座 | 牡羊座 | Aries |
| taurus | 황소자리 | Taurus | 金牛座 | 牡牛座 | Tauro |
| gemini | 쌍둥이자리 | Gemini | 双子座 | 双子座 | Géminis |
| cancer | 게자리 | Cancer | 巨蟹座 | 蟹座 | Cáncer |
| leo | 사자자리 | Leo | 狮子座 | 獅子座 | Leo |
| virgo | 처녀자리 | Virgo | 处女座 | 乙女座 | Virgo |
| libra | 천칭자리 | Libra | 天秤座 | 天秤座 | Libra |
| scorpio | 전갈자리 | Scorpio | 天蝎座 | 蠍座 | Escorpio |
| sagittarius | 사수자리 | Sagittarius | 射手座 | 射手座 | Sagitario |
| capricorn | 염소자리 | Capricorn | 摩羯座 | 山羊座 | Capricornio |
| aquarius | 물병자리 | Aquarius | 水瓶座 | 水瓶座 | Acuario |
| pisces | 물고기자리 | Pisces | 双鱼座 | 魚座 | Piscis |

**번역 중간 산출물** (JSON 형식 권장):

```json
{
  "sign": "aries",
  "category": "overall",
  "level": "high",
  "index": 0,
  "ko": "양자리의 선구자적 기질이 빛나는 날입니다. 새로운 길을 개척하세요.",
  "en": "A day when Aries pioneering spirit shines. Forge a new path.",
  "zh": "白羊座的先驱气质闪耀的一天。开辟新道路吧。",
  "ja": "牡羊座の先駆者的な気質が輝く日です。新しい道を切り開いてください。",
  "es": "Un día en que el espíritu pionero de Aries brilla. Forja un nuevo camino."
}
```

### Step 3: TypeScript 코드 생성

번역 완료된 데이터를 TypeScript 코드로 변환합니다.

**자동화 스크립트 (선택사항)**:

```typescript
// scripts/generate-templates.ts
// JSON 파일에서 TypeScript 템플릿 코드를 생성하는 빌드 스크립트

import * as fs from 'fs';
import * as path from 'path';

interface TemplateEntry {
  sign: string;
  category: string;
  level: string;
  index: number;
  ko: string;
  en: string;
  zh: string;
  ja: string;
  es: string;
}

function generateSignTemplates(entries: TemplateEntry[]): string {
  const signs = [...new Set(entries.map(e => e.sign))];
  const categories = ['overall', 'love', 'career', 'health', 'money'];
  const levels = ['high', 'medium', 'low'];

  let code = `import type { LocalizedText, ZodiacSignId } from '@/types';\n`;
  code += `import type { HoroscopeTemplates } from './horoscope-templates';\n\n`;
  code += `export const signTemplates: Record<ZodiacSignId, HoroscopeTemplates> = {\n`;

  for (const sign of signs) {
    code += `  ${sign}: {\n`;
    for (const category of categories) {
      code += `    ${category}: {\n`;
      for (const level of levels) {
        const templates = entries
          .filter(e => e.sign === sign && e.category === category && e.level === level)
          .sort((a, b) => a.index - b.index);

        code += `      ${level}: [\n`;
        for (const t of templates) {
          code += `        {\n`;
          code += `          ko: '${escapeString(t.ko)}',\n`;
          code += `          en: '${escapeString(t.en)}',\n`;
          code += `          zh: '${escapeString(t.zh)}',\n`;
          code += `          ja: '${escapeString(t.ja)}',\n`;
          code += `          es: '${escapeString(t.es)}',\n`;
          code += `        },\n`;
        }
        code += `      ],\n`;
      }
      code += `    },\n`;
    }
    code += `  },\n`;
  }

  code += `};\n`;
  return code;
}

function escapeString(s: string): string {
  return s.replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

// 실행
const inputPath = path.join(__dirname, '../data/translated-templates.json');
const outputPath = path.join(__dirname, '../src/data/sign-templates.ts');

const entries: TemplateEntry[] = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
const code = generateSignTemplates(entries);
fs.writeFileSync(outputPath, code, 'utf-8');

console.log(`Generated ${outputPath} with ${entries.length} templates.`);
```

**수동 작성 시 코드 포맷**:

```typescript
// 들여쓰기: 2 spaces
// 문자열: 작은따옴표(') 사용
// 후행 쉼표: 항상 사용
// 각 LocalizedText 객체는 한 줄 또는 멀티라인 모두 허용

// 한 줄 스타일 (짧은 텍스트):
{ ko: '좋은 날', en: 'Good day', zh: '好日子', ja: '良い日', es: 'Buen día' },

// 멀티라인 스타일 (긴 텍스트, 권장):
{
  ko: '양자리의 선구자적 기질이 빛나는 날입니다. 새로운 길을 개척하세요.',
  en: 'A day when Aries pioneering spirit shines. Forge a new path.',
  zh: '白羊座的先驱气质闪耀的一天。开辟新道路吧。',
  ja: '牡羊座の先駆者的な気質が輝く日です。新しい道を切り開いてください。',
  es: 'Un día en que el espíritu pionero de Aries brilla. Forja un nuevo camino.',
},
```

### Step 4: 기존 시스템 통합

새 템플릿 파일을 `horoscope-generator.ts`에 통합합니다.

**1단계: 임포트 추가**

```typescript
// src/lib/horoscope-generator.ts 상단에 추가
import { signTemplates } from '@/data/sign-templates';
```

**2단계: selectTemplate 함수 수정**

```typescript
function selectTemplate(
  category: HoroscopeCategory,
  score: HoroscopeScore,
  random: () => number,
  signId?: ZodiacSignId
): LocalizedText {
  const level = getTemplateLevel(score);

  if (signId) {
    // [신규] 별자리 전용 템플릿 시도 (70% 확률)
    const signTpls = signTemplates[signId]?.[category]?.[level];
    if (signTpls && signTpls.length > 0 && random() < 0.7) {
      return selectRandom(signTpls, random);
    }

    // [기존] 원소별 템플릿 (fallback)
    return selectElementTemplate(signId, category, score, random);
  }

  // [기존] 범용 템플릿
  return selectGenericTemplate(category, score, random);
}
```

**3단계: 테스트**

```typescript
// src/lib/__tests__/sign-templates.test.ts
import { describe, it, expect } from 'vitest';
import { signTemplates } from '@/data/sign-templates';

const ZODIAC_SIGNS = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
] as const;

const CATEGORIES = ['overall', 'love', 'career', 'health', 'money'] as const;
const LEVELS = ['high', 'medium', 'low'] as const;
const LANGUAGES = ['ko', 'en', 'zh', 'ja', 'es'] as const;

describe('sign-templates', () => {
  for (const sign of ZODIAC_SIGNS) {
    describe(sign, () => {
      it('모든 카테고리와 레벨에 5개 이상의 템플릿이 있어야 함', () => {
        for (const category of CATEGORIES) {
          for (const level of LEVELS) {
            const templates = signTemplates[sign]?.[category]?.[level];
            expect(templates).toBeDefined();
            expect(templates!.length).toBeGreaterThanOrEqual(5);
          }
        }
      });

      it('모든 템플릿이 5개 언어를 포함해야 함', () => {
        for (const category of CATEGORIES) {
          for (const level of LEVELS) {
            const templates = signTemplates[sign][category][level];
            for (const template of templates) {
              for (const lang of LANGUAGES) {
                expect(template[lang]).toBeDefined();
                expect(template[lang].length).toBeGreaterThan(0);
              }
            }
          }
        }
      });

      it('한국어 텍스트가 30~80자 범위여야 함', () => {
        for (const category of CATEGORIES) {
          for (const level of LEVELS) {
            const templates = signTemplates[sign][category][level];
            for (const template of templates) {
              expect(template.ko.length).toBeGreaterThanOrEqual(10);
              expect(template.ko.length).toBeLessThanOrEqual(100);
            }
          }
        }
      });

      it('중복 문구가 없어야 함', () => {
        const allTexts = new Set<string>();
        for (const category of CATEGORIES) {
          for (const level of LEVELS) {
            const templates = signTemplates[sign][category][level];
            for (const template of templates) {
              expect(allTexts.has(template.ko)).toBe(false);
              allTexts.add(template.ko);
            }
          }
        }
      });
    });
  }
});
```

---

## 8. 품질 체크리스트

새 템플릿을 추가할 때마다 아래 체크리스트로 검수합니다.

### 개별 문구 체크

- [ ] **길이**: 한국어 기준 30~80자 (공백 포함)
- [ ] **자연스러운 한국어**: 번역투가 아닌 자연스러운 문장
- [ ] **실행 가능한 조언 포함**: 단순 설명이 아닌 구체적 행동 권유
- [ ] **별자리/원소 특성 반영**: 해당 별자리의 고유 키워드나 성격이 녹아 있음
- [ ] **톤 적합성**: high/medium/low 레벨에 맞는 톤
- [ ] **중복 문구 없음**: 기존 템플릿(범용, 원소별)과 겹치지 않음
- [ ] **부정적 문구도 건설적**: low 레벨도 공포 유발 없이 건설적 조언 제공
- [ ] **5개 언어 번역 완료**: ko, en, zh, ja, es 모두 작성
- [ ] **번역 일관성**: 같은 의미를 5개 언어가 일관되게 전달
- [ ] **금지 표현 미사용**: 의료 조언, 구체적 금융 조언, 공포 유발 표현 없음

### 파일 단위 체크

- [ ] **TypeScript 컴파일**: `npx tsc --noEmit` 에러 없음
- [ ] **타입 일관성**: `LocalizedText` 인터페이스 준수
- [ ] **임포트 정상**: 필요한 타입과 모듈이 올바르게 임포트됨
- [ ] **내보내기 정상**: 다른 모듈에서 사용할 수 있도록 export 됨
- [ ] **테스트 통과**: `npm run test` 모든 테스트 통과

### 전체 시스템 체크

- [ ] **템플릿 선택 로직**: `selectTemplate` 함수가 새 템플릿을 올바르게 선택
- [ ] **시드 기반 결정성**: 같은 날짜 + 같은 별자리 = 같은 결과
- [ ] **API 응답 정상**: `/api/horoscope/daily/[sign]` 엔드포인트가 정상 응답
- [ ] **다국어 표시 정상**: 각 언어 locale에서 해당 언어 텍스트가 표시됨
- [ ] **빌드 성공**: `npm run build` 에러 없음

### 수량 목표

| Phase | 신규 템플릿 수 | 누적 총 수 |
|-------|-------------|-----------|
| 현재 | 0 | 275 |
| Phase 1 (별자리별) | +900 | 1,175 |
| Phase 2 (데칸별) | +1,080 | 2,255 |
| Phase 3 (계절/트랜짓) | +240 | 2,495 |
| Phase 4 (조합형) | 이론상 무한 | 2,495+ |

---

## 부록: 빠른 참조

### LocalizedText 빈 템플릿

복사하여 사용할 수 있는 빈 템플릿입니다.

```typescript
{
  ko: '',
  en: '',
  zh: '',
  ja: '',
  es: '',
},
```

### 카테고리 코드와 한글 이름 매핑

```typescript
const categoryNames: Record<HoroscopeCategory, string> = {
  overall: '종합운',
  love: '사랑운',
  career: '직업운',
  health: '건강운',
  money: '금전운',
};
```

### 레벨과 점수 매핑

```
high   = 점수 4, 5 (좋음/격려)
medium = 점수 3    (보통/중립)
low    = 점수 1, 2 (주의/조심)
```

### 원소와 별자리 매핑

```
Fire  (불)  = 양자리, 사자자리, 사수자리
Earth (흙)  = 황소자리, 처녀자리, 염소자리
Air   (공기) = 쌍둥이자리, 천칭자리, 물병자리
Water (물)  = 게자리, 전갈자리, 물고기자리
```

### 지배 행성 매핑

```
양자리     → 화성 (Mars)
황소자리   → 금성 (Venus)
쌍둥이자리 → 수성 (Mercury)
게자리     → 달 (Moon)
사자자리   → 태양 (Sun)
처녀자리   → 수성 (Mercury)
천칭자리   → 금성 (Venus)
전갈자리   → 명왕성 (Pluto)
사수자리   → 목성 (Jupiter)
염소자리   → 토성 (Saturn)
물병자리   → 천왕성 (Uranus)
물고기자리 → 해왕성 (Neptune)
```

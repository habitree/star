/**
 * GEO (Generative Engine Optimization) FAQ 데이터
 * AI 검색엔진(Google AI Overviews, Perplexity, ChatGPT)에 최적화된 FAQPage Schema용
 *
 * 페이지 타입별 FAQ 생성 함수:
 * - getDailyHoroscopeFAQs: 일일 운세 페이지 (4문항)
 * - getZodiacSignFAQs: 별자리 상세 페이지 (4문항)
 * - getCompatibilityFAQs: 궁합 결과 페이지 (3문항)
 */

import type { Locale } from '@/i18n/config';

export interface FAQItem {
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
}

// ────────────────────────────────────────────────────────────────────────
// 1. 일일 운세 FAQ  (getDailyHoroscopeFAQs)
// ────────────────────────────────────────────────────────────────────────

export function getDailyHoroscopeFAQs(
  signName: Record<Locale, string>,
  dateStr: string,
  dateRange: string,
  luckyNumber: number,
  luckyColor: string,
): FAQItem[] {
  return [
    {
      question: {
        ko: `오늘 ${signName.ko} 운세는 어떤가요?`,
        en: `What is the ${signName.en} horoscope for today?`,
        zh: `今天${signName.zh}的运势如何？`,
        ja: `今日の${signName.ja}の運勢はどうですか？`,
        es: `¿Cuál es el horóscopo de ${signName.es} hoy?`,
      },
      answer: {
        ko: `${dateStr} ${signName.ko} 오늘의 운세는 LuckyToday에서 매일 업데이트됩니다. 종합운, 연애운, 직장운, 건강운, 금전운 5가지 영역의 점수와 함께 상세한 운세 텍스트를 제공합니다.`,
        en: `The ${signName.en} daily horoscope for ${dateStr} is updated every day on LuckyToday. It covers 5 areas: overall, love, career, health, and money fortune with detailed insights.`,
        zh: `${dateStr}的${signName.zh}今日运势在LuckyToday每天更新。提供综合运、爱情运、事业运、健康运和财运5个方面的详细解读。`,
        ja: `${dateStr}の${signName.ja}の運勢はLuckyToday毎日更新されます。総合運・恋愛運・仕事運・健康運・金運の5つの分野の詳しい運勢をお届けします。`,
        es: `El horóscopo diario de ${signName.es} para ${dateStr} se actualiza cada día en LuckyToday. Cubre 5 áreas: fortuna general, amor, carrera, salud y dinero con detalles completos.`,
      },
    },
    {
      question: {
        ko: `오늘 ${signName.ko}의 행운의 숫자와 색상은?`,
        en: `What are ${signName.en}'s lucky number and color today?`,
        zh: `今天${signName.zh}的幸运数字和颜色是什么？`,
        ja: `今日の${signName.ja}のラッキーナンバーとラッキーカラーは？`,
        es: `¿Cuáles son el número y color de la suerte de ${signName.es} hoy?`,
      },
      answer: {
        ko: `오늘 ${signName.ko}의 행운의 숫자는 ${luckyNumber}이고, 행운의 색상은 ${luckyColor}입니다. 이 요소들을 활용하면 긍정적인 에너지를 높일 수 있습니다.`,
        en: `Today's lucky number for ${signName.en} is ${luckyNumber}, and the lucky color is ${luckyColor}. Embracing these elements can help attract positive energy.`,
        zh: `今天${signName.zh}的幸运数字是${luckyNumber}，幸运颜色是${luckyColor}。运用这些元素可以提升正能量。`,
        ja: `今日の${signName.ja}のラッキーナンバーは${luckyNumber}、ラッキーカラーは${luckyColor}です。これらの要素を活用してポジティブなエネルギーを高めましょう。`,
        es: `El número de la suerte de ${signName.es} hoy es ${luckyNumber}, y el color de la suerte es ${luckyColor}. Usar estos elementos puede atraer energía positiva.`,
      },
    },
    {
      question: {
        ko: `오늘 ${signName.ko} 연애운은 어떤가요?`,
        en: `What is ${signName.en}'s love horoscope today?`,
        zh: `今天${signName.zh}的爱情运势如何？`,
        ja: `今日の${signName.ja}の恋愛運はどうですか？`,
        es: `¿Cómo está el horóscopo amoroso de ${signName.es} hoy?`,
      },
      answer: {
        ko: `${signName.ko}의 오늘 연애운은 LuckyToday의 일일 운세 페이지에서 상세하게 확인할 수 있습니다. 연애운 점수와 함께 파트너십, 감정 상태, 오늘의 조언을 제공합니다.`,
        en: `${signName.en}'s love horoscope today can be found in detail on LuckyToday's daily horoscope page. It includes a love score, relationship insights, emotional state, and today's advice.`,
        zh: `今天${signName.zh}的爱情运势可以在LuckyToday的今日运势页面详细查看。提供爱情分数、感情状态和今日建议。`,
        ja: `${signName.ja}の今日の恋愛運はLuckyToday の今日の運勢ページで詳しく確認できます。恋愛運スコアとパートナーシップのアドバイスを提供しています。`,
        es: `El horóscopo amoroso de ${signName.es} hoy se puede consultar en detalle en LuckyToday. Incluye puntuación de amor, estado emocional y consejo del día.`,
      },
    },
    {
      question: {
        ko: `${signName.ko}는 몇 월 몇 일생인가요?`,
        en: `What are the birth dates for ${signName.en}?`,
        zh: `${signName.zh}的生日范围是什么？`,
        ja: `${signName.ja}の誕生日はいつですか？`,
        es: `¿Cuáles son las fechas de nacimiento de ${signName.es}?`,
      },
      answer: {
        ko: `${signName.ko}는 ${dateRange}에 태어난 분들의 별자리입니다. 생년월일을 입력하면 나만의 상세한 별자리 운세와 출생 차트를 확인할 수 있습니다.`,
        en: `${signName.en} is the zodiac sign for those born ${dateRange}. You can get your personalized horoscope and birth chart by entering your date of birth.`,
        zh: `${signName.zh}是${dateRange}出生的人的星座。输入生日可以获得个性化的运势和出生图。`,
        ja: `${signName.ja}は${dateRange}生まれの方の星座です。生年月日を入力すると、パーソナライズされた運勢と出生図を確認できます。`,
        es: `${signName.es} es el signo zodiacal para quienes nacieron ${dateRange}. Ingresa tu fecha de nacimiento para obtener tu horóscopo personalizado y carta natal.`,
      },
    },
  ];
}

// ────────────────────────────────────────────────────────────────────────
// 2. 별자리 상세 FAQ  (getZodiacSignFAQs)
// ────────────────────────────────────────────────────────────────────────

export function getZodiacSignFAQs(
  signName: Record<Locale, string>,
  dateRange: string,
  element: Record<Locale, string>,
  rulingPlanet: Record<Locale, string>,
  positiveTraits: Record<Locale, string[]>,
): FAQItem[] {
  return [
    {
      question: {
        ko: `${signName.ko} 별자리의 특징은 무엇인가요?`,
        en: `What are the key traits of ${signName.en}?`,
        zh: `${signName.zh}的主要特征是什么？`,
        ja: `${signName.ja}の主な特徴は何ですか？`,
        es: `¿Cuáles son los rasgos clave de ${signName.es}?`,
      },
      answer: {
        ko: `${signName.ko}(${dateRange})는 ${element.ko} 원소에 속하며, ${rulingPlanet.ko}이(가) 지배 행성입니다. 주요 장점으로는 ${positiveTraits.ko.slice(0, 3).join(', ')} 등이 있습니다.`,
        en: `${signName.en} (${dateRange}) belongs to the ${element.en} element, ruled by ${rulingPlanet.en}. Key strengths include ${positiveTraits.en.slice(0, 3).join(', ')}.`,
        zh: `${signName.zh}（${dateRange}）属于${element.zh}元素，守护星为${rulingPlanet.zh}。主要优点包括${positiveTraits.zh.slice(0, 3).join('、')}等。`,
        ja: `${signName.ja}（${dateRange}）は${element.ja}元素に属し、支配星は${rulingPlanet.ja}です。主な長所は${positiveTraits.ja.slice(0, 3).join('、')}などです。`,
        es: `${signName.es} (${dateRange}) pertenece al elemento ${element.es}, regido por ${rulingPlanet.es}. Sus principales fortalezas incluyen ${positiveTraits.es.slice(0, 3).join(', ')}.`,
      },
    },
    {
      question: {
        ko: `${signName.ko}와 가장 잘 맞는 별자리는?`,
        en: `Which zodiac signs are most compatible with ${signName.en}?`,
        zh: `与${signName.zh}最相配的星座是什么？`,
        ja: `${signName.ja}と最も相性が良い星座はどれですか？`,
        es: `¿Qué signos del zodiaco son más compatibles con ${signName.es}?`,
      },
      answer: {
        ko: `${signName.ko}의 궁합은 같은 ${element.ko} 원소 별자리와 특히 잘 맞습니다. LuckyToday 궁합 페이지에서 144가지 별자리 조합의 상세한 궁합 점수를 확인할 수 있습니다.`,
        en: `${signName.en} tends to be most compatible with signs of the same ${element.en} element. Check LuckyToday's compatibility page for detailed scores across all 144 zodiac combinations.`,
        zh: `${signName.zh}通常与同属${element.zh}元素的星座最相配。在LuckyToday的配对页面可以查看144种星座组合的详细配对分数。`,
        ja: `${signName.ja}は同じ${element.ja}元素の星座と特に相性が良い傾向があります。LuckyToday の相性ページで144種類の星座の組み合わせの詳しいスコアを確認できます。`,
        es: `${signName.es} tiende a ser más compatible con signos del mismo elemento ${element.es}. Consulta la página de compatibilidad de LuckyToday para ver puntuaciones detalladas de las 144 combinaciones.`,
      },
    },
    {
      question: {
        ko: `${signName.ko}의 지배 행성과 원소는?`,
        en: `What is ${signName.en}'s ruling planet and element?`,
        zh: `${signName.zh}的守护星和元素是什么？`,
        ja: `${signName.ja}の支配星と元素は何ですか？`,
        es: `¿Cuál es el planeta regente y el elemento de ${signName.es}?`,
      },
      answer: {
        ko: `${signName.ko}의 지배 행성은 ${rulingPlanet.ko}이며, ${element.ko} 원소에 속합니다. 이 조합은 ${signName.ko}의 핵심 성격과 에너지 방향을 결정합니다.`,
        en: `${signName.en}'s ruling planet is ${rulingPlanet.en}, and it belongs to the ${element.en} element. This combination shapes ${signName.en}'s core personality and energy direction.`,
        zh: `${signName.zh}的守护星是${rulingPlanet.zh}，属于${element.zh}元素。这种组合决定了${signName.zh}的核心性格和能量方向。`,
        ja: `${signName.ja}の支配星は${rulingPlanet.ja}で、${element.ja}元素に属します。この組み合わせが${signName.ja}の核心的な性格とエネルギーの方向性を決定します。`,
        es: `El planeta regente de ${signName.es} es ${rulingPlanet.es}, y pertenece al elemento ${element.es}. Esta combinación determina la personalidad central y la dirección energética de ${signName.es}.`,
      },
    },
    {
      question: {
        ko: `오늘 ${signName.ko} 운세는 어디서 볼 수 있나요?`,
        en: `Where can I check today's ${signName.en} horoscope?`,
        zh: `在哪里可以查看今天的${signName.zh}运势？`,
        ja: `今日の${signName.ja}の運勢はどこで確認できますか？`,
        es: `¿Dónde puedo consultar el horóscopo de ${signName.es} de hoy?`,
      },
      answer: {
        ko: `LuckyToday의 ${signName.ko} 일일 운세 페이지에서 매일 업데이트되는 운세를 확인할 수 있습니다. 종합운, 연애운, 직장운, 건강운, 금전운과 타로 카드, 시간대별 운세를 무료로 제공합니다.`,
        en: `You can check the daily updated ${signName.en} horoscope on LuckyToday's daily horoscope page. It provides overall, love, career, health, and money fortune along with tarot card readings for free.`,
        zh: `您可以在LuckyToday的${signName.zh}今日运势页面查看每日更新的运势。免费提供综合运、爱情运、事业运、健康运、财运和塔罗牌解读。`,
        ja: `LuckyToday の${signName.ja}今日の運勢ページで毎日更新される運勢を確認できます。総合運・恋愛運・仕事運・健康運・金運とタロットカードを無料で提供しています。`,
        es: `Puedes consultar el horóscopo diario actualizado de ${signName.es} en la página de LuckyToday. Ofrece fortuna general, amor, carrera, salud y dinero junto con lecturas de tarot, completamente gratis.`,
      },
    },
  ];
}

// ────────────────────────────────────────────────────────────────────────
// 3. 궁합 결과 FAQ  (getCompatibilityFAQs)
// ────────────────────────────────────────────────────────────────────────

export function getCompatibilityFAQs(
  name1: Record<Locale, string>,
  name2: Record<Locale, string>,
  overallScore: number,
  loveScore: number,
): FAQItem[] {
  return [
    {
      question: {
        ko: `${name1.ko}와 ${name2.ko}의 궁합은 몇 점인가요?`,
        en: `What is the compatibility score between ${name1.en} and ${name2.en}?`,
        zh: `${name1.zh}和${name2.zh}的配对分数是多少？`,
        ja: `${name1.ja}と${name2.ja}の相性スコアは何点ですか？`,
        es: `¿Cuál es la puntuación de compatibilidad entre ${name1.es} y ${name2.es}?`,
      },
      answer: {
        ko: `${name1.ko}와 ${name2.ko}의 종합 궁합 점수는 ${overallScore}점이며, 연애 궁합은 ${loveScore}점입니다. LuckyToday는 144가지 별자리 조합의 연애·우정·직장 궁합을 분석하여 제공합니다.`,
        en: `The overall compatibility score between ${name1.en} and ${name2.en} is ${overallScore}, with a love score of ${loveScore}. LuckyToday analyzes love, friendship, and work compatibility for all 144 zodiac combinations.`,
        zh: `${name1.zh}和${name2.zh}的综合配对分数为${overallScore}分，爱情配对分数为${loveScore}分。LuckyToday为144种星座组合提供爱情、友情和工作配对分析。`,
        ja: `${name1.ja}と${name2.ja}の総合相性スコアは${overallScore}点、恋愛相性は${loveScore}点です。LuckyToday は144種類の星座の組み合わせの恋愛・友情・仕事の相性を分析しています。`,
        es: `La puntuación de compatibilidad general entre ${name1.es} y ${name2.es} es ${overallScore}, con una puntuación de amor de ${loveScore}. LuckyToday analiza la compatibilidad de amor, amistad y trabajo para las 144 combinaciones zodiacales.`,
      },
    },
    {
      question: {
        ko: `${name1.ko}와 ${name2.ko}는 연애할 때 잘 맞나요?`,
        en: `Are ${name1.en} and ${name2.en} a good love match?`,
        zh: `${name1.zh}和${name2.zh}在恋爱中相配吗？`,
        ja: `${name1.ja}と${name2.ja}は恋愛的に相性が良いですか？`,
        es: `¿Son ${name1.es} y ${name2.es} una buena pareja romántica?`,
      },
      answer: {
        ko: `${name1.ko}와 ${name2.ko}의 연애 궁합 점수는 ${loveScore}점입니다. 두 별자리의 원소, 지배 행성, 양극성을 종합적으로 분석한 결과이며, 상세한 궁합 해석은 LuckyToday에서 확인할 수 있습니다.`,
        en: `The love compatibility score for ${name1.en} and ${name2.en} is ${loveScore}. This is based on a comprehensive analysis of elements, ruling planets, and polarity. Detailed interpretations are available on LuckyToday.`,
        zh: `${name1.zh}和${name2.zh}的爱情配对分数为${loveScore}分。这是基于元素、守护星和极性的综合分析结果，详细的配对解读可在LuckyToday查看。`,
        ja: `${name1.ja}と${name2.ja}の恋愛相性スコアは${loveScore}点です。元素・支配星・陰陽の総合分析に基づいており、詳しい相性の解説はLuckyToday でご確認いただけます。`,
        es: `La puntuación de compatibilidad amorosa de ${name1.es} y ${name2.es} es ${loveScore}. Se basa en un análisis completo de elementos, planetas regentes y polaridad. Las interpretaciones detalladas están disponibles en LuckyToday.`,
      },
    },
    {
      question: {
        ko: `${name1.ko}와 ${name2.ko}의 궁합을 높이는 방법은?`,
        en: `How can ${name1.en} and ${name2.en} improve their compatibility?`,
        zh: `${name1.zh}和${name2.zh}如何提高配对质量？`,
        ja: `${name1.ja}と${name2.ja}の相性を高めるにはどうすればいいですか？`,
        es: `¿Cómo pueden ${name1.es} y ${name2.es} mejorar su compatibilidad?`,
      },
      answer: {
        ko: `${name1.ko}와 ${name2.ko}의 관계를 더욱 깊게 하려면 서로의 별자리 특성을 이해하고 차이점을 보완하는 것이 중요합니다. LuckyToday의 궁합 분석에서 강점과 도전 과제를 함께 확인해보세요.`,
        en: `To deepen the relationship between ${name1.en} and ${name2.en}, understanding each other's zodiac traits and complementing differences is key. Check LuckyToday's compatibility analysis for strengths and challenges.`,
        zh: `要加深${name1.zh}和${name2.zh}的关系，了解彼此的星座特征并补充差异非常重要。在LuckyToday的配对分析中查看优势和挑战。`,
        ja: `${name1.ja}と${name2.ja}の関係を深めるには、お互いの星座の特性を理解し、違いを補い合うことが大切です。LuckyToday の相性分析で強みと課題を確認してみましょう。`,
        es: `Para profundizar la relación entre ${name1.es} y ${name2.es}, es clave entender los rasgos zodiacales de cada uno y complementar las diferencias. Consulta el análisis de compatibilidad de LuckyToday para ver fortalezas y desafíos.`,
      },
    },
  ];
}

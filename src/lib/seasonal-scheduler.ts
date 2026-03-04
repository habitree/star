/**
 * 시즌/이벤트 스케줄러
 * seededRandom 기반 시즌 콘텐츠 (서버 불필요)
 */

import type { ZodiacSignId } from '@/types';
import type { SeasonalEvent, SeasonalEventType } from '@/types/engagement';

/** 2025-2026 수성 역행 기간 */
const mercuryRetrogradePeriods = [
  { start: '03-15', end: '04-07' },
  { start: '07-18', end: '08-11' },
  { start: '11-09', end: '11-29' },
];

/** 보름달/그믐달 (2026 approximate dates MM-DD) */
const lunarEvents2026 = [
  { type: 'full_moon' as const, date: '01-03' },
  { type: 'new_moon' as const, date: '01-18' },
  { type: 'full_moon' as const, date: '02-01' },
  { type: 'new_moon' as const, date: '02-17' },
  { type: 'full_moon' as const, date: '03-03' },
  { type: 'new_moon' as const, date: '03-19' },
  { type: 'full_moon' as const, date: '04-02' },
  { type: 'new_moon' as const, date: '04-17' },
  { type: 'full_moon' as const, date: '05-01' },
  { type: 'new_moon' as const, date: '05-17' },
  { type: 'full_moon' as const, date: '05-31' },
  { type: 'new_moon' as const, date: '06-15' },
  { type: 'full_moon' as const, date: '06-29' },
  { type: 'new_moon' as const, date: '07-15' },
  { type: 'full_moon' as const, date: '07-29' },
  { type: 'new_moon' as const, date: '08-13' },
  { type: 'full_moon' as const, date: '08-28' },
  { type: 'new_moon' as const, date: '09-11' },
  { type: 'full_moon' as const, date: '09-27' },
  { type: 'new_moon' as const, date: '10-11' },
  { type: 'full_moon' as const, date: '10-26' },
  { type: 'new_moon' as const, date: '11-09' },
  { type: 'full_moon' as const, date: '11-25' },
  { type: 'new_moon' as const, date: '12-09' },
  { type: 'full_moon' as const, date: '12-25' },
];

/** 24절기 (approximate MM-DD) — locale key for lookup */
const solarTerms: { key: string; date: string }[] = [
  { key: 'minor_cold',        date: '01-06' },
  { key: 'major_cold',        date: '01-20' },
  { key: 'spring_begins',     date: '02-04' },
  { key: 'rain_water',        date: '02-19' },
  { key: 'insects_waken',     date: '03-06' },
  { key: 'spring_equinox',    date: '03-21' },
  { key: 'clear_bright',      date: '04-05' },
  { key: 'grain_rain',        date: '04-20' },
  { key: 'summer_begins',     date: '05-06' },
  { key: 'grain_buds',        date: '05-21' },
  { key: 'grain_in_ear',      date: '06-06' },
  { key: 'summer_solstice',   date: '06-21' },
  { key: 'minor_heat',        date: '07-07' },
  { key: 'major_heat',        date: '07-23' },
  { key: 'autumn_begins',     date: '08-07' },
  { key: 'end_of_heat',       date: '08-23' },
  { key: 'white_dew',         date: '09-08' },
  { key: 'autumn_equinox',    date: '09-23' },
  { key: 'cold_dew',          date: '10-08' },
  { key: 'frost',             date: '10-23' },
  { key: 'winter_begins',     date: '11-07' },
  { key: 'minor_snow',        date: '11-22' },
  { key: 'major_snow',        date: '12-07' },
  { key: 'winter_solstice',   date: '12-22' },
];

/** 24절기 이름 다국어 */
const SOLAR_TERM_NAMES: Record<string, Record<string, string>> = {
  minor_cold:       { ko: '소한',  en: 'Minor Cold',       zh: '小寒',  ja: '小寒',   es: 'Frío Menor' },
  major_cold:       { ko: '대한',  en: 'Major Cold',       zh: '大寒',  ja: '大寒',   es: 'Gran Frío' },
  spring_begins:    { ko: '입춘',  en: 'Start of Spring',  zh: '立春',  ja: '立春',   es: 'Inicio de Primavera' },
  rain_water:       { ko: '우수',  en: 'Rain Water',       zh: '雨水',  ja: '雨水',   es: 'Agua de Lluvia' },
  insects_waken:    { ko: '경칩',  en: 'Awakening of Insects', zh: '惊蛰', ja: '啓蟄', es: 'Despertar de Insectos' },
  spring_equinox:   { ko: '춘분',  en: 'Spring Equinox',   zh: '春分',  ja: '春分',   es: 'Equinoccio de Primavera' },
  clear_bright:     { ko: '청명',  en: 'Clear and Bright', zh: '清明',  ja: '清明',   es: 'Claro y Brillante' },
  grain_rain:       { ko: '곡우',  en: 'Grain Rain',       zh: '谷雨',  ja: '穀雨',   es: 'Lluvia de Granos' },
  summer_begins:    { ko: '입하',  en: 'Start of Summer',  zh: '立夏',  ja: '立夏',   es: 'Inicio de Verano' },
  grain_buds:       { ko: '소만',  en: 'Grain Buds',       zh: '小满',  ja: '小満',   es: 'Brotes de Grano' },
  grain_in_ear:     { ko: '망종',  en: 'Grain in Ear',     zh: '芒种',  ja: '芒種',   es: 'Grano en Espiga' },
  summer_solstice:  { ko: '하지',  en: 'Summer Solstice',  zh: '夏至',  ja: '夏至',   es: 'Solsticio de Verano' },
  minor_heat:       { ko: '소서',  en: 'Minor Heat',       zh: '小暑',  ja: '小暑',   es: 'Calor Menor' },
  major_heat:       { ko: '대서',  en: 'Major Heat',       zh: '大暑',  ja: '大暑',   es: 'Gran Calor' },
  autumn_begins:    { ko: '입추',  en: 'Start of Autumn',  zh: '立秋',  ja: '立秋',   es: 'Inicio de Otoño' },
  end_of_heat:      { ko: '처서',  en: 'End of Heat',      zh: '处暑',  ja: '処暑',   es: 'Fin del Calor' },
  white_dew:        { ko: '백로',  en: 'White Dew',        zh: '白露',  ja: '白露',   es: 'Rocío Blanco' },
  autumn_equinox:   { ko: '추분',  en: 'Autumn Equinox',   zh: '秋分',  ja: '秋分',   es: 'Equinoccio de Otoño' },
  cold_dew:         { ko: '한로',  en: 'Cold Dew',         zh: '寒露',  ja: '寒露',   es: 'Rocío Frío' },
  frost:            { ko: '상강',  en: 'Frost',            zh: '霜降',  ja: '霜降',   es: 'Escarcha' },
  winter_begins:    { ko: '입동',  en: 'Start of Winter',  zh: '立冬',  ja: '立冬',   es: 'Inicio de Invierno' },
  minor_snow:       { ko: '소설',  en: 'Minor Snow',       zh: '小雪',  ja: '小雪',   es: 'Nevada Menor' },
  major_snow:       { ko: '대설',  en: 'Major Snow',       zh: '大雪',  ja: '大雪',   es: 'Gran Nevada' },
  winter_solstice:  { ko: '동지',  en: 'Winter Solstice',  zh: '冬至',  ja: '冬至',   es: 'Solsticio de Invierno' },
};

/** 24절기 메시지 다국어 */
const SOLAR_TERM_MSG: Record<string, Record<string, (name: string) => string>> = {
  ko: { default: (n) => `오늘은 24절기 중 '${n}'입니다. 동양 전통 지혜에 따르면, 자연의 흐름에 맞춰 생활하면 운이 좋아집니다.` },
  en: { default: (n) => `Today is '${n}', one of the 24 solar terms. Living in harmony with nature's flow brings good fortune.` },
  zh: { default: (n) => `今天是二十四节气中的'${n}'。顺应自然节律生活，会带来好运。` },
  ja: { default: (n) => `今日は二十四節気の「${n}」です。自然のリズムに合わせた生活が幸運を呼びます。` },
  es: { default: (n) => `Hoy es '${n}', uno de los 24 términos solares. Vivir en armonía con el flujo natural trae buena fortuna.` },
};

/** 별자리 시즌 (태양이 해당 별자리에 위치하는 기간) */
const zodiacSeasons: { signId: ZodiacSignId; start: string; end: string }[] = [
  { signId: 'aquarius',    start: '01-20', end: '02-18' },
  { signId: 'pisces',      start: '02-19', end: '03-20' },
  { signId: 'aries',       start: '03-21', end: '04-19' },
  { signId: 'taurus',      start: '04-20', end: '05-20' },
  { signId: 'gemini',      start: '05-21', end: '06-21' },
  { signId: 'cancer',      start: '06-22', end: '07-22' },
  { signId: 'leo',         start: '07-23', end: '08-22' },
  { signId: 'virgo',       start: '08-23', end: '09-22' },
  { signId: 'libra',       start: '09-23', end: '10-22' },
  { signId: 'scorpio',     start: '10-23', end: '11-21' },
  { signId: 'sagittarius', start: '11-22', end: '12-21' },
  { signId: 'capricorn',   start: '12-22', end: '01-19' },
];

/** 별자리 이름 다국어 */
const ZODIAC_SIGN_NAMES: Record<ZodiacSignId, Record<string, string>> = {
  aries:       { ko: '양자리',     en: 'Aries',       zh: '白羊座',   ja: '牡羊座',   es: 'Aries' },
  taurus:      { ko: '황소자리',   en: 'Taurus',      zh: '金牛座',   ja: '牡牛座',   es: 'Tauro' },
  gemini:      { ko: '쌍둥이자리', en: 'Gemini',      zh: '双子座',   ja: '双子座',   es: 'Géminis' },
  cancer:      { ko: '게자리',     en: 'Cancer',      zh: '巨蟹座',   ja: '蟹座',     es: 'Cáncer' },
  leo:         { ko: '사자자리',   en: 'Leo',         zh: '狮子座',   ja: '獅子座',   es: 'Leo' },
  virgo:       { ko: '처녀자리',   en: 'Virgo',       zh: '处女座',   ja: '乙女座',   es: 'Virgo' },
  libra:       { ko: '천칭자리',   en: 'Libra',       zh: '天秤座',   ja: '天秤座',   es: 'Libra' },
  scorpio:     { ko: '전갈자리',   en: 'Scorpio',     zh: '天蝎座',   ja: '蠍座',     es: 'Escorpio' },
  sagittarius: { ko: '사수자리',   en: 'Sagittarius', zh: '射手座',   ja: '射手座',   es: 'Sagitario' },
  capricorn:   { ko: '염소자리',   en: 'Capricorn',   zh: '摩羯座',   ja: '山羊座',   es: 'Capricornio' },
  aquarius:    { ko: '물병자리',   en: 'Aquarius',    zh: '水瓶座',   ja: '水瓶座',   es: 'Acuario' },
  pisces:      { ko: '물고기자리', en: 'Pisces',      zh: '双鱼座',   ja: '魚座',     es: 'Piscis' },
};

/** 별자리 시즌 메시지 다국어 */
const ZODIAC_SEASON_MSG: Record<string, (signName: string) => string> = {
  ko: (s) => `지금은 ${s} 시즌입니다. ${s}의 에너지가 모든 별자리에 영향을 미치고 있습니다.`,
  en: (s) => `It's ${s} season. The energy of ${s} influences all zodiac signs.`,
  zh: (s) => `现在是${s}季节。${s}的能量影响着所有星座。`,
  ja: (s) => `今は${s}シーズンです。${s}のエネルギーがすべての星座に影響しています。`,
  es: (s) => `Es la temporada de ${s}. La energía de ${s} influye en todos los signos del zodiaco.`,
};

/** 별자리 시즌 이름 다국어 ("물고기자리 시즌" / "Pisces Season") */
const ZODIAC_SEASON_LABEL: Record<string, (signName: string) => string> = {
  ko: (s) => `${s} 시즌`,
  en: (s) => `${s} Season`,
  zh: (s) => `${s}季节`,
  ja: (s) => `${s}シーズン`,
  es: (s) => `Temporada de ${s}`,
};

/** 특별 휴일/이벤트 다국어 데이터 */
const SPECIAL_HOLIDAYS: {
  type: SeasonalEventType;
  start: string;
  end: string;
  names: Record<string, string>;
  messages: Record<string, string>;
}[] = [
  {
    type: 'valentine',
    start: '02-14', end: '02-14',
    names:    { ko: '발렌타인데이', en: "Valentine's Day",  zh: '情人节',   ja: 'バレンタインデー', es: 'Día de San Valentín' },
    messages: {
      ko: '사랑의 에너지가 온 우주에 가득한 날입니다. 연애운을 특별히 확인해보세요!',
      en: 'Love energy fills the universe today. Check your romance fortune!',
      zh: '今天爱情能量充满宇宙。查看您的爱情运势！',
      ja: '愛のエネルギーが宇宙に満ちています。恋愛運を確認しましょう！',
      es: '¡La energía del amor llena el universo hoy. ¡Consulta tu fortuna amorosa!',
    },
  },
  {
    type: 'white_day',
    start: '03-14', end: '03-14',
    names:    { ko: '화이트데이', en: 'White Day',      zh: '白色情人节', ja: 'ホワイトデー', es: 'Día Blanco' },
    messages: {
      ko: '답례의 마음이 새로운 인연을 만드는 날입니다.',
      en: 'Gratitude and reciprocity create new connections today.',
      zh: '今天是回礼之心创造新缘分的日子。',
      ja: '感謝の気持ちが新しい縁を生む日です。',
      es: 'La gratitud y la reciprocidad crean nuevas conexiones hoy.',
    },
  },
  {
    type: 'christmas',
    start: '12-24', end: '12-25',
    names:    { ko: '크리스마스', en: 'Christmas',     zh: '圣诞节',    ja: 'クリスマス',   es: 'Navidad' },
    messages: {
      ko: '별빛이 가장 밝게 빛나는 밤, 특별한 운세를 확인하세요.',
      en: 'The night when stars shine brightest — check your special fortune.',
      zh: '星光最亮的夜晚，查看您的特别运势。',
      ja: '星が最も輝く夜、特別な運勢をご確認ください。',
      es: 'La noche en que las estrellas brillan más — consulta tu fortuna especial.',
    },
  },
  {
    type: 'new_year',
    start: '01-01', end: '01-03',
    names:    { ko: '새해',       en: 'New Year',      zh: '新年',      ja: '新年',         es: 'Año Nuevo' },
    messages: {
      ko: '새해 첫 운세! 올해의 별자리 운세가 준비되었습니다.',
      en: "New Year's first fortune! Your zodiac forecast for the year is ready.",
      zh: '新年第一运！今年的星座运势已准备好。',
      ja: '新年最初の運勢！今年の星座運勢が準備されています。',
      es: '¡La primera fortuna del Año Nuevo! Tu pronóstico zodiacal del año está listo.',
    },
  },
  {
    type: 'chuseok',
    start: '09-16', end: '09-18',
    names:    { ko: '추석',       en: 'Chuseok',       zh: '中秋节',    ja: '秋夕',         es: 'Chuseok' },
    messages: {
      ko: '한가위 보름달 아래 특별한 운세를 확인해보세요.',
      en: 'Check your special fortune under the harvest full moon.',
      zh: '在丰收满月下查看您的特别运势。',
      ja: '中秋の満月の下、特別な運勢を確認してください。',
      es: 'Consulta tu fortuna especial bajo la luna llena de la cosecha.',
    },
  },
  {
    type: 'seollal',
    start: '01-28', end: '01-30',
    names:    { ko: '설날',       en: 'Lunar New Year', zh: '春节',     ja: '旧正月',       es: 'Año Nuevo Lunar' },
    messages: {
      ko: '새해 복 많이 받으세요! 토정비결 스타일의 특별 운세를 확인하세요.',
      en: 'Happy Lunar New Year! Check your special fortune in the traditional style.',
      zh: '新年快乐！查看传统风格的特别运势。',
      ja: '明けましておめでとうございます！伝統的なスタイルの特別な運勢をご確認ください。',
      es: '¡Feliz Año Nuevo Lunar! Consulta tu fortuna especial en el estilo tradicional.',
    },
  },
];

/** 수성 역행 다국어 */
const MERCURY_RETROGRADE: Record<string, { name: string; message: string; specialContent: string }> = {
  ko: {
    name: '수성 역행',
    message: '수성이 역행 중입니다. 소통과 계약에 특별히 주의하세요. 과거의 미해결 문제가 다시 떠오를 수 있습니다.',
    specialContent: '수성 역행 기간에는 중요한 결정을 서두르지 마세요. 과거를 돌아보고 정리하는 시간으로 활용하세요.',
  },
  en: {
    name: 'Mercury Retrograde',
    message: 'Mercury is in retrograde. Pay extra attention to communication and contracts. Unresolved issues from the past may resurface.',
    specialContent: "Don't rush important decisions during Mercury retrograde. Use this time to reflect and organize the past.",
  },
  zh: {
    name: '水星逆行',
    message: '水星正在逆行。请特别注意沟通和合同。过去未解决的问题可能会重新浮现。',
    specialContent: '水星逆行期间不要急于做重要决定。利用这段时间回顾和整理过去。',
  },
  ja: {
    name: '水星逆行',
    message: '水星が逆行中です。コミュニケーションと契約に特別な注意を払ってください。過去の未解決の問題が再浮上する可能性があります。',
    specialContent: '水星逆行中は重要な決断を急がないでください。過去を振り返り整理する時間として活用しましょう。',
  },
  es: {
    name: 'Mercurio Retrógrado',
    message: 'Mercurio está en retrogradación. Presta especial atención a la comunicación y los contratos. Pueden resurgir problemas no resueltos del pasado.',
    specialContent: 'No te apresures en decisiones importantes durante Mercurio retrógrado. Usa este tiempo para reflexionar y organizar el pasado.',
  },
};

/** 보름달/그믐달 다국어 */
const LUNAR_EVENTS: Record<string, {
  fullMoon: { name: string; message: string };
  newMoon:  { name: string; message: string };
}> = {
  ko: {
    fullMoon: { name: '보름달', message: '보름달의 에너지가 강합니다. 감정이 고조되고 직감이 날카로워지는 시기입니다. 중요한 결과가 나타날 수 있습니다.' },
    newMoon:  { name: '그믐달', message: '그믐달의 에너지입니다. 새로운 시작을 위한 의도를 세우기 좋은 시기입니다. 내면의 목소리에 귀 기울이세요.' },
  },
  en: {
    fullMoon: { name: 'Full Moon', message: 'Full Moon energy is strong. Emotions run high and intuition sharpens. Important outcomes may emerge.' },
    newMoon:  { name: 'New Moon',  message: 'New Moon energy is here. A great time to set intentions for new beginnings. Listen to your inner voice.' },
  },
  zh: {
    fullMoon: { name: '满月', message: '满月能量很强。情绪高涨，直觉敏锐。重要的结果可能会出现。' },
    newMoon:  { name: '新月', message: '新月能量来临。这是为新开始设定意图的好时机。倾听内心的声音。' },
  },
  ja: {
    fullMoon: { name: '満月', message: '満月のエネルギーが強まっています。感情が高まり直感が鋭くなる時期です。重要な結果が現れる可能性があります。' },
    newMoon:  { name: '新月', message: '新月のエネルギーです。新しいスタートに向けた意図を設定するのに良い時期です。内なる声に耳を傾けましょう。' },
  },
  es: {
    fullMoon: { name: 'Luna Llena', message: 'La energía de la luna llena es fuerte. Las emociones se intensifican y la intuición se agudiza. Pueden surgir resultados importantes.' },
    newMoon:  { name: 'Luna Nueva',  message: 'La energía de la luna nueva está aquí. Un gran momento para establecer intenciones para nuevos comienzos. Escucha tu voz interior.' },
  },
};

/** 날짜 비교 헬퍼 (MM-DD 형식) */
function isDateInRange(current: string, start: string, end: string): boolean {
  // handle year-wrapping ranges (e.g., 12-22 to 01-19)
  if (start > end) {
    return current >= start || current <= end;
  }
  return current >= start && current <= end;
}

/** 현재 날짜의 MM-DD 문자열 */
function toMMDD(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${m}-${d}`;
}

/** 오늘 활성화된 모든 시즌 이벤트 가져오기 */
export function getActiveEvents(date: Date = new Date(), locale = 'ko'): SeasonalEvent[] {
  const mmdd = toMMDD(date);
  const events: SeasonalEvent[] = [];
  const tl = (obj: Record<string, string>) => obj[locale] ?? obj['ko'];

  // 수성 역행 체크
  for (const period of mercuryRetrogradePeriods) {
    if (isDateInRange(mmdd, period.start, period.end)) {
      const mr = MERCURY_RETROGRADE[locale] ?? MERCURY_RETROGRADE['ko'];
      events.push({
        type: 'mercury_retrograde',
        name: mr.name,
        startDate: period.start,
        endDate: period.end,
        message: mr.message,
        specialContent: mr.specialContent,
      });
    }
  }

  // 보름달/그믐달 체크 (±1일)
  for (const lunar of lunarEvents2026) {
    const eventMMDD = lunar.date;
    const prevDay = getPrevDay(eventMMDD);
    const nextDay = getNextDay(eventMMDD);
    if (mmdd === eventMMDD || mmdd === prevDay || mmdd === nextDay) {
      const isFull = lunar.type === 'full_moon';
      const lunarTl = (LUNAR_EVENTS[locale] ?? LUNAR_EVENTS['ko'])[isFull ? 'fullMoon' : 'newMoon'];
      events.push({
        type: lunar.type,
        name: lunarTl.name,
        startDate: prevDay,
        endDate: nextDay,
        message: lunarTl.message,
      });
    }
  }

  // 24절기 체크 (당일만)
  for (const term of solarTerms) {
    if (mmdd === term.date) {
      const termName = tl(SOLAR_TERM_NAMES[term.key] ?? { ko: term.key });
      const msgFn = (SOLAR_TERM_MSG[locale] ?? SOLAR_TERM_MSG['ko']).default;
      events.push({
        type: 'solar_term',
        name: termName,
        startDate: term.date,
        endDate: term.date,
        message: msgFn(termName),
      });
    }
  }

  // 별자리 시즌 체크
  for (const season of zodiacSeasons) {
    if (isDateInRange(mmdd, season.start, season.end)) {
      const signNames = ZODIAC_SIGN_NAMES[season.signId];
      const signName = tl(signNames);
      const seasonLabel = (ZODIAC_SEASON_LABEL[locale] ?? ZODIAC_SEASON_LABEL['ko'])(signName);
      const msg = (ZODIAC_SEASON_MSG[locale] ?? ZODIAC_SEASON_MSG['ko'])(signName);
      events.push({
        type: 'zodiac_season',
        name: seasonLabel,
        startDate: season.start,
        endDate: season.end,
        message: msg,
      });
    }
  }

  // 특별 휴일 체크
  for (const holiday of SPECIAL_HOLIDAYS) {
    if (isDateInRange(mmdd, holiday.start, holiday.end)) {
      events.push({
        type: holiday.type,
        name: tl(holiday.names),
        startDate: holiday.start,
        endDate: holiday.end,
        message: tl(holiday.messages),
      });
    }
  }

  return events;
}

/** 현재 별자리 시즌 가져오기 */
export function getCurrentZodiacSeason(date: Date = new Date()): ZodiacSignId | null {
  const mmdd = toMMDD(date);
  for (const season of zodiacSeasons) {
    if (isDateInRange(mmdd, season.start, season.end)) {
      return season.signId;
    }
  }
  return null;
}

/** 수성 역행 중인지 확인 */
export function isMercuryRetrograde(date: Date = new Date()): boolean {
  const mmdd = toMMDD(date);
  return mercuryRetrogradePeriods.some(p => isDateInRange(mmdd, p.start, p.end));
}

/** 다음 보름달까지 남은 일수 */
export function daysUntilNextFullMoon(date: Date = new Date()): number {
  const mmdd = toMMDD(date);
  const year = date.getFullYear();

  for (const lunar of lunarEvents2026) {
    if (lunar.type === 'full_moon' && lunar.date > mmdd) {
      const [m, d] = lunar.date.split('-').map(Number);
      const target = new Date(year, m - 1, d);
      const diff = Math.ceil((target.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      if (diff > 0) return diff;
    }
  }
  return 30; // fallback
}

/** MM-DD의 전날 */
function getPrevDay(mmdd: string): string {
  const [m, d] = mmdd.split('-').map(Number);
  const date = new Date(2026, m - 1, d - 1);
  return toMMDD(date);
}

/** MM-DD의 다음날 */
function getNextDay(mmdd: string): string {
  const [m, d] = mmdd.split('-').map(Number);
  const date = new Date(2026, m - 1, d + 1);
  return toMMDD(date);
}

/** 오늘의 시즌 메시지 생성 (표시용 간단 요약) */
export function getTodaySeasonalMessage(date: Date = new Date(), locale = 'ko'): string | null {
  const events = getActiveEvents(date, locale);
  if (events.length === 0) return null;

  // 우선순위: 특별 휴일 > 수성 역행 > 보름달/그믐달 > 절기 > 별자리 시즌
  const priority: SeasonalEventType[] = [
    'valentine', 'white_day', 'christmas', 'new_year', 'chuseok', 'seollal',
    'mercury_retrograde', 'full_moon', 'new_moon', 'solar_term', 'zodiac_season',
  ];

  for (const type of priority) {
    const event = events.find(e => e.type === type);
    if (event) return `✨ ${event.name}: ${event.message}`;
  }

  return null;
}

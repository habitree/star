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

/** 24절기 (approximate MM-DD) */
const solarTerms: { name: string; date: string }[] = [
  { name: '소한', date: '01-06' },
  { name: '대한', date: '01-20' },
  { name: '입춘', date: '02-04' },
  { name: '우수', date: '02-19' },
  { name: '경칩', date: '03-06' },
  { name: '춘분', date: '03-21' },
  { name: '청명', date: '04-05' },
  { name: '곡우', date: '04-20' },
  { name: '입하', date: '05-06' },
  { name: '소만', date: '05-21' },
  { name: '망종', date: '06-06' },
  { name: '하지', date: '06-21' },
  { name: '소서', date: '07-07' },
  { name: '대서', date: '07-23' },
  { name: '입추', date: '08-07' },
  { name: '처서', date: '08-23' },
  { name: '백로', date: '09-08' },
  { name: '추분', date: '09-23' },
  { name: '한로', date: '10-08' },
  { name: '상강', date: '10-23' },
  { name: '입동', date: '11-07' },
  { name: '소설', date: '11-22' },
  { name: '대설', date: '12-07' },
  { name: '동지', date: '12-22' },
];

/** 별자리 시즌 (태양이 해당 별자리에 위치하는 기간) */
const zodiacSeasons: { signId: ZodiacSignId; start: string; end: string }[] = [
  { signId: 'aquarius', start: '01-20', end: '02-18' },
  { signId: 'pisces', start: '02-19', end: '03-20' },
  { signId: 'aries', start: '03-21', end: '04-19' },
  { signId: 'taurus', start: '04-20', end: '05-20' },
  { signId: 'gemini', start: '05-21', end: '06-21' },
  { signId: 'cancer', start: '06-22', end: '07-22' },
  { signId: 'leo', start: '07-23', end: '08-22' },
  { signId: 'virgo', start: '08-23', end: '09-22' },
  { signId: 'libra', start: '09-23', end: '10-22' },
  { signId: 'scorpio', start: '10-23', end: '11-21' },
  { signId: 'sagittarius', start: '11-22', end: '12-21' },
  { signId: 'capricorn', start: '12-22', end: '01-19' },
];

/** 특별 휴일/이벤트 */
const specialHolidays: { type: SeasonalEventType; name: string; start: string; end: string; message: string }[] = [
  { type: 'valentine', name: '발렌타인데이', start: '02-14', end: '02-14', message: '사랑의 에너지가 온 우주에 가득한 날입니다. 연애운을 특별히 확인해보세요!' },
  { type: 'white_day', name: '화이트데이', start: '03-14', end: '03-14', message: '답례의 마음이 새로운 인연을 만드는 날입니다.' },
  { type: 'christmas', name: '크리스마스', start: '12-24', end: '12-25', message: '별빛이 가장 밝게 빛나는 밤, 특별한 운세를 확인하세요.' },
  { type: 'new_year', name: '새해', start: '01-01', end: '01-03', message: '새해 첫 운세! 올해의 별자리 운세가 준비되었습니다.' },
  { type: 'chuseok', name: '추석', start: '09-16', end: '09-18', message: '한가위 보름달 아래 특별한 운세를 확인해보세요.' },
  { type: 'seollal', name: '설날', start: '01-28', end: '01-30', message: '새해 복 많이 받으세요! 토정비결 스타일의 특별 운세를 확인하세요.' },
];

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
export function getActiveEvents(date: Date = new Date()): SeasonalEvent[] {
  const mmdd = toMMDD(date);
  const events: SeasonalEvent[] = [];

  // 수성 역행 체크
  for (const period of mercuryRetrogradePeriods) {
    if (isDateInRange(mmdd, period.start, period.end)) {
      events.push({
        type: 'mercury_retrograde',
        name: '수성 역행',
        startDate: period.start,
        endDate: period.end,
        message: '수성이 역행 중입니다. 소통과 계약에 특별히 주의하세요. 과거의 미해결 문제가 다시 떠오를 수 있습니다.',
        specialContent: '수성 역행 기간에는 중요한 결정을 서두르지 마세요. 과거를 돌아보고 정리하는 시간으로 활용하세요.',
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
      events.push({
        type: lunar.type,
        name: isFull ? '보름달' : '그믐달',
        startDate: prevDay,
        endDate: nextDay,
        message: isFull
          ? '보름달의 에너지가 강합니다. 감정이 고조되고 직감이 날카로워지는 시기입니다. 중요한 결과가 나타날 수 있습니다.'
          : '그믐달의 에너지입니다. 새로운 시작을 위한 의도를 세우기 좋은 시기입니다. 내면의 목소리에 귀 기울이세요.',
      });
    }
  }

  // 24절기 체크 (당일만)
  for (const term of solarTerms) {
    if (mmdd === term.date) {
      events.push({
        type: 'solar_term',
        name: term.name,
        startDate: term.date,
        endDate: term.date,
        message: `오늘은 24절기 중 '${term.name}'입니다. 동양 전통 지혜에 따르면, 자연의 흐름에 맞춰 생활하면 운이 좋아집니다.`,
      });
    }
  }

  // 별자리 시즌 체크
  for (const season of zodiacSeasons) {
    if (isDateInRange(mmdd, season.start, season.end)) {
      const signNames: Record<ZodiacSignId, string> = {
        aries: '양자리', taurus: '황소자리', gemini: '쌍둥이자리',
        cancer: '게자리', leo: '사자자리', virgo: '처녀자리',
        libra: '천칭자리', scorpio: '전갈자리', sagittarius: '사수자리',
        capricorn: '염소자리', aquarius: '물병자리', pisces: '물고기자리',
      };
      events.push({
        type: 'zodiac_season',
        name: `${signNames[season.signId]} 시즌`,
        startDate: season.start,
        endDate: season.end,
        message: `지금은 ${signNames[season.signId]} 시즌입니다. ${signNames[season.signId]}의 에너지가 모든 별자리에 영향을 미치고 있습니다.`,
      });
    }
  }

  // 특별 휴일 체크
  for (const holiday of specialHolidays) {
    if (isDateInRange(mmdd, holiday.start, holiday.end)) {
      events.push({
        type: holiday.type,
        name: holiday.name,
        startDate: holiday.start,
        endDate: holiday.end,
        message: holiday.message,
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
export function getTodaySeasonalMessage(date: Date = new Date()): string | null {
  const events = getActiveEvents(date);
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

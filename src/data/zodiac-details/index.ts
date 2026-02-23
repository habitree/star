import type { ZodiacSignId } from '@/types/zodiac';
import type { ZodiacDetailData } from '@/types/zodiac-detail';
import { ariesDetail } from './aries';
import { taurusDetail } from './taurus';
import { geminiDetail } from './gemini';
import { cancerDetail } from './cancer';
import { leoDetail } from './leo';
import { virgoDetail } from './virgo';
import { libraDetail } from './libra';
import { scorpioDetail } from './scorpio';
import { sagittariusDetail } from './sagittarius';
import { capricornDetail } from './capricorn';
import { aquariusDetail } from './aquarius';
import { piscesDetail } from './pisces';

export const zodiacDetails: Record<ZodiacSignId, ZodiacDetailData> = {
  aries: ariesDetail,
  taurus: taurusDetail,
  gemini: geminiDetail,
  cancer: cancerDetail,
  leo: leoDetail,
  virgo: virgoDetail,
  libra: libraDetail,
  scorpio: scorpioDetail,
  sagittarius: sagittariusDetail,
  capricorn: capricornDetail,
  aquarius: aquariusDetail,
  pisces: piscesDetail,
};

export function getZodiacDetail(signId: ZodiacSignId): ZodiacDetailData {
  return zodiacDetails[signId];
}

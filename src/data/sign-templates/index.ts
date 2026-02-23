import type { ZodiacSignId } from '@/types/zodiac';
import type { SignTemplates } from './types';
import { ariesTemplates } from './aries';
import { taurusTemplates } from './taurus';
import { geminiTemplates } from './gemini';
import { cancerTemplates } from './cancer';
import { leoTemplates } from './leo';
import { virgoTemplates } from './virgo';
import { libraTemplates } from './libra';
import { scorpioTemplates } from './scorpio';
import { sagittariusTemplates } from './sagittarius';
import { capricornTemplates } from './capricorn';
import { aquariusTemplates } from './aquarius';
import { piscesTemplates } from './pisces';

export type { SignTemplates } from './types';

export const signTemplates: Record<ZodiacSignId, SignTemplates> = {
  aries: ariesTemplates,
  taurus: taurusTemplates,
  gemini: geminiTemplates,
  cancer: cancerTemplates,
  leo: leoTemplates,
  virgo: virgoTemplates,
  libra: libraTemplates,
  scorpio: scorpioTemplates,
  sagittarius: sagittariusTemplates,
  capricorn: capricornTemplates,
  aquarius: aquariusTemplates,
  pisces: piscesTemplates,
};

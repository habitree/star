import type { LocalizedText } from '@/types';

export interface SignTemplates {
  overall: { high: LocalizedText[]; medium: LocalizedText[]; low: LocalizedText[] };
  love: { high: LocalizedText[]; medium: LocalizedText[]; low: LocalizedText[] };
  career: { high: LocalizedText[]; medium: LocalizedText[]; low: LocalizedText[] };
  health: { high: LocalizedText[]; medium: LocalizedText[]; low: LocalizedText[] };
  money: { high: LocalizedText[]; medium: LocalizedText[]; low: LocalizedText[] };
}

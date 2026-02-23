/**
 * 타입 정의 통합 내보내기
 */

// Zodiac types
export type {
  Element,
  Modality,
  LocalizedString,
  DateRange,
  ZodiacTraits,
  ZodiacCompatibility,
  ZodiacSign,
  ZodiacSignId,
  ElementColors,
  ZodiacSignMap,
} from './zodiac';

// Alias for backward compatibility
export type { LocalizedString as LocalizedNames } from './zodiac';

// Horoscope types
export type {
  HoroscopeCategory,
  HoroscopeScore,
  LocalizedText,
  CategoryHoroscope,
  DailyHoroscope,
  WeeklyHoroscope,
  MonthlyHoroscope,
  MonthlyKeyDate,
  HoroscopeRequestParams,
  HoroscopeResponse,
} from './horoscope';

// Compatibility types
export type {
  CompatibilityScore,
  CompatibilityCategory,
  CategoryCompatibility,
  CompatibilityResult,
  ElementCompatibility,
  ModalityCompatibility,
  CompatibilityRequestParams,
  CompatibilityMatrix,
  CompatibilityGrade,
  CompatibilityGradeInfo,
  CompatibilitySummary,
} from './compatibility';

// Birth chart types
export type {
  BirthChartInput,
  PlanetPosition,
  Planet,
  HouseInfo,
  Aspect,
  AspectType,
  BirthChartResult,
  BirthChartInterpretation,
  PlanetaryInsight,
  BirthChartRequestParams,
  PlanetInfo,
  HouseMeaning,
} from './birth-chart';

// Zodiac detail types
export type {
  DecanInfo,
  PersonalityExtended,
  LoveProfile,
  CareerProfile,
  HealthProfile,
  FinanceProfile,
  SymbolicData,
  Celebrity,
  ZodiacDetailData,
} from './zodiac-detail';

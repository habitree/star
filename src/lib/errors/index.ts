/**
 * API 에러 처리 표준화 모듈
 */

// 에러 코드 정의
export enum ErrorCode {
  // 클라이언트 에러 (4xx)
  BAD_REQUEST = 'BAD_REQUEST',
  INVALID_SIGN = 'INVALID_SIGN',
  INVALID_DATE = 'INVALID_DATE',
  INVALID_LOCALE = 'INVALID_LOCALE',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',

  // 서버 에러 (5xx)
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  TEMPLATE_LOAD_ERROR = 'TEMPLATE_LOAD_ERROR',
  GENERATION_ERROR = 'GENERATION_ERROR',
  CACHE_ERROR = 'CACHE_ERROR',
}

// 에러 코드별 HTTP 상태 코드 매핑
const errorStatusMap: Record<ErrorCode, number> = {
  [ErrorCode.BAD_REQUEST]: 400,
  [ErrorCode.INVALID_SIGN]: 400,
  [ErrorCode.INVALID_DATE]: 400,
  [ErrorCode.INVALID_LOCALE]: 400,
  [ErrorCode.NOT_FOUND]: 404,
  [ErrorCode.VALIDATION_ERROR]: 422,
  [ErrorCode.INTERNAL_ERROR]: 500,
  [ErrorCode.TEMPLATE_LOAD_ERROR]: 500,
  [ErrorCode.GENERATION_ERROR]: 500,
  [ErrorCode.CACHE_ERROR]: 500,
};

// 에러 코드별 기본 메시지 (다국어)
const errorMessages: Record<ErrorCode, { ko: string; en: string }> = {
  [ErrorCode.BAD_REQUEST]: {
    ko: '잘못된 요청입니다.',
    en: 'Bad request.',
  },
  [ErrorCode.INVALID_SIGN]: {
    ko: '유효하지 않은 별자리입니다.',
    en: 'Invalid zodiac sign.',
  },
  [ErrorCode.INVALID_DATE]: {
    ko: '유효하지 않은 날짜 형식입니다.',
    en: 'Invalid date format.',
  },
  [ErrorCode.INVALID_LOCALE]: {
    ko: '지원하지 않는 언어입니다.',
    en: 'Unsupported locale.',
  },
  [ErrorCode.NOT_FOUND]: {
    ko: '요청한 리소스를 찾을 수 없습니다.',
    en: 'Requested resource not found.',
  },
  [ErrorCode.VALIDATION_ERROR]: {
    ko: '입력값 검증에 실패했습니다.',
    en: 'Validation failed.',
  },
  [ErrorCode.INTERNAL_ERROR]: {
    ko: '서버 내부 오류가 발생했습니다.',
    en: 'Internal server error.',
  },
  [ErrorCode.TEMPLATE_LOAD_ERROR]: {
    ko: '템플릿 로드에 실패했습니다.',
    en: 'Failed to load template.',
  },
  [ErrorCode.GENERATION_ERROR]: {
    ko: '운세 생성에 실패했습니다.',
    en: 'Failed to generate horoscope.',
  },
  [ErrorCode.CACHE_ERROR]: {
    ko: '캐시 처리 중 오류가 발생했습니다.',
    en: 'Cache error occurred.',
  },
};

// 커스텀 에러 클래스
export class ApiError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly details?: Record<string, unknown>;
  public readonly timestamp: string;

  constructor(
    code: ErrorCode,
    message?: string,
    details?: Record<string, unknown>
  ) {
    const defaultMessage = errorMessages[code]?.en || 'An error occurred';
    super(message || defaultMessage);

    this.code = code;
    this.statusCode = errorStatusMap[code] || 500;
    this.details = details;
    this.timestamp = new Date().toISOString();
    this.name = 'ApiError';

    // Error 스택 트레이스 유지
    Error.captureStackTrace?.(this, ApiError);
  }

  toJSON() {
    return {
      success: false,
      error: {
        code: this.code,
        message: this.message,
        details: this.details,
        timestamp: this.timestamp,
      },
    };
  }
}

// 특화된 에러 클래스들
export class ValidationError extends ApiError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(ErrorCode.VALIDATION_ERROR, message, details);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(ErrorCode.NOT_FOUND, message, details);
    this.name = 'NotFoundError';
  }
}

export class TemplateLoadError extends ApiError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(ErrorCode.TEMPLATE_LOAD_ERROR, message, details);
    this.name = 'TemplateLoadError';
  }
}

// 표준 API 응답 인터페이스
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: ErrorCode;
    message: string;
    details?: Record<string, unknown>;
    timestamp: string;
  };
  meta?: {
    cached?: boolean;
    generatedAt?: string;
    cacheExpiry?: string;
  };
}

// 성공 응답 생성
export function createSuccessResponse<T>(
  data: T,
  meta?: ApiResponse<T>['meta']
): ApiResponse<T> {
  return {
    success: true,
    data,
    meta: {
      generatedAt: new Date().toISOString(),
      ...meta,
    },
  };
}

// 에러 응답 생성
export function createErrorResponse(
  error: ApiError | Error,
  locale: string = 'en'
): ApiResponse<null> {
  if (error instanceof ApiError) {
    return error.toJSON() as ApiResponse<null>;
  }

  // 일반 Error를 ApiError로 변환
  const apiError = new ApiError(
    ErrorCode.INTERNAL_ERROR,
    error.message || 'An unexpected error occurred'
  );

  return apiError.toJSON() as ApiResponse<null>;
}

// 유효한 별자리 ID 목록
export const VALID_SIGNS = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
] as const;

// 유효한 로케일 목록
export const VALID_LOCALES = ['ko', 'en', 'zh', 'ja', 'es'] as const;

// 별자리 유효성 검사
export function validateSign(sign: string): void {
  if (!VALID_SIGNS.includes(sign as typeof VALID_SIGNS[number])) {
    throw new ApiError(
      ErrorCode.INVALID_SIGN,
      `Invalid sign: ${sign}. Valid signs are: ${VALID_SIGNS.join(', ')}`,
      { providedSign: sign, validSigns: VALID_SIGNS }
    );
  }
}

// 날짜 유효성 검사 (YYYY-MM-DD 형식 + 합리적 범위)
export function validateDate(dateStr: string): Date {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateStr)) {
    throw new ApiError(
      ErrorCode.INVALID_DATE,
      `Invalid date format: ${dateStr}. Use YYYY-MM-DD format.`,
      { providedDate: dateStr, expectedFormat: 'YYYY-MM-DD' }
    );
  }

  const date = new Date(dateStr + 'T00:00:00');
  if (isNaN(date.getTime())) {
    throw new ApiError(
      ErrorCode.INVALID_DATE,
      `Invalid date: ${dateStr}.`,
      { providedDate: dateStr }
    );
  }

  // 범위: 1900-01-01 ~ 내일
  const minDate = new Date('1900-01-01T00:00:00');
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 1);
  maxDate.setHours(23, 59, 59, 999);

  if (date < minDate || date > maxDate) {
    throw new ApiError(
      ErrorCode.INVALID_DATE,
      `Date out of range: ${dateStr}. Must be between 1900-01-01 and tomorrow.`,
      { providedDate: dateStr, validRange: { min: '1900-01-01', max: 'tomorrow' } }
    );
  }

  return date;
}

// 로케일 유효성 검사
export function validateLocale(locale: string): string {
  if (!VALID_LOCALES.includes(locale as typeof VALID_LOCALES[number])) {
    // 지원하지 않는 로케일은 기본값으로 폴백
    return 'ko';
  }
  return locale;
}

// 에러 로깅 유틸리티
export function logError(error: Error, context?: Record<string, unknown>): void {
  const logData = {
    timestamp: new Date().toISOString(),
    name: error.name,
    message: error.message,
    stack: error.stack,
    ...(error instanceof ApiError && {
      code: error.code,
      statusCode: error.statusCode,
      details: error.details,
    }),
    context,
  };

  console.error('[API Error]', JSON.stringify(logData, null, 2));
}

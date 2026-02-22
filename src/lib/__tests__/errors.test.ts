/**
 * 에러 처리 모듈 단위 테스트
 */

import { describe, it, expect } from 'vitest';
import {
  ApiError,
  ErrorCode,
  ValidationError,
  NotFoundError,
  TemplateLoadError,
  validateSign,
  validateDate,
  validateLocale,
  createSuccessResponse,
  createErrorResponse,
  VALID_SIGNS,
  VALID_LOCALES,
} from '../errors';

describe('errors module', () => {
  describe('ApiError', () => {
    it('should create error with correct properties', () => {
      const error = new ApiError(
        ErrorCode.INVALID_SIGN,
        'Test error message',
        { detail: 'test' }
      );

      expect(error.code).toBe(ErrorCode.INVALID_SIGN);
      expect(error.message).toBe('Test error message');
      expect(error.statusCode).toBe(400);
      expect(error.details).toEqual({ detail: 'test' });
      expect(error.timestamp).toBeTruthy();
      expect(error.name).toBe('ApiError');
    });

    it('should use default message when not provided', () => {
      const error = new ApiError(ErrorCode.INTERNAL_ERROR);

      expect(error.message).toBe('Internal server error.');
    });

    it('should serialize to JSON correctly', () => {
      const error = new ApiError(
        ErrorCode.VALIDATION_ERROR,
        'Validation failed',
        { field: 'test' }
      );

      const json = error.toJSON();

      expect(json.success).toBe(false);
      expect(json.error.code).toBe(ErrorCode.VALIDATION_ERROR);
      expect(json.error.message).toBe('Validation failed');
      expect(json.error.details).toEqual({ field: 'test' });
      expect(json.error.timestamp).toBeTruthy();
    });
  });

  describe('ValidationError', () => {
    it('should be instance of ApiError', () => {
      const error = new ValidationError('Invalid input');

      expect(error).toBeInstanceOf(ApiError);
      expect(error.code).toBe(ErrorCode.VALIDATION_ERROR);
      expect(error.statusCode).toBe(422);
    });
  });

  describe('NotFoundError', () => {
    it('should be instance of ApiError', () => {
      const error = new NotFoundError('Resource not found');

      expect(error).toBeInstanceOf(ApiError);
      expect(error.code).toBe(ErrorCode.NOT_FOUND);
      expect(error.statusCode).toBe(404);
    });
  });

  describe('TemplateLoadError', () => {
    it('should be instance of ApiError', () => {
      const error = new TemplateLoadError('Failed to load template');

      expect(error).toBeInstanceOf(ApiError);
      expect(error.code).toBe(ErrorCode.TEMPLATE_LOAD_ERROR);
      expect(error.statusCode).toBe(500);
    });
  });

  describe('validateSign', () => {
    it('should not throw for valid signs', () => {
      for (const sign of VALID_SIGNS) {
        expect(() => validateSign(sign)).not.toThrow();
      }
    });

    it('should throw ApiError for invalid sign', () => {
      expect(() => validateSign('invalid')).toThrow(ApiError);

      try {
        validateSign('invalid');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).code).toBe(ErrorCode.INVALID_SIGN);
      }
    });
  });

  describe('validateDate', () => {
    it('should return Date for valid date string', () => {
      const date = validateDate('2024-03-15');

      expect(date).toBeInstanceOf(Date);
      expect(date.getFullYear()).toBe(2024);
      expect(date.getMonth()).toBe(2); // 0-indexed
      expect(date.getDate()).toBe(15);
    });

    it('should throw ApiError for invalid date', () => {
      expect(() => validateDate('invalid')).toThrow(ApiError);

      try {
        validateDate('not-a-date');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).code).toBe(ErrorCode.INVALID_DATE);
      }
    });
  });

  describe('validateLocale', () => {
    it('should return same locale for valid locales', () => {
      for (const locale of VALID_LOCALES) {
        expect(validateLocale(locale)).toBe(locale);
      }
    });

    it('should return default locale for invalid locale', () => {
      expect(validateLocale('invalid')).toBe('ko');
      expect(validateLocale('fr')).toBe('ko');
    });
  });

  describe('createSuccessResponse', () => {
    it('should create success response with data', () => {
      const data = { test: 'value' };
      const response = createSuccessResponse(data);

      expect(response.success).toBe(true);
      expect(response.data).toEqual(data);
      expect(response.meta?.generatedAt).toBeTruthy();
    });

    it('should include custom meta', () => {
      const data = { test: 'value' };
      const meta = { cached: true };
      const response = createSuccessResponse(data, meta);

      expect(response.meta?.cached).toBe(true);
    });
  });

  describe('createErrorResponse', () => {
    it('should create error response from ApiError', () => {
      const error = new ApiError(ErrorCode.INVALID_SIGN, 'Invalid sign');
      const response = createErrorResponse(error);

      expect(response.success).toBe(false);
      expect(response.error?.code).toBe(ErrorCode.INVALID_SIGN);
      expect(response.error?.message).toBe('Invalid sign');
    });

    it('should create error response from generic Error', () => {
      const error = new Error('Generic error');
      const response = createErrorResponse(error);

      expect(response.success).toBe(false);
      expect(response.error?.code).toBe(ErrorCode.INTERNAL_ERROR);
    });
  });

  describe('VALID_SIGNS', () => {
    it('should contain all 12 zodiac signs', () => {
      expect(VALID_SIGNS.length).toBe(12);
      expect(VALID_SIGNS).toContain('aries');
      expect(VALID_SIGNS).toContain('taurus');
      expect(VALID_SIGNS).toContain('gemini');
      expect(VALID_SIGNS).toContain('cancer');
      expect(VALID_SIGNS).toContain('leo');
      expect(VALID_SIGNS).toContain('virgo');
      expect(VALID_SIGNS).toContain('libra');
      expect(VALID_SIGNS).toContain('scorpio');
      expect(VALID_SIGNS).toContain('sagittarius');
      expect(VALID_SIGNS).toContain('capricorn');
      expect(VALID_SIGNS).toContain('aquarius');
      expect(VALID_SIGNS).toContain('pisces');
    });
  });

  describe('VALID_LOCALES', () => {
    it('should contain all supported locales', () => {
      expect(VALID_LOCALES.length).toBe(5);
      expect(VALID_LOCALES).toContain('ko');
      expect(VALID_LOCALES).toContain('en');
      expect(VALID_LOCALES).toContain('zh');
      expect(VALID_LOCALES).toContain('ja');
      expect(VALID_LOCALES).toContain('es');
    });
  });
});

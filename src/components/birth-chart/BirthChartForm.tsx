'use client';

import { useState, useMemo } from 'react';
import { majorCities, searchCities, type City } from '@/data/cities';
import type { BirthChartInput } from '@/types';

interface BirthChartFormProps {
  onSubmit: (input: BirthChartInput) => void;
  isLoading?: boolean;
}

interface FormData {
  date: string;
  time: string;
  citySearch: string;
  selectedCity: City | null;
  useManualLocation: boolean;
  manualLat: string;
  manualLng: string;
}

interface FormErrors {
  date?: string;
  time?: string;
  location?: string;
}

export default function BirthChartForm({
  onSubmit,
  isLoading = false,
}: BirthChartFormProps) {
  const [formData, setFormData] = useState<FormData>({
    date: '',
    time: '',
    citySearch: '',
    selectedCity: null,
    useManualLocation: false,
    manualLat: '',
    manualLng: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);

  // 도시 검색 결과
  const citySuggestions = useMemo(() => {
    if (!formData.citySearch || formData.citySearch.length < 1) {
      return majorCities.slice(0, 10);
    }
    return searchCities(formData.citySearch, 'ko');
  }, [formData.citySearch]);

  // 폼 유효성 검사
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 날짜 검사
    if (!formData.date) {
      newErrors.date = '생년월일을 입력해주세요.';
    } else {
      const date = new Date(formData.date);
      const now = new Date();
      if (date > now) {
        newErrors.date = '미래 날짜는 입력할 수 없습니다.';
      }
    }

    // 위치 검사
    if (formData.useManualLocation) {
      const lat = parseFloat(formData.manualLat);
      const lng = parseFloat(formData.manualLng);

      if (isNaN(lat) || lat < -90 || lat > 90) {
        newErrors.location = '위도는 -90에서 90 사이여야 합니다.';
      } else if (isNaN(lng) || lng < -180 || lng > 180) {
        newErrors.location = '경도는 -180에서 180 사이여야 합니다.';
      }
    } else if (!formData.selectedCity) {
      newErrors.location = '출생 장소를 선택해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 폼 제출
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    let latitude: number;
    let longitude: number;
    let timezone: string;

    if (formData.useManualLocation) {
      latitude = parseFloat(formData.manualLat);
      longitude = parseFloat(formData.manualLng);
      timezone = 'UTC';
    } else {
      latitude = formData.selectedCity!.lat;
      longitude = formData.selectedCity!.lng;
      timezone = formData.selectedCity!.tz;
    }

    const input: BirthChartInput = {
      date: formData.date,
      time: formData.time || '12:00',
      latitude,
      longitude,
      timezone,
    };

    onSubmit(input);
  };

  // 도시 선택
  const handleCitySelect = (city: City) => {
    setFormData((prev) => ({
      ...prev,
      selectedCity: city,
      citySearch: city.name.ko,
    }));
    setShowCitySuggestions(false);
    setErrors((prev) => ({ ...prev, location: undefined }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 생년월일 */}
      <div>
        <label
          htmlFor="birthDate"
          className="block text-sm font-medium text-white/90 mb-2"
        >
          생년월일 <span className="text-red-400">*</span>
        </label>
        <input
          type="date"
          id="birthDate"
          value={formData.date}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, date: e.target.value }));
            setErrors((prev) => ({ ...prev, date: undefined }));
          }}
          max={new Date().toISOString().split('T')[0]}
          className={`
            w-full px-4 py-3 rounded-xl
            bg-white/10 border ${errors.date ? 'border-red-400' : 'border-white/20'}
            text-white placeholder-white/40
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
            transition-all duration-200
          `}
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-400">{errors.date}</p>
        )}
      </div>

      {/* 출생 시간 */}
      <div>
        <label
          htmlFor="birthTime"
          className="block text-sm font-medium text-white/90 mb-2"
        >
          출생 시간{' '}
          <span className="text-white/50">(선택사항)</span>
        </label>
        <input
          type="time"
          id="birthTime"
          value={formData.time}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, time: e.target.value }))
          }
          className="
            w-full px-4 py-3 rounded-xl
            bg-white/10 border border-white/20
            text-white placeholder-white/40
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
            transition-all duration-200
          "
        />
        <p className="mt-1 text-xs text-white/50">정확한 시간을 모르면 비워두세요. 정오(12:00)로 계산됩니다.</p>
      </div>

      {/* 출생 장소 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-white/90">
            출생 장소 <span className="text-red-400">*</span>
          </label>
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                useManualLocation: !prev.useManualLocation,
              }))
            }
            className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
          >
            {formData.useManualLocation
              ? '도시로 선택'
              : '직접 좌표 입력'}
          </button>
        </div>

        {formData.useManualLocation ? (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="text"
                placeholder="위도"
                value={formData.manualLat}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, manualLat: e.target.value }))
                }
                className={`
                  w-full px-4 py-3 rounded-xl
                  bg-white/10 border ${errors.location ? 'border-red-400' : 'border-white/20'}
                  text-white placeholder-white/40
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                  transition-all duration-200
                `}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="경도"
                value={formData.manualLng}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, manualLng: e.target.value }))
                }
                className={`
                  w-full px-4 py-3 rounded-xl
                  bg-white/10 border ${errors.location ? 'border-red-400' : 'border-white/20'}
                  text-white placeholder-white/40
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                  transition-all duration-200
                `}
              />
            </div>
          </div>
        ) : (
          <div className="relative">
            <input
              type="text"
              placeholder="도시 검색 (예: 서울, Seoul)"
              value={formData.citySearch}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  citySearch: e.target.value,
                  selectedCity: null,
                }));
                setShowCitySuggestions(true);
              }}
              onFocus={() => setShowCitySuggestions(true)}
              className={`
                w-full px-4 py-3 rounded-xl
                bg-white/10 border ${errors.location ? 'border-red-400' : 'border-white/20'}
                text-white placeholder-white/40
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                transition-all duration-200
              `}
            />

            {/* 도시 목록 드롭다운 */}
            {showCitySuggestions && citySuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-2 py-2 rounded-xl bg-gray-900/95 border border-white/20 shadow-xl max-h-60 overflow-y-auto">
                {citySuggestions.map((city, index) => (
                  <button
                    key={`${city.name.en}-${index}`}
                    type="button"
                    onClick={() => handleCitySelect(city)}
                    className="
                      w-full px-4 py-2 text-left
                      text-white/90 hover:bg-white/10
                      transition-colors duration-150
                    "
                  >
                    <span className="font-medium">{city.name.ko}</span>
                    <span className="text-white/50 text-sm ml-2">
                      {city.country.ko}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {errors.location && (
          <p className="mt-1 text-sm text-red-400">{errors.location}</p>
        )}

        {formData.selectedCity && !formData.useManualLocation && (
          <p className="mt-2 text-sm text-purple-300">
            {formData.selectedCity.name.ko} (
            {formData.selectedCity.lat.toFixed(2)},{' '}
            {formData.selectedCity.lng.toFixed(2)})
          </p>
        )}
      </div>

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={isLoading}
        className={`
          w-full py-4 rounded-xl
          bg-gradient-to-r from-purple-600 to-indigo-600
          text-white font-semibold text-lg
          shadow-lg shadow-purple-500/25
          hover:shadow-purple-500/40 hover:scale-[1.02]
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          transition-all duration-200
        `}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            계산 중...
          </span>
        ) : (
          '차트 계산하기'
        )}
      </button>

      {/* 클릭 외부 영역 클릭 시 드롭다운 닫기 */}
      {showCitySuggestions && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowCitySuggestions(false)}
        />
      )}
    </form>
  );
}

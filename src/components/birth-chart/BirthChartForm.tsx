'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { majorCities, searchCities, type City } from '@/data/cities';
import type { BirthChartInput } from '@/types';

type SupportedLocale = 'ko' | 'en' | 'zh' | 'ja' | 'es';

const UI_TEXT: Record<SupportedLocale, {
  birthDate: string;
  birthTime: string;
  optional: string;
  timeHint: string;
  birthPlace: string;
  useCoordinates: string;
  useCity: string;
  latitude: string;
  longitude: string;
  searchCity: string;
  calculate: string;
  calculating: string;
  errors: {
    dateRequired: string;
    dateInFuture: string;
    locationRequired: string;
    invalidLatitude: string;
    invalidLongitude: string;
  };
}> = {
  ko: {
    birthDate: '생년월일',
    birthTime: '출생 시간',
    optional: '(선택사항)',
    timeHint: '정확한 시간을 모르면 비워두세요. 정오(12:00)로 계산됩니다.',
    birthPlace: '출생 장소',
    useCoordinates: '직접 좌표 입력',
    useCity: '도시로 선택',
    latitude: '위도',
    longitude: '경도',
    searchCity: '도시 검색 (예: 서울, Seoul)',
    calculate: '차트 계산하기',
    calculating: '계산 중...',
    errors: {
      dateRequired: '생년월일을 입력해주세요.',
      dateInFuture: '미래 날짜는 입력할 수 없습니다.',
      locationRequired: '출생 장소를 선택해주세요.',
      invalidLatitude: '위도는 -90에서 90 사이여야 합니다.',
      invalidLongitude: '경도는 -180에서 180 사이여야 합니다.',
    },
  },
  en: {
    birthDate: 'Birth Date',
    birthTime: 'Birth Time',
    optional: '(optional)',
    timeHint: 'Leave blank if unknown. Noon (12:00) will be used.',
    birthPlace: 'Birth Place',
    useCoordinates: 'Enter coordinates',
    useCity: 'Select city',
    latitude: 'Latitude',
    longitude: 'Longitude',
    searchCity: 'Search city (e.g., Seoul, New York)',
    calculate: 'Calculate Chart',
    calculating: 'Calculating...',
    errors: {
      dateRequired: 'Please enter your birth date.',
      dateInFuture: 'Future dates are not allowed.',
      locationRequired: 'Please select your birth place.',
      invalidLatitude: 'Latitude must be between -90 and 90.',
      invalidLongitude: 'Longitude must be between -180 and 180.',
    },
  },
  zh: {
    birthDate: '出生日期',
    birthTime: '出生时间',
    optional: '（可选）',
    timeHint: '如果不知道确切时间，请留空。将使用正午（12:00）计算。',
    birthPlace: '出生地点',
    useCoordinates: '手动输入坐标',
    useCity: '选择城市',
    latitude: '纬度',
    longitude: '经度',
    searchCity: '搜索城市（例如：北京、Shanghai）',
    calculate: '计算星盘',
    calculating: '计算中...',
    errors: {
      dateRequired: '请输入出生日期。',
      dateInFuture: '不能输入未来日期。',
      locationRequired: '请选择出生地点。',
      invalidLatitude: '纬度必须在 -90 到 90 之间。',
      invalidLongitude: '经度必须在 -180 到 180 之间。',
    },
  },
  ja: {
    birthDate: '生年月日',
    birthTime: '出生時刻',
    optional: '（任意）',
    timeHint: '正確な時刻が不明な場合は空欄にしてください。正午（12:00）で計算されます。',
    birthPlace: '出生地',
    useCoordinates: '座標を直接入力',
    useCity: '都市を選択',
    latitude: '緯度',
    longitude: '経度',
    searchCity: '都市を検索（例：東京、Seoul）',
    calculate: 'チャートを計算',
    calculating: '計算中...',
    errors: {
      dateRequired: '生年月日を入力してください。',
      dateInFuture: '未来の日付は入力できません。',
      locationRequired: '出生地を選択してください。',
      invalidLatitude: '緯度は -90 から 90 の間でなければなりません。',
      invalidLongitude: '経度は -180 から 180 の間でなければなりません。',
    },
  },
  es: {
    birthDate: 'Fecha de Nacimiento',
    birthTime: 'Hora de Nacimiento',
    optional: '(opcional)',
    timeHint: 'Déjalo en blanco si no lo sabes. Se usará el mediodía (12:00).',
    birthPlace: 'Lugar de Nacimiento',
    useCoordinates: 'Ingresar coordenadas',
    useCity: 'Seleccionar ciudad',
    latitude: 'Latitud',
    longitude: 'Longitud',
    searchCity: 'Buscar ciudad (ej: Ciudad de México, Madrid)',
    calculate: 'Calcular Carta',
    calculating: 'Calculando...',
    errors: {
      dateRequired: 'Por favor ingresa tu fecha de nacimiento.',
      dateInFuture: 'No se permiten fechas futuras.',
      locationRequired: 'Por favor selecciona tu lugar de nacimiento.',
      invalidLatitude: 'La latitud debe estar entre -90 y 90.',
      invalidLongitude: 'La longitud debe estar entre -180 y 180.',
    },
  },
};

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
  const params = useParams();
  const locale = ((params?.locale as string) || 'ko') as SupportedLocale;
  const ui = UI_TEXT[locale] || UI_TEXT.en;

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

  const citySuggestions = useMemo(() => {
    if (!formData.citySearch || formData.citySearch.length < 1) {
      return majorCities.slice(0, 10);
    }
    return searchCities(formData.citySearch, locale);
  }, [formData.citySearch, locale]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const errText = ui.errors;

    if (!formData.date) {
      newErrors.date = errText.dateRequired;
    } else {
      const date = new Date(formData.date);
      if (date > new Date()) {
        newErrors.date = errText.dateInFuture;
      }
    }

    if (formData.useManualLocation) {
      const lat = parseFloat(formData.manualLat);
      const lng = parseFloat(formData.manualLng);
      if (isNaN(lat) || lat < -90 || lat > 90) {
        newErrors.location = errText.invalidLatitude;
      } else if (isNaN(lng) || lng < -180 || lng > 180) {
        newErrors.location = errText.invalidLongitude;
      }
    } else if (!formData.selectedCity) {
      newErrors.location = errText.locationRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

    onSubmit({ date: formData.date, time: formData.time || '12:00', latitude, longitude, timezone });
  };

  const getCityName = (city: City) =>
    (city.name as Record<string, string>)[locale] || city.name.en;

  const getCountryName = (city: City) =>
    locale === 'ko' ? city.country.ko : city.country.en;

  const handleCitySelect = (city: City) => {
    setFormData((prev) => ({ ...prev, selectedCity: city, citySearch: getCityName(city) }));
    setShowCitySuggestions(false);
    setErrors((prev) => ({ ...prev, location: undefined }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 생년월일 */}
      <div>
        <label htmlFor="birthDate" className="block text-sm font-medium text-white/90 mb-2">
          {ui.birthDate} <span className="text-red-400">*</span>
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
          className={`w-full px-4 py-3 rounded-xl bg-white/10 border ${errors.date ? 'border-red-400' : 'border-white/20'}
            text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
        />
        {errors.date && <p className="mt-1 text-sm text-red-400">{errors.date}</p>}
      </div>

      {/* 출생 시간 */}
      <div>
        <label htmlFor="birthTime" className="block text-sm font-medium text-white/90 mb-2">
          {ui.birthTime} <span className="text-white/50">{ui.optional}</span>
        </label>
        <input
          type="time"
          id="birthTime"
          value={formData.time}
          onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20
            text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
        />
        <p className="mt-1 text-xs text-white/50">{ui.timeHint}</p>
      </div>

      {/* 출생 장소 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-white/90">
            {ui.birthPlace} <span className="text-red-400">*</span>
          </label>
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, useManualLocation: !prev.useManualLocation }))}
            className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
          >
            {formData.useManualLocation ? ui.useCity : ui.useCoordinates}
          </button>
        </div>

        {formData.useManualLocation ? (
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder={ui.latitude}
              value={formData.manualLat}
              onChange={(e) => setFormData((prev) => ({ ...prev, manualLat: e.target.value }))}
              className={`w-full px-4 py-3 rounded-xl bg-white/10 border ${errors.location ? 'border-red-400' : 'border-white/20'}
                text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
            />
            <input
              type="text"
              placeholder={ui.longitude}
              value={formData.manualLng}
              onChange={(e) => setFormData((prev) => ({ ...prev, manualLng: e.target.value }))}
              className={`w-full px-4 py-3 rounded-xl bg-white/10 border ${errors.location ? 'border-red-400' : 'border-white/20'}
                text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
            />
          </div>
        ) : (
          <div className="relative">
            <input
              type="text"
              placeholder={ui.searchCity}
              value={formData.citySearch}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, citySearch: e.target.value, selectedCity: null }));
                setShowCitySuggestions(true);
              }}
              onFocus={() => setShowCitySuggestions(true)}
              className={`w-full px-4 py-3 rounded-xl bg-white/10 border ${errors.location ? 'border-red-400' : 'border-white/20'}
                text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
            />

            {showCitySuggestions && citySuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-2 py-2 rounded-xl bg-gray-900/95 border border-white/20 shadow-xl max-h-60 overflow-y-auto">
                {citySuggestions.map((city, index) => (
                  <button
                    key={`${city.name.en}-${index}`}
                    type="button"
                    onClick={() => handleCitySelect(city)}
                    className="w-full px-4 py-2 text-left text-white/90 hover:bg-white/10 transition-colors duration-150"
                  >
                    <span className="font-medium">{getCityName(city)}</span>
                    <span className="text-white/50 text-sm ml-2">{getCountryName(city)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {errors.location && <p className="mt-1 text-sm text-red-400">{errors.location}</p>}

        {formData.selectedCity && !formData.useManualLocation && (
          <p className="mt-2 text-sm text-purple-300">
            {getCityName(formData.selectedCity)} (
            {formData.selectedCity.lat.toFixed(2)}, {formData.selectedCity.lng.toFixed(2)})
          </p>
        )}
      </div>

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-lg
          shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02]
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {ui.calculating}
          </span>
        ) : (
          ui.calculate
        )}
      </button>

      {showCitySuggestions && (
        <div className="fixed inset-0 z-0" onClick={() => setShowCitySuggestions(false)} />
      )}
    </form>
  );
}

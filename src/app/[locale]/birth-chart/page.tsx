'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import type { BirthChartInput, BirthChartResult as BirthChartResultType } from '@/types';
import BirthChartForm from '@/components/birth-chart/BirthChartForm';
import BirthChartResult from '@/components/birth-chart/BirthChartResult';

export default function BirthChartPage() {
  const t = useTranslations('birthChart');
  const params = useParams();
  const locale = (params.locale as Locale) || 'ko';

  const [result, setResult] = useState<BirthChartResultType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (input: BirthChartInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/birth-chart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to calculate birth chart');
      }

      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300">
            <p>{error}</p>
          </div>
        )}

        {/* 메인 컨텐츠 */}
        {!result ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 입력 폼 */}
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">
                {t('form.title')}
              </h2>
              <BirthChartForm
                locale={locale}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </div>

            {/* 설명 섹션 */}
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">
                  {t('info.whatIsBigThree')}
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-white"
                      >
                        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">
                        {t('info.sunSign')}
                      </h4>
                      <p className="text-white/60 text-sm">
                        {t('info.sunSignDesc')}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-white"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">
                        {t('info.moonSign')}
                      </h4>
                      <p className="text-white/60 text-sm">
                        {t('info.moonSignDesc')}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-white"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.47 2.47a.75.75 0 011.06 0l3.75 3.75a.75.75 0 01-1.06 1.06l-2.47-2.47V21a.75.75 0 01-1.5 0V4.81L8.78 7.28a.75.75 0 01-1.06-1.06l3.75-3.75z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">
                        {t('info.risingSign')}
                      </h4>
                      <p className="text-white/60 text-sm">
                        {t('info.risingSignDesc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">
                  {t('info.whyTimeMatters')}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {t('info.timeExplanation')}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* 다시 계산 버튼 */}
            <div className="mb-8 flex justify-end">
              <button
                onClick={handleReset}
                className="
                  px-6 py-2 rounded-lg
                  bg-white/10 border border-white/20
                  text-white/80 hover:text-white
                  hover:bg-white/20
                  transition-all duration-200
                  flex items-center gap-2
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                    clipRule="evenodd"
                  />
                </svg>
                {t('result.calculateAgain')}
              </button>
            </div>

            {/* 결과 */}
            <BirthChartResult result={result} locale={locale} />
          </div>
        )}
      </div>
    </div>
  );
}

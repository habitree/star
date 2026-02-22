'use client';

import { useState } from 'react';
import type { BirthChartInput, BirthChartResult as BirthChartResultType } from '@/types';
import BirthChartForm from '@/components/birth-chart/BirthChartForm';
import BirthChartResult from '@/components/birth-chart/BirthChartResult';
import { AdSenseUnit } from '@/components/ads';
import { getAdSensePublisherId } from '@/lib/adsense-config';

export default function BirthChartPage() {
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
              출생 차트
            </span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            출생 시간과 장소를 입력하여 당신만의 Big Three(태양, 달, 상승궁)를 알아보세요.
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
                출생 정보 입력
              </h2>
              <BirthChartForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </div>

            {/* 설명 섹션 */}
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">
                  Big Three란?
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
                      <h4 className="text-white font-semibold">태양 별자리 (Sun Sign)</h4>
                      <p className="text-white/60 text-sm">
                        당신의 핵심 자아와 정체성을 나타냅니다. 가장 널리 알려진 별자리입니다.
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
                      <h4 className="text-white font-semibold">달 별자리 (Moon Sign)</h4>
                      <p className="text-white/60 text-sm">
                        내면의 감정, 본능, 무의식적 반응을 나타냅니다.
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
                      <h4 className="text-white font-semibold">상승궁 (Rising Sign)</h4>
                      <p className="text-white/60 text-sm">
                        첫인상과 외부에 보이는 모습, 사회적 가면을 나타냅니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">
                  출생 시간이 왜 중요한가요?
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  달 별자리와 상승궁은 출생 시간에 따라 달라집니다. 달은 약 2.5일마다, 상승궁은 약 2시간마다 별자리가 바뀝니다. 정확한 출생 시간을 알면 더 정확한 차트를 얻을 수 있습니다.
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
                다시 계산하기
              </button>
            </div>

            {/* 결과 */}
            <BirthChartResult result={result} />

            {/* 결과 아래 배너 광고 */}
            {getAdSensePublisherId() && (
              <div className="mt-8">
                <AdSenseUnit
                  adSlot={`${getAdSensePublisherId()}/birth-chart-result-banner`}
                  adFormat="auto"
                  responsive={true}
                  className="w-full"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

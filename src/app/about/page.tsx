import { Metadata } from 'next';
import Link from 'next/link';
import { AdSenseUnit } from '@/components/ads';
import { isAdSenseEnabled } from '@/lib/adsense-config';
import { getSiteUrl } from '@/lib/site-url';

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  title: '소개',
  description: '별자리 운세 서비스 소개 - 12별자리 운세, 궁합, 출생 차트 정보를 제공하는 무료 점성술 서비스입니다.',
  alternates: { canonical: `${baseUrl}/about` },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">별자리 운세 소개</h1>

        <div className="space-y-8">
          {/* 서비스 소개 */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">서비스 소개</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              별자리 운세는 12별자리에 기반한 운세, 궁합, 출생 차트 정보를 제공하는
              무료 점성술 서비스입니다. 매일 새롭게 업데이트되는 운세 정보와
              상세한 별자리 분석을 통해 하루를 더 의미 있게 시작하실 수 있습니다.
            </p>
            <p className="text-white/80 leading-relaxed">
              점성술의 오랜 전통과 지혜를 현대적인 인터페이스로 제공하며,
              누구나 쉽게 자신의 별자리에 대해 알아볼 수 있도록 설계되었습니다.
            </p>
          </div>

          {/* 주요 기능 */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">주요 기능</h2>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">
                  &#x2B50;
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">오늘의 운세</h3>
                  <p className="text-white/70 text-sm">
                    12별자리별 매일 업데이트되는 종합운, 연애운, 직장운, 건강운, 금전운을
                    확인할 수 있습니다. 행운의 숫자, 색상, 시간 등 실용적인 정보도 함께 제공합니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-xl">
                  &#x2764;
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">별자리 궁합</h3>
                  <p className="text-white/70 text-sm">
                    두 별자리 간의 연애, 우정, 업무 궁합을 상세하게 분석합니다.
                    원소(불/땅/바람/물) 조합에 따른 케미도 확인할 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-xl">
                  &#x1F4CA;
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">출생 차트</h3>
                  <p className="text-white/70 text-sm">
                    출생 날짜, 시간, 장소를 입력하면 태양 별자리, 달 별자리, 상승궁(Big Three)을
                    계산하여 보다 깊은 자기 이해를 도와드립니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-xl">
                  &#x1F4D6;
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">별자리 상세 정보</h3>
                  <p className="text-white/70 text-sm">
                    각 별자리의 데칸별 성격, 강점과 약점, 적합한 직업, 건강 관리법,
                    재물운, 유명인, 신화까지 폭넓은 정보를 제공합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 참고사항 */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">참고사항</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              본 서비스에서 제공하는 모든 운세 및 점성술 정보는 오락 및 참고 목적으로 제공됩니다.
              과학적으로 검증된 정보가 아니며, 중요한 의사결정에 이를 근거로 사용하는 것은
              권장하지 않습니다.
            </p>
            <p className="text-white/80 leading-relaxed">
              건강, 재정, 법률 등 중요한 문제에 대해서는 반드시 해당 분야의
              전문가와 상담하시기 바랍니다.
            </p>
          </div>

          {/* AdSense */}
          {isAdSenseEnabled() && (
            <div className="mt-4">
              <AdSenseUnit adFormat="auto" responsive />
            </div>
          )}

          {/* CTA */}
          <div className="text-center py-8">
            <p className="text-white/60 mb-6">지금 바로 나의 별자리를 확인해보세요</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/horoscope" className="btn-primary text-center">
                오늘의 운세 보기
              </Link>
              <Link href="/compatibility" className="btn-secondary text-center">
                궁합 확인하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Metadata } from 'next';
import { AdSenseUnit } from '@/components/ads';
import { isAdSenseEnabled } from '@/lib/adsense-config';
import { getSiteUrl } from '@/lib/site-url';

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  title: '문의하기',
  description: '별자리 운세 서비스에 대한 문의사항, 의견, 피드백을 보내주세요.',
  alternates: { canonical: `${baseUrl}/contact` },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">문의하기</h1>

        <div className="space-y-8">
          {/* 연락처 */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">연락처</h2>
            <p className="text-white/80 leading-relaxed mb-6">
              서비스 이용 중 궁금한 점이나 개선 의견이 있으시면 아래 이메일로 연락주세요.
              가능한 빠른 시간 내에 답변 드리겠습니다.
            </p>
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <p className="text-white/50 text-sm">이메일</p>
                <a
                  href="mailto:contact@luckytoday.one"
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  contact@luckytoday.one
                </a>
              </div>
            </div>
          </div>

          {/* 문의 유형 안내 */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">문의 유형 안내</h2>
            <div className="grid gap-4">
              <div className="p-4 bg-white/5 rounded-xl">
                <h3 className="text-white font-semibold mb-1">서비스 이용 문의</h3>
                <p className="text-white/60 text-sm">
                  운세 확인, 출생 차트 계산, 궁합 분석 등 서비스 이용 방법에 관한 질문
                </p>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <h3 className="text-white font-semibold mb-1">오류 신고</h3>
                <p className="text-white/60 text-sm">
                  서비스 이용 중 발견한 오류나 버그에 관한 신고
                </p>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <h3 className="text-white font-semibold mb-1">개선 의견</h3>
                <p className="text-white/60 text-sm">
                  새로운 기능 제안이나 서비스 개선에 관한 의견
                </p>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <h3 className="text-white font-semibold mb-1">개인정보 관련</h3>
                <p className="text-white/60 text-sm">
                  개인정보 처리, 쿠키 사용 등 프라이버시 관련 문의
                </p>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <h3 className="text-white font-semibold mb-1">광고 관련</h3>
                <p className="text-white/60 text-sm">
                  광고 게재, 광고 문의, 부적절한 광고 신고 등
                </p>
              </div>
            </div>
          </div>

          {/* 유의사항 */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">유의사항</h2>
            <ul className="list-disc pl-6 text-white/80 space-y-2">
              <li>답변은 영업일 기준 1~3일 이내에 드리도록 하겠습니다.</li>
              <li>스팸, 광고성 메일은 답변이 제공되지 않습니다.</li>
              <li>
                개인정보 관련 문의는{' '}
                <a href="/privacy" className="text-purple-400 hover:text-purple-300 underline">
                  개인정보처리방침
                </a>
                을 먼저 확인해주세요.
              </li>
            </ul>
          </div>
          {/* AdSense */}
          {isAdSenseEnabled() && (
            <div className="mt-4">
              <AdSenseUnit adFormat="auto" responsive />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

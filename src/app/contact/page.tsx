import { Metadata } from 'next';
import { AdSenseUnit } from '@/components/ads';
import { isAdSenseEnabled } from '@/lib/adsense-config';
import { getSiteUrl } from '@/lib/site-url';

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  title: '문의하기 | 별자리 운세',
  description: '별자리 운세 서비스에 대한 문의사항, 의견, 피드백을 보내주세요.',
  alternates: { canonical: `${baseUrl}/contact` },
};

const CONTACT_TYPES = [
  {
    icon: '⭐',
    title: '서비스 이용 문의',
    desc: '운세 확인, 타로, 바이오리듬, 출생 차트, 별자리 궁합 등 기능 이용 방법에 관한 질문',
  },
  {
    icon: '🐛',
    title: '오류 신고',
    desc: '서비스 이용 중 발견한 오류나 버그 신고. 발생 상황, 기기, 브라우저 정보를 함께 알려주시면 빠르게 처리됩니다.',
  },
  {
    icon: '💡',
    title: '개선 의견',
    desc: '새로운 기능 제안이나 서비스 개선에 관한 의견. 여러분의 피드백이 서비스를 발전시킵니다.',
  },
  {
    icon: '🔒',
    title: '개인정보 관련',
    desc: '개인정보 처리, 쿠키, 데이터 삭제 요청 등 프라이버시 관련 문의',
  },
  {
    icon: '📢',
    title: '광고 / 어필리에이트 관련',
    desc: '부적절한 광고 신고, 광고 게재 문의, 어필리에이트 파트너십 제안 등',
  },
  {
    icon: '🤝',
    title: '비즈니스 협업',
    desc: '콘텐츠 협업, 파트너십, 미디어 문의 등 비즈니스 관련 제안',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-4xl mb-3">✉️</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">문의하기</h1>
          <p className="text-white/60 text-sm">
            궁금한 점이나 의견이 있으시면 언제든지 연락주세요.
          </p>
        </div>

        <div className="space-y-6">

          {/* 이메일 연락처 */}
          <div className="glass-card p-8">
            <h2 className="text-xl font-semibold text-white mb-4">이메일 문의</h2>
            <p className="text-white/70 leading-relaxed mb-6 text-sm">
              서비스 이용 중 궁금한 점이나 개선 의견이 있으시면 아래 이메일로 연락주세요.
              영업일 기준 <strong className="text-white">1~3일 이내</strong> 답변 드립니다.
            </p>
            <a
              href="mailto:contact@luckytoday.one"
              className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-0.5">이메일</p>
                <p className="text-purple-400 group-hover:text-purple-300 font-medium transition-colors">
                  contact@luckytoday.one
                </p>
              </div>
            </a>
          </div>

          {/* Ko-fi 응원 */}
          <div className="glass-card p-6 border border-[#FF5E5B]/20 text-center">
            <p className="text-white/60 text-sm mb-3">
              서비스가 마음에 드셨다면 커피 한 잔으로 응원해 주세요 ☕
            </p>
            <a
              href="https://ko-fi.com/starzodiac"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                         bg-[#FF5E5B]/90 hover:bg-[#FF5E5B] text-white text-sm font-medium
                         transition-colors"
            >
              ☕ Ko-fi로 응원하기
            </a>
          </div>

          {/* 문의 유형 안내 */}
          <div className="glass-card p-8">
            <h2 className="text-xl font-semibold text-white mb-6">문의 유형 안내</h2>
            <div className="grid gap-3">
              {CONTACT_TYPES.map((item) => (
                <div key={item.title} className="flex gap-3 p-4 bg-white/5 rounded-xl">
                  <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 유의사항 */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white mb-4">유의사항</h2>
            <ul className="space-y-2 text-white/70 text-sm">
              <li className="flex gap-2">
                <span className="text-purple-400 shrink-0">▸</span>
                답변은 영업일 기준 1~3일 이내에 드리도록 하겠습니다.
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400 shrink-0">▸</span>
                스팸, 광고성 메일은 답변이 제공되지 않습니다.
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400 shrink-0">▸</span>
                개인정보 관련 문의는{' '}
                <a href="/privacy" className="text-purple-400 hover:text-purple-300 underline">
                  개인정보처리방침
                </a>
                을 먼저 확인해주세요.
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400 shrink-0">▸</span>
                운세 결과에 대한 개인 상담은 제공하지 않습니다.
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

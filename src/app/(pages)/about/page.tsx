import { Metadata } from 'next';
import Link from 'next/link';
import { AdSenseUnit } from '@/components/ads';
import { isAdSenseEnabled } from '@/lib/adsense-config';
import { getSiteUrl } from '@/lib/site-url';

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  title: 'About LuckyToday — Free Daily Horoscope & Astrology Service',
  description: 'LuckyToday is a free multilingual astrology service covering 12 zodiac signs × 5 categories × 5 languages. Explore daily horoscopes, tarot, biorhythm, and compatibility — updated every day.',
  alternates: { canonical: `${baseUrl}/about` },
  openGraph: {
    title: 'About LuckyToday — Free Daily Horoscope',
    description: 'Free multilingual daily horoscope service for 12 zodiac signs in 5 languages. Entertainment-focused astrology for self-reflection and fun.',
    url: `${baseUrl}/about`,
    type: 'website',
  },
};

const FEATURES = [
  {
    icon: '⭐',
    gradient: 'from-purple-500 to-pink-500',
    title: '매일 업데이트 운세',
    desc: '12별자리 × 종합·연애·직장·건강·금전 5카테고리 운세를 매일 새롭게 제공합니다. 행운의 숫자·색상·시간대별 조언도 함께 확인하세요.',
  },
  {
    icon: '❤️',
    gradient: 'from-red-500 to-pink-500',
    title: '별자리 궁합 (144조합)',
    desc: '12별자리 × 12별자리 144가지 모든 조합의 연애·우정·직장 궁합을 상세하게 분석합니다. 원소(불·땅·바람·물) 케미도 확인할 수 있습니다.',
  },
  {
    icon: '🔮',
    gradient: 'from-indigo-500 to-purple-500',
    title: '오늘의 타로 카드',
    desc: '메이저 아르카나 22장 중 오늘의 카드를 뽑아 운세와 연결된 해석을 제공합니다. 매일 바뀌는 가변 보상으로 내일 카드가 기대됩니다.',
  },
  {
    icon: '📊',
    gradient: 'from-blue-500 to-cyan-500',
    title: '30일 운세 트렌드 & 캘린더',
    desc: '과거 30일과 미래 7일의 운세 흐름을 베지어 곡선 그래프로 시각화합니다. 월간 히트맵 캘린더로 좋은 날·나쁜 날을 한눈에 파악하세요.',
  },
  {
    icon: '🧬',
    gradient: 'from-green-500 to-emerald-500',
    title: '바이오리듬',
    desc: '생년월일 기반으로 신체·감성·지성 사이클을 계산하여 오늘의 컨디션 피크와 주의가 필요한 날을 미리 알려드립니다.',
  },
  {
    icon: '🌍',
    gradient: 'from-yellow-500 to-orange-500',
    title: '5개 언어 완전 지원',
    desc: '한국어·영어·중국어·일본어·스페인어로 운세·궁합·별자리 정보 전체를 제공합니다. 브라우저 언어 설정에 따라 자동 감지됩니다.',
  },
  {
    icon: '🔥',
    gradient: 'from-orange-500 to-red-500',
    title: '스트릭 & 배지 시스템',
    desc: '매일 방문 체크인으로 스트릭을 쌓고 3·7·14·30·100일 마일스톤 배지를 획득하세요. 스트릭이 쌓일수록 더 많은 콘텐츠가 해금됩니다.',
  },
  {
    icon: '📖',
    gradient: 'from-purple-500 to-violet-500',
    title: '점성술 블로그',
    desc: '서양 점성술 기초부터 12별자리 완전 가이드까지 85개 아티클을 5개 언어로 제공합니다. 점성술을 처음 접하는 분도 쉽게 이해할 수 있습니다.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">⭐</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">별자리 운세</h1>
          <p className="text-white/60 leading-relaxed max-w-xl mx-auto">
            매일 돌아오고 싶은 별자리 서비스 —<br />
            12별자리 × 5카테고리 × 5언어로 당신의 하루를 안내합니다.
          </p>
        </div>

        <div className="space-y-8">

          {/* 서비스 소개 */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">서비스 소개</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              별자리 운세는 수천 년의 점성술 전통을 현대적인 인터페이스로 풀어낸
              무료 일일 운세 서비스입니다. 생년월일 하나만으로 10초 안에 오늘의 운세,
              타로 카드, 바이오리듬, 30일 트렌드까지 확인할 수 있습니다.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              단순한 운세 조회를 넘어, 매일 방문할 이유를 만들어 드립니다.
              스트릭 배지 시스템, 매일 바뀌는 타로 카드, 30일 운세 그래프, 별자리 궁합 144조합 —
              탐색할수록 새로운 인사이트가 기다리고 있습니다.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-2xl font-bold text-purple-400">12</p>
                <p className="text-white/50 text-xs mt-1">별자리</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-2xl font-bold text-pink-400">5</p>
                <p className="text-white/50 text-xs mt-1">언어</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-2xl font-bold text-blue-400">144</p>
                <p className="text-white/50 text-xs mt-1">궁합 조합</p>
              </div>
            </div>
          </div>

          {/* 주요 기능 */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">주요 기능</h2>
            <div className="grid gap-5">
              {FEATURES.map((f) => (
                <div key={f.title} className="flex gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-xl`}>
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">{f.title}</h3>
                    <p className="text-white/65 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 미션 */}
          <div className="glass-card p-8 border border-purple-500/20">
            <h2 className="text-2xl font-semibold text-white mb-4">우리의 미션</h2>
            <blockquote className="border-l-4 border-purple-500 pl-4 py-1 text-white/80 leading-relaxed italic mb-4">
              &ldquo;점성술의 지혜를 누구나 쉽게, 매일 새롭게.&rdquo;
            </blockquote>
            <p className="text-white/70 leading-relaxed text-sm">
              별자리 운세는 오락을 넘어 자기 이해의 도구가 될 수 있다고 믿습니다.
              매일 운세를 확인하는 작은 습관이 하루를 더 의식적으로 살아가는 계기가 되길 바랍니다.
              서비스는 완전 무료이며, 광고와 후원으로 운영됩니다.
            </p>
          </div>

          {/* 에디토리얼 팀 */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Editorial Team / 편집팀</h2>
            <p className="text-white/70 leading-relaxed text-sm mb-6">
              LuckyToday&apos;s horoscope content is developed and maintained by our editorial team, combining traditional astrological knowledge with modern content systems.
            </p>
            <div className="grid gap-4">
              <div className="flex gap-4 p-4 bg-white/5 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl flex-shrink-0">
                  🔮
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">LuckyToday Editorial Team</h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    Our editorial team curates daily horoscope interpretations based on traditional Western astrology — including planetary transits, elemental influences, and zodiac archetypes. All content is reviewed for accuracy against established astrological traditions.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white/5 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl flex-shrink-0">
                  🌍
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Localization Team</h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    Our localization team ensures cultural adaptation — not just translation — for Korean, English, Chinese, Japanese, and Spanish audiences. Astrological metaphors and cultural nuances are preserved across all five languages.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <p className="text-white/70 text-sm">
                <strong className="text-white">Contact our team:</strong>{' '}
                <a href="mailto:contact@luckytoday.one" className="text-purple-400 hover:text-purple-300">
                  contact@luckytoday.one
                </a>
              </p>
            </div>
          </div>

          {/* 운세 생성 방법 투명성 */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">How Our Horoscopes Work / 운세 생성 방법</h2>
            <p className="text-white/70 leading-relaxed text-sm mb-4">
              We believe in full transparency about how our content is generated.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3 p-3 bg-white/5 rounded-lg">
                <span className="text-purple-400 shrink-0 mt-0.5">1.</span>
                <p className="text-white/70"><strong className="text-white">Template-based system:</strong> Each zodiac sign has a curated library of interpretations written by our editorial team, covering personality archetypes, elemental energies, and planetary influences.</p>
              </div>
              <div className="flex gap-3 p-3 bg-white/5 rounded-lg">
                <span className="text-purple-400 shrink-0 mt-0.5">2.</span>
                <p className="text-white/70"><strong className="text-white">Daily variation:</strong> The system selects interpretations daily based on the current date and sign combination, ensuring each day feels fresh while remaining grounded in traditional astrology.</p>
              </div>
              <div className="flex gap-3 p-3 bg-white/5 rounded-lg">
                <span className="text-purple-400 shrink-0 mt-0.5">3.</span>
                <p className="text-white/70"><strong className="text-white">Entertainment focus:</strong> All content is designed for entertainment and self-reflection. We do not claim to predict specific future events. Horoscopes are a lens for thinking about your day, not a roadmap.</p>
              </div>
              <div className="flex gap-3 p-3 bg-white/5 rounded-lg">
                <span className="text-purple-400 shrink-0 mt-0.5">4.</span>
                <p className="text-white/70"><strong className="text-white">Tarot cards:</strong> Our tarot readings are drawn from the 22 Major Arcana cards using traditional interpretations. Card selection is date-based, ensuring consistent but daily-varying insights.</p>
              </div>
            </div>
            <Link
              href="/how-it-works"
              className="inline-block mt-5 text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Learn more about our methodology →
            </Link>
          </div>

          {/* 참고사항 */}
          <div className="glass-card p-8 border border-yellow-500/10">
            <h2 className="text-xl font-semibold text-white mb-3">⚠️ Disclaimer / 참고사항</h2>
            <p className="text-white/70 leading-relaxed text-sm mb-3">
              All horoscope and astrology content on LuckyToday is provided for <strong className="text-white">entertainment and reference purposes only</strong>. It is not scientifically validated. Do not use it as the basis for decisions regarding health, finances, or legal matters. Consult qualified professionals for serious life decisions.
            </p>
            <p className="text-white/70 leading-relaxed text-sm mb-3">
              본 서비스에서 제공하는 모든 운세 및 점성술 정보는
              <strong className="text-white"> 오락 및 참고 목적</strong>으로만 제공됩니다.
              과학적으로 검증된 정보가 아니며, 건강·재정·법률 등 중요한 의사결정에
              사용하지 마시고 해당 분야 전문가와 상담하시기 바랍니다.
            </p>
            <p className="text-white/50 text-xs">
              Some pages may contain affiliate links. Clicking these helps support the service at no additional cost to you.
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
                ⭐ 오늘의 운세 보기
              </Link>
              <Link href="/compatibility" className="btn-secondary text-center">
                ❤️ 궁합 확인하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

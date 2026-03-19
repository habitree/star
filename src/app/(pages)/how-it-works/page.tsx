import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site-url';

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  title: 'How Our Horoscopes Work | LuckyToday',
  description: 'Full transparency on how LuckyToday generates daily horoscopes. Learn about our editorial process, template-based content system, and our commitment to entertainment-focused astrology.',
  alternates: { canonical: `${baseUrl}/how-it-works` },
  openGraph: {
    title: 'How Our Horoscopes Work | LuckyToday',
    description: 'Transparent explanation of how LuckyToday generates daily horoscope content for 12 zodiac signs in 5 languages.',
    url: `${baseUrl}/how-it-works`,
    type: 'article',
  },
};

const STEPS = [
  {
    number: '01',
    icon: '📚',
    title: 'Editorial Content Library',
    titleKo: '에디토리얼 콘텐츠 라이브러리',
    desc: 'Our editorial team has crafted a rich library of astrological interpretations for each of the 12 zodiac signs. These interpretations are rooted in traditional Western astrology — drawing from ancient texts, modern astrological practice, and established zodiac archetypes covering personality, elemental energies (fire, earth, air, water), and planetary rulerships.',
    descKo: '편집팀이 12별자리 각각에 대한 풍부한 점성술 해석 라이브러리를 구축했습니다. 이 해석들은 전통 서양 점성술에 뿌리를 두고 있습니다.',
  },
  {
    number: '02',
    icon: '📅',
    title: 'Date-Based Daily Selection',
    titleKo: '날짜 기반 일일 선택',
    desc: 'Each day, our system selects horoscope content using the current date and zodiac sign as inputs. This ensures that each day\'s reading is distinct while remaining consistent — if you check your horoscope at 9am or 9pm, you\'ll see the same content for that day. There is no randomness; the selection is deterministic and reproducible.',
    descKo: '매일 현재 날짜와 별자리를 입력으로 운세 콘텐츠를 선택합니다. 같은 날 언제 확인해도 동일한 결과를 볼 수 있습니다.',
  },
  {
    number: '03',
    icon: '🌐',
    title: 'Five-Language Localization',
    titleKo: '5개 언어 현지화',
    desc: 'All horoscope content is written in Korean, English, Chinese (Simplified), Japanese, and Spanish — not machine-translated, but independently crafted for each language. Our localization team ensures that astrological metaphors resonate culturally, not just linguistically. Each language version is reviewed for natural expression and cultural appropriateness.',
    descKo: '모든 운세는 한국어·영어·중국어·일본어·스페인어로 제공됩니다. 단순 번역이 아닌 각 언어·문화에 맞게 현지화된 콘텐츠입니다.',
  },
  {
    number: '04',
    icon: '🎴',
    title: 'Tarot Card Readings',
    titleKo: '타로 카드 리딩',
    desc: 'Daily tarot cards are drawn from the 22 Major Arcana based on the date and zodiac sign. Each card\'s interpretation follows traditional Rider-Waite symbolism, with upright and reversed meanings. Our editorial team has written unique interpretations connecting each card to the zodiac sign\'s characteristics for a more personalized reading experience.',
    descKo: '일일 타로 카드는 날짜와 별자리에 따라 메이저 아르카나 22장 중에서 선택됩니다. 라이더-웨이트 상징 체계를 따릅니다.',
  },
  {
    number: '05',
    icon: '🧬',
    title: 'Biorhythm Calculation',
    titleKo: '바이오리듬 계산',
    desc: 'Biorhythm cycles (physical: 23 days, emotional: 28 days, intellectual: 33 days) are calculated mathematically from your date of birth. This is a well-documented pseudo-scientific framework that many people find useful for self-reflection. We present it transparently as a reference tool, not a scientific prediction.',
    descKo: '바이오리듬 사이클(신체 23일, 감성 28일, 지성 33일)은 생년월일로 수학적으로 계산됩니다.',
  },
  {
    number: '06',
    icon: '🔮',
    title: 'Compatibility Matrix',
    titleKo: '궁합 매트릭스',
    desc: 'Our 144-combination compatibility database was built by our editorial team using traditional zodiac compatibility principles — elemental affinities (fire with air, earth with water), modality matching (cardinal, fixed, mutable), and known archetypal dynamics between signs. Each combination has unique compatibility scores and narrative descriptions.',
    descKo: '144개 궁합 조합 데이터베이스는 전통 별자리 궁합 원리 — 원소 친화성, 모달리티 매칭 등을 기반으로 편집팀이 구축했습니다.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🔭</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How Our Horoscopes Work
          </h1>
          <p className="text-white/60 leading-relaxed max-w-xl mx-auto">
            Full transparency on how LuckyToday generates daily horoscope content — because we believe you deserve to know exactly what you&apos;re reading.
          </p>
        </div>

        <div className="space-y-6">

          {/* Core principle */}
          <div className="glass-card p-8 border border-purple-500/20">
            <h2 className="text-xl font-semibold text-white mb-3">Our Core Principle</h2>
            <blockquote className="border-l-4 border-purple-500 pl-4 py-1 text-white/80 leading-relaxed italic mb-4">
              &ldquo;Horoscopes are a mirror for self-reflection, not a window into fixed fate.&rdquo;
            </blockquote>
            <p className="text-white/70 text-sm leading-relaxed">
              LuckyToday presents astrology as an <strong className="text-white">entertainment and self-reflection tool</strong>.
              We do not claim that planetary positions determine your future, nor that our readings are scientifically proven.
              Instead, we offer a structured framework — drawn from thousands of years of astrological tradition — that many people find helpful for thinking about their day with intention.
            </p>
          </div>

          {/* Step-by-step process */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Our Content Process</h2>
            <div className="space-y-6">
              {STEPS.map((step) => (
                <div key={step.number} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-xl">
                      {step.icon}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-purple-400 text-xs font-mono">{step.number}</span>
                      <h3 className="text-white font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed mb-1">{step.desc}</p>
                    <p className="text-white/40 text-xs leading-relaxed">{step.descKo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What we do NOT claim */}
          <div className="glass-card p-8 border border-red-500/10">
            <h2 className="text-xl font-semibold text-white mb-4">What We Do NOT Claim</h2>
            <ul className="space-y-3">
              {[
                'We do not claim horoscopes are scientifically validated predictions.',
                'We do not claim to know your personal future.',
                'We do not collect or use your personal birth data for anything other than local on-device calculation.',
                'We do not provide medical, financial, or legal advice.',
                'We do not guarantee accuracy of astrological compatibility scores.',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-white/70 text-sm">
                  <span className="text-red-400 shrink-0 mt-0.5">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* What we DO offer */}
          <div className="glass-card p-8 border border-green-500/10">
            <h2 className="text-xl font-semibold text-white mb-4">What We DO Offer</h2>
            <ul className="space-y-3">
              {[
                'Thoughtfully curated horoscope content based on traditional Western astrology.',
                'Daily variety — fresh content every day based on date and sign.',
                'Five-language support with cultural adaptation, not just translation.',
                'Full transparency about our content generation methodology (this page).',
                'Free access to all horoscope content — no sign-up required.',
                'Privacy-first design: all personalization happens locally on your device.',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-white/70 text-sm">
                  <span className="text-green-400 shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="glass-card p-6 border border-amber-500/20 bg-amber-500/5">
            <h2 className="text-lg font-semibold text-white mb-3">⚠️ Entertainment Disclaimer</h2>
            <p className="text-amber-200/80 text-sm leading-relaxed">
              All content on LuckyToday — including daily horoscopes, tarot readings, biorhythm analysis, and compatibility scores — is provided <strong>for entertainment and self-reflection purposes only</strong>. This content is not scientifically validated. Do not use it as the sole basis for decisions about health, finances, relationships, or legal matters. For important life decisions, please consult qualified professionals.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center py-6">
            <p className="text-white/50 text-sm mb-4">Questions about our methodology?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-colors text-sm"
              >
                ✉️ Contact Us
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-colors text-sm"
              >
                About LuckyToday
              </Link>
              <Link
                href="/horoscope"
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:opacity-90 transition-opacity text-sm"
              >
                ⭐ Try Daily Horoscope
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

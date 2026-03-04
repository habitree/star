'use client';

import Link from 'next/link';
import type { SmartCTA } from '@/types/horoscope-extended';

const CTA_TEXT: Record<string, string> = {
  ko: '오늘의 추천',
  en: "Today's Picks",
  zh: '今日推荐',
  ja: '今日のおすすめ',
  es: 'Recomendaciones de Hoy',
};

interface SmartCTASectionProps {
  ctas: SmartCTA[];
  locale?: string;
}

export default function SmartCTASection({ ctas, locale = 'ko' }: SmartCTASectionProps) {
  if (ctas.length === 0) return null;

  const title = CTA_TEXT[locale] ?? CTA_TEXT['ko'];

  return (
    <div className="space-y-3">
      <p className="text-xs text-white/40 text-center tracking-wider uppercase">{title}</p>
      <div className={`grid gap-3 ${ctas.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {ctas.map(cta => (
          <Link
            key={cta.id}
            href={cta.href}
            className="glass-card p-4 flex flex-col gap-2 hover:bg-white/10 transition-all group"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{cta.icon}</span>
              <span className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                {cta.title}
              </span>
              <span className="ml-auto text-white/30 group-hover:text-white/60 transition-colors text-sm">→</span>
            </div>
            <p className="text-xs text-white/55 leading-relaxed">{cta.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

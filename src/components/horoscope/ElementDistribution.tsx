'use client';

/**
 * ElementDistribution — Big Three 원소 분포 차트 (Phase 3)
 */

import type { ElementDistribution as ED } from '@/lib/birth-chart-content';

const ELEM_CONFIG = {
  fire:  { label: { ko:'불🔥', en:'Fire🔥', zh:'火🔥', ja:'火🔥', es:'Fuego🔥' }, color: 'from-red-500 to-orange-400' },
  earth: { label: { ko:'땅🌿', en:'Earth🌿', zh:'土🌿', ja:'土🌿', es:'Tierra🌿' }, color: 'from-green-600 to-emerald-500' },
  air:   { label: { ko:'바람💨', en:'Air💨', zh:'风💨', ja:'風💨', es:'Aire💨' }, color: 'from-sky-400 to-blue-400' },
  water: { label: { ko:'물💧', en:'Water💧', zh:'水💧', ja:'水💧', es:'Agua💧' }, color: 'from-blue-600 to-indigo-500' },
} as const;

type ElemKey = keyof typeof ELEM_CONFIG;
type L = keyof (typeof ELEM_CONFIG)['fire']['label'];

const TEXT = {
  ko: { title: '원소 분포' },
  en: { title: 'Element Distribution' },
  zh: { title: '元素分布' },
  ja: { title: '元素分布' },
  es: { title: 'Distribución Elemental' },
} as const;

interface ElementDistributionProps {
  distribution: ED;
  locale?: string;
}

export default function ElementDistribution({ distribution, locale = 'ko' }: ElementDistributionProps) {
  const tl = TEXT[(locale as L) in TEXT ? (locale as L) : 'ko'];

  const entries = (Object.keys(ELEM_CONFIG) as ElemKey[])
    .map(k => ({ key: k, pct: distribution[k], ...ELEM_CONFIG[k] }))
    .filter(e => e.pct > 0)
    .sort((a, b) => b.pct - a.pct);

  return (
    <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
      <p className="text-white/50 text-xs mb-3">{tl.title}</p>
      <div className="space-y-2">
        {entries.map(e => (
          <div key={e.key} className="flex items-center gap-3">
            <span className="text-xs text-white/60 w-14 flex-shrink-0">
              {e.label[(locale as L) in e.label ? (locale as L) : 'en']}
            </span>
            <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${e.color} transition-all duration-700`}
                style={{ width: `${e.pct}%` }}
              />
            </div>
            <span className="text-white/40 text-xs w-8 text-right">{e.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

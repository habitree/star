'use client';

import type { AccuracyStats } from '@/types/engagement';
import { getAccuracyBadge } from '@/lib/fortune-stats';

interface FortuneAccuracyStatsProps {
  stats: AccuracyStats;
  locale?: string;
}

type SupportedLocale = 'ko' | 'en' | 'zh' | 'ja' | 'es';

const TEXT = {
  ko: {
    title: '운세 적중률',
    subtitle: (n: number) => `별과 당신의 직감이 ${n}% 일치합니다`,
    totalLabel: '총 피드백',
    bestLabel: '가장 잘 맞는 분야',
    catLabels: { love: '연애운', career: '직장운', health: '건강운', money: '금전운', overall: '종합운' },
    streakGreat: (n: number) => `최근 ${n}회 연속 적중 🔥`,
    streakMiss: (n: number) => `최근 ${n}회 연속 빗나감`,
    accuracyNote: (n: number) => `피드백 ${n}개 기준`,
  },
  en: {
    title: 'Fortune Accuracy',
    subtitle: (n: number) => `Your intuition matches the stars ${n}% of the time`,
    totalLabel: 'Total Feedbacks',
    bestLabel: 'Best Category',
    catLabels: { love: 'Love', career: 'Career', health: 'Health', money: 'Money', overall: 'Overall' },
    streakGreat: (n: number) => `${n} hits in a row 🔥`,
    streakMiss: (n: number) => `${n} misses in a row`,
    accuracyNote: (n: number) => `Based on ${n} feedbacks`,
  },
  zh: {
    title: '运势准确率',
    subtitle: (n: number) => `您的直觉与星星${n}%吻合`,
    totalLabel: '总反馈数',
    bestLabel: '最准确的领域',
    catLabels: { love: '爱情运', career: '事业运', health: '健康运', money: '财运', overall: '综合运' },
    streakGreat: (n: number) => `连续${n}次命中 🔥`,
    streakMiss: (n: number) => `连续${n}次未中`,
    accuracyNote: (n: number) => `基于${n}条反馈`,
  },
  ja: {
    title: '運勢的中率',
    subtitle: (n: number) => `あなたの直感と星が${n}%一致しています`,
    totalLabel: '総フィードバック',
    bestLabel: '最も当たる分野',
    catLabels: { love: '恋愛運', career: '仕事運', health: '健康運', money: '金運', overall: '総合運' },
    streakGreat: (n: number) => `直近${n}回連続的中 🔥`,
    streakMiss: (n: number) => `直近${n}回連続ミス`,
    accuracyNote: (n: number) => `${n}件のフィードバック基準`,
  },
  es: {
    title: 'Precisión del Horóscopo',
    subtitle: (n: number) => `Tu intuición coincide con las estrellas el ${n}% del tiempo`,
    totalLabel: 'Total de Comentarios',
    bestLabel: 'Mejor Categoría',
    catLabels: { love: 'Amor', career: 'Trabajo', health: 'Salud', money: 'Dinero', overall: 'General' },
    streakGreat: (n: number) => `${n} aciertos seguidos 🔥`,
    streakMiss: (n: number) => `${n} fallos seguidos`,
    accuracyNote: (n: number) => `Basado en ${n} comentarios`,
  },
} as const;

export default function FortuneAccuracyStats({ stats, locale = 'ko' }: FortuneAccuracyStatsProps) {
  const loc: SupportedLocale = (locale as SupportedLocale) in TEXT ? (locale as SupportedLocale) : 'ko';
  const t = TEXT[loc];
  const badge = getAccuracyBadge(stats.accuracy);

  const catEntries = Object.entries(stats.categoryAccuracy) as [keyof typeof t.catLabels, number][];

  return (
    <div className="glass-card p-5 space-y-4">
      {/* 헤더 */}
      <div className="text-center">
        <div className="text-3xl mb-1" aria-hidden="true">{badge}</div>
        <h3 className="text-white font-semibold text-base">{t.title}</h3>
        <p className="text-white/60 text-sm mt-0.5">{t.subtitle(stats.accuracy)}</p>
      </div>

      {/* 적중률 게이지 */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-white/50 text-xs">{t.accuracyNote(stats.totalFeedbacks)}</span>
          <span className="text-white font-bold text-lg">{stats.accuracy}%</span>
        </div>
        <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-zodiac-primary to-purple-400 transition-all duration-700"
            style={{ width: `${stats.accuracy}%` }}
            role="progressbar"
            aria-valuenow={stats.accuracy}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      {/* 카테고리별 적중률 */}
      {catEntries.length > 0 && (
        <div className="space-y-2">
          {catEntries
            .sort(([, a], [, b]) => b - a)
            .map(([cat, score]) => (
              <div key={cat} className="flex items-center gap-3">
                <span className="text-white/50 text-xs w-16 shrink-0">{t.catLabels[cat]}</span>
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      score >= 70 ? 'bg-emerald-400' : score >= 50 ? 'bg-amber-400' : 'bg-red-400/70'
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
                <span className="text-white/70 text-xs w-9 text-right shrink-0">{score}%</span>
              </div>
            ))}
        </div>
      )}

      {/* 최고 카테고리 + 스트릭 */}
      <div className="flex items-center justify-between pt-2 border-t border-white/10">
        {stats.bestCategory && (
          <div>
            <p className="text-white/40 text-[10px]">{t.bestLabel}</p>
            <p className="text-white/80 text-xs font-medium">{t.catLabels[stats.bestCategory as keyof typeof t.catLabels]}</p>
          </div>
        )}
        {stats.streak.greatStreak >= 2 && (
          <p className="text-amber-300 text-xs font-medium">{t.streakGreat(stats.streak.greatStreak)}</p>
        )}
        {stats.streak.missStreak >= 2 && (
          <p className="text-white/40 text-xs">{t.streakMiss(stats.streak.missStreak)}</p>
        )}
      </div>
    </div>
  );
}

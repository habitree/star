import type { FinanceProfile } from '@/types/zodiac-detail';

interface FinanceSectionProps {
  finance: FinanceProfile;
}

export default function FinanceSection({ finance }: FinanceSectionProps) {
  return (
    <section className="py-8">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-8">
        재물과 금전
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Spending Pattern */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">&#x1F4B3;</span>
            <h3 className="font-semibold text-lg text-white">소비 패턴</h3>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">{finance.spendingPattern}</p>
        </div>

        {/* Investment Tendency */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">&#x1F4C8;</span>
            <h3 className="font-semibold text-lg text-white">투자 성향</h3>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">{finance.investmentTendency}</p>
        </div>
      </div>

      {/* Tips */}
      <div className="glass-card p-6 mt-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">&#x1F4A1;</span>
          <h3 className="font-semibold text-lg text-white">금전 관리 팁</h3>
        </div>
        <ul className="space-y-3">
          {finance.tips.map((tip, index) => (
            <li key={index} className="flex gap-3 text-sm text-white/80">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs text-white/50">
                {index + 1}
              </span>
              <span className="leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

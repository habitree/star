import type { DecanInfo } from '@/types/zodiac-detail';

interface DecanSectionProps {
  decans: [DecanInfo, DecanInfo, DecanInfo];
  signName: string;
}

export default function DecanSection({ decans, signName }: DecanSectionProps) {
  return (
    <section className="py-8">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-8">
        {signName} 데칸 분류
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {decans.map((decan) => (
          <div key={decan.number} className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-sm font-bold text-white">
                {decan.number}
              </span>
              <div>
                <h3 className="font-semibold text-white">
                  {decan.number}데칸
                </h3>
                <p className="text-sm text-white/50">{decan.dateRange}</p>
              </div>
            </div>

            <div className="mb-3">
              <span className="text-xs text-white/40 uppercase tracking-wider">부지배행성</span>
              <p className="text-white/90 font-medium">{decan.subRuler.ko}</p>
            </div>

            <p className="text-sm text-white/70 leading-relaxed mb-4">
              {decan.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {decan.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-white/70"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

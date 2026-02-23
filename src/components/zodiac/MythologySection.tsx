interface MythologySectionProps {
  mythology: {
    greekMyth: string;
    easternConnection: string;
  };
}

export default function MythologySection({ mythology }: MythologySectionProps) {
  return (
    <section className="py-8">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-8">
        신화와 역사
      </h2>

      <div className="space-y-6">
        {/* Greek Myth */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">&#x1F3DB;</span>
            <h3 className="font-semibold text-lg text-white">그리스 신화</h3>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">{mythology.greekMyth}</p>
        </div>

        {/* Eastern Connection */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">&#x262F;</span>
            <h3 className="font-semibold text-lg text-white">동양 점성술 연관</h3>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">{mythology.easternConnection}</p>
        </div>
      </div>
    </section>
  );
}

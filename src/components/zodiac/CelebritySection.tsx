import type { Celebrity } from '@/types/zodiac-detail';

interface CelebritySectionProps {
  celebrities: Celebrity[];
  signName: string;
}

export default function CelebritySection({ celebrities, signName }: CelebritySectionProps) {
  const koreanCelebs = celebrities.filter((c) => c.isKorean);
  const internationalCelebs = celebrities.filter((c) => !c.isKorean);

  return (
    <section className="py-8">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-8">
        {signName} 유명인
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Korean */}
        {koreanCelebs.length > 0 && (
          <div className="glass-card p-6">
            <h3 className="font-semibold text-white mb-4">&#x1F1F0;&#x1F1F7; 한국 유명인</h3>
            <ul className="space-y-3">
              {koreanCelebs.map((celeb) => (
                <li key={celeb.name}>
                  <p className="text-white font-medium text-sm">{celeb.name}</p>
                  {celeb.birthday && (
                    <p className="text-xs text-white/40">{celeb.birthday}</p>
                  )}
                  <p className="text-xs text-white/60 mt-0.5">{celeb.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* International */}
        {internationalCelebs.length > 0 && (
          <div className="glass-card p-6">
            <h3 className="font-semibold text-white mb-4">&#x1F30D; 해외 유명인</h3>
            <ul className="space-y-3">
              {internationalCelebs.map((celeb) => (
                <li key={celeb.name}>
                  <p className="text-white font-medium text-sm">{celeb.name}</p>
                  {celeb.birthday && (
                    <p className="text-xs text-white/40">{celeb.birthday}</p>
                  )}
                  <p className="text-xs text-white/60 mt-0.5">{celeb.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

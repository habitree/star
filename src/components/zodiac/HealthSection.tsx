import type { HealthProfile } from '@/types/zodiac-detail';

interface HealthSectionProps {
  health: HealthProfile;
}

export default function HealthSection({ health }: HealthSectionProps) {
  return (
    <section className="py-8">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-8">
        건강
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Governed Body Parts */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">&#x1FA7A;</span>
            <h3 className="font-semibold text-lg text-white">관장 신체부위</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {health.governedBodyParts.map((part) => (
              <span
                key={part}
                className="px-3 py-1 text-sm rounded-full bg-white/10 text-white/80"
              >
                {part}
              </span>
            ))}
          </div>
        </div>

        {/* Recommended Activities */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">&#x1F3CB;</span>
            <h3 className="font-semibold text-lg text-white">추천 활동</h3>
          </div>
          <ul className="space-y-2">
            {health.recommendedActivities.map((activity, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                {activity}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Vulnerabilities */}
      <div className="glass-card p-6 mt-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">&#x26A0;</span>
          <h3 className="font-semibold text-lg text-white">취약 영역</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {health.vulnerabilities.map((vuln, index) => (
            <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-amber-400 font-medium text-sm">{vuln.area}</p>
              <p className="text-white/50 text-xs mt-1">{vuln.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stress Management */}
      <div className="glass-card p-6 mt-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">&#x1F9D8;</span>
          <h3 className="font-semibold text-lg text-white">스트레스 관리법</h3>
        </div>
        <ul className="space-y-3">
          {health.stressManagement.map((tip, index) => (
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

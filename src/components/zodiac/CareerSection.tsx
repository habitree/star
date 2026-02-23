import type { CareerProfile } from '@/types/zodiac-detail';

interface CareerSectionProps {
  career: CareerProfile;
}

export default function CareerSection({ career }: CareerSectionProps) {
  return (
    <section className="py-8">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-8">
        직업과 커리어
      </h2>

      {/* Work Style */}
      <div className="glass-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">&#x1F4BC;</span>
          <h3 className="font-semibold text-lg text-white">업무 스타일</h3>
        </div>
        <p className="text-white/80 leading-relaxed">{career.workStyle}</p>
      </div>

      {/* Suitable Jobs */}
      <div className="glass-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">&#x1F3AF;</span>
          <h3 className="font-semibold text-lg text-white">적합 직업</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {career.suitableJobs.map((job, index) => (
            <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-white font-medium text-sm">{job.title}</p>
              <p className="text-white/50 text-xs mt-1">{job.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Type */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">&#x1F451;</span>
          <h3 className="font-semibold text-lg text-white">리더십 유형</h3>
        </div>
        <p className="text-white/80 leading-relaxed">{career.leadershipType}</p>
      </div>
    </section>
  );
}

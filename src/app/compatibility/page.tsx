import { Metadata } from 'next';
import CompatibilityForm from '@/components/compatibility/CompatibilityForm';

export const metadata: Metadata = {
  title: '별자리 궁합',
  description: '두 별자리의 궁합을 확인해보세요. 연애, 우정, 업무 궁합을 상세하게 분석해드립니다.',
};

function InfoCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="glass-card p-6 text-center">
      <div className="text-purple-400 flex justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
  );
}

export default async function CompatibilityPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 페이지 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            별자리 궁합
          </h1>
          <p className="text-lg text-white/70">
            두 별자리를 선택하고 궁합을 확인하세요
          </p>
        </div>

        {/* 궁합 폼 */}
        <CompatibilityForm />

        {/* 추가 정보 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            }
            title="연애 궁합"
            description="로맨틱한 관계의 조화를 분석합니다"
          />
          <InfoCard
            icon={
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            }
            title="우정 궁합"
            description="친구로서의 케미를 확인합니다"
          />
          <InfoCard
            icon={
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
              </svg>
            }
            title="업무 궁합"
            description="직장에서의 협력 가능성을 분석합니다"
          />
        </div>
      </div>
    </div>
  );
}

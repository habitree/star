import type { SymbolicData } from '@/types/zodiac-detail';

interface SymbolicSectionProps {
  symbolic: SymbolicData;
}

const colorMap: Record<string, string> = {
  '빨강': 'bg-red-500',
  '주황': 'bg-orange-500',
  '금색': 'bg-yellow-500',
  '코랄': 'bg-pink-400',
  '스칼렛': 'bg-red-700',
  '흰색': 'bg-white',
  '초록': 'bg-green-500',
  '파랑': 'bg-blue-500',
  '보라': 'bg-purple-500',
  '분홍': 'bg-pink-500',
  '노랑': 'bg-yellow-400',
  '남색': 'bg-indigo-700',
  '은색': 'bg-gray-300',
  '청록': 'bg-teal-500',
  '갈색': 'bg-amber-800',
  '검정': 'bg-gray-900',
  '베이지': 'bg-amber-200',
  '아이보리': 'bg-amber-50',
  '와인': 'bg-rose-900',
  '크림': 'bg-amber-100',
  '라벤더': 'bg-violet-400',
  '올리브': 'bg-lime-700',
  '네이비': 'bg-blue-900',
  '마젠타': 'bg-fuchsia-600',
  '터콰이즈': 'bg-cyan-500',
  '아쿠아': 'bg-cyan-400',
  '머스타드': 'bg-yellow-600',
  '버건디': 'bg-rose-800',
  '로즈': 'bg-rose-400',
  '민트': 'bg-emerald-300',
  '에메랄드': 'bg-emerald-500',
  '사파이어': 'bg-blue-700',
  '진홍': 'bg-red-600',
  '마룬': 'bg-red-900',
};

function getColorClass(name: string): string {
  for (const [key, value] of Object.entries(colorMap)) {
    if (name.includes(key)) return value;
  }
  return 'bg-white/30';
}

export default function SymbolicSection({ symbolic }: SymbolicSectionProps) {
  return (
    <section className="py-8">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-8">
        상징 데이터
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Lucky Colors */}
        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-4">&#x1F3A8; 행운의 색상</h3>
          <div className="space-y-3">
            {symbolic.luckyColors.map((color) => (
              <div key={color.name} className="flex items-center gap-3">
                <span className={`w-4 h-4 rounded-full flex-shrink-0 ${getColorClass(color.name)}`} />
                <div>
                  <p className="text-sm text-white/90">{color.name}</p>
                  <p className="text-xs text-white/50">{color.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gemstones */}
        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-4">&#x1F48E; 행운의 보석</h3>
          <div className="space-y-3">
            {symbolic.gemstones.map((gem) => (
              <div key={gem.name}>
                <p className="text-sm text-white/90">{gem.name}</p>
                <p className="text-xs text-white/50">{gem.meaning}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lucky Numbers */}
        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-4">&#x1F522; 행운의 숫자</h3>
          <div className="flex flex-wrap gap-2">
            {symbolic.luckyNumbers.map((num) => (
              <span
                key={num}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white font-bold text-sm"
              >
                {num}
              </span>
            ))}
          </div>
        </div>

        {/* Flowers */}
        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-4">&#x1F33A; 행운의 꽃</h3>
          <ul className="space-y-2">
            {symbolic.flowers.map((flower) => (
              <li key={flower} className="text-sm text-white/80">{flower}</li>
            ))}
          </ul>
        </div>

        {/* Animals */}
        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-4">&#x1F43E; 행운의 동물</h3>
          <ul className="space-y-2">
            {symbolic.animals.map((animal) => (
              <li key={animal} className="text-sm text-white/80">{animal}</li>
            ))}
          </ul>
        </div>

        {/* Lucky Day */}
        <div className="glass-card p-6 flex items-center justify-center">
          <div className="text-center">
            <h3 className="font-semibold text-white mb-2">&#x1F4C5; 행운의 요일</h3>
            <p className="text-xl text-white/90 font-medium">{symbolic.luckyDay}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

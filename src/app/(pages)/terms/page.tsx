import { Metadata } from 'next';
import { getSiteUrl } from '@/lib/site-url';

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  title: '이용약관 | 별자리 운세',
  description: '별자리 운세 서비스 이용약관입니다.',
  alternates: { canonical: `${baseUrl}/terms` },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">이용약관</h1>

        <div className="glass-card p-8 space-y-8 text-white/80 leading-relaxed">
          <p className="text-white/50 text-sm">최종 수정일: 2026년 3월 6일 &nbsp;·&nbsp; 시행일: 2025년 6월 24일</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">제1조 (목적)</h2>
            <p>
              이 약관은 별자리 운세(이하 &quot;서비스&quot;)의 이용 조건 및 절차에 관한 사항을
              규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">제2조 (서비스의 내용)</h2>
            <p>서비스는 다음의 기능을 제공합니다:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>12별자리 일일·주간·월간 운세 정보 (5카테고리)</li>
              <li>별자리 궁합 분석 (144조합)</li>
              <li>오늘의 타로 카드 (메이저 아르카나 22장)</li>
              <li>출생 차트(Big Three) 계산</li>
              <li>30일 운세 트렌드 그래프 및 월간 캘린더</li>
              <li>바이오리듬 계산</li>
              <li>스트릭 체크인 및 배지 시스템</li>
              <li>점성술 블로그 (기초·별자리별 가이드)</li>
              <li>한국어·영어·중국어·일본어·스페인어 다국어 지원</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">제3조 (서비스 이용)</h2>
            <p>
              서비스는 별도의 회원가입 없이 누구나 무료로 이용할 수 있습니다.
              서비스 접속 및 이용 시 본 약관에 동의한 것으로 간주합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">제4조 (콘텐츠의 성격)</h2>
            <p>
              서비스에서 제공하는 운세, 궁합, 출생 차트, 타로, 바이오리듬 등의 정보는
              점성술·수비학에 기반한 <strong className="text-white"> 오락 및 참고 목적</strong>의 콘텐츠입니다.
              이는 과학적으로 검증된 정보가 아니며, 건강·재정·법률 등 중요한 결정을 내릴 때
              전문가의 조언을 대체하지 않습니다.
            </p>
            <p className="mt-3">
              서비스 제공자는 운세 정보의 정확성이나 결과에 대해 어떠한 보장도 하지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">제5조 (광고)</h2>
            <p>
              서비스는 운영을 위해 Google AdSense를 통한 광고를 게재할 수 있습니다.
              광고 내용은 서비스 제공자의 의견과 무관하며, 광고 상품·서비스에 대한
              책임은 해당 광고주에게 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">제6조 (어필리에이트 링크)</h2>
            <p>
              서비스는 제3자 서비스(예: Moon Reading, LifeReader, Keen Psychic 등)에 대한
              어필리에이트(제휴) 링크를 포함할 수 있습니다. 해당 링크는 <strong className="text-white/80">Sponsored</strong>로
              표시되며, 이용자가 링크를 통해 제3자 서비스를 이용하는 경우
              서비스 운영자가 소정의 수수료를 받을 수 있습니다.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>어필리에이트 링크 클릭은 이용자의 자유이며, 어떠한 강제성도 없습니다.</li>
              <li>제3자 서비스의 품질·결과에 대해 서비스 제공자는 책임을 지지 않습니다.</li>
              <li>제3자 서비스 이용 시 해당 서비스의 약관이 적용됩니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">제7조 (지적재산권)</h2>
            <p>
              서비스에서 제공하는 모든 콘텐츠(텍스트, 이미지, 디자인, 운세 템플릿 등)에 대한
              저작권은 서비스 제공자에게 있습니다. 이용자는 서비스를 통해 얻은
              정보를 개인적인 용도로만 사용할 수 있으며, 상업적 목적으로
              복제·배포·전송·판매할 수 없습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">제8조 (이용자의 의무)</h2>
            <p>이용자는 다음 행위를 하여서는 안 됩니다:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>서비스의 안정적 운영을 방해하는 행위 (과도한 자동화 요청, DDoS 등)</li>
              <li>타인의 개인정보를 부정하게 사용하는 행위</li>
              <li>서비스를 이용하여 법령에 위반되는 행위</li>
              <li>서비스에 게재된 광고를 부정하게 클릭하는 행위</li>
              <li>어필리에이트 링크를 자기 자신을 위해 부정하게 사용하는 행위</li>
              <li>서비스 콘텐츠를 무단으로 크롤링·복제하는 행위</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">제9조 (면책)</h2>
            <p>
              서비스 제공자는 천재지변, 시스템 장애, 제3자 서비스(Cloudflare, Supabase 등) 장애로 인한
              서비스 중단에 대해 책임을 지지 않습니다. 또한 이용자가 서비스 이용으로
              인해 발생한 손해에 대해서도 서비스 제공자의 고의 또는 중과실이 없는 한
              책임을 지지 않습니다.
            </p>
            <p className="mt-3">
              점성술 정보에 기반한 의사결정으로 발생한 손해에 대해서도 서비스 제공자는 책임을 지지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">제10조 (약관 변경)</h2>
            <p>
              서비스 제공자는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은
              서비스 내에 공지함으로써 효력이 발생합니다.
              중요한 변경사항의 경우 서비스 상단에 30일 이상 공지합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">제11조 (준거법 및 관할)</h2>
            <p>
              이 약관은 대한민국 법률에 따라 해석되며, 서비스 이용과 관련한 분쟁은
              대한민국 법원을 전속 관할 법원으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">제12조 (문의)</h2>
            <p>약관에 관한 문의사항은 아래로 연락주시기 바랍니다.</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>이메일: <a href="mailto:contact@luckytoday.one" className="text-purple-400 hover:text-purple-300">contact@luckytoday.one</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

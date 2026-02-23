import { Metadata } from 'next';
import { getSiteUrl } from '@/lib/site-url';

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  title: '이용약관',
  description: '별자리 운세 서비스 이용약관입니다.',
  alternates: { canonical: `${baseUrl}/terms` },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">이용약관</h1>

        <div className="glass-card p-8 space-y-8 text-white/80 leading-relaxed">
          <p className="text-white/60 text-sm">최종 수정일: 2025년 6월 24일</p>

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
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>12별자리 일일/주간 운세 정보</li>
              <li>별자리 궁합 분석</li>
              <li>출생 차트(Big Three) 계산</li>
              <li>별자리별 상세 정보 (성격, 직업, 건강, 재물 등)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">제3조 (서비스 이용)</h2>
            <p>
              서비스는 별도의 회원가입 없이 누구나 무료로 이용할 수 있습니다.
              서비스 이용 시 본 약관에 동의한 것으로 간주합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">제4조 (콘텐츠의 성격)</h2>
            <p>
              서비스에서 제공하는 운세, 궁합, 출생 차트 등의 정보는 점성술에 기반한
              <strong className="text-white"> 오락 및 참고 목적</strong>의 콘텐츠입니다.
              이는 과학적으로 검증된 정보가 아니며, 중요한 결정을 내릴 때
              전문가의 조언을 대체하지 않습니다.
            </p>
            <p className="mt-2">
              서비스 제공자는 운세 정보의 정확성이나 결과에 대해 어떠한 보장도 하지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">제5조 (광고)</h2>
            <p>
              서비스는 운영을 위해 Google AdSense를 통한 광고를 게재할 수 있습니다.
              광고 내용은 서비스 제공자의 의견과 무관하며, 광고 상품이나 서비스에 대한
              책임은 해당 광고주에게 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">제6조 (지적재산권)</h2>
            <p>
              서비스에서 제공하는 모든 콘텐츠(텍스트, 이미지, 디자인 등)에 대한
              저작권은 서비스 제공자에게 있습니다. 이용자는 서비스를 통해 얻은
              정보를 개인적인 용도로만 사용할 수 있으며, 상업적 목적으로
              복제, 배포, 전송할 수 없습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">제7조 (이용자의 의무)</h2>
            <p>이용자는 다음 행위를 하여서는 안 됩니다:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>서비스의 안정적 운영을 방해하는 행위</li>
              <li>타인의 개인정보를 부정하게 사용하는 행위</li>
              <li>서비스를 이용하여 법령에 위반되는 행위</li>
              <li>서비스에 게재된 광고를 부정하게 클릭하는 행위</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">제8조 (면책)</h2>
            <p>
              서비스 제공자는 천재지변, 시스템 장애 등 불가항력적인 사유로 인한
              서비스 중단에 대해 책임을 지지 않습니다. 또한, 이용자가 서비스 이용으로
              인해 발생한 손해에 대해서도 서비스 제공자의 고의 또는 중과실이 없는 한
              책임을 지지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">제9조 (약관 변경)</h2>
            <p>
              서비스 제공자는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은
              서비스 내에 공지함으로써 효력이 발생합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">제10조 (문의)</h2>
            <p>약관에 관한 문의사항은 아래로 연락주시기 바랍니다.</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>이메일: contact@luckytoday.one</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

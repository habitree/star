import { Metadata } from 'next';
import { getSiteUrl } from '@/lib/site-url';

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: '별자리 운세 서비스의 개인정보처리방침입니다.',
  alternates: { canonical: `${baseUrl}/privacy` },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">개인정보처리방침</h1>

        <div className="glass-card p-8 space-y-8 text-white/80 leading-relaxed">
          <p className="text-white/60 text-sm">최종 수정일: 2025년 6월 24일</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. 개인정보의 처리 목적</h2>
            <p>
              별자리 운세(이하 &quot;서비스&quot;)는 다음의 목적을 위하여 개인정보를 처리합니다.
              처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며,
              이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>서비스 제공 및 운영</li>
              <li>출생 차트 계산을 위한 출생 정보 처리</li>
              <li>서비스 이용 통계 분석 및 개선</li>
              <li>광고 서비스 제공 (Google AdSense)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. 수집하는 개인정보 항목</h2>
            <p>서비스는 최소한의 개인정보만을 수집합니다:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="text-white">출생 차트 기능:</strong> 출생일, 출생 시간, 출생 장소 (서버에 저장되지 않으며, 계산 후 즉시 폐기됩니다)</li>
              <li><strong className="text-white">자동 수집 정보:</strong> 방문 기록, 접속 로그, 쿠키, IP 주소, 브라우저 유형</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. 개인정보의 보유 및 이용 기간</h2>
            <p>
              서비스는 개인정보를 수집 목적이 달성된 후 지체 없이 파기합니다.
              출생 차트 계산에 사용된 정보는 서버에 저장하지 않으며,
              브라우저 세션 종료와 함께 모든 입력 데이터가 삭제됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. 제3자 제공</h2>
            <p>서비스는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령에 의하여 제공이 요구되는 경우</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. 쿠키(Cookie) 사용</h2>
            <p>
              서비스는 이용자에게 개별적인 맞춤 서비스를 제공하기 위해 쿠키를 사용합니다.
              쿠키는 웹사이트를 운영하는 데 이용되는 서버가 이용자의 브라우저에 보내는 소량의 정보입니다.
            </p>
            <h3 className="text-lg font-semibold text-white mt-4 mb-2">쿠키 사용 목적</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>즐겨찾기 별자리 저장 (로컬 스토리지)</li>
              <li>Google AdSense 맞춤 광고 제공</li>
              <li>Google Analytics 방문 통계 (사용 시)</li>
            </ul>
            <h3 className="text-lg font-semibold text-white mt-4 mb-2">쿠키 관리 방법</h3>
            <p>
              이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다.
              웹 브라우저의 설정을 통해 쿠키 허용, 차단, 삭제가 가능합니다.
              다만, 쿠키를 차단할 경우 일부 서비스 이용에 제한이 있을 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Google AdSense 및 광고</h2>
            <p>
              서비스는 Google AdSense를 통해 광고를 게재합니다.
              Google은 사용자의 관심사에 기반한 광고를 표시하기 위해 쿠키를 사용할 수 있습니다.
              Google의 개인정보 처리에 관한 자세한 내용은{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                Google 개인정보처리방침
              </a>
              에서 확인하실 수 있습니다.
            </p>
            <p className="mt-2">
              맞춤 광고를 원하지 않는 경우{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                Google 광고 설정
              </a>
              에서 맞춤 광고를 비활성화할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. 개인정보의 안전성 확보 조치</h2>
            <p>서비스는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>HTTPS를 통한 암호화 통신</li>
              <li>개인정보를 서버에 저장하지 않는 정책</li>
              <li>접근 통제를 위한 보안 조치</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. 이용자의 권리</h2>
            <p>이용자는 언제든지 다음의 권리를 행사할 수 있습니다:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>개인정보 처리 현황 확인 요청</li>
              <li>개인정보 정정, 삭제, 처리 정지 요청</li>
              <li>브라우저 쿠키 및 로컬 스토리지 데이터 직접 삭제</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. 개인정보 보호책임자</h2>
            <p>
              개인정보 처리에 관한 문의사항이 있으시면 아래로 연락주시기 바랍니다.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>이메일: contact@luckytoday.one</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. 방침 변경</h2>
            <p>
              이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 정책에 따른 변경이 있는 경우
              웹사이트를 통해 공지할 예정입니다.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

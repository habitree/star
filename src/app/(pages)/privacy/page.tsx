import { Metadata } from 'next';
import { getSiteUrl } from '@/lib/site-url';

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  title: '개인정보처리방침 | 별자리 운세',
  description: '별자리 운세 서비스의 개인정보처리방침입니다.',
  alternates: { canonical: `${baseUrl}/privacy` },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">개인정보처리방침</h1>

        <div className="glass-card p-8 space-y-8 text-white/80 leading-relaxed">
          <p className="text-white/50 text-sm">최종 수정일: 2026년 3월 6일 &nbsp;·&nbsp; 시행일: 2025년 6월 24일</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. 개인정보의 처리 목적</h2>
            <p>
              별자리 운세(이하 &quot;서비스&quot;)는 다음의 목적을 위하여 개인정보를 처리합니다.
              처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며,
              이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>서비스 제공 및 운영 (운세·궁합·타로·바이오리듬 등)</li>
              <li>출생 차트 계산을 위한 출생 정보 처리 (서버 미저장)</li>
              <li>서비스 이용 통계 분석 및 개선</li>
              <li>광고 서비스 제공 (Google AdSense)</li>
              <li>어필리에이트 프로그램 운영 안내</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. 수집하는 개인정보 항목</h2>
            <p>서비스는 최소한의 개인정보만을 수집합니다:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <strong className="text-white">출생 차트 기능:</strong> 출생일, 출생 시간, 출생 장소
                <br /><span className="text-white/50 text-sm">(서버에 저장하지 않으며, 계산 후 즉시 폐기됩니다)</span>
              </li>
              <li>
                <strong className="text-white">운세 기능:</strong> 생년월일, 별자리 선택
                <br /><span className="text-white/50 text-sm">(브라우저 localStorage에만 저장되며 서버 전송 없음)</span>
              </li>
              <li>
                <strong className="text-white">자동 수집 정보:</strong> 방문 기록, 접속 로그, 쿠키, IP 주소, 브라우저 유형, 접속 국가/언어 정보
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. 개인정보의 보유 및 이용 기간</h2>
            <p>
              서비스는 개인정보를 수집 목적이 달성된 후 지체 없이 파기합니다.
              출생 차트·운세 계산에 사용된 정보는 서버에 저장하지 않으며,
              사용자가 브라우저 localStorage를 삭제하면 모든 저장 데이터가 즉시 삭제됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. 제3자 제공</h2>
            <p>서비스는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령에 의하여 제공이 요구되는 경우</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. 쿠키(Cookie) 사용</h2>
            <p>
              서비스는 개인화된 서비스 제공을 위해 쿠키 및 localStorage를 사용합니다.
            </p>
            <h3 className="text-base font-semibold text-white mt-4 mb-2">사용 목적</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>별자리 선호·스트릭·배지 등 이용자 설정 저장 (localStorage)</li>
              <li>접속 국가 기반 언어 자동 감지</li>
              <li>Google AdSense 맞춤 광고 제공</li>
              <li>서비스 이용 통계 분석</li>
            </ul>
            <h3 className="text-base font-semibold text-white mt-4 mb-2">쿠키 관리 방법</h3>
            <p>
              웹 브라우저 설정에서 쿠키 허용·차단·삭제가 가능합니다.
              쿠키를 차단할 경우 일부 서비스(스트릭 저장, 즐겨찾기 등) 이용에 제한이 있을 수 있습니다.
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
            <p className="mt-3">
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
            <h2 className="text-xl font-semibold text-white mb-3">7. 어필리에이트(제휴 마케팅) 고지</h2>
            <p>
              서비스의 일부 페이지에는 제3자 서비스(Moon Reading, LifeReader, Keen Psychic 등)로 연결되는
              <strong className="text-white"> 어필리에이트 링크</strong>가 포함될 수 있습니다.
              이용자가 해당 링크를 통해 제3자 서비스를 구매하거나 이용하는 경우,
              서비스 운영자가 수수료를 받을 수 있습니다.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>어필리에이트 링크는 <strong className="text-white/80">Sponsored</strong> 또는 <strong className="text-white/80">→</strong> 표시로 구분됩니다.</li>
              <li>어필리에이트 링크 클릭 시 제3자 사이트로 이동하며, 해당 사이트의 개인정보처리방침이 적용됩니다.</li>
              <li>제3자 서비스의 품질·이용 결과에 대해 서비스 운영자는 책임을 지지 않습니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. 개인정보의 안전성 확보 조치</h2>
            <p>서비스는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>HTTPS를 통한 암호화 통신 (Cloudflare SSL)</li>
              <li>개인정보를 서버에 저장하지 않는 정책</li>
              <li>Cloudflare Workers 엣지 네트워크를 통한 접근 통제</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. 이용자의 권리</h2>
            <p>이용자는 언제든지 다음의 권리를 행사할 수 있습니다:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>브라우저 localStorage 데이터 직접 삭제 (설정 → 사이트 데이터 삭제)</li>
              <li>쿠키 삭제 및 차단 설정</li>
              <li>개인정보 처리 관련 문의 및 정정·삭제 요청 (이메일 문의)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. 개인정보 보호책임자</h2>
            <p>
              개인정보 처리에 관한 문의사항이 있으시면 아래로 연락주시기 바랍니다.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>이메일: <a href="mailto:contact@luckytoday.one" className="text-purple-400 hover:text-purple-300">contact@luckytoday.one</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. 방침 변경</h2>
            <p>
              이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 정책에 따른 변경이 있는 경우
              웹사이트를 통해 공지할 예정입니다. 중요한 변경사항은 서비스 상단에 공지합니다.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

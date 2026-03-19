import { Metadata } from 'next';
import { locales, type Locale } from '@/i18n/config';
import { getSiteUrl } from '@/lib/site-url';
import { buildLanguageAlternates } from '@/lib/seo-utils';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = getSiteUrl();
  const titles: Record<string, string> = {
    ko: '개인정보처리방침 | LuckyToday',
    en: 'Privacy Policy | LuckyToday',
    zh: '隐私政策 | LuckyToday',
    ja: 'プライバシーポリシー | LuckyToday',
    es: 'Política de Privacidad | LuckyToday',
  };
  return {
    title: titles[locale] ?? titles.en,
    alternates: {
      canonical: `${baseUrl}/${locale}/privacy`,
      languages: buildLanguageAlternates(baseUrl, '/privacy'),
    },
    robots: { index: true, follow: true },
  };
}

const CONTENT: Record<Locale, {
  title: string;
  updated: string;
  sections: { heading: string; body: string | string[] }[];
}> = {
  ko: {
    title: '개인정보처리방침',
    updated: '최종 수정일: 2026년 3월 6일',
    sections: [
      {
        heading: '1. 개인정보의 처리 목적',
        body: '별자리 운세(이하 "서비스")는 서비스 제공, 운세·궁합·타로 기능 운영, 이용 통계 분석, Google AdSense 광고 서비스 제공 목적으로 최소한의 개인정보를 처리합니다.',
      },
      {
        heading: '2. 수집하는 개인정보 항목',
        body: [
          '출생 차트 기능: 출생일, 출생 시간, 출생 장소 (서버에 저장하지 않음)',
          '운세 기능: 생년월일, 별자리 선택 (브라우저 localStorage에만 저장)',
          '자동 수집: 방문 기록, 접속 로그, 쿠키, IP 주소, 브라우저 유형',
        ],
      },
      {
        heading: '3. 보유 및 이용 기간',
        body: '서비스는 개인정보를 수집 목적 달성 후 즉시 파기합니다. localStorage 데이터는 사용자가 직접 브라우저 설정에서 삭제할 수 있습니다.',
      },
      {
        heading: '4. 쿠키(Cookie) 사용',
        body: [
          '별자리 선호·스트릭·배지 등 이용자 설정 저장 (localStorage)',
          '접속 국가 기반 언어 자동 감지',
          'Google AdSense 맞춤 광고 제공 (쿠키 동의 후 활성화)',
          '서비스 이용 통계 분석',
        ],
      },
      {
        heading: '5. Google AdSense 및 광고',
        body: 'Google AdSense를 통해 광고를 게재합니다. Google은 쿠키를 사용하여 사용자의 관심사 기반 광고를 제공합니다. 맞춤 광고를 원하지 않으면 Google 광고 설정(g.co/adsettings)에서 비활성화할 수 있습니다.',
      },
      {
        heading: '6. 이용자 권리',
        body: [
          '브라우저 localStorage 데이터 직접 삭제',
          '쿠키 삭제 및 차단 설정',
          '개인정보 관련 문의: contact@luckytoday.one',
        ],
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: March 6, 2026',
    sections: [
      {
        heading: '1. Purpose of Processing',
        body: 'LuckyToday ("Service") processes minimal personal data to provide horoscope, compatibility, and tarot features, analyze usage statistics, and serve Google AdSense advertisements.',
      },
      {
        heading: '2. Data We Collect',
        body: [
          'Birth chart feature: Date, time, and place of birth (never stored on our servers)',
          'Horoscope feature: Date of birth, zodiac sign selection (stored only in browser localStorage)',
          'Automatically collected: Visit logs, cookies, IP address, browser type, country/language',
        ],
      },
      {
        heading: '3. Data Retention',
        body: 'We do not store personal data on our servers. localStorage data is retained until you clear your browser data. You can delete all stored data at any time via browser settings.',
      },
      {
        heading: '4. Cookies',
        body: [
          'User preferences, streaks, badges (localStorage)',
          'Language auto-detection based on location',
          'Google AdSense personalized ads (active only after cookie consent)',
          'Usage analytics',
        ],
      },
      {
        heading: '5. Google AdSense',
        body: 'We use Google AdSense to display advertisements. Google may use cookies to show interest-based ads. To opt out of personalized ads, visit Google Ad Settings at g.co/adsettings.',
      },
      {
        heading: '6. Your Rights',
        body: [
          'Delete localStorage data via browser settings',
          'Block or delete cookies in your browser',
          'Contact us for data inquiries: contact@luckytoday.one',
        ],
      },
      {
        heading: '7. Entertainment Disclaimer',
        body: 'All horoscope, tarot, and astrology content on LuckyToday is provided for entertainment and informational purposes only. It does not constitute medical, financial, legal, or professional advice.',
      },
    ],
  },
  zh: {
    title: '隐私政策',
    updated: '最后更新：2026年3月6日',
    sections: [
      {
        heading: '1. 数据处理目的',
        body: 'LuckyToday（"服务"）处理最少量的个人数据，用于提供星座运势、配对和塔罗牌功能，分析使用统计，以及提供Google AdSense广告服务。',
      },
      {
        heading: '2. 收集的数据',
        body: [
          '出生图功能：出生日期、时间和地点（不存储在服务器上）',
          '星座功能：出生日期、星座选择（仅存储在浏览器localStorage中）',
          '自动收集：访问记录、Cookie、IP地址、浏览器类型',
        ],
      },
      {
        heading: '3. 数据保留',
        body: '我们不在服务器上存储个人数据。localStorage数据保留至您清除浏览器数据为止。',
      },
      {
        heading: '4. Cookie使用',
        body: [
          '用户设置、连续签到、徽章（localStorage）',
          '基于地区的语言自动检测',
          'Google AdSense个性化广告（仅在Cookie同意后激活）',
          '使用统计分析',
        ],
      },
      {
        heading: '5. Google AdSense',
        body: '我们使用Google AdSense展示广告。Google可能使用Cookie提供基于兴趣的广告。如需退出个性化广告，请访问g.co/adsettings。',
      },
      {
        heading: '6. 您的权利',
        body: [
          '通过浏览器设置删除localStorage数据',
          '在浏览器中阻止或删除Cookie',
          '数据查询请联系：contact@luckytoday.one',
        ],
      },
    ],
  },
  ja: {
    title: 'プライバシーポリシー',
    updated: '最終更新日：2026年3月6日',
    sections: [
      {
        heading: '1. 個人情報の処理目的',
        body: 'LuckyToday（「サービス」）は、星座占い・相性・タロット機能の提供、利用統計分析、およびGoogle AdSense広告配信のために最小限の個人情報を処理します。',
      },
      {
        heading: '2. 収集する個人情報',
        body: [
          'ホロスコープ機能：生年月日、時刻、出生地（サーバーには保存しません）',
          '星座機能：生年月日、星座選択（ブラウザのlocalStorageのみに保存）',
          '自動収集：アクセスログ、Cookie、IPアドレス、ブラウザの種類',
        ],
      },
      {
        heading: '3. 保有期間',
        body: 'サーバーには個人情報を保存しません。localStorageのデータはブラウザの設定からいつでも削除できます。',
      },
      {
        heading: '4. Cookieの使用',
        body: [
          'ユーザー設定、ストリーク、バッジ（localStorage）',
          '地域に基づく言語の自動検出',
          'Google AdSenseパーソナライズ広告（Cookie同意後に有効化）',
          '利用統計分析',
        ],
      },
      {
        heading: '5. Google AdSense',
        body: 'Google AdSenseを使用して広告を表示します。Googleは興味関心に基づく広告のためにCookieを使用することがあります。パーソナライズ広告をオプトアウトするには、g.co/adsettingsをご覧ください。',
      },
      {
        heading: '6. ご利用者の権利',
        body: [
          'ブラウザ設定からlocalStorageデータを削除',
          'Cookieのブロック・削除設定',
          'お問い合わせ：contact@luckytoday.one',
        ],
      },
    ],
  },
  es: {
    title: 'Política de Privacidad',
    updated: 'Última actualización: 6 de marzo de 2026',
    sections: [
      {
        heading: '1. Propósito del Procesamiento',
        body: 'LuckyToday ("Servicio") procesa datos personales mínimos para brindar funciones de horóscopo, compatibilidad y tarot, analizar estadísticas de uso y publicar anuncios de Google AdSense.',
      },
      {
        heading: '2. Datos que Recopilamos',
        body: [
          'Función de carta natal: fecha, hora y lugar de nacimiento (no se almacenan en servidores)',
          'Función de horóscopo: fecha de nacimiento, signo zodiacal (almacenados solo en localStorage del navegador)',
          'Recogida automática: registros de visitas, cookies, dirección IP, tipo de navegador',
        ],
      },
      {
        heading: '3. Retención de Datos',
        body: 'No almacenamos datos personales en nuestros servidores. Puede eliminar los datos de localStorage en cualquier momento desde la configuración del navegador.',
      },
      {
        heading: '4. Uso de Cookies',
        body: [
          'Preferencias, rachas y insignias del usuario (localStorage)',
          'Detección automática de idioma por región',
          'Anuncios personalizados de Google AdSense (activos solo tras consentimiento de cookies)',
          'Análisis de estadísticas de uso',
        ],
      },
      {
        heading: '5. Google AdSense',
        body: 'Utilizamos Google AdSense para mostrar anuncios. Google puede usar cookies para anuncios basados en intereses. Para optar por no recibir anuncios personalizados, visite g.co/adsettings.',
      },
      {
        heading: '6. Sus Derechos',
        body: [
          'Eliminar datos de localStorage desde la configuración del navegador',
          'Bloquear o eliminar cookies en su navegador',
          'Consultas sobre datos: contact@luckytoday.one',
        ],
      },
    ],
  },
};

export default async function LocalePrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = (locales.includes(locale as Locale) ? locale : 'ko') as Locale;
  const content = CONTENT[safeLocale];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{content.title}</h1>
        <p className="text-white/40 text-sm mb-8">{content.updated}</p>

        <div className="glass-card p-6 md:p-8 space-y-8 text-white/80 leading-relaxed">
          {content.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-lg font-semibold text-white mb-3">{section.heading}</h2>
              {Array.isArray(section.body) ? (
                <ul className="list-disc pl-6 space-y-1">
                  {section.body.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{section.body}</p>
              )}
            </section>
          ))}

          {/* Google AdSense 외부 링크 */}
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              {safeLocale === 'ko' ? '외부 링크' : safeLocale === 'zh' ? '外部链接' : safeLocale === 'ja' ? '外部リンク' : safeLocale === 'es' ? 'Enlaces Externos' : 'External Links'}
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">
                  Google Privacy Policy
                </a>
              </li>
              <li>
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">
                  Google Ad Settings
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

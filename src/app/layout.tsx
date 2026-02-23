import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/layout/CookieConsent';
import JsonLd from '@/components/seo/JsonLd';
import './globals.css';

// 애드센스 소유권 확인용 (스니펫 + 메타태그)
const ADSENSE_PUBLISHER_ID = 'ca-pub-4166976105261105';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://luckytoday.one';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '별자리 운세 - 오늘의 운세와 별자리 궁합 | LuckyToday',
    template: '%s | 별자리 운세 - LuckyToday',
  },
  description: '12별자리의 오늘의 운세, 별자리 궁합, 출생 차트를 확인하세요. 매일 업데이트되는 정확한 운세 정보를 제공합니다.',
  keywords: ['운세', '별자리', '오늘의 운세', '별자리 궁합', '출생 차트', '12별자리', 'horoscope', 'zodiac', 'astrology'],
  authors: [{ name: '별자리 운세' }],
  creator: '별자리 운세',
  publisher: '별자리 운세',
  openGraph: {
    title: '별자리 운세 - 오늘의 운세와 별자리 궁합',
    description: '12별자리의 오늘의 운세, 별자리 궁합, 출생 차트를 확인하세요. 매일 업데이트되는 정확한 운세 정보를 제공합니다.',
    type: 'website',
    locale: 'ko_KR',
    url: siteUrl,
    siteName: '별자리 운세 - LuckyToday',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: siteUrl,
    name: '별자리 운세',
    description: '12별자리의 오늘의 운세, 별자리 궁합, 출생 차트를 확인하세요. 매일 업데이트되는 정확한 운세 정보를 제공합니다.',
    inLanguage: 'ko',
    publisher: {
      '@type': 'Organization',
      name: '별자리 운세',
      url: siteUrl,
    },
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '별자리 운세',
    url: siteUrl,
    description: '12별자리 운세, 궁합, 출생 차트 등 점성술 정보 서비스',
  };

  return (
    <html lang="ko" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Google AdSense 소유권 확인 메타태그 */}
        <meta name="google-adsense-account" content={ADSENSE_PUBLISHER_ID} />
        <JsonLd data={websiteJsonLd} />
        <JsonLd data={organizationJsonLd} />
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        {/* Google AdSense 스크립트 - 자동 광고 + 수동 광고 유닛 모두 지원 */}
        <Script
          id="adsense-script"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}

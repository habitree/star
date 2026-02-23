import { Inter, Playfair_Display } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdSenseAuto from '@/components/ads/AdSenseAuto';
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
  title: '별자리 운세 - 오늘의 운세와 별자리 궁합',
  description: '12별자리의 오늘의 운세, 별자리 궁합, 출생 차트를 확인하세요. 매일 업데이트되는 정확한 운세 정보를 제공합니다.',
  keywords: ['horoscope', 'zodiac', 'astrology', 'compatibility', 'birth chart', '운세', '별자리'],
  openGraph: {
    title: '별자리 운세 - 오늘의 운세와 별자리 궁합',
    description: '12별자리의 오늘의 운세, 별자리 궁합, 출생 차트를 확인하세요. 매일 업데이트되는 정확한 운세 정보를 제공합니다.',
    type: 'website',
    locale: 'ko_KR',
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
  };

  return (
    <html lang="ko" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta name="google-adsense-account" content={ADSENSE_PUBLISHER_ID} />
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
          crossOrigin="anonymous"
        />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        <AdSenseAuto />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

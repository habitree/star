import { Inter, Playfair_Display } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

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

export const metadata = {
  title: '별자리 운세 - 오늘의 운세와 별자리 궁합',
  description: '12별자리의 오늘의 운세, 별자리 궁합, 출생 차트를 확인하세요. 매일 업데이트되는 정확한 운세 정보를 제공합니다.',
  keywords: ['horoscope', 'zodiac', 'astrology', 'compatibility', 'birth chart', '운세', '별자리'],
  openGraph: {
    title: '별자리 운세 - 오늘의 운세와 별자리 궁합',
    description: '12별자리의 오늘의 운세, 별자리 궁합, 출생 차트를 확인하세요. 매일 업데이트되는 정확한 운세 정보를 제공합니다.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

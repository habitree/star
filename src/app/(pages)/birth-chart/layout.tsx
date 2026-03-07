import { Metadata } from 'next';
import { getSiteUrl } from '@/lib/site-url';

const baseUrl = getSiteUrl();
const url = `${baseUrl}/birth-chart`;
const description =
  '태어난 날짜와 시간으로 태양·달·승승점 별자리를 확인하세요. 출생 차트로 나의 별자리 성격과 운세를 알아보세요.';

export const metadata: Metadata = {
  title: '출생 차트 - 태양·달·승승점 별자리',
  description,
  openGraph: {
    title: '출생 차트 - 별자리 운세',
    description,
    url,
    type: 'website',
  },
  alternates: { canonical: url },
};

export default function BirthChartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

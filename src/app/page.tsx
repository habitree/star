import { redirect } from 'next/navigation';

// 루트 경로는 기본 언어(한국어)로 리다이렉트
export default function RootPage() {
  redirect('/ko');
}

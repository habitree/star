// 루트 경로는 미들웨어(src/middleware.ts)에서 자동 감지 후 리다이렉트
// 감지 순서: Cookie → CF-IPCountry → Accept-Language → 기본값(ko)
// 이 파일은 미들웨어가 처리하지 못한 경우의 최종 폴백
export { default } from '@/app/[locale]/page';

/**
 * Google AdSense 설정 관리
 * Publisher ID: ca-pub-4166976105261105
 */

const PUBLISHER_ID = 'ca-pub-4166976105261105';

/** Publisher ID 가져오기 */
export const getAdSensePublisherId = (): string => {
  return process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || PUBLISHER_ID;
};

/** AdSense 활성화 여부 확인 */
export const isAdSenseEnabled = (): boolean => {
  return !!getAdSensePublisherId();
};

/** 광고 표시 조건 확인 */
export const shouldShowAds = (): boolean => {
  return isAdSenseEnabled();
};

/** adsbygoogle 스크립트 로드 대기 */
export const waitForAdSense = (): Promise<void> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }
    // 이미 로드된 경우
    if ((window as any).adsbygoogle) {
      resolve();
      return;
    }
    // 스크립트 로드 대기 (최대 5초)
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += 100;
      if ((window as any).adsbygoogle || elapsed >= 5000) {
        clearInterval(interval);
        resolve();
      }
    }, 100);
  });
};

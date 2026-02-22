/**
 * Google AdSense 설정 관리
 */

// Publisher ID 가져오기
export const getAdSensePublisherId = (): string | undefined => {
  return process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
};

// AdSense 활성화 여부 확인
export const isAdSenseEnabled = (): boolean => {
  const publisherId = getAdSensePublisherId();
  
  // Publisher ID가 없으면 비활성화
  if (!publisherId) {
    return false;
  }

  // 개발 환경에서도 광고를 표시할 수 있도록 설정
  // 필요시 아래 주석을 해제하여 개발 환경에서 비활성화
  // if (process.env.NODE_ENV === 'development') {
  //   return false;
  // }

  return true;
};

// 광고 표시 조건 확인
export const shouldShowAds = (): boolean => {
  return isAdSenseEnabled();
};

// 광고 슬롯 ID 생성 헬퍼
export const createAdSlotId = (slotName: string): string => {
  const publisherId = getAdSensePublisherId();
  if (!publisherId) {
    return '';
  }
  // AdSense 슬롯 ID 형식: publisherId/slotName
  return `${publisherId}/${slotName}`;
};


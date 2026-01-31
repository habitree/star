/**
 * 주요 도시 위도/경도 데이터
 */

export interface City {
  name: {
    ko: string;
    en: string;
    zh: string;
    ja: string;
    es: string;
  };
  lat: number;
  lng: number;
  tz: string;
  country: {
    ko: string;
    en: string;
  };
}

export const majorCities: City[] = [
  // 아시아
  {
    name: { ko: '서울', en: 'Seoul', zh: '首尔', ja: 'ソウル', es: 'Seul' },
    lat: 37.5665,
    lng: 126.978,
    tz: 'Asia/Seoul',
    country: { ko: '대한민국', en: 'South Korea' },
  },
  {
    name: { ko: '부산', en: 'Busan', zh: '釜山', ja: '釜山', es: 'Busan' },
    lat: 35.1796,
    lng: 129.0756,
    tz: 'Asia/Seoul',
    country: { ko: '대한민국', en: 'South Korea' },
  },
  {
    name: { ko: '도쿄', en: 'Tokyo', zh: '东京', ja: '東京', es: 'Tokio' },
    lat: 35.6762,
    lng: 139.6503,
    tz: 'Asia/Tokyo',
    country: { ko: '일본', en: 'Japan' },
  },
  {
    name: { ko: '오사카', en: 'Osaka', zh: '大阪', ja: '大阪', es: 'Osaka' },
    lat: 34.6937,
    lng: 135.5023,
    tz: 'Asia/Tokyo',
    country: { ko: '일본', en: 'Japan' },
  },
  {
    name: { ko: '베이징', en: 'Beijing', zh: '北京', ja: '北京', es: 'Pekin' },
    lat: 39.9042,
    lng: 116.4074,
    tz: 'Asia/Shanghai',
    country: { ko: '중국', en: 'China' },
  },
  {
    name: { ko: '상하이', en: 'Shanghai', zh: '上海', ja: '上海', es: 'Shanghai' },
    lat: 31.2304,
    lng: 121.4737,
    tz: 'Asia/Shanghai',
    country: { ko: '중국', en: 'China' },
  },
  {
    name: { ko: '홍콩', en: 'Hong Kong', zh: '香港', ja: '香港', es: 'Hong Kong' },
    lat: 22.3193,
    lng: 114.1694,
    tz: 'Asia/Hong_Kong',
    country: { ko: '홍콩', en: 'Hong Kong' },
  },
  {
    name: { ko: '싱가포르', en: 'Singapore', zh: '新加坡', ja: 'シンガポール', es: 'Singapur' },
    lat: 1.3521,
    lng: 103.8198,
    tz: 'Asia/Singapore',
    country: { ko: '싱가포르', en: 'Singapore' },
  },
  {
    name: { ko: '방콕', en: 'Bangkok', zh: '曼谷', ja: 'バンコク', es: 'Bangkok' },
    lat: 13.7563,
    lng: 100.5018,
    tz: 'Asia/Bangkok',
    country: { ko: '태국', en: 'Thailand' },
  },
  {
    name: { ko: '뭄바이', en: 'Mumbai', zh: '孟买', ja: 'ムンバイ', es: 'Bombay' },
    lat: 19.076,
    lng: 72.8777,
    tz: 'Asia/Kolkata',
    country: { ko: '인도', en: 'India' },
  },

  // 북미
  {
    name: { ko: '뉴욕', en: 'New York', zh: '纽约', ja: 'ニューヨーク', es: 'Nueva York' },
    lat: 40.7128,
    lng: -74.006,
    tz: 'America/New_York',
    country: { ko: '미국', en: 'United States' },
  },
  {
    name: { ko: '로스앤젤레스', en: 'Los Angeles', zh: '洛杉矶', ja: 'ロサンゼルス', es: 'Los Angeles' },
    lat: 34.0522,
    lng: -118.2437,
    tz: 'America/Los_Angeles',
    country: { ko: '미국', en: 'United States' },
  },
  {
    name: { ko: '시카고', en: 'Chicago', zh: '芝加哥', ja: 'シカゴ', es: 'Chicago' },
    lat: 41.8781,
    lng: -87.6298,
    tz: 'America/Chicago',
    country: { ko: '미국', en: 'United States' },
  },
  {
    name: { ko: '샌프란시스코', en: 'San Francisco', zh: '旧金山', ja: 'サンフランシスコ', es: 'San Francisco' },
    lat: 37.7749,
    lng: -122.4194,
    tz: 'America/Los_Angeles',
    country: { ko: '미국', en: 'United States' },
  },
  {
    name: { ko: '토론토', en: 'Toronto', zh: '多伦多', ja: 'トロント', es: 'Toronto' },
    lat: 43.6532,
    lng: -79.3832,
    tz: 'America/Toronto',
    country: { ko: '캐나다', en: 'Canada' },
  },
  {
    name: { ko: '밴쿠버', en: 'Vancouver', zh: '温哥华', ja: 'バンクーバー', es: 'Vancouver' },
    lat: 49.2827,
    lng: -123.1207,
    tz: 'America/Vancouver',
    country: { ko: '캐나다', en: 'Canada' },
  },

  // 유럽
  {
    name: { ko: '런던', en: 'London', zh: '伦敦', ja: 'ロンドン', es: 'Londres' },
    lat: 51.5074,
    lng: -0.1278,
    tz: 'Europe/London',
    country: { ko: '영국', en: 'United Kingdom' },
  },
  {
    name: { ko: '파리', en: 'Paris', zh: '巴黎', ja: 'パリ', es: 'Paris' },
    lat: 48.8566,
    lng: 2.3522,
    tz: 'Europe/Paris',
    country: { ko: '프랑스', en: 'France' },
  },
  {
    name: { ko: '베를린', en: 'Berlin', zh: '柏林', ja: 'ベルリン', es: 'Berlin' },
    lat: 52.52,
    lng: 13.405,
    tz: 'Europe/Berlin',
    country: { ko: '독일', en: 'Germany' },
  },
  {
    name: { ko: '마드리드', en: 'Madrid', zh: '马德里', ja: 'マドリード', es: 'Madrid' },
    lat: 40.4168,
    lng: -3.7038,
    tz: 'Europe/Madrid',
    country: { ko: '스페인', en: 'Spain' },
  },
  {
    name: { ko: '로마', en: 'Rome', zh: '罗马', ja: 'ローマ', es: 'Roma' },
    lat: 41.9028,
    lng: 12.4964,
    tz: 'Europe/Rome',
    country: { ko: '이탈리아', en: 'Italy' },
  },
  {
    name: { ko: '암스테르담', en: 'Amsterdam', zh: '阿姆斯特丹', ja: 'アムステルダム', es: 'Amsterdam' },
    lat: 52.3676,
    lng: 4.9041,
    tz: 'Europe/Amsterdam',
    country: { ko: '네덜란드', en: 'Netherlands' },
  },

  // 오세아니아
  {
    name: { ko: '시드니', en: 'Sydney', zh: '悉尼', ja: 'シドニー', es: 'Sidney' },
    lat: -33.8688,
    lng: 151.2093,
    tz: 'Australia/Sydney',
    country: { ko: '호주', en: 'Australia' },
  },
  {
    name: { ko: '멜버른', en: 'Melbourne', zh: '墨尔本', ja: 'メルボルン', es: 'Melbourne' },
    lat: -37.8136,
    lng: 144.9631,
    tz: 'Australia/Melbourne',
    country: { ko: '호주', en: 'Australia' },
  },

  // 남미
  {
    name: { ko: '상파울루', en: 'Sao Paulo', zh: '圣保罗', ja: 'サンパウロ', es: 'Sao Paulo' },
    lat: -23.5505,
    lng: -46.6333,
    tz: 'America/Sao_Paulo',
    country: { ko: '브라질', en: 'Brazil' },
  },
  {
    name: { ko: '멕시코시티', en: 'Mexico City', zh: '墨西哥城', ja: 'メキシコシティ', es: 'Ciudad de Mexico' },
    lat: 19.4326,
    lng: -99.1332,
    tz: 'America/Mexico_City',
    country: { ko: '멕시코', en: 'Mexico' },
  },
];

/**
 * 도시 검색 함수
 */
export function searchCities(
  query: string,
  locale: 'ko' | 'en' | 'zh' | 'ja' | 'es' = 'ko'
): City[] {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) return [];

  return majorCities.filter((city) => {
    const localeName = city.name[locale].toLowerCase();
    const englishName = city.name.en.toLowerCase();
    const countryKo = city.country.ko.toLowerCase();
    const countryEn = city.country.en.toLowerCase();

    return (
      localeName.includes(normalizedQuery) ||
      englishName.includes(normalizedQuery) ||
      countryKo.includes(normalizedQuery) ||
      countryEn.includes(normalizedQuery)
    );
  });
}

/**
 * 도시 이름으로 도시 찾기
 */
export function findCityByName(
  name: string,
  locale: 'ko' | 'en' | 'zh' | 'ja' | 'es' = 'ko'
): City | undefined {
  const normalizedName = name.toLowerCase().trim();

  return majorCities.find((city) => {
    return (
      city.name[locale].toLowerCase() === normalizedName ||
      city.name.en.toLowerCase() === normalizedName
    );
  });
}

/**
 * 가장 가까운 도시 찾기 (위도/경도 기준)
 */
export function findNearestCity(lat: number, lng: number): City {
  let nearestCity = majorCities[0];
  let minDistance = Number.MAX_VALUE;

  for (const city of majorCities) {
    const distance = Math.sqrt(
      Math.pow(city.lat - lat, 2) + Math.pow(city.lng - lng, 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearestCity = city;
    }
  }

  return nearestCity;
}

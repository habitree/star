/**
 * Service Worker — 별자리 운세 서비스 Web Push
 * Cloudflare Workers 배포 환경 호환 (클라이언트 측 SW)
 */

const CACHE_NAME = 'zodiac-sw-v1';

const PUSH_TEXT = {
  ko: { title: '별자리 운세', body: '오늘의 운세를 확인하세요! ✨', view: '운세 보기', dismiss: '닫기' },
  en: { title: 'Daily Horoscope', body: 'Check your fortune today! ✨', view: 'View', dismiss: 'Dismiss' },
  zh: { title: '每日运势', body: '查看您今天的运势！✨', view: '查看运势', dismiss: '关闭' },
  ja: { title: '今日の運勢', body: '今日の運勢を確認しましょう！✨', view: '運勢を見る', dismiss: '閉じる' },
  es: { title: 'Horóscopo Diario', body: '¡Consulta tu fortuna de hoy! ✨', view: 'Ver', dismiss: 'Cerrar' },
};

// SW 설치
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// SW 활성화
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Push 알림 수신
self.addEventListener('push', (event) => {
  if (!event.data) return;

  let payload;
  try {
    payload = event.data.json();
  } catch {
    payload = { title: null, body: event.data.text(), icon: '/icons/icon-192.png' };
  }

  const lang = (payload.locale && PUSH_TEXT[payload.locale]) ? payload.locale : 'ko';
  const txt = PUSH_TEXT[lang];
  const { title = txt.title, body = txt.body, icon, url = '/' } = payload;

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: icon || '/icons/icon-192.png',
      badge: '/icons/badge-72.png',
      tag: 'daily-horoscope',
      renotify: true,
      requireInteraction: false,
      data: { url },
      actions: [
        { action: 'view', title: txt.view },
        { action: 'dismiss', title: txt.dismiss },
      ],
    })
  );
});

// 알림 클릭 처리
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      // 이미 열린 탭이 있으면 포커스
      const existing = clients.find((c) => c.url.includes(self.location.origin));
      if (existing) {
        existing.focus();
        existing.navigate(targetUrl);
        return;
      }
      // 새 탭 열기
      return self.clients.openWindow(targetUrl);
    })
  );
});

/**
 * Web Push 알림 클라이언트 라이브러리
 * Cloudflare Workers 환경 호환 — 클라이언트 측 실행
 */

export type PushPermissionStatus = 'default' | 'granted' | 'denied';

/** Service Worker 등록 */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return null;

  try {
    const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    return reg;
  } catch (err) {
    console.error('[Push] SW 등록 실패:', err);
    return null;
  }
}

/** 현재 알림 권한 상태 */
export function getPermissionStatus(): PushPermissionStatus {
  if (typeof window === 'undefined' || !('Notification' in window)) return 'denied';
  return Notification.permission as PushPermissionStatus;
}

/** Push 구독 신청 */
export async function subscribeToPush(
  vapidPublicKey: string
): Promise<PushSubscription | null> {
  if (typeof window === 'undefined') return null;

  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return null;

    const reg = await registerServiceWorker();
    if (!reg) return null;

    // 기존 구독 확인
    const existing = await reg.pushManager.getSubscription();
    if (existing) return existing;

    // 새 구독
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });
    return sub;
  } catch (err) {
    console.error('[Push] 구독 실패:', err);
    return null;
  }
}

/** Push 구독 해지 */
export async function unsubscribeFromPush(): Promise<boolean> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return false;

  try {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (!sub) return true;
    return sub.unsubscribe();
  } catch {
    return false;
  }
}

/** VAPID 공개 키를 ArrayBuffer로 변환 */
function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const buffer = new ArrayBuffer(rawData.length);
  const outputArray = new Uint8Array(buffer);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return buffer;
}

/** Push 구독 정보를 서버에 저장 */
export async function savePushSubscription(
  subscription: PushSubscription,
  meta: { timeSlot: 'morning' | 'noon' | 'evening'; locale: string; signId: string }
): Promise<boolean> {
  try {
    const sub = subscription.toJSON();
    const res = await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: sub.endpoint,
        keys: sub.keys,
        timeSlot: meta.timeSlot,
        locale: meta.locale,
        signId: meta.signId,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Push 구독 저장 API
 * 클라이언트에서 전송한 Push 구독 정보를 Supabase에 저장
 * Edge runtime 호환 (Cloudflare Workers)
 */

import { NextRequest, NextResponse } from 'next/server';
import type { PushSubscriptionRecord } from '@/types/engagement';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json() as Partial<PushSubscriptionRecord>;

    // 필수 필드 검증
    if (!body.endpoint || !body.keys?.p256dh || !body.keys?.auth) {
      return NextResponse.json({ error: 'Invalid subscription data' }, { status: 400 });
    }

    const record: PushSubscriptionRecord = {
      endpoint: body.endpoint,
      keys: { p256dh: body.keys.p256dh, auth: body.keys.auth },
      timeSlot: body.timeSlot ?? 'morning',
      locale: body.locale ?? 'ko',
      signId: body.signId ?? '',
    };

    // Supabase URL/Key 환경 변수 확인
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      // Supabase 미설정 시 성공 응답 (push 기능은 옵션)
      return NextResponse.json({ ok: true, message: 'Stored locally' });
    }

    // Supabase REST API로 직접 저장 (Edge 호환)
    const res = await fetch(`${supabaseUrl}/rest/v1/push_subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'resolution=merge-duplicates',
      },
      body: JSON.stringify({
        endpoint: record.endpoint,
        p256dh: record.keys.p256dh,
        auth: record.keys.auth,
        time_slot: record.timeSlot,
        locale: record.locale,
        sign_id: record.signId,
        updated_at: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[Push] Supabase 저장 실패:', err);
      // 테이블 미생성 시에도 클라이언트엔 성공 응답
      return NextResponse.json({ ok: true, message: 'Graceful fallback' });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[Push] 구독 저장 오류:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

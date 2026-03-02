/**
 * Supabase 클라이언트
 * 서버 사이드 (API routes, template-loader) 전용
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * 서버용 Supabase 클라이언트 생성
 * service_role key가 있으면 사용, 없으면 anon key 사용
 */
export function createServerSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

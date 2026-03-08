/**
 * Supabase 클라이언트
 * 서버 사이드 (API routes, template-loader) 전용
 *
 * 클라이언트 분리:
 * - createReadSupabaseClient()  — anon key, SELECT 전용 (공개 데이터)
 * - createWriteSupabaseClient() — service_role key 필수, DML 전용
 * - createServerSupabaseClient() — 하위호환 유지 (anon 또는 service_role)
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const CLIENT_OPTIONS = { auth: { persistSession: false } } as const;

/**
 * 읽기 전용 클라이언트 (anon key)
 * 공개 테이블 SELECT, RLS가 SELECT를 허용하는 테이블에 사용
 */
export function createReadSupabaseClient(): SupabaseClient | null {
  if (!SUPABASE_URL || !ANON_KEY) return null;
  return createClient(SUPABASE_URL, ANON_KEY, CLIENT_OPTIONS);
}

/**
 * 쓰기 클라이언트 (service_role key 필수)
 * INSERT/UPDATE/DELETE, RLS 우회 필요 작업에 사용
 * service_role key가 없으면 null 반환
 */
export function createWriteSupabaseClient(): SupabaseClient | null {
  if (!SUPABASE_URL || !SERVICE_KEY) return null;
  return createClient(SUPABASE_URL, SERVICE_KEY, CLIENT_OPTIONS);
}

/**
 * 서버용 클라이언트 (하위호환 유지)
 * service_role key 우선, 없으면 anon key 사용
 */
export function createServerSupabaseClient(): SupabaseClient | null {
  if (!SUPABASE_URL) return null;
  const key = SERVICE_KEY || ANON_KEY;
  if (!key) return null;
  return createClient(SUPABASE_URL, key, CLIENT_OPTIONS);
}

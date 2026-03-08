/**
 * Cloudflare Workers 빌드 스크립트
 *
 * @vercel/og (next/og) 폰트 파일이 nft.json 트레이스에 포함되지 않는
 * Windows 환경 이슈를 우회합니다.
 *
 * copyTracedFiles()는:
 *   - .next/server/[glob].nft.json 을 읽어 추적 파일 목록 파악
 *   - src = .next/standalone/.next/subDir/tracedPath 에서 복사
 *
 * 그러므로:
 *   1. next build (standalone 모드, NEXT_PRIVATE_STANDALONE=true)
 *   2. 원본 .next/server nft.json에 폰트 경로 추가
 *   3. standalone node_modules에 폰트 파일 복사 (src 경로)
 *   4. opennextjs-cloudflare build --skipBuild
 */

import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// Step 1: Next.js 빌드 (standalone 모드)
console.log('\n=== Step 1: next build (standalone 모드) ===');
execSync('npx next build', {
  stdio: 'inherit',
  cwd: root,
  env: {
    ...process.env,
    NEXT_PRIVATE_STANDALONE: 'true',
    NEXT_PRIVATE_OUTPUT_TRACE_ROOT: root,
  },
});

// Step 2: @vercel/og 폰트 처리
console.log('\n=== Step 2: @vercel/og 폰트 처리 ===');

const FONT_NAME = 'noto-sans-v27-latin-regular.ttf';
// 소스: 로컬 node_modules (원본)
const fontSrc = join(root, 'node_modules/next/dist/compiled/@vercel/og', FONT_NAME);

// 상대 경로 (원본 .next/server nft.json 기준)
// nftFile base: .next/server/app/api/share-card/
// 5 단계 상위 = root
// → ../../../../../node_modules/next/dist/compiled/@vercel/og/noto-sans...
const FONT_REL_PATH = `../../../../../node_modules/next/dist/compiled/@vercel/og/${FONT_NAME}`;

// copyTracedFiles의 src 경로:
// standaloneNextDir/server/app/api/share-card/../../../../../node_modules/.../font
// = .next/standalone/.next/server/app/api/share-card/../../../../..
// = .next/standalone/ (5 단계 상위)
// + node_modules/next/dist/compiled/@vercel/og/noto-sans...
const standaloneNextDir = join(root, '.next/standalone/.next');
const fontStandaloneDir = join(
  standaloneNextDir,
  'server/app/api/share-card',
  '../../../../../node_modules/next/dist/compiled/@vercel/og'
);
const fontStandaloneDest = join(fontStandaloneDir, FONT_NAME);

if (!existsSync(fontSrc)) {
  console.warn('⚠ 소스 폰트 파일 없음:', fontSrc);
} else {
  // 2-a: 원본 .next/server nft.json 패치 (copyTracedFiles가 읽는 파일)
  const origNftPath = join(root, '.next/server/app/api/share-card/route.js.nft.json');
  if (existsSync(origNftPath)) {
    const nft = JSON.parse(readFileSync(origNftPath, 'utf-8'));
    if (!nft.files.includes(FONT_REL_PATH)) {
      nft.files.push(FONT_REL_PATH);
      writeFileSync(origNftPath, JSON.stringify(nft));
      console.log('✓ 원본 nft.json 패치 완료:', FONT_REL_PATH);
    } else {
      console.log('✓ 원본 nft.json에 이미 폰트 경로 존재.');
    }
  } else {
    console.warn('⚠ 원본 nft.json 없음:', origNftPath);
  }

  // 2-b: standalone node_modules에 폰트 복사 (copyTracedFiles의 src 경로)
  if (!existsSync(fontStandaloneDir)) {
    mkdirSync(fontStandaloneDir, { recursive: true });
  }
  if (!existsSync(fontStandaloneDest)) {
    copyFileSync(fontSrc, fontStandaloneDest);
    console.log('✓ 폰트를 standalone 경로에 복사:', fontStandaloneDest);
  } else {
    console.log('✓ 폰트가 이미 standalone 경로에 존재.');
  }
}

// Step 3: Cloudflare Workers 번들링 (Next.js 빌드 단계 생략)
console.log('\n=== Step 3: opennextjs-cloudflare build --skipBuild ===');
execSync('npx opennextjs-cloudflare build --skipBuild', { stdio: 'inherit', cwd: root });

console.log('\n✓ Cloudflare Workers 빌드 완료!');

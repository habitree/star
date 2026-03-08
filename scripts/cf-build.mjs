/**
 * Cloudflare Workers 빌드 스크립트
 *
 * Windows 환경에서 발생하는 두 가지 이슈를 우회합니다:
 *
 * Issue 1: @vercel/og 폰트(TTF) — nft.json 트레이스 누락
 *   - copyTracedFiles()가 .next/server/*.nft.json을 읽고
 *     .next/standalone/ 경로에서 복사하므로:
 *   a) 원본 .next/server nft.json에 폰트 경로 추가
 *   b) .next/standalone/node_modules/.../font 에 폰트 복사
 *
 * Issue 2: @vercel/og WASM (resvg.wasm, yoga.wasm) — Windows 절대경로 버그
 *   - handler.mjs에 Windows 절대경로가 임베딩되어
 *     wrangler-module-collector가 경로를 이중으로 해석
 *   - 해결: WASM 파일을 server-functions/default/node_modules/...에 복사하고
 *           handler.mjs의 절대경로를 상대경로로 교체
 *
 * 단계:
 *   1. next build (standalone 모드)
 *   2. TTF 폰트 수정 (nft.json 패치 + standalone 복사)
 *   3. opennextjs-cloudflare build --skipBuild
 *   4. WASM 경로 수정 (server-functions/default/handler.mjs 패치)
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

// Step 2: @vercel/og 폰트(TTF) 처리
console.log('\n=== Step 2: @vercel/og 폰트(TTF) 처리 ===');

const FONT_NAME = 'noto-sans-v27-latin-regular.ttf';
const fontSrc = join(root, 'node_modules/next/dist/compiled/@vercel/og', FONT_NAME);
const FONT_REL_PATH = `../../../../../node_modules/next/dist/compiled/@vercel/og/${FONT_NAME}`;

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

  if (!existsSync(fontStandaloneDir)) mkdirSync(fontStandaloneDir, { recursive: true });
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

// Step 4: WASM 절대경로 수정 (Windows wrangler-module-collector 버그 우회)
console.log('\n=== Step 4: @vercel/og WASM 경로 수정 ===');

const WASM_FILES = ['resvg.wasm', 'yoga.wasm'];
const wasmSrcDir = join(root, 'node_modules/next/dist/compiled/@vercel/og');
const serverFnDir = join(root, '.open-next/server-functions/default');
const wasmDestDir = join(serverFnDir, 'node_modules/next/dist/compiled/@vercel/og');
const handlerPath = join(serverFnDir, 'handler.mjs');

if (!existsSync(handlerPath)) {
  console.warn('⚠ handler.mjs 없음 (건너뜀):', handlerPath);
} else {
  if (!existsSync(wasmDestDir)) mkdirSync(wasmDestDir, { recursive: true });

  for (const wasmFile of WASM_FILES) {
    const src = join(wasmSrcDir, wasmFile);
    const dest = join(wasmDestDir, wasmFile);
    if (!existsSync(src)) {
      console.warn(`⚠ WASM 소스 없음: ${src}`);
      continue;
    }
    copyFileSync(src, dest);
    console.log(`✓ WASM 복사: ${wasmFile}`);
  }

  // handler.mjs에서 Windows 절대경로 → 상대경로로 교체
  // 절대경로 패턴: "D:/.../.open-next/server-functions/default/node_modules/next/.../FILE.wasm?module"
  // 교체 대상: "./node_modules/next/dist/compiled/@vercel/og/FILE.wasm?module"
  let handlerContent = readFileSync(handlerPath, 'utf-8');
  let patched = false;

  for (const wasmFile of WASM_FILES) {
    // 절대경로 패턴 (Windows 슬래시 포함)
    const absPattern = new RegExp(
      `"[^"]*\\.open-next[/\\\\]server-functions[/\\\\]default[/\\\\]node_modules[/\\\\]next[/\\\\]dist[/\\\\]compiled[/\\\\]@vercel[/\\\\]og[/\\\\]${wasmFile}\\?module"`,
      'g'
    );
    const relPath = `"./node_modules/next/dist/compiled/@vercel/og/${wasmFile}?module"`;
    const replaced = handlerContent.replace(absPattern, relPath);
    if (replaced !== handlerContent) {
      handlerContent = replaced;
      patched = true;
      console.log(`✓ handler.mjs 패치: ${wasmFile} 절대경로 → 상대경로`);
    }
  }

  if (patched) {
    writeFileSync(handlerPath, handlerContent);
  } else {
    console.log('✓ handler.mjs WASM 경로 수정 불필요 (이미 상대경로).');
  }
}

console.log('\n✓ Cloudflare Workers 빌드 완료!');

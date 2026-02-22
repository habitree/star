export function GET() {
  const content = 'google.com, pub-4166976105261105, DIRECT, f08c47fec0942fa0\n';

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}

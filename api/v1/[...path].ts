import { handleAiAnalyze, handleAiModels, type AiEnv } from '../../src/lib/ai/proxy.js';

function handleRequest(request: Request) {
  const pathname = new URL(request.url).pathname.replace(/\/+$/, '');
  const env = process.env as AiEnv;

  if (pathname.endsWith('/ai/models')) return handleAiModels(request, env);
  if (pathname.endsWith('/ai/analyze')) return handleAiAnalyze(request, env);

  return new Response(JSON.stringify({ ok: false, error: { code: 'NOT_FOUND' } }), {
    status: 404,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export function POST(request: Request) {
  return handleRequest(request);
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

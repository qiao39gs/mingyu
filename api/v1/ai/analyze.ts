import { handleAiAnalyze, type AiEnv } from '../../../src/lib/ai/proxy.js';

export function POST(request: Request) {
  return handleAiAnalyze(request, process.env as AiEnv);
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

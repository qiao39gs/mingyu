const HEADERS = {
  'Content-Type': 'text/javascript; charset=utf-8',
  'Cache-Control': 'no-store',
  Allow: 'GET,HEAD,OPTIONS',
};

function runtimeConfigResponse(request: Request) {
  const hasApiKey = Boolean(process.env.AI_API_KEY);
  const builtinFlag = process.env.AI_BUILTIN_ENABLED ?? process.env.AI_DEFAULT_ENABLED;
  const aiBuiltinEnabled = builtinFlag === 'true' && hasApiKey;
  const config = {
    aiBuiltinEnabled,
    aiDefaultEnabled: aiBuiltinEnabled && process.env.AI_DEFAULT_ENABLED === 'true',
    aiProviderName: process.env.AI_PROVIDER_NAME || '',
  };

  const body = `window.__MINGYU_RUNTIME_CONFIG__ = ${JSON.stringify(config)};\n`;
  return new Response(request.method === 'HEAD' ? null : body, {
    status: 200,
    headers: HEADERS,
  });
}

export function GET(request: Request) {
  return runtimeConfigResponse(request);
}

export function HEAD(request: Request) {
  return runtimeConfigResponse(request);
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: HEADERS });
}

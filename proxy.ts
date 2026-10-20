import { NextRequest, NextResponse } from 'next/server'

const corsHeaders = {
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400'
}

function allowedOrigins(): string[] {
  const configuredOrigins = (process.env.API_ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim().replace(/\/+$/, ''))
    .filter(Boolean)

  return configuredOrigins.length > 0
    ? configuredOrigins
    : ['http://localhost:3000', 'http://127.0.0.1:3000']
}

export function proxy(request: NextRequest) {
  const origin = request.headers.get('origin')
  const origins = allowedOrigins()
  const isApiRequest = request.nextUrl.pathname.startsWith('/api/')

  if (!isApiRequest || !origin) {
    return NextResponse.next()
  }

  if (!origins.includes(origin)) {
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 403 })
    }
    return NextResponse.next()
  }

  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        ...corsHeaders,
        'Access-Control-Allow-Origin': origin,
        Vary: 'Origin'
      }
    })
  }

  const response = NextResponse.next()
  response.headers.set('Access-Control-Allow-Origin', origin)
  response.headers.set('Vary', 'Origin')
  Object.entries(corsHeaders).forEach(([key, value]) => response.headers.set(key, value))
  return response
}

export const config = {
  matcher: ['/api/:path*']
}

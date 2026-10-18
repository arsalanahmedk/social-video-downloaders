import { NextResponse } from 'next/server'
import { platforms } from '@/lib/platforms/registry'

export function GET() {
  return NextResponse.json({
    success: true,
    total: platforms.length,
    platforms
  })
}
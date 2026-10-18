import { NextRequest } from 'next/server'
import { serveDownloadFile } from '@/lib/services/serve-download'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

type RouteContext = {
  params: Promise<{ filename: string }> | { filename: string }
}

export async function GET(request: NextRequest, context: RouteContext) {
  const resolvedParams = await Promise.resolve(context.params)
  const filename = resolvedParams?.filename || ''
  return serveDownloadFile(request, filename)
}

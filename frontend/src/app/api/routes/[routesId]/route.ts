import { BACKEND_API_URL } from '@/constants/env'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ routeId: string }> }
) {
  const { routeId } = await params

  const response = await fetch(`${BACKEND_API_URL}/routes/${routeId}`, {
    cache: 'force-cache',
    next: {
      tags: [`routes-${routeId}`, 'routes'],
    },
  })

  const data = await response.json()

  return NextResponse.json(data)
}

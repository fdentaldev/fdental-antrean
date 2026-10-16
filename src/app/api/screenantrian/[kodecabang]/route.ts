import { NextResponse } from 'next/server'

import { getQueueData } from '@/lib/queue'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type Props = {
  params: Promise<{
    kodecabang: string
  }>
}

export const GET = async (_request: Request, { params }: Props) => {
  try {
    const { kodecabang } = await params
    const data = await getQueueData(kodecabang)

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'no-store, max-age=0' }
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch queue data'

    return NextResponse.json(
      { error: message },
      { status: 502, headers: { 'Cache-Control': 'no-store, max-age=0' } }
    )
  }
}

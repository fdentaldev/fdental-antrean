import type { QueueData } from '@/types/queue'

const getApiBaseUrl = () => {
  const apiBaseUrl = process.env.FDENTAL_API_BASE_URL?.trim()

  if (!apiBaseUrl) {
    throw new Error('FDENTAL_API_BASE_URL is not configured')
  }

  return apiBaseUrl.replace(/\/$/, '')
}

const getApiSecret = () => {
  const apiSecret = process.env.FDENTAL_API_SECRET?.trim()

  if (!apiSecret) {
    throw new Error('FDENTAL_API_SECRET is not configured')
  }

  return apiSecret
}

export const getQueueData = async (branchCode: string): Promise<QueueData> => {
  const response = await fetch(`${getApiBaseUrl()}/api/screenantrian/${encodeURIComponent(branchCode)}`, {
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${getApiSecret()}`
    }
  })

  if (!response.ok) {
    throw new Error(`Queue API returned ${response.status} ${response.statusText}`)
  }

  return (await response.json()) as QueueData
}

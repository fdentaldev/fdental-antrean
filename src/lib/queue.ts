import antrean from '@/db/antrean.json'

import type { QueueData } from '@/types/queue'

export const getQueueData = async (branchCode: string): Promise<QueueData> => {
  void branchCode

  return antrean as QueueData
}

import { getQueueData } from '@/lib/queue'
import QueueScreen from '@/views/QueueScreen'

type Props = {
  params: Promise<{
    kodecabang: string
  }>
}

const getRefreshIntervalMs = () => {
  const seconds = Number(process.env.QUEUE_REFRESH_INTERVAL_SECONDS)

  if (!Number.isFinite(seconds) || seconds <= 0) return 10000

  return Math.max(seconds, 1) * 1000
}

const QueuePage = async ({ params }: Props) => {
  const { kodecabang } = await params
  const data = await getQueueData(kodecabang)

  return <QueueScreen data={data} branchCode={kodecabang} refreshIntervalMs={getRefreshIntervalMs()} />
}

export default QueuePage

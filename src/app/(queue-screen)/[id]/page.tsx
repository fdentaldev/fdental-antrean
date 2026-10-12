import { getQueueData } from '@/lib/queue'
import QueueScreen from '@/views/QueueScreen'

type Props = {
  params: Promise<{
    id: string
  }>
}

const QueuePage = async ({ params }: Props) => {
  const { id } = await params
  const data = await getQueueData(id)

  return <QueueScreen data={data} />
}

export default QueuePage

import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{
    id: string
  }>
}

const LegacyQueueRoute = async ({ params }: Props) => {
  const { id } = await params

  redirect(`/${encodeURIComponent(id)}`)
}

export default LegacyQueueRoute

import type { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'

import { Auth } from '../components/auth'
import { Chat } from '../components/chat'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  return {
    props: {
      session,
    },
  }
}

export default function Home() {
  const { data: session } = useSession()

  if (!session?.user?.username) {
    const reloadSession = () => {
      const event = new Event('visibilitychange')
      document.dispatchEvent(event)
    }

    return <Auth session={session} reloadSession={reloadSession} />
  }

  return <Chat />
}

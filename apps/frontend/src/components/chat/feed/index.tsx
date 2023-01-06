import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { Flex } from '@chakra-ui/react'

import { MessagesHeader } from './header'

function EmptyConversation() {
  return <div>No conversation selected</div>
}

export function Feed() {
  const router = useRouter()
  const { data: session } = useSession()

  const user = session!.user!
  const { conversationId } = router.query

  return (
    <Flex
      w="100%"
      direction="column"
      display={{ base: conversationId ? 'flex' : 'none', md: 'flex' }}
    >
      {conversationId && typeof conversationId === 'string' ? (
        <Flex
          direction="column"
          justify="space-between"
          overflow="hidden"
          flexGrow={1}
        >
          <MessagesHeader userId={user.id!} conversationId={conversationId} />
        </Flex>
      ) : (
        <EmptyConversation />
      )}
    </Flex>
  )
}

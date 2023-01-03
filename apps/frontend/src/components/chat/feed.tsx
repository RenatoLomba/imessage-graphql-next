import { useRouter } from 'next/router'

import { Flex } from '@chakra-ui/react'

import { useConversationsQuery } from '../../graphql/generated'

function EmptyConversation() {
  return <div>No conversation selected</div>
}

function MessageFeed({ conversationId }: { conversationId: string }) {
  const { data } = useConversationsQuery()

  console.log({ data })

  return <Flex>{conversationId}</Flex>
}

export function Feed() {
  const router = useRouter()
  const { conversationId } = router.query

  return (
    <Flex
      w="100%"
      direction="column"
      display={{ base: conversationId ? 'flex' : 'none', md: 'flex' }}
    >
      {conversationId ? (
        <MessageFeed conversationId={conversationId as string} />
      ) : (
        <EmptyConversation />
      )}
    </Flex>
  )
}

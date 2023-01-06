import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Button, Skeleton, Stack, useDisclosure } from '@chakra-ui/react'

import {
  useConversationsQuery,
  ConversationCreatedDocument,
  type ConversationCreatedSubscription,
} from '../../../graphql/generated'
import { ConversationItem } from './item'
import { ConversationsModal } from './modal'

type SubscriptionData = {
  subscriptionData: { data: ConversationCreatedSubscription }
}

export function Conversations() {
  const router = useRouter()
  const { data: session } = useSession()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { data, loading, subscribeToMore } = useConversationsQuery()

  const user = session!.user!
  const conversationId = router.query.conversationId!

  const subscribeToNewConversations = () => {
    subscribeToMore({
      document: ConversationCreatedDocument,
      updateQuery: (prev, { subscriptionData }: SubscriptionData) => {
        if (!subscriptionData.data) return prev

        const newConversation = subscriptionData.data.conversationCreated

        return Object.assign({}, prev, {
          conversations: [newConversation, ...prev.conversations],
        })
      },
    })
  }

  useEffect(() => {
    subscribeToNewConversations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onViewConversation = async (conversationId: string) => {
    router.push({
      query: { conversationId },
    })

    // mark the conversation as read
  }

  return (
    <Stack
      display={{ base: conversationId ? 'none' : 'flex', md: 'flex' }}
      w={{ base: '100%', md: '400px' }}
      bg="whiteAlpha.50"
      py={6}
      px={3}
    >
      <Button
        mb={4}
        py={4}
        w="100%"
        colorScheme="blackAlpha"
        color="whiteAlpha.800"
        fontWeight={500}
        onClick={onOpen}
      >
        Find or start a conversation
      </Button>

      <Stack w="100%" overflowY="auto">
        {loading ? (
          <>
            <Skeleton h={20} />
            <Skeleton h={20} />
            <Skeleton h={20} />
          </>
        ) : (
          data?.conversations.map((conversation) => (
            <ConversationItem
              userId={user.id!}
              isSelected={conversationId === conversation.id}
              onClick={() => onViewConversation(conversation.id)}
              onDeleteConversation={() => {}}
              key={conversation.id}
              conversation={conversation}
            />
          ))
        )}
      </Stack>

      <ConversationsModal open={isOpen} onClose={onClose} />
    </Stack>
  )
}

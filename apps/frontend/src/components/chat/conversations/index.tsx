import { useEffect } from 'react'

import { Box, Button, useDisclosure } from '@chakra-ui/react'

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
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { data, /* loading, */ subscribeToMore } = useConversationsQuery()

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

  return (
    <Box w={{ base: '100%', md: '400px' }} bg="whiteAlpha.50" py={6} px={3}>
      <Box w="100%">
        <Button
          mb={4}
          w="100%"
          colorScheme="blackAlpha"
          color="whiteAlpha.800"
          fontWeight={500}
          onClick={onOpen}
        >
          Find or start a conversation
        </Button>

        {data?.conversations.map((conversation) => (
          <ConversationItem key={conversation.id} conversation={conversation} />
        ))}
      </Box>

      <ConversationsModal open={isOpen} onClose={onClose} />
    </Box>
  )
}

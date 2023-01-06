import { useRouter } from 'next/router'
import React from 'react'

import { Button, Stack, Text } from '@chakra-ui/react'

import { useConversationsQuery } from '../../../graphql/generated'
import { formatUsernames } from '../../../utils/functions'
// import SkeletonLoader from "../../../common/SkeletonLoader";

interface MessagesHeaderProps {
  userId: string
  conversationId: string
}

export function MessagesHeader({
  userId,
  conversationId,
}: MessagesHeaderProps) {
  const router = useRouter()
  const { data, loading } = useConversationsQuery()

  const conversation = data?.conversations.find(
    (conversation) => conversation.id === conversationId,
  )

  return (
    <Stack
      direction="row"
      align="center"
      spacing={6}
      py={5}
      px={{ base: 4, md: 0 }}
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
    >
      <Button
        display={{ md: 'none' }}
        onClick={() =>
          router.replace('?conversationId', '/', {
            shallow: true,
          })
        }
      >
        Back
      </Button>

      {loading ? (
        <>
          {/**
           * <SkeletonLoader count={1} height="30px" width="320px" />
           */}
        </>
      ) : !conversation ? (
        <Text>Conversation Not Found</Text>
      ) : (
        <Stack direction="row">
          <Text color="whiteAlpha.600">To: </Text>
          <Text fontWeight={600}>
            {formatUsernames(conversation.participants, userId)}
          </Text>
        </Stack>
      )}
    </Stack>
  )
}
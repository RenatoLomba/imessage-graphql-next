import { Box, Stack } from '@chakra-ui/react'

import { ConversationsQuery } from '../../../graphql/generated'

type ConversationItemProps = {
  conversation: ConversationsQuery['conversations'][number]
}

export function ConversationItem({ conversation }: ConversationItemProps) {
  return (
    <Stack
      p={4}
      _hover={{
        bg: 'whiteAlpha.200',
      }}
      borderRadius={4}
    >
      <Box>{conversation.id}</Box>
    </Stack>
  )
}

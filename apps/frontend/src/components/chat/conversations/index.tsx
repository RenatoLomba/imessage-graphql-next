import { Box, Button, useDisclosure } from '@chakra-ui/react'

import { ConversationsModal } from './modal'

export function Conversations() {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <Box w={{ base: '100%', md: '400px' }} bg="whiteAlpha.50" py={6} px={3}>
      {/**
       * ConversationsList
       */}
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
      </Box>

      <ConversationsModal open={isOpen} onClose={onClose} />
    </Box>
  )
}

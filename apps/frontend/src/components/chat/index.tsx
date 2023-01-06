import { Flex } from '@chakra-ui/react'

import { Conversations } from './conversations'
import { Feed } from './feed'

export function Chat() {
  return (
    <Flex h="100vh" overflow="hidden">
      <Conversations />
      <Feed />
    </Flex>
  )
}

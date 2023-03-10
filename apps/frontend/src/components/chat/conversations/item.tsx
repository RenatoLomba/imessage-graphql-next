import { formatRelative } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import React, { useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
// import { BiLogOut } from 'react-icons/bi'
import { GoPrimitiveDot } from 'react-icons/go'
import { MdDeleteOutline } from 'react-icons/md'

import {
  Icon,
  Avatar,
  Box,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react'

import { ConversationsQuery } from '../../../graphql/generated'
import { formatUsernames } from '../../../utils/functions'

const formatRelativeLocale = {
  lastWeek: 'eeee',
  yesterday: "'Yesterday",
  today: 'p',
  other: 'MM/dd/yy',
}

interface ConversationItemProps {
  conversation: ConversationsQuery['conversations'][number]
  onClick: () => void
  isSelected: boolean
  onDeleteConversation: (conversationId: string) => void
  userId: string
  //   onEditConversation?: () => void;
  //   selectedConversationId?: string;
  //   onLeaveConversation?: (conversation: ConversationPopulated) => void;
}

export function ConversationItem({
  //   selectedConversationId,
  //   onEditConversation,
  //   onLeaveConversation,
  userId,
  conversation,
  onClick,
  isSelected,
  onDeleteConversation,
}: ConversationItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const hasSeenLatestMessage = !!conversation.participants.find(
    (p) => p.user.id === userId,
  )?.hasSeenLatestMessage

  const handleClick = (event: React.MouseEvent) => {
    if (event.type === 'click') {
      onClick()
    } else if (event.type === 'contextmenu') {
      event.preventDefault()
      setIsMenuOpen(true)
    }
  }

  return (
    <Stack
      direction="row"
      align="center"
      justify="space-between"
      p={4}
      cursor="pointer"
      borderRadius={4}
      bg={isSelected ? 'whiteAlpha.200' : 'none'}
      _hover={{ bg: isSelected ? 'whiteAlpha.200' : 'whiteAlpha.100' }}
      onClick={handleClick}
      onContextMenu={handleClick}
      position="relative"
    >
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        <MenuList bg="#2d2d2d">
          <MenuItem
            icon={<Icon as={AiOutlineEdit} fontSize={20} />}
            onClick={(event) => {
              event.stopPropagation()
              //   onEditConversation();
            }}
            bg="#2d2d2d"
            _hover={{ bg: 'whiteAlpha.300' }}
          >
            Edit
          </MenuItem>
          <MenuItem
            icon={<Icon as={MdDeleteOutline} fontSize={20} />}
            onClick={(event) => {
              event.stopPropagation()
              onDeleteConversation(conversation.id)
            }}
            bg="#2d2d2d"
            _hover={{ bg: 'whiteAlpha.300' }}
          >
            Delete
          </MenuItem>
          {/* {conversation.participants.length > 2 ? (
            <MenuItem
              icon={<BiLogOut fontSize={20} />}
              onClick={(event) => {
                event.stopPropagation();
                // onLeaveConversation(conversation);
              }}
            >
              Leave
            </MenuItem>
          ) : (
            <MenuItem
              icon={<MdDeleteOutline fontSize={20} />}
              onClick={(event) => {
                event.stopPropagation();
                // onDeleteConversation(conversation.id);
              }}
            >
              Delete
            </MenuItem>
          )} */}
        </MenuList>
      </Menu>

      <Flex position="absolute" left="-6px">
        {!hasSeenLatestMessage && (
          <Icon as={GoPrimitiveDot} fontSize={18} color="#6B46C1" />
        )}
      </Flex>

      <Avatar src={conversation.latestMessage?.participant.user.image!} />

      <Flex justify="space-between" width="80%" height="100%">
        <Flex direction="column" width="70%" height="100%">
          <Text
            fontWeight={600}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            fontSize={{ base: 'sm', sm: 'md' }}
          >
            {formatUsernames(conversation.participants, userId!)}
          </Text>

          {conversation.latestMessage && (
            <Box width="140%" maxWidth="360px">
              <Text
                color="whiteAlpha.700"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {conversation.latestMessage.text}
              </Text>
            </Box>
          )}
        </Flex>

        <Text
          color="whiteAlpha.700"
          textAlign="right"
          fontSize={{ base: 'sm', sm: 'md' }}
          position="absolute"
          right={4}
        >
          {formatRelative(new Date(conversation.updatedAt), new Date(), {
            locale: {
              ...enUS,
              formatRelative: (token: keyof typeof formatRelativeLocale) =>
                formatRelativeLocale[token],
            },
          })}
        </Text>
      </Flex>
    </Stack>
  )
}

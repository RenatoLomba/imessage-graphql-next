import { useForm } from 'react-hook-form'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  useDisclosure,
  Stack,
  FormControl,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react'

import { useUsersQuery } from '../../graphql/generated'

type ConversationsModalProps = {
  open: boolean
  onClose: () => void
}

type SearchConversationsForm = {
  username: string
}

function ConversationsModal({ onClose, open }: ConversationsModalProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SearchConversationsForm>()

  const { data, refetch } = useUsersQuery()

  console.log({ data })

  const onSubmitSearch = async ({ username }: SearchConversationsForm) => {
    refetch({
      username,
    })
  }

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="#2d2d2d" pb={4}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="form" onSubmit={handleSubmit(onSubmitSearch)}>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors?.username}>
                <Input
                  {...register('username', {
                    required: {
                      message: 'Please enter a valid username',
                      value: true,
                    },
                    min: 1,
                    max: 50,
                  })}
                  placeholder="Enter a username"
                />
                {errors?.username && (
                  <FormErrorMessage>
                    {errors?.username?.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <Button type="submit">Search</Button>
            </Stack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

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

import { useForm } from 'react-hook-form'
import { IoIosCloseCircleOutline } from 'react-icons/io'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  Stack,
  FormControl,
  Input,
  FormErrorMessage,
  Text,
  Flex,
  Avatar,
  Icon,
} from '@chakra-ui/react'

import { useUsersLazyQuery } from '../../../graphql/generated'
import { useParticipants } from './participants'

type ConversationsModalProps = {
  open: boolean
  onClose: () => void
}

type SearchConversationsForm = {
  username: string
}

export function ConversationsModal({ onClose, open }: ConversationsModalProps) {
  const {
    handleSubmit,
    register,
    resetField,
    formState: { errors },
  } = useForm<SearchConversationsForm>()

  const [searchUsers, { data, loading }] = useUsersLazyQuery()

  const onSubmitSearch = async ({ username }: SearchConversationsForm) => {
    searchUsers({
      variables: { username },
    })
  }

  const { addParticipant, participants, removeParticipant } = useParticipants({
    onParticipantAdded: () => resetField('username'),
  })

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="#2d2d2d" pb={4}>
        <ModalHeader>Create a Conversation</ModalHeader>
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

              <Button isLoading={loading} type="submit">
                Search
              </Button>

              {data ? (
                <>
                  {data.users.length === 0 ? (
                    <Flex mt={6} justify="center">
                      <Text>No users found</Text>
                    </Flex>
                  ) : (
                    <Stack mt={6}>
                      {data.users.map((user) => (
                        <Stack
                          key={user.id}
                          direction="row"
                          align="center"
                          spacing={4}
                          py={2}
                          px={4}
                          borderRadius={4}
                          _hover={{
                            bg: 'whiteAlpha.200',
                          }}
                        >
                          <Avatar src={user.image!} />
                          <Flex align="center" justify="space-between" w="100%">
                            <Text>{user.username}</Text>
                            <Button
                              disabled={
                                !!participants.find((p) => p.id === user.id)
                              }
                              colorScheme="brand"
                              color="inherit"
                              onClick={() => addParticipant(user)}
                            >
                              Select
                            </Button>
                          </Flex>
                        </Stack>
                      ))}
                    </Stack>
                  )}
                </>
              ) : null}

              {participants.length > 0 ? (
                <Flex mt={8} gap={3} flexWrap="wrap">
                  {participants.map((participant) => (
                    <Stack
                      key={participant.id}
                      direction="row"
                      align="center"
                      bg="whiteAlpha.200"
                      borderRadius={4}
                      p={2}
                    >
                      <Text>{participant.username}</Text>
                      <Icon
                        as={IoIosCloseCircleOutline}
                        cursor="pointer"
                        h={5}
                        w={5}
                        onClick={() => removeParticipant(participant.id)}
                      />
                    </Stack>
                  ))}
                </Flex>
              ) : null}
            </Stack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

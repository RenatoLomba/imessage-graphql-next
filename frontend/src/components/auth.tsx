import type { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'

import {
  Button,
  Center,
  Stack,
  Text,
  Icon,
  Input,
  useToast,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'

import { useCreateUsernameMutation } from '../graphql/generated'

type UsernameFormFields = {
  username: string
}

type UsernameFormProps = {
  onSuccess: () => void
}

function UsernameForm({ onSuccess }: UsernameFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsernameFormFields>()

  const errorToast = useToast({
    status: 'error',
    variant: 'left-accent',
    isClosable: true,
  })

  const [createUsername, { loading }] = useCreateUsernameMutation()

  const onFormSubmit = async ({ username }: UsernameFormFields) => {
    try {
      const result = await createUsername({
        variables: {
          username,
        },
      })

      if (result.data?.createUsername.success) {
        onSuccess()
        return
      }

      errorToast({
        title: result.data?.createUsername.error || 'Unknown error',
      })
    } catch (error) {
      errorToast({ title: 'Create user error.' })
    }
  }

  return (
    <Stack
      align="center"
      spacing={6}
      as="form"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <Text fontSize="3xl">Create a Username</Text>
      <FormControl isDisabled={loading} isInvalid={!!errors?.username}>
        <Input
          type="text"
          placeholder="Enter a username"
          {...register('username', {
            required: {
              message: 'Username is required',
              value: true,
            },
            minLength: 1,
            maxLength: 50,
          })}
        />
        {errors?.username && (
          <FormErrorMessage>{errors.username.message}</FormErrorMessage>
        )}
      </FormControl>
      <Button isLoading={loading} w="100%" type="submit">
        Save
      </Button>
    </Stack>
  )
}

type AuthProps = {
  session: Session | null
  reloadSession: () => void
}

export function Auth({ reloadSession, session }: AuthProps) {
  return (
    <Center h="100vh">
      {session ? (
        <UsernameForm onSuccess={reloadSession} />
      ) : (
        <Stack align="center" spacing={8}>
          <Text fontSize="3xl">MessengerQL</Text>
          <Button
            type="button"
            leftIcon={<Icon boxSize={6} as={FcGoogle} />}
            onClick={() => signIn('google')}
          >
            Continue with Google
          </Button>
        </Stack>
      )}
    </Center>
  )
}

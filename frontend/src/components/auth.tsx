import type { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import { FormEvent, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'

import { Button, Center, Stack, Text, Icon, Input } from '@chakra-ui/react'

function UsernameForm() {
  const [username, setUsername] = useState('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const validUsername = username.trim()
    if (!validUsername) return

    try {
      /**
       * createUsername mutation
       */
    } catch (error) {
      console.log('onSubmit error', error)
    }
  }

  return (
    <Stack align="center" spacing={6} as="form" onSubmit={onSubmit}>
      <Text fontSize="3xl">Create a Username</Text>
      <Input
        placeholder="Enter a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button w="100%" type="submit">
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
        <UsernameForm />
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

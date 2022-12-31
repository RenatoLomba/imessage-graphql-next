import { signOut, useSession } from 'next-auth/react'

import { Button } from '@chakra-ui/react'

export function Chat() {
  const { data: session } = useSession()
  return (
    <div>
      <div>Hello {session!.user!.username}</div>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  )
}

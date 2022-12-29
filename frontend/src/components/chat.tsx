import { signOut } from 'next-auth/react'

import { Button } from '@chakra-ui/react'

export function Chat() {
  return (
    <div>
      Chat <Button onClick={() => signOut()}>Logout</Button>
    </div>
  )
}

import { signIn, useSession } from 'next-auth/react'

export default function Home() {
  const { data } = useSession()

  return (
    <div>
      {!data ? (
        <button onClick={() => signIn('google')}>Sign In</button>
      ) : (
        <div>Signed as: {data.user?.name}</div>
      )}
    </div>
  )
}

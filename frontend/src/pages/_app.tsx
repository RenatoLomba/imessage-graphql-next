import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'

import { apolloClient } from '../lib/apollo'
import { theme } from '../lib/chakra'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </ApolloProvider>
  )
}

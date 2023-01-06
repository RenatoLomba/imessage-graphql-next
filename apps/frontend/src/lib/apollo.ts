import { Kind, OperationTypeNode } from 'graphql'
import { createClient } from 'graphql-ws'
import { getSession } from 'next-auth/react'

import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URI,
  credentials: 'include',
})

const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: process.env.NEXT_PUBLIC_GRAPHQL_WS_URL!,
          connectionParams: async () => ({
            session: await getSession(),
          }),
        }),
      )
    : null

const link =
  typeof window !== 'undefined' && !!wsLink
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query)
          return (
            definition.kind === Kind.OPERATION_DEFINITION &&
            definition.operation === OperationTypeNode.SUBSCRIPTION
          )
        },
        wsLink,
        httpLink,
      )
    : httpLink

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

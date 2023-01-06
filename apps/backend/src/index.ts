import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import * as dotenv from 'dotenv'
import express from 'express'
import { PubSub } from 'graphql-subscriptions'
import { useServer } from 'graphql-ws/lib/use/ws'
import http from 'http'
import { getSession } from 'next-auth/react'
import { WebSocketServer } from 'ws'

import { makeExecutableSchema } from '@graphql-tools/schema'
import { PrismaClient } from '@prisma/client'

import { resolvers } from './graphql/resolvers'
import { typeDefs } from './graphql/typedefs'
import { extractOperationFieldsFromRequest } from './utils/functions'
import type { IGraphQLContext, ISubscriptionContext } from './utils/types'

async function bootstrap() {
  dotenv.config()
  const app = express()
  const httpServer = http.createServer(app)
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql/subscriptions',
  })

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })

  const isProduction = process.env.NODE_ENV === 'production'

  const prisma = new PrismaClient({
    log: !isProduction ? ['error', 'query'] : ['error'],
  })
  const pubsub = new PubSub()

  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx: ISubscriptionContext): Promise<IGraphQLContext> => {
        return {
          session: ctx.connectionParams?.session,
          prisma,
          pubsub,
        }
      },
    },
    wsServer,
  )

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    context: async ({ req }): Promise<IGraphQLContext> => {
      const session = await getSession({ req })
      const operationFields = extractOperationFieldsFromRequest(req)

      return {
        session,
        prisma,
        operationFields,
        pubsub,
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  })
  await server.start()
  server.applyMiddleware({
    app,
    cors: {
      origin: process.env.CLIENT_ORIGIN,
      credentials: true,
    },
  })
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 5000 }, resolve),
  )
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
}

bootstrap().catch((err) => console.error(err.stack))

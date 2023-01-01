import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import * as dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import { getSession } from 'next-auth/react'

import { makeExecutableSchema } from '@graphql-tools/schema'
import { PrismaClient } from '@prisma/client'

import { resolvers } from './graphql/resolvers'
import { typeDefs } from './graphql/types'
import {
  extractOperationFields,
  getFieldValuesFromOperation,
  getFirstOperationDef,
  parseQuery,
} from './utils/functions'
import type { IGraphQLContext } from './utils/types'

async function bootstrap() {
  dotenv.config()
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })

  const isProduction = process.env.NODE_ENV === 'production'

  const prisma = new PrismaClient({
    log: !isProduction ? ['error', 'query'] : ['error'],
  })

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    context: async ({ req }): Promise<IGraphQLContext> => {
      let operationFields: Record<string, boolean> | null = null
      const session = await getSession({ req })

      const parsedQuery = parseQuery(req)
      const fields = getFieldValuesFromOperation(
        getFirstOperationDef(parsedQuery),
      )

      if (fields) {
        operationFields = extractOperationFields(fields)
      }

      return {
        session,
        prisma,
        operationFields,
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
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

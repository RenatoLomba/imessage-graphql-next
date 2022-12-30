import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import http from 'http'

import { makeExecutableSchema } from '@graphql-tools/schema'

import { resolvers } from './graphql/resolvers'
import { typeDefs } from './graphql/types'

async function bootstrap() {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  })
  await server.start()
  server.applyMiddleware({ app })
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 5000 }, resolve),
  )
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
}

bootstrap().catch((err) => console.error(err.stack))

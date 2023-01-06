import type { PubSub } from 'graphql-subscriptions'
import type { Context } from 'graphql-ws/lib/server'
import type { ISODateString } from 'next-auth'

import type { PrismaClient } from '@imessage-graphql/db-config'

interface ISession {
  user?: {
    id?: string | null
    username?: string | null
    name?: string | null
    email?: string | null
    image?: string | null
  }
  expires: ISODateString
}

export interface IGraphQLContext<T = {}> {
  session?: ISession | null
  prisma: PrismaClient
  operationFields?: Record<keyof T, boolean> | null
  pubsub: PubSub
}

export interface ISubscriptionContext extends Context {
  connectionParams: {
    session?: ISession | null
  }
}

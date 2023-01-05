import { ISODateString } from 'next-auth'

import { PrismaClient } from '@prisma/client'

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
  // pubsub
}

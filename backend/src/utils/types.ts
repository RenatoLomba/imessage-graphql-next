import type { Session } from 'next-auth'

export interface IGraphQLContext {
  session?: Session | null
  // prisma
  // pubsub
}

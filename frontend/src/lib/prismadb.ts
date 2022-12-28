import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var prisma: PrismaClient | undefined
}

const client: PrismaClient =
  globalThis.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log: process.env.NODE_ENV !== 'production' ? ['error', 'query'] : [],
  })
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client

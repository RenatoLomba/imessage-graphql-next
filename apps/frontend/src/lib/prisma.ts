import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var prisma: PrismaClient | undefined
}

const isProduction = process.env.NODE_ENV === 'production'

const client: PrismaClient =
  globalThis.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log: !isProduction ? ['error', 'query'] : [],
  })

if (!isProduction) globalThis.prisma = client

export const prisma = client

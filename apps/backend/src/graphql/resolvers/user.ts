import { ApolloError } from 'apollo-server-core'

import type { IGraphQLContext } from '../../utils/types'
import type {
  QueryUsersArgs,
  User,
  MutationCreateUsernameArgs,
  CreateUsernameResponse,
} from '../generated'

export const userResolvers = {
  Query: {
    users: async (
      _: unknown,
      { username: searchedUsername }: QueryUsersArgs,
      { prisma, operationFields, session }: IGraphQLContext<User>,
    ): Promise<User[]> => {
      if (!session?.user) {
        throw new ApolloError('Unauthorized')
      }

      const { username: sessionUsername } = session.user

      try {
        const users = await prisma.user.findMany({
          select: operationFields,
          where: {
            username: {
              contains: searchedUsername,
              not: sessionUsername,
              mode: 'insensitive',
            },
          },
          take: 10,
          orderBy: {
            username: 'asc',
          },
        })

        return users
      } catch (error) {
        console.error('users error', error.stack)

        throw new ApolloError('Something went wrong when searching for users')
      }
    },
  },
  Mutation: {
    createUsername: async (
      _: unknown,
      { username }: MutationCreateUsernameArgs,
      { prisma, session }: IGraphQLContext,
    ): Promise<CreateUsernameResponse> => {
      if (!session?.user) {
        return {
          success: false,
          error: 'Unauthorized',
        }
      }

      const { id } = session.user

      try {
        const usernameAlreadyExists = await prisma.user.findUnique({
          where: { username },
        })

        if (usernameAlreadyExists) {
          return {
            success: false,
            error: 'Username already taken',
          }
        }

        await prisma.user.update({
          where: { id },
          data: { username },
        })

        return {
          success: true,
        }
      } catch (error) {
        console.error('createUsername error', error.stack)

        return {
          success: false,
          error: "Could't create username",
        }
      }
    },
  },
}

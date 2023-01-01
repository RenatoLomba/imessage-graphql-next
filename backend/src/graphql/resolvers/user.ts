import type {
  ICreateUsernameArgs,
  ICreateUsernameResult,
  IGraphQLContext,
  IUser,
  IUsersArgs,
  IUsersResult,
} from '../../utils/types'

export const userResolvers = {
  Query: {
    users: async (
      _: unknown,
      { username }: IUsersArgs,
      { prisma, operationFields }: IGraphQLContext<IUser>,
    ): Promise<IUsersResult> => {
      const users = await prisma.user.findMany({
        select: operationFields,
        where: {
          username: {
            contains: username,
          },
        },
        take: 10,
        orderBy: {
          username: 'asc',
        },
      })

      return users
    },
  },
  Mutation: {
    createUsername: async (
      _: unknown,
      { username }: ICreateUsernameArgs,
      { prisma, session }: IGraphQLContext,
    ): Promise<ICreateUsernameResult> => {
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

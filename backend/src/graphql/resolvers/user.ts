import type {
  ICreateUsernameArgs,
  ICreateUsernameResult,
  IGraphQLContext,
} from '../../utils/types'

export const userResolvers = {
  Query: {
    users: () => {},
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

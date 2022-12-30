import type { IGraphQLContext } from '../../utils/types'

export const userResolvers = {
  Query: {
    users: () => {},
  },
  Mutation: {
    createUsername: async (
      _: unknown,
      args: { username: string },
      context: IGraphQLContext,
    ) => {
      const { username } = args

      console.log(username)
      console.log(context)
    },
  },
}

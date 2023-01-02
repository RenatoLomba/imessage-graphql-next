import type {
  ICreateConversationArgs,
  ICreateConversationResult,
  IGraphQLContext,
} from '../../utils/types'

export const conversationResolvers = {
  Mutation: {
    createConversation: async (
      _: unknown,
      { participants }: ICreateConversationArgs,
      { prisma, session }: IGraphQLContext,
    ): Promise<ICreateConversationResult> => {
      console.log('Create Conversation', { participants })

      return {
        id: 'teste',
      }
    },
  },
}

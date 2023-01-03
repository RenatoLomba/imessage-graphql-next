import { ApolloError } from 'apollo-server-core'

import { Prisma } from '@prisma/client'

import type {
  ICreateConversationArgs,
  ICreateConversationResult,
  IGraphQLContext,
} from '../../utils/types'

export const participantPopulated =
  Prisma.validator<Prisma.ConversationParticipantInclude>()({
    user: {
      select: {
        id: true,
        username: true,
      },
    },
  })

export const conversationPopulated =
  Prisma.validator<Prisma.ConversationInclude>()({
    participants: {
      include: participantPopulated,
    },
    latestMessage: {
      include: {
        participant: {
          include: participantPopulated,
        },
      },
    },
  })

export const conversationResolvers = {
  Query: {
    conversations: async (
      _: unknown,
      __: unknown,
      { prisma, session }: IGraphQLContext,
    ) => {
      if (!session?.user) {
        throw new ApolloError('Unauthorized')
      }

      const { id } = session.user

      try {
        const conversations = await prisma.conversation.findMany({
          where: {
            participants: {
              some: {
                userId: id,
              },
            },
          },
          include: conversationPopulated,
        })

        return conversations
      } catch (error) {
        console.error('conversations error', error.stack)

        throw new ApolloError('Something went wrong')
      }
    },
  },
  Mutation: {
    createConversation: async (
      _: unknown,
      { participants }: ICreateConversationArgs,
      { prisma, session }: IGraphQLContext,
    ): Promise<ICreateConversationResult> => {
      if (!session?.user) {
        throw new ApolloError('Unauthorized')
      }

      const { id: userId } = session.user

      try {
        const conversation = await prisma.conversation.create({
          data: {
            participants: {
              createMany: {
                data: participants.map((participantId) => ({
                  userId: participantId,
                  hasSeenLatestMessage: participantId === userId,
                })),
              },
            },
          },
          include: conversationPopulated,
        })

        // emit a conversation created event using pubsub

        return {
          id: conversation.id,
        }
      } catch (error) {
        console.error('createConversation error', error.stack)

        throw new ApolloError(
          'Something went wrong when creating a conversation',
        )
      }
    },
  },
}

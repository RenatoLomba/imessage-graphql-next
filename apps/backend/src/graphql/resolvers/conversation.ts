import { ApolloError } from 'apollo-server-core'
import { withFilter } from 'graphql-subscriptions'

import { Prisma } from '@imessage-graphql/db-config'

import type { IGraphQLContext } from '../../utils/types'
import type {
  CreateConversationMutationResponse,
  MutationCreateConversationArgs,
  Conversation,
  Subscription,
} from '../generated'

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
    ): Promise<Conversation[]> => {
      if (!session?.user) {
        throw new ApolloError('Unauthorized')
      }

      const { id } = session.user

      try {
        const conversations = await prisma.conversation.findMany({
          where: {
            participants: {
              some: {
                userId: {
                  equals: id,
                },
              },
            },
          },
          orderBy: {
            updatedAt: 'desc',
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
      { participants }: MutationCreateConversationArgs,
      { prisma, session, pubsub }: IGraphQLContext,
    ): Promise<CreateConversationMutationResponse> => {
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

        pubsub.publish('CONVERSATION_CREATED', {
          conversationCreated: conversation,
        })

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
  Subscription: {
    conversationCreated: {
      subscribe: withFilter(
        (_: unknown, __: unknown, { pubsub }: IGraphQLContext) =>
          pubsub.asyncIterator(['CONVERSATION_CREATED']),
        (
          { conversationCreated: { participants } }: Subscription,
          _: unknown,
          { session }: IGraphQLContext,
        ) => {
          const userIsParticipant = !!participants.find(
            (p) => p.user.id === session.user.id,
          )

          return userIsParticipant
        },
      ),
    },
  },
}

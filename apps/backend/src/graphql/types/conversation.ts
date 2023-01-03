import { gql } from 'apollo-server-core'

export const conversationTypeDefs = gql`
  scalar Date

  type Mutation {
    createConversation(
      participants: [String!]!
    ): CreateConversationMutationResponse!
  }

  type CreateConversationMutationResponse {
    id: String!
  }

  type Query {
    conversations: [Conversation!]!
  }

  type Conversation {
    id: String!
    latestMessage: Message
    participants: [Participant!]!
    createdAt: Date!
    updatedAt: Date!
  }

  type Participant {
    id: String!
    user: User!
    hasSeenLatestMessage: Boolean!
  }

  type Message {
    id: String!
    text: String!
    participant: Participant!
    createdAt: Date!
  }
`

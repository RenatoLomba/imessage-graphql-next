import { gql } from 'apollo-server-core'

export const conversationTypeDefs = gql`
  type Mutation {
    createConversation(
      participants: [String!]!
    ): CreateConversationMutationResponse!
  }

  type CreateConversationMutationResponse {
    id: String!
  }
`

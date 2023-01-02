import { gql } from 'apollo-server-core'

export const userTypeDefs = gql`
  type Query {
    users(username: String!): [UsersQueryResponse!]!
  }

  type Mutation {
    createUsername(username: String!): CreateUsernameResponse!
  }

  type UsersQueryResponse {
    id: String!
    image: String
    username: String
  }

  type CreateUsernameResponse {
    success: Boolean!
    error: String
  }
`

import { gql } from 'apollo-server-core'

export const userTypeDefs = gql`
  type User {
    id: String!
    image: String
    username: String
  }

  type Query {
    users(username: String): [User!]!
  }

  type Mutation {
    createUsername(username: String!): CreateUsernameResponse!
  }

  type CreateUsernameResponse {
    success: Boolean!
    error: String
  }
`

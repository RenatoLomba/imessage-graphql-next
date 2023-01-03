import { gql } from 'apollo-server-core'

export const userTypeDefs = gql`
  type User {
    id: String!
    name: String
    email: String
    image: String
    username: String
  }

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

import { gql } from 'apollo-server-core'

export const messageTypeDefs = gql`
  type Message {
    id: String!
    text: String!
    participant: Participant!
    createdAt: Date!
  }
`

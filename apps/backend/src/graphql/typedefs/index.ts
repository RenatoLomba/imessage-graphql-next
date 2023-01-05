import 'graphql-import-node'

import conversationTypeDefs from './conversation.graphql'
import messageTypeDefs from './message.graphql'
import userTypeDefs from './user.graphql'

export const typeDefs = [userTypeDefs, messageTypeDefs, conversationTypeDefs]

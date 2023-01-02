import merge from 'lodash.merge'

import { conversationResolvers } from './conversation'
import { userResolvers } from './user'

export const resolvers = merge({}, userResolvers, conversationResolvers)

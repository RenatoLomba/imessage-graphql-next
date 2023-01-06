import { ConversationsQuery } from '../graphql/generated'

export const formatUsernames = (
  participants: ConversationsQuery['conversations'][number]['participants'],
  myUserId: string,
): string => {
  const usernames = participants
    .filter((participant) => participant.user.id !== myUserId)
    .map((participant) => participant.user.username)

  return usernames.join(', ')
}

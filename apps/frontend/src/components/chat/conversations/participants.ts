import produce from 'immer'
import { useState } from 'react'

type Participant = {
  id: string
  username?: string | null
  image?: string | null
}

type UseParticipantsProps = {
  onParticipantAdded?: () => void
}

export function useParticipants({ onParticipantAdded }: UseParticipantsProps) {
  const [participants, setParticipants] = useState<Participant[]>([])

  const addParticipant = (participant: Participant) => {
    const participantAlreadyExists = participants.find(
      (p) => p.id === participant.id,
    )

    if (participantAlreadyExists) return

    setParticipants((prev) => [...prev, participant])
    onParticipantAdded?.()
  }

  const removeParticipant = (id: string) => {
    setParticipants((prev) =>
      produce(prev, (draft) => {
        const participantIndex = draft.findIndex((p) => p.id === id)
        if (participantIndex === -1) return
        draft.splice(participantIndex, 1)
      }),
    )
  }

  return {
    addParticipant,
    removeParticipant,
    participants,
  }
}

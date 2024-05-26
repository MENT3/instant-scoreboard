import React from 'react'
import { Rounds } from './rounds'

export const Wod = ({ wod, score }) => {
  const noRepsPerRounds = wod.rounds.map(r => r.map(rr => rr.noRep))

  let remainReps = score
  // TODO clean/optimise this jungle
  const progress = noRepsPerRounds.map((nr, i) =>
    nr.map((nrr, j) => {
      remainReps = remainReps - nrr
      return remainReps > 0 ? nrr : Math.max(remainReps + nrr, 0)
    })
  )

  return (
    <div>
      <h4>{wod.name}</h4>

      <Rounds rounds={wod.rounds} progress={progress} />
    </div>
  )
}

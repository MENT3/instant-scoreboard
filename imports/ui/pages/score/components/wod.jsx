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
      <h1 className="mb-4 flex items-center gap-1">
        <span className="text-lg font-medium">{wod.name}</span>
        <span>-</span>
        <span>{wod?.scores[0].athlete?.name}</span>
      </h1>

      <Rounds rounds={wod.rounds} progress={progress} />
    </div>
  )
}

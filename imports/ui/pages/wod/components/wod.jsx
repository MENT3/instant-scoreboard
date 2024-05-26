import React from 'react'
import { Round } from './round'

export const Wod = ({ wod, score }) => {
  const noRepsPerRounds = wod.rounds.map(r =>
    // r.reduce((acc, curr) => acc + curr.noRep, 0)
    r.map(rr => rr.noRep)
  )

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
      <h4>this is a wod</h4>

      <ul>
        {wod.rounds?.map((r, i) => (
          <li key={i}>
            <Round movements={r} progress={progress[i]} />
          </li>
        ))}
      </ul>
    </div>
  )
}

import React from 'react'
import { useParams } from 'react-router-dom'
import { useSubscribe, useTracker } from 'meteor/react-meteor-data'

import { WodsCollection } from '../../../api/collections.js'

import { Wod } from './components/wod'
import { Actions } from './components/actions'

export const ScorePage = () => {
  const { wodId, scoreId } = useParams()

  const isLoading = useSubscribe('wod-by-id-with-score', wodId, scoreId)

  const wod = useTracker(() => {
    if (!isLoading()) {
      return WodsCollection.findOne({ _id: wodId })
    }
    return null
  }, [wodId, isLoading()])

  // TODO Store it instead of compute it
  const wodMaxReps = wod?.rounds?.reduce(
    (acc, curr) => acc + curr.reduce((accc, currr) => accc + currr.noRep, 0),
    0
  )

  if (isLoading()) {
    return (
      <div className="max-w-3xl min-h-screen mx-auto sm:pt-10">Loading..</div>
    )
  }

  if (!wod) {
    return (
      <div className="max-w-3xl min-h-screen mx-auto sm:pt-10">
        Can't find this WOD
      </div>
    )
  }

  return (
    <div className="max-w-3xl min-h-screen mx-auto sm:pt-10">
      <h1 className="mb-4 text-lg font-medium">Wod page</h1>
      <Wod wod={wod} score={wod.scores[0].value} />

      <Actions
        scoreId={wod.scores[0]._id}
        finished={wod.scores[0].value >= wodMaxReps}
      />
    </div>
  )
}

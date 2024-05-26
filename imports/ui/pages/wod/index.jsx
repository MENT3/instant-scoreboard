import React from 'react'
import { useParams } from 'react-router-dom'
import { useSubscribe, useTracker } from 'meteor/react-meteor-data'

import { WodsCollection } from '../../../api/collections.js'

import { Leaderboard } from './components/leaderboard.jsx'

export const WodPage = () => {
  const { wodId } = useParams()

  const isLoading = useSubscribe('wod-by-id', wodId)
  const wod = useTracker(() => {
    if (!isLoading()) {
      return WodsCollection.findOne({ _id: wodId })
    }
    return null
  }, [wodId, isLoading()])

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

  // TODO Store it instead of compute it
  const wodMaxReps = wod?.rounds?.reduce(
    (acc, curr) => acc + curr.reduce((accc, currr) => accc + currr.noRep, 0),
    0
  )

  return <Leaderboard scores={wod?.scores} wodMaxReps={wodMaxReps} />
}

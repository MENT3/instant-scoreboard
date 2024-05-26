import React from 'react'
import { Meteor } from 'meteor/meteor'
import { useParams } from 'react-router-dom'
import { useSubscribe, useFind } from 'meteor/react-meteor-data'

import { CompetitionsCollection } from '../../api/competitions.js'

export const ScoresPage = () => {
  const { scoreId } = useParams()

  const isLoading = useSubscribe('competitions', scoreId)
  const wod = useFind(
    () => CompetitionsCollection.find({ 'wods.scores._id': scoreId }),
    []
  )[0]?.wods?.find(w => w.scores.map(s => s._id)?.includes(scoreId))

  const score = wod?.scores.find(s => s._id === scoreId)

  if (isLoading()) {
    return (
      <div className="max-w-3xl min-h-screen mx-auto sm:pt-10">Loading..</div>
    )
  }

  return (
    <div className="max-w-3xl min-h-screen mx-auto pt-4 sm:pt-10">
      <h1 className="mb-4 text-lg font-medium">Score page</h1>

      <div>
        <div>{JSON.stringify(score)}</div>

        <div className="flex flex-col gap-2">
          <button
            className="w-full px-3 py-8 border rounded-lg  border-green-300 bg-green-50 hover:bg-green-100 transition"
            onClick={() => Meteor.call('scores.inc', score._id)}
          >
            Increment
          </button>

          <button
            className="w-full px-3 py-3 border border-red-300 rounded-lg hover:bg-gray-100 transition"
            onClick={() => Meteor.call('scores.dec', score._id)}
          >
            Decrement
          </button>
        </div>
      </div>
    </div>
  )
}

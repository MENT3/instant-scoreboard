import React from 'react'
import { useParams } from 'react-router-dom'
import { useSubscribe, useFind } from 'meteor/react-meteor-data'

import { CompetitionsCollection } from '../../api/competitions.js'

export const WodPage = () => {
  const { wodId } = useParams()

  const isLoading = useSubscribe('competitions', wodId)
  const wod = useFind(
    () => CompetitionsCollection.find({ 'wods._id': wodId }),
    []
  )[0]?.wods?.filter(w => w._id === wodId)[0]

  if (isLoading()) {
    return (
      <div className="max-w-3xl min-h-screen mx-auto sm:pt-10">Loading..</div>
    )
  }

  return (
    <div className="max-w-3xl min-h-screen mx-auto sm:pt-10">
      <h1 className="mb-4 text-lg font-medium">Wod page</h1>

      <div className="flex flex-col gap-2">
        {wod?.scores?.map(s => (
          <div key={s._id}>
            <div>Value ➡️ {s.value}</div>
            <div>{JSON.stringify(s)}</div>
          </div>
        ))}
      </div>

      <div>{JSON.stringify(wod)}</div>
    </div>
  )
}

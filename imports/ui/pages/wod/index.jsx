import React from 'react'
import { useParams } from 'react-router-dom'
import { useSubscribe, useTracker } from 'meteor/react-meteor-data'

import { WodsCollection } from '../../../api/collections.js'
import { Wod } from './components/wod'

export const WodPage = () => {
  const { wodId } = useParams()

  const isLoading = useSubscribe('wodById', wodId)

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

  return (
    <div className="max-w-3xl min-h-screen mx-auto sm:pt-10">
      <h1 className="mb-4 text-lg font-medium">Wod page</h1>

      <Wod wod={wod} score={23} />

      <br />
      <br />
      <br />

      <div>{JSON.stringify(wod)}</div>
    </div>
  )
}

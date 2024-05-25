import React from 'react'
import { useFind, useSubscribe } from 'meteor/react-meteor-data'

import { CompetitionsCollection } from '../api/competitions.js'

export const App = () => {
  const isLoading = useSubscribe('competitions')
  const competitions = useFind(() => CompetitionsCollection.find(), [])

  if (isLoading()) return <div>Loading chacal</div>

  return (
    <div className="max-w-3xl min-h-screen mx-auto sm:pt-10">
      Instant score
      {JSON.stringify(competitions)}
    </div>
  )
}
